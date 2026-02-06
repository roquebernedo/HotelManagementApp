import React from 'react'

const Modal = ({ children, isOpen, closeModal }) => {
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };
    let clickTargetID = null;

    const handleOnMouseDown = (e) => {
        e.stopPropagation();
        clickTargetID = e.target.id;
    };

    const handleOnMouseUp = (e) => {
        e.stopPropagation();
        if (e.target.id === clickTargetID && clickTargetID === "modal-container") {
            closeModal();
        }
        clickTargetID = null;
    };

    return (
        <article id="modal-container"
            className={`modal-container ${isOpen ? "fade-in" : "hidden"}`}
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}>

            <div id="modal-content"
                className={`modal-content ${isOpen ? '' : ''}`}
                onClick={handleModalContentClick}>
                {children}
            </div>

        </article>
    );
};

export default Modal;