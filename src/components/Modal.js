import React from "react";
import "./Modal.css";
import constants from "./constants";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main p-5">
        <button onClick={handleClose} className="float-right btn btn-secondary">
          {constants.CLOSE}
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;