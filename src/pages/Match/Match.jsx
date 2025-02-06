import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://frontend-take-home-service.fetch.com";

const Match = () => {
  const [matchedDog, setMatchedDog] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);       // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("matchedDog"));
    if (favorites && favorites.length > 0) {
      const dogIds = favorites.map(dog => dog.id);

      setLoading(true); // Set loading to true before fetching
      setError(null);    // Clear any previous errors

      fetch(`${API_BASE}/dogs/match`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dogIds),
      })
        .then(res => res.json())
        .then(data => {
          const matchedDogId = data.match;

          fetch(`${API_BASE}/dogs`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([matchedDogId]),
          })
            .then(res => res.json())
            .then(dogDetails => {
              setMatchedDog(dogDetails[0]);
            })
            .catch(err => {
              console.error("Error fetching dog details:", err);
              setError("Error fetching dog details. Please try again later."); // Set error message
            })
            .finally(() => setLoading(false)); // Set loading to false after fetch, regardless of success/failure
        })
        .catch(err => {
          console.error("Error fetching match:", err);
          setError("Error fetching match. Please try again later."); // Set error message
          setLoading(false); // Also set loading to false in outer catch
        });
    } else {
      setLoading(false); // If no favorites, no need to fetch, just set loading to false
    }
  }, []);

  return (
    <div>
      <h2>Your Matched Dog</h2>

      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

      {matchedDog ? (
        <div>
          <img src={matchedDog.img} alt={matchedDog.name} width="200" />
          <p><strong>Name:</strong> {matchedDog.name}</p>
          <p><strong>Breed:</strong> {matchedDog.breed}</p>
          <p><strong>Age:</strong> {matchedDog.age}</p>
          <p><strong>Zip Code:</strong> {matchedDog.zip_code}</p>
          {/* ... other dog details ... */}
        </div>
      ) : (!loading && !error) ? ( // Check for both not loading and no error to display no match message
        <p>No match found. Please go back and select a dog.</p>
      ) : null} {/* If loading or error, don't show "no match found" yet */}

      <button onClick={() => navigate("/search")}>Go Back</button>
    </div>
  );
};

export default Match;