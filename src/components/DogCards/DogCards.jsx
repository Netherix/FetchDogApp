import PropTypes from "prop-types";
import "./DogCards.css"

const DogCards = ({ dogs, favorites, toggleFavorite }) => {
  return (
    <>
      <div>
        {dogs.map((dog) => (
          <div key={dog.id}>
            <img src={dog.img} alt={dog.name} width="150" />
            <p>
              {dog.name} ({dog.breed})
            </p>
            <button onClick={() => toggleFavorite(dog)}>
              {favorites.some((fav) => fav.id === dog.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

DogCards.propTypes = {
  dogs: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      breed: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    })
  ).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      breed: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

export default DogCards;
