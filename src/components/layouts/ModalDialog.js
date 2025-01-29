import React, {Fragment}  from 'react'
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import CloseIcon from '../elements/icons/CloseIcon'

const ModalDialog = ({children, shown, closeFunction, actionFunction, actionFunctionLabel, dialogTitle, maxWidthClass, hideActions}) => {
    return (
        <Transition appear show={shown} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
                onClose={closeFunction}
            >
                <div className="min-h-screen px-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </TransitionChild>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={`relative inline-block w-full ${maxWidthClass} p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-[8px]`}>
                            <button onClick={()=>{closeFunction()}} className='absolute top-[15px] right-[15px] text-gray-600 hover:text-gray-500'>
                                <CloseIcon className={`w-5 h-5`} />
                            </button>
                            {dialogTitle && dialogTitle !== '' && <DialogTitle
                                as="h3"
                                className="text-md font-medium leading-6 mb-4"
                            >
                                {dialogTitle}
                            </DialogTitle>}
                            <div className="mt-2">
                                {children}
                            </div>

                            {!hideActions && <div className="mt-8 flex flex-row-reverse gap-x-4">
                                {actionFunctionLabel && <button
                                    type="button"
                                    className="inline-flex justify-center px-5 py-4 text-xs font-medium bg-primary text-white border border-transparent rounded-md hover:bg-opacity-60 transition duration-200 focus:outline-none"
                                    onClick={actionFunction}
                                >
                                    {actionFunctionLabel}
                                </button>}

                                <button
                                    type="button"
                                    className="inline-flex justify-center px-5 py-4 text-xs font-medium bg-transparent border border-transparent rounded-md hover:bg-opacity-50 hover:bg-secondary focus:outline-none"
                                    onClick={closeFunction}
                                >
                                    Close
                                </button>
                                
                            </div>}
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalDialog
