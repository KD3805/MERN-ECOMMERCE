import React, { useState } from "react";
import { RRContext } from "./rrContext";

const RRState = (props) => {
    const [state, setState] = useState(false);
    const openModal = () => setState(true)
    const closeModal = () => setState(false)

    return (
        <RRContext.Provider value={{ state, openModal, closeModal }}>
            {props.children}
        </RRContext.Provider>
    )
}

export default RRState