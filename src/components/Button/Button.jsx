import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ text, className = "button", onClick, type, disabled }) => {
  return (
    <>
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
