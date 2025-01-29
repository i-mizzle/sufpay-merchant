import React from 'react'
import DocumentIcon from './icons/DocumentIcon'
import ChevronIcon from './icons/ChevronIcon'
import { slugify } from '../../utils'

const DocumentPreview = ({documentDetails}) => {
    const documentType = documentDetails.url.split('/').pop().split('.').pop()

    const handleDownload = async() => {
        // URL of the file to download
        const fileUrl = documentDetails?.url;
        const fileName = slugify(documentDetails?.name); // Optional custom filename
    
        try {
            // Fetch the file as a blob
            const response = await fetch(fileUrl);
      
            if (!response.ok) {
              throw new Error('Failed to fetch file');
            }
      
            const blob = await response.blob();
      
            // Create a blob URL
            const blobUrl = URL.createObjectURL(blob);
      
            // Create an anchor element
            const anchor = document.createElement('a');
            anchor.href = blobUrl;
            anchor.download = fileName;
      
            // Append and trigger the download
            document.body.appendChild(anchor);
            anchor.click();
      
            // Cleanup
            anchor.remove();
            URL.revokeObjectURL(blobUrl);
          } catch (error) {
            console.error('Error downloading file:', error);
          }
      
    };

    return (
        <div className='w-full border border-gray-300 rounded-[8px] p-3 flex items-center gap-x-2 transition duration-300 hover:shadow-lg'>
            <div className=' relative'>
                <DocumentIcon className={`w-12 h-12 text-gray-500`} />
                <p className='px-[5px] py-[2px] text-[10px] uppercase text-white inline bg-gray-600 absolute bottom-[10px] -left-[2px]'>{documentType}</p>
            </div>
            <div className='w-full'>
                <p className='text-sm'>{documentDetails.name}</p>
                <button onClick={()=>{handleDownload()}} rel="noreferrer" className='text-gray-400 hover:text-vcm-purple transition duration-200 text-xs flex items-center gap-x-2'>View/download document <ChevronIcon className={`w-4 h-4 rotate-180`} /></button>
            </div>
    </div>
  )
}

export default DocumentPreview