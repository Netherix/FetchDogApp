import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMatchedDog } from "../../api/fetchAPI";
import Nav from "../../components/Nav/Nav";

const Match = () => {
  const [matchedDog, setMatchedDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMatch = async () => {
      const favorites = JSON.parse(localStorage.getItem("matchedDog")) || [];
      setLoading(true);
      const match = await fetchMatchedDog(favorites);
      if (!match) setError("No match found.");
      setMatchedDog(match);
      setLoading(false);
    };

    loadMatch();
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
