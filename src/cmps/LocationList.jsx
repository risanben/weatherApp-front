

export function LocationList({locations}){



    return <div className="location-list">
        hello from list
        <ul>
        {locations.map(loc =>
                <li key={loc._id}>
                    {loc.cityName}
                    {loc.weatherData.temp}
                    {/* <CarPreview car={car}/> */}
                </li>)
            }
        </ul>
    </div>
}