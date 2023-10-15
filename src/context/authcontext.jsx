import axios from "axios";
import { createContext,React, useEffect, useState} from "react";

export const authContext = createContext();

export default function AuthenticationContext(props) {
     const [token, settoken] = useState(null);
     useEffect(function () {
        if (localStorage.getItem("tkn") !== null) {
            settoken(localStorage.getItem("tkn"))
        }
     });

        

    return <authContext.Provider value={ {token, settoken} }>
    {props.children}
    </authContext.Provider>
}