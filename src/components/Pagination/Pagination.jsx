import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './Pagination.css'

const Pagination = ({ setPage }) => {
  return (
    <div className='page-buttons-container'>
      <Button
        text='Previous Page'
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
      />
      <Button
        text='Next Page'
        onClick={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,   // page should be a number
  setPage: PropTypes.func.isRequired,   // setPage should be a function
};

export default Pagination;
