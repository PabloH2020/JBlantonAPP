/* eslint-disable react/prop-types */
import { createContext ,useState} from "react";
import axios from 'axios';

export const ListContext = createContext()

export const ListProvider =({children})=>{
    const [detailsBoolean,setDetailsBoolean]=useState(true)
    const [loadingDisplay,setLoadingDisplay] = useState(true)
    const [gptResponse,setGptResponse] = useState()
    const [cityAmount,setCityAmount] = useState(10)
    const [selectedCities,setSelectedCities] = useState([])
    
    const handleDetailsBoolean = ()=>{
        setDetailsBoolean(prevState=>!prevState)
    }

    const handleLoadingDisplay = ()=>{
        setLoadingDisplay(prevState=>!prevState)
    }

    const getResponseFromGPT = (gptPrompt)=>{
        axios.post("http://localhost:8000/chat",{prompt:gptPrompt}).then(res=>{
            const resp = res.data.choices[0].message.content;
            setGptResponse(resp)
        }).catch(e=>{
            console.log(e.message)
            throw e;
        })     
    }

    return(
        <ListContext.Provider value={{selectedCities,setSelectedCities,detailsBoolean,handleDetailsBoolean,loadingDisplay,handleLoadingDisplay,getResponseFromGPT,gptResponse,setGptResponse,cityAmount,setCityAmount}}>
            {children}
        </ListContext.Provider>    
    )
}