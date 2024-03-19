// Modal.js
import { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    {/* Modal */}
                    <div className="bg-white p-4 rounded shadow-lg w-1/2">
                        {/* Close button */}
                        <button onClick={onClose} className="absolute top-0 right-0 p-2">
                            <svg className="h-6 w-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Modal content */}
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;