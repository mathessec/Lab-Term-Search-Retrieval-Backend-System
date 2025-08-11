import { Navigate } from 'react-router-dom';
import Dashboard from "../components/dashboard.jsx"; // Assuming you have this component
import Login from '../components/user/Login';
import SignUp from "../components/user/SignUp.jsx";
import LoincSearchPage from "../pages/LoincSearchPage.jsx";

const AppRoutes = [
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path:'/loincSearchPage',
    element: <LoincSearchPage />, // Assuming you have this component
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
];

export default AppRoutes;

