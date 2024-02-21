/* eslint-disable react/prop-types */
import { useCitiesData } from "../hooks/getCitiesData"
import { ListContext } from "../context/ListContext"
import { useContext,useState } from "react"

export const Cities = ({setCurrentCity})=>{
        const [showComparison,setShowComparison] = useState(false)
        const {citiesInfo,getCitiesData} = useCitiesData()
        const {cityPlaces} = useCitiesData();
        const {detailsBoolean,handleDetailsBoolean,handleLoadingDisplay,loadingDisplay,getResponseFromGPT,selectedCities,setSelectedCities} = useContext(ListContext)
        
        
        const handlePlaces = (city)=>{
            
            const gptPrompt = `Create a story for the creation and existance of ${city.city} city, using details from the JSON objects. JSON information: ${city} ${cityPlaces}.`

            setCurrentCity(city)
            console.log(city)
            const latAndLong = `${city.latitude}${city.longitude}`;
            getCitiesData(latAndLong)   
            
            handleDetailsBoolean() 
            if(!loadingDisplay){
                handleLoadingDisplay() 
            }
            getResponseFromGPT(gptPrompt)
        }

        const increaseSelected = (city,event)=>{
            const elementToColour = event.target.nodeName=='LI' ? event.target.nodeName : event.target.parentNode ;
            
            if(elementToColour.style.backgroundColor=='mistyrose'){
                elementToColour.style.backgroundColor='aliceblue';
                const newArray = selectedCities.filter(el=>el.id!=city.id);
                setSelectedCities(newArray)
            }else{
                elementToColour.style.backgroundColor='mistyrose';
                setSelectedCities(prevState=>[...prevState,city])
                console.log(selectedCities)
            }                      
            
            
        }
        

    return(
        <div>
         <div className="members">                      
                        {citiesInfo && <ul>{detailsBoolean && citiesInfo.map(city=>(
                            <li onDoubleClick={()=>handlePlaces(city)} onClick={(event)=>increaseSelected(city,event)} className="member" key={city.id}>                              
                                    <h3>City: {city.city}</h3>
                                    <p>Region: {city.region}</p>
                                    <p>Population: {city.population}</p>                                                                
                            </li>
                        ))}</ul>}
                        
            </div>
            {detailsBoolean && <p className="comparison-title">You can compare in detail different Cities by clicking on each one respectively, then press Compare</p>}
            {detailsBoolean && <div className="comparison-buttons">               
                <button onClick={()=>{setShowComparison(true)}}>Compare</button>
                <button onClick={()=>{setShowComparison(false)}}>Stop Comparison  X</button>
            </div>}
            <ul>{showComparison && selectedCities.map(city=>(
                            <li className="member" key={city.id}>                              
                                    <h3>City: {city.city}</h3>                                    
                                    <p>Region: {city.region}</p>
                                    <p>Region Code: {city.regionCode}</p>  
                                    <p>Population: {city.population}</p> 
                                    <p>Latitude: {city.latitude}</p>
                                    <p>Longitude: {city.longitude}</p>                                                                                                
                            </li>
                        ))}</ul>
        </div>
    )
}