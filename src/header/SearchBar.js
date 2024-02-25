import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchEntered, setSearchEntered] = useState([]);

  function onSearchEntered(event) {
    setSearchEntered(event.target.value);
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    onSearch(searchEntered);
  }

  return (
    <form onSubmit={onSubmitSearch}>
      <label htmlFor="search">Search </label>
      <input type="text" onChange={onSearchEntered}></input>
    </form>
  );
}
