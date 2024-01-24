import React, { useEffect, useState } from "react";
import styles from "./Pokemon.module.css";

const PokemonApiFetch = () => {


  const [pokemonList, setPokemonList] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  const getAllPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=807", {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => {
        setPokemonList(result.results);
        setFilteredPokemonList(result.results);
      })
      .catch(error => console.log('error', error));
  }

  const searchPokemon = () => {

    const filteredList = pokemonList.filter(pokemon => pokemon.name.includes(searchedPokemon.toLowerCase()));
    setFilteredPokemonList(filteredList);
  }

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div  className={styles.general}>
      <button onClick={getAllPokemon}>Fetch Pokemon</button>
      <br />
      <label htmlFor="search">Search Pokemon:</label>
      <input
        type="text"
        id="search"
        value={searchedPokemon}
        onChange={(e) => setSearchedPokemon(e.target.value)}
      />
      <button onClick={searchPokemon}>Search</button>

      <ul>
        {filteredPokemonList.map((pokemon, idx) => (
          <li key={idx}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonApiFetch;
