import React from "react";
import ReactDOM from 'react-dom';
import modalStyles from "../css/Modal.module.css";

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className={`${modalStyles.dimBackgroud} ui dimmer visible active`}>
            <div onClick={(e) => e.stopPropagation()} className={`${modalStyles.position} ui standard  active modal modal-content`}>
                <button className="right btn-flat grey lighten-5 grey-text" onClick={props.onDismiss}><i className="material-icons">close</i></button>
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