import { useState,useEffect, useContext} from "react";
import { ListContext } from "../context/ListContext";


export const getCitiesInfo = async function(cityAmount){
console.log(cityAmount)
  const urlCities = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&limit=10&offset=${cityAmount}`;
  const storageInfo = await JSON.parse(window.localStorage.getItem('citiesInfo'));
  const previousOffsetAmount = await JSON.parse(window.localStorage.getItem('previousOffsetAmount'));
  
  if (storageInfo && previousOffsetAmount==cityAmount) return storageInfo;
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5577b13bf2msh8ed937b68f9e063p180866jsn7cfb4fdb03e5',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  try {
    
    const response = await fetch(urlCities, options);
    const result = await response.json();
    
    if(result.data){
      window.localStorage.setItem('citiesInfo',JSON.stringify(result.data))
      window.localStorage.setItem('previousOffsetAmount',cityAmount)
    }      
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }finally{   
    console.log('request completed')
  }
}




export const useCitiesData = ()=>{
    const [citiesInfo,setCitiesInfo] = useState([]);
    const [cityPlaces,setCityPlaces] = useState();
    const {cityAmount}=useContext(ListContext);

    useEffect(()=>{
      getCitiesInfo(cityAmount).then(res=>{
        if(res)setCitiesInfo(res)
      })
    },[cityAmount])

    

    const getCitiesData = async function(cityLatAndLong){
      console.log(cityLatAndLong)
      const urlData = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${cityLatAndLong}/nearbyPlaces?radius=30`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5577b13bf2msh8ed937b68f9e063p180866jsn7cfb4fdb03e5',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };
        
        try {
          
            const response = await fetch(`${urlData}`, options);
            const responseD = await response.json();            
            setCityPlaces(responseD.data)
            return responseD.data
          
          
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    


    return {cityPlaces,citiesInfo,getCitiesInfo,getCitiesData,setCitiesInfo}
}