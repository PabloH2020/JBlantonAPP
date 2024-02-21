import { CityIcon } from "../assets/cityIcon"
import { CityInfoSearch } from "./CityInfoSearch"

export const Navbar = ()=>{
    
    return (
        <header>
            <nav>
                <CityIcon/>
                <h3 className="search-log">Follow your own path through the USA</h3>
                <CityInfoSearch />
            </nav>
        </header>
    )
}