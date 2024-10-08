import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <svg className="circular-loader" width="50" height="50" viewBox="25 25 50 50">
        <circle
          className="loader-circle"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
