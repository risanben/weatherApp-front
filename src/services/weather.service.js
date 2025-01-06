import { makeId } from "./util.service"
import { storageService } from "./async-storage.service"

export const weatherService = {
    loadLocations,
    save,
    fetchWeather
}

const STORAGE_KEY = 'locs'

async function loadLocations() {
    try {
        let locations = await storageService.query('locs')
        if (!locations || !locations.length) {
            locations = initialLocs
            storageService.save(STORAGE_KEY, locations)
        }
        return locations
    } catch (err) {
        console.error('problem getting locations from the service', err)
    }
}

async function fetchWeather(loc) {
    console.warn('fetching data')
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${loc.coordinates.lat}&lon=${loc.coordinates.lng}&appid=${apiKey}`
        )
        if (!response.ok) {
            throw new Error("Location not found")
        }
        const data = await response.json()
        const locWithData = await _reduceData(loc, data)
        const savedLoc = await weatherService.save(locWithData)
        return savedLoc
    } catch (err) {
        console.error('error while fetching the data', err)
        return null;
    }
}

async function _reduceData(loc, locData) {
    return {
        _id: loc._id,
        cityName: loc.cityName,
        coordinates: {
            lat: loc.coordinates.lat,
            lng: loc.coordinates.lng
        },
        weatherData: {
            temp: Number.parseFloat(locData.current.temp - 273.15).toFixed(1),
            date: Date.now()
        }
    }
}

async function save(loc) {
    let locToSave
    if (loc._id) {
        const locToSave = {
            _id: loc._id,
            cityName: loc.cityName,
            coordinates: loc.coordinates,
            weatherData:loc.weatherData
        }
        savedLoc = await storageService.put(STORAGE_KEY, locToSave)
    } else {
        console.error('a location with no idea was sent to save unsuccesfully')
        // const carToSave = {
        //     vendor: car.vendor,
        //     price: car.price,
        //     speed: car.speed,
        //     // Later, owner is set by the backend
        //     owner: userService.getLoggedinUser(),
        //     msgs: []
        // }
        // savedCar = await storageService.post(STORAGE_KEY, carToSave)
    }
    return savedLoc
}


const initialLocs = [
    {
        _id: 'loc509738',
        cityName: 'tel aviv',
        coordinates: {
            lat: 32.0853,
            lng: 34.7818
        },
        weatherData:{
            temp:22.5,
            date:1736152504899
        }
    },
    {
        _id: 'loc684962',
        cityName: 'london',
        coordinates: {
            lat: 51.5072,
            lng: 0.1276
        },
        weatherData:{
            temp:16.2,
            date:1736152504899
        }
    }
]