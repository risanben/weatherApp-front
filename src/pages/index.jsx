import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { weatherService } from '../services/weather.service'
import { LocationList } from '../cmps/LocationList'
import { makeId, isRecent } from '../services/util.service'



export function Index() {
    const [locations, setLocations] = useState([])
    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        loadLocations()
        updateWeather()
    }, [])

    async function loadLocations() {
        const locations = await weatherService.loadLocations()
        setLocations(locations)
    }

    async function updateWeather() {
        const updatedList = await Promise.all(
            locations.map((loc) =>isRecent(loc.weatherData.date) ? loc : weatherService.fetchWeather(loc))
        )
        setLocations(updatedList)
    }

    return (
        <main className="index">
            hi from weather
            {!!locations.length && <LocationList locations={locations} />}
        </main>
    )
}