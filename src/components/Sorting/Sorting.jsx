import PropTypes from "prop-types";
import Button from "../Button/Button";
import './Sorting.css'

const Sorting = ({ sortOrder, setSortOrder, selectedBreed, setSelectedBreed, breeds }) => {
  return (
    <div className="sorting-container">
      <select onChange={(e) => setSelectedBreed(e.target.value)} value={selectedBreed}> {/* Add value prop */}
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
      <Button
        text={`Sort: ${sortOrder === "asc" ? "A-Z" : "Z-A"}`}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      />
    </div>
  );
};

Sorting.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  selectedBreed: PropTypes.string.isRequired,
  setSelectedBreed: PropTypes.func.isRequired,
  breeds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Sorting;