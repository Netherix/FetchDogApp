import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://frontend-take-home-service.fetch.com";

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/dogs/breeds`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBreeds(data))
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed, page, sortOrder]);

  const fetchDogs = async () => {
    try {
      const query = new URLSearchParams({
        size: 10,
        from: page * 10,
        sort: `breed:${sortOrder}`,
      });

      if (selectedBreed) query.append("breeds", selectedBreed);

      const res = await fetch(`${API_BASE}/dogs/search?${query}`, {
        credentials: "include",
      });

      const { resultIds } = await res.json();

      const detailsRes = await fetch(`${API_BASE}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultIds),
      });

      const dogDetails = await detailsRes.json();
      setDogs(dogDetails);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  const toggleFavorite = (dog) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === dog.id)
        ? prev.filter((fav) => fav.id !== dog.id)
        : [...prev, dog]
    );
  };

  const handleMatch = () => {
    if (favorites.length === 0) {
      alert("Please select at least one favorite dog.");
      return;
    }
    
    // Save the matched dog(s) to local storage for retrieval in Match page
    localStorage.setItem("matchedDog", JSON.stringify(favorites));
    navigate("/match");
  };

  return (
    <div>
      <h2>Search for Dogs</h2>

      <select onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>

      <div>
        {dogs.map((dog) => (
          <div key={dog.id}>
            <img src={dog.img} alt={dog.name} width="150" />
            <p>{dog.name} ({dog.breed})</p>
            <button onClick={() => toggleFavorite(dog)}>
              {favorites.some((fav) => fav.id === dog.id) ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>

      <br />
      <button onClick={handleMatch} disabled={favorites.length === 0}>
        Match
      </button>
    </div>
  );
};

export default Search;
