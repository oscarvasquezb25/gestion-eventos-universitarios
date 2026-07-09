import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }) => {
    return (
        <div className="input-group">
        <span className="input-group-text">🔎</span>
        <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
        </div>
    );
};

export default SearchBar;
