import { useSelector } from "react-redux";
import { store } from "../state/store";

const IsAdmin = () => {
  const auth = useSelector(store => store.auth);
  
  return auth && auth.user && auth.user.role === 'ADMIN';
};

export default IsAdmin;
