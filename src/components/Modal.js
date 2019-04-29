// Use Portal to render Modal and assign as child component of HTML body element (instead of StreamDelete Component).

// e = event. stopPropagation() make sure the event doesn't bubble up to parent div, thus causing window to get dismissed by navigating to some other page.

import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    // 2nd argument: reference to element that I want to render this Portal into.
    document.querySelector("#modal")
  );
};

export default Modal;
