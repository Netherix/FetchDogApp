import { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((dog) => dog.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Nav />
      
      <h2>Favorites</h2>
      {favorites.length === 0 ? <p>No favorite dogs yet.</p> : (
        <div>
          {favorites.map((dog) => (
            <div key={dog.id}>
              <img src={dog.img} alt={dog.name} width="150" />
              <p>{dog.name} ({dog.breed})</p>
              <button onClick={() => removeFavorite(dog.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
