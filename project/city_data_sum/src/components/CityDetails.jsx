/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { ListContext } from '../context/ListContext';

export const CityDetails = ({city})=>{

    const {handleDetailsBoolean,loadingDisplay,handleLoadingDisplay,setGptResponse,gptResponse} = useContext(ListContext)
    

    const handleBack = async ()=>{
         setGptResponse(null)
         handleDetailsBoolean()   
         handleLoadingDisplay()
    }

    return(
        <section className='city-details-section'>
        {(!gptResponse && loadingDisplay) && <h4 className="loading-title">Loading story...</h4>}
        {gptResponse && <div className="places-and-details">
            <h3>City: {city.city}</h3>
            <p>Region: {city.region}</p>
            <p>Population: {city.population}</p>
            <p>{gptResponse}</p>
        </div>}
        {loadingDisplay && <button className="button-back" onClick={handleBack}>Back To Cities</button>}
        </section>
        
    )
}