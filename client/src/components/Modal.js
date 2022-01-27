import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import modalStyles from "../css/Modal.module.css";

const Modal = props => {
    // set state for opening and closing modal:
    const [isOpen, setIsOpen] = useState(true);
    const idRef = useRef();

    // to clear setTimeout after component unmounts:
    useEffect(() => {
        const timeOutId = idRef.current;
        return () => clearTimeout(timeOutId)
    }, [])

    // when user clicks to close modal:
    const handleClick = () => {
        // to apply zoomOut class:
        setIsOpen(false);
        // dismiss modal after class animation has ended:
        const id = setTimeout(() => {
            props.onDismiss()
        }, 150)
        idRef.current = id;
    }

    return ReactDOM.createPortal(
        <div onClick={() => { handleClick() }} className={`${modalStyles.modalBackgroud} ui dimmer visible active`}>
            <div
                onClick={(e) => { e.stopPropagation(); }}
                className={`${modalStyles.position} ui standard  active modal modal-content ${isOpen ? modalStyles.zoom : modalStyles.zoomOut}`}
            >
                <button
                    className="right btn-flat grey lighten-5 grey-text"
                    onClick={() => { handleClick() }}>
                    <i className="material-icons">close</i>
                </button>
                <h4 className={`modal-content pink-text ${modalStyles.title}`}>{props.title}</h4>
                <h6 className={`modal-content ${modalStyles.content}`}>{props.content}</h6>
                <div className="actions modal-footer">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal;