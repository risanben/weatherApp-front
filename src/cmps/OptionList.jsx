

export function OptionList({ searchOptions,onAddLoc }) {


    return <ul className="option-list">
        {searchOptions.map((opt) => <li key={opt.cityName} onClick={()=>onAddLoc(opt)}>
            {opt.cityName}
        </li>)}
    </ul>
}