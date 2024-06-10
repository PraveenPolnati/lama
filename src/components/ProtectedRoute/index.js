import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const email = localStorage.getItem('userMailId');
  if (!email) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
