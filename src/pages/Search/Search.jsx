import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBreeds, fetchDogs } from "../../api/fetchAPI";
import Nav from "../../components/Nav/Nav";
import DogCards from '../../components/DogCards/DogCards'

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  console.log(dogs)

  useEffect(() => {
    const loadBreeds = async () => setBreeds(await fetchBreeds());
    loadBreeds();

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const loadDogs = useCallback(async () => {
    setDogs(await fetchDogs(selectedBreed, page, sortOrder));
  }, [selectedBreed, page, sortOrder]);

  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  const toggleFavorite = (dog) => {
    setFavorites((prev) => {
      const newFavorites = prev.some((fav) => fav.id === dog.id)
        ? prev.filter((fav) => fav.id !== dog.id)
        : [...prev, dog];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleMatch = () => {
    if (!favorites.length) {
      alert("Please select at least one favorite dog.");
      return;
    }

    localStorage.setItem("matchedDog", JSON.stringify(favorites));
    navigate("/match");
  };

  return (
    <>
      <Nav />
      <h2>Search for Dogs</h2>

      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>

      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>

      <DogCards
        dogs={dogs} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
       />

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>

      <br />
      <button onClick={handleMatch} disabled={!favorites.length}>Match</button>
    </>
  );
};

export default Search;
