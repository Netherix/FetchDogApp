import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

const API_BASE = "https://frontend-take-home-service.fetch.com";

const Match = () => {
  const [matchedDog, setMatchedDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);       
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("matchedDog"));
    if (favorites && favorites.length > 0) {
      const dogIds = favorites.map(dog => dog.id);

      setLoading(true);
      setError(null);    

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
              setError("Error fetching dog details. Please try again later.");
            })
            .finally(() => setLoading(false));
        })
        .catch(err => {
          console.error("Error fetching match:", err);
          setError("Error fetching match. Please try again later."); 
          setLoading(false); 
        });
    } else {
      setLoading(false); 
    }
  }, []);

  return (
    <>
      <Nav />

      <h2>Your Matched Dog</h2>

      {loading && <p>Loading...</p>} 
      {error && <p style={{ color: "red" }}>{error}</p>}

      {matchedDog ? (
        <div>
          <img src={matchedDog.img} alt={matchedDog.name} width="200" />
          <p><strong>Name:</strong> {matchedDog.name}</p>
          <p><strong>Breed:</strong> {matchedDog.breed}</p>
          <p><strong>Age:</strong> {matchedDog.age}</p>
          <p><strong>Zip Code:</strong> {matchedDog.zip_code}</p>
          
        </div>
      ) : (!loading && !error) ? ( 
        <p>No match found. Please go back and select a dog.</p>
      ) : null} 
      <button onClick={() => navigate("/search")}>Go Back</button>
    </>
  );
};

export default Match;