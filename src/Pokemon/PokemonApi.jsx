import { useEffect, useState } from "react";
import axios from 'axios';
import styles from "./Pokemon.module.css";

const Pokemon=()=>{

const [pokemonList, setPokemonList] = useState([]);
const [searchedPokemon, setSearchedPokemon] = useState("");
const [filteredPokemonList, setFilteredPokemonList] = useState([]);



const searchPokemon = () => {

  const filteredList = pokemonList.filter(pokemon => pokemon.name.includes(searchedPokemon.toLowerCase()));
  setFilteredPokemonList(filteredList);
}

const getAllPokemon =async() => {

    try{
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=807");
    const result = await response.data;
    console.log(result);
    setPokemonList(result.results);
    setFilteredPokemonList(result.results);
}
 catch (error){
    console.log(error);
 }
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

export default Pokemon;