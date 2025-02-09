import PropTypes from "prop-types";
import "./DogCards.css";
import Button from "../Button/Button";

const DogCards = ({ dogs, favorites, toggleFavorite }) => {
  return (
    <div className="dog-cards-container">
      {dogs.map((dog) => (
        <div className="dog-card" key={dog.id}>
          <img src={dog.img} alt={dog.name} width="150" />
          <p>{dog.name}</p>
          <p>({dog.breed})</p>
          <Button
            text={
              favorites.some((fav) => fav.id === dog.id)
                ? "Remove Favorite"
                : "Add Favorite"
            }
            onClick={() => toggleFavorite(dog)}
          />
        </div>
      ))}
    </div>
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
