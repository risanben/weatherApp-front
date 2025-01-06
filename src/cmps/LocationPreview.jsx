

export function LocationPreview({loc}){

    return <li className="location-preview">
       {loc.cityName}
       {loc.weatherData.temp}
    </li>
}