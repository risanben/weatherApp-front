import { LocationPreview } from "./LocationPreview"

export function LocationList({ locations }) {



    return <div className="location-list">
        hello from list
        <ul>
            {locations.map(loc => <LocationPreview key={loc._id} loc={loc} />)}
        </ul>
    </div>
}