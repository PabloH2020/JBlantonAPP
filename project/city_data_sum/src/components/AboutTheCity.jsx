import {  useState,useContext } from 'react'
import { CityDetails } from './CityDetails'
import { Cities } from './Cities'
import { Introduction } from './Introduction'
import { Users } from './Users'
import { MapFrame } from './MapFrame'
import { ListContext } from '../context/ListContext'

export const AboutTheCity = ()=>{
    const [currentCity,setCurrentCity] = useState()
    const {detailsBoolean,setCityAmount} = useContext(ListContext)
 
    return(
        <main>
            <h1 className="company-title">Hello, we’re J. Blanton Plumbing.</h1>
            <div className="cover"></div>
            <Users/>
            <Introduction/>
            <div className="separator-cities">
                        <p>Have a look at some suggested cities. You can double click over them for details</p>
            </div>
            <Cities setCurrentCity={setCurrentCity}/>
            {detailsBoolean && <div className="toggle-buttons">
                <button onClick={()=>{setCityAmount(prevState=>prevState-10)}}>Show previous 10</button>
                <button onClick={()=>{setCityAmount(prevState=>prevState+10)}}>Show next 10</button>
            </div>}
            
            {!detailsBoolean && <MapFrame city={currentCity}/>}
            {currentCity && <CityDetails city={currentCity}/>}
            
        </main>
    )
}