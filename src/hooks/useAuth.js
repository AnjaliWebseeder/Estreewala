import { useDispatch, useSelector } from 'react-redux';
import { 
  logout, 
  clearAllErrors,
  resetRegisterState,
  resetOtpState,
  resetVerifyState,
  resetProfileState 
} from "../redux/slices/authSlice"

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearErrors = () => {
    dispatch(clearAllErrors());
  };

  const handleResetStates = () => {
    dispatch(resetRegisterState());
    dispatch(resetOtpState());
    dispatch(resetVerifyState());
    dispatch(resetProfileState());
  };

  return {
    ...auth,
    logout: handleLogout,
    clearErrors: handleClearErrors,
    resetStates: handleResetStates,
  };
};