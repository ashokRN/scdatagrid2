import React from "react";


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {

    return <div className="data_grid_searchbar_container">
        <input className="data_grid_searchbar_input" value={props.value} placeholder="Search..." type="text" onChange={(e) => props.onChange(e.target.value)} />
    </div>
}

export default SearchBar;