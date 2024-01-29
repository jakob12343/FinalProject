import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import { MainProvider } from './MainContext';
import ProtectedRoute from './Login/ProtectedRoute';
import Homepage from './UserComponents/Homepage';
import GuestPage from './GusetComponents/GuestPage';
import SignUp from './Login/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
    <MainProvider>
    <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/UserHomePage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path='/guest' element={<GuestPage/>} />
                <Route path='/SignUp' element={<SignUp/>} />

                {/* ... other routes */}
            </Routes>
        </Router>

        
    </MainProvider>
    </div>
  );
}

export default App;
