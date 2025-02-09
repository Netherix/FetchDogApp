import { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import DogCards from "../../components/DogCards/DogCards";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (dog) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== dog.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <Nav />
      <h2 className="title">❤️ Favorite Dogs ❤️</h2>
      {favorites.length === 0 ? (
        <p>No favorite dogs yet.</p>
      ) : (
        <DogCards dogs={favorites} favorites={favorites} toggleFavorite={removeFavorite} />
      )}
    </>
  );
};

export default Favorites;
