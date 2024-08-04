import React, { useEffect } from 'react';
import './ModalLayout.css'; // Create a separate CSS file for styling

const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.className === 'modal-backdrop') {
                onClose();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
