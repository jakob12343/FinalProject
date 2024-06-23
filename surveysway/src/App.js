import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import { MainProvider } from './MainContext';
import ProtectedRoute from './Login/ProtectedRoute';
import Homepage from './UserComponents/Homepage';
import GuestPage from './GusetComponents/GuestPage';
import SignUp from './Login/SignUp';
import ResetPasword from './Login/ResetPasword';
import Newpass from './Login/Newpass';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './Navs/Navigator';
import { UserProvider } from './UserComponents/UserContext';
import { GuestProvider } from './GusetComponents/GusetContext';
import AboutUs from './MajorComponents/AboutUs';
import Footer from './Navs/Footer';
import './App.css';


function App() {
  return (
    <div className='size' >
      <MainProvider>
        <GuestProvider>
          <UserProvider>

            <Router>
              <Navigator />

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UserHomePage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path='/guest' element={<GuestPage />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/ResetPasword' element={<ResetPasword />} />
                <Route path='/CreateNewPassword' element={<Newpass />} />
                <Route path='/about' element={<AboutUs/>}></Route>
                {/* ... other routes */}
              </Routes>
              <Footer/>
              {/* <Footer/> */}
            </Router>

          </UserProvider>
        </GuestProvider>
        
      </MainProvider>
    </div>
  );
}

export default App;
