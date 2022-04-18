import React, { createElement } from "react";
import { render, createPortal } from "react-dom";
import Dialog from './dialog'


const Modal = (options) => {
  // createPortal(createElement('div', null, 112345), document.body)
  // const c = createPortal(<BaseDailog isOpen={true} title="title" />, document.body)
  const div = document.createElement('div');
  document.body.appendChild(div)
  render(<Dialog {...options} />, div)
}

export default Modal
