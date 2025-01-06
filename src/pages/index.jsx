import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { weatherService } from '../services/weather.service'
import { LocationList } from '../cmps/LocationList'
import { makeId, isRecent } from '../services/util.service'
import { OptionList } from '../cmps/OptionList'



export function Index() {
    const [locations, setLocations] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchOptions, setSearchOptions] = useState([])

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
            locations.map((loc) => isRecent(loc.weatherData.date) ? loc : weatherService.fetchWeather(loc))
        )
        setLocations(updatedList)
    }


    function onChange(ev) {
        setSearchInput(ev.target.value)
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const options = await weatherService.fetchGeo(searchInput)
            setSearchOptions(options)
        } catch (err) {
            console.log('error while searching', err)
        }
    }

    async function onAddLoc(loc) {
        console.log('loc', loc)
        const savedLoc = await weatherService.fetchWeather(loc)
        const locationsToUpdate = [...locations]
        locationsToUpdate.unshift(savedLoc)
        setLocations(locationsToUpdate) 
        setSearchInput('')
        setSearchOptions('')
    }

    return (
        <main className="index">

            <form onSubmit={onSubmit}>
                <label>
                    Search city:
                    <input
                        type="text"
                        value={searchInput}
                        onChange={onChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {!!searchOptions.length && <OptionList searchOptions={searchOptions} onAddLoc={onAddLoc} />}
            {!!locations.length && <LocationList locations={locations} />}
        </main>
    )
}