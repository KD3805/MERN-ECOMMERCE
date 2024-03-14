import React, { useState } from "react";
import { ModalContext } from "./modalContext";

const ModalState = (props) => {
    const [state, setState] = useState(false);
    const openModal = () => setState(true)
    const closeModal = () => setState(false)

    return (
        <ModalContext.Provider value={{ state, openModal, closeModal }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalState