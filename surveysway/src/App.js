import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import { MainProvider } from './MainContext';
import ProtectedRoute from './Login/ProtectedRoute';
import Homepage from './UserComponents/Homepage';
import GuestPage from './GusetComponents/GuestPage';
import SignUp from './Login/SignUp';
import ResetPasword from './Login/ResetPasword';
import Newpass from './Login/Newpass';

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
                <Route path='/ResetPasword' element={<ResetPasword/>}/>
                <Route path='/CreateNewPassword' element={<Newpass/>}/>

                {/* ... other routes */}
            </Routes>
        </Router>

        
    </MainProvider>
    </div>
  );
}

export default App;
