import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const s1 = {
        "name": "Zaid",
        "program": "BCA"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "Mohammad Zaid Khan",
                "program": "Bechlore of Computer Application"
            })
        }, 3000);
    }
    return (
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;