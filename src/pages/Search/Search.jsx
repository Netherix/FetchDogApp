import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBreeds, fetchDogs } from "../../api/fetchAPI";
import "./Search.css";
import Nav from "../../components/Nav/Nav";
import DogCards from "../../components/DogCards/DogCards";
import Pagination from "../../components/Pagination/Pagination";
import Sorting from "../../components/Sorting/Sorting";
import Button from "../../components/Button/Button";

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

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
      <Nav handleMatch={handleMatch} />
      <h2 className="title">🐶 Explore The Cutest Doggies! 🐶</h2>

      <Sorting
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        breeds={breeds}
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

<Pagination page={page} setPage={setPage} />

      <div className="match-container">
        <h2>Find Your Perfect Match:</h2>
        <Button
          text="Match"
          onClick={handleMatch}
          disabled={!favorites.length}
        />
      </div>

      <DogCards
        dogs={dogs}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      
    </>
  );
};

export default Search;
