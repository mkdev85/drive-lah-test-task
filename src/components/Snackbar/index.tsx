
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Snackbar.scss';
import { RootState } from '../../redux/slices';
import { closeSnackbar } from '../../redux/slices/snackbar';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { isSnackbarOpen, snackbarMessage, snackbarType } = useSelector((state: RootState) => state.snackbar);

  useEffect(() => {
    if (isSnackbarOpen) {
      const timer = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSnackbarOpen, dispatch]);

  const handleCloseSnackBar = () => {
    dispatch(closeSnackbar());
  };

  if (!isSnackbarOpen) return null;

  return (
    <div className={`snackbar ${snackbarType}`}>
      {snackbarMessage}
      <button className="snackbar-action" onClick={handleCloseSnackBar} >
        Undo
      </button >
    </div >
  );
};

export default Snackbar;