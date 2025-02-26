import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from 'react-redux';
import { ERROR } from '../../../store/types';
import UploadIcon from '../icons/UploadIcon';

const FileUpload = ({ hasError, returnFileDetails, fieldLabel, preAddedFile, preAddedFileName, acceptedFormats, requiredField }) => {
  const [fileName, setFileName] = useState(null);
  const [fileExt, setFileExt] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();
  const [allowedFormats, setAllowedFormats] = useState(acceptedFormats ? acceptedFormats : ['jpg', 'jpeg', 'png', 'pdf']);

  const handleFile = (addedFile) => {
    setUploadedFile(URL.createObjectURL(addedFile));
    setFileSize(addedFile.size / 1000000);
    setFileName(addedFile.name.split('.')[0]);
    setFileExt(addedFile.name.split('.').pop());
    returnFileDetails({ file: addedFile, fileSize: addedFile.size / 1000000 });
    uploadToCloudinary(addedFile);
  };

  const uploadToCloudinary = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, true);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };
    xhr.send(formData);
  };

  const UploaderChildren = () => (
    <div className='rounded-md text-center'>
      <UploadIcon className='w-6 h-6 text-gray-400 mx-auto' />
      <p className='text-xs text-gray-500 mb-3 mt-3'>Click or drop file here to {uploadedFile || preAddedFile ? 'change' : 'upload'}</p>
      <p className='text-xs text-gray-400'>Allowed formats: {allowedFormats.join(', ')}</p>
    </div>
  );

  return (
    <div className='relative'>
      {fieldLabel && <label className={`text-xs lg:text-md cursor-text z-10 relative py-1 transition mb-1 block duration-200 ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
        {requiredField && <span className='text-red-600'>*</span>} {fieldLabel}
      </label>}
      <div className={`${hasError ? 'border-red-400' : 'border-gray-400'} border-dashed my-1 rounded block border bg-transparent items-center relative w-full p-5`}>
        <FileUploader
          multiple={false}
          handleChange={handleFile}
          name="file"
          types={allowedFormats}
          label='Click to upload or drop a file here'
          hoverTitle=""
          onTypeError={(error) => dispatch({ type: ERROR, error: { response: { data: { message: error } } } })}
          maxSize={4}
          onSizeError={(error) => dispatch({ type: ERROR, error: { response: { data: { message: error } } } })}
          classes="border-gray-200 block w-full flex items-center justify-center"
        >
          <UploaderChildren />
        </FileUploader>

        {(preAddedFile || uploadedFile) && <div className='block lg:flex flex-row-reverse items-center lg:w-inherit relative box-border w-full mt-5'>
          {uploadedFile && (fileExt === 'jpeg' || fileExt === 'png' || fileExt === 'jpg' ?
            <img alt="" className="h-[70px] ml-3 mb-3 shadow-lg border-2 border-white" src={uploadedFile} /> :
            <div className='h-[75px] mb-3 w-[70px] ml-3 flex items-center justify-center border-2 border-white shadow-lg'>
              <p className='text-sm font-tomato font-medium text-black'>.{fileExt}</p>
            </div>)}
          {fileName && <p className="text-xs px-4 text-black w-full">File name: <span className='font-medium'>{fileName.substring(0, 25)}{fileName.length > 25 && '...'}<br />Size: {fileSize.toLocaleString()} MB</span></p>}
        </div>}
        {uploadProgress > 0 && <div className='w-full bg-gray-200 rounded-full h-2 mt-2'>
          <div className='bg-blue-600 h-2 rounded-full' style={{ width: `${uploadProgress}%` }}></div>
        </div>}
      </div>
    </div>
  );
};

export default FileUpload;
