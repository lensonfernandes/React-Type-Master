import { useContext , useState} from "react";
import { createContext } from "react";



const AlertContext = createContext();


export const AlertContextProvider = ({children}) => {


    const [alert, setAlert] = useState({
        open: false,
        type: '',
        message: ''
    })


    const values ={

        alert,
        setAlert

     

        // open, 
        // setOpen,
        // type,
        // setType,
        // message,
        // setMessage

    }

    return (<AlertContext.Provider value={values}> {children}</AlertContext.Provider>)
}

export const useAlert = () => useContext(AlertContext);