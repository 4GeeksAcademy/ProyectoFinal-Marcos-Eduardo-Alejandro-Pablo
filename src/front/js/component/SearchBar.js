import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";



export const SearchBar = () => {

  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value)
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${inputValue}`);
      const data = await response.json();
      setSearchResults(data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="input-group input-group-lg mb-3 mt-5">
        <input type="text" className="form-control" placeholder="Buscar en Cinemafy" aria-label="Barra de búsqueda"
          aria-describedby="barraBusqueda"
          value={inputValue}
          onChange={handleChangeInputValue}
        />
        <button className="btn btn-light" type="button" id="barraBusqueda"
          onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col d-flex gap-5 flex-wrap">
              {searchResults.length > 0 && searchResults.map((card, index) => {
                return <Card key={index} cardInfo={card} />
              }
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
