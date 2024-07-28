import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Home from './pages/Home/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './pages/Footer/Footer';
import Popup from './pages/Popup/Popup';
import Login from './pages/Login';
import RegisterPopUp from './pages/RegisterPopup';

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [loginPopup, setLoginPopup] = React.useState(false);
  const [registerPopup, setRegisterPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };

  const handleRegisterPopup = () => {
    setLoginPopup(false);
    setRegisterPopup(!registerPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, []);

  return (
    <div className='bg-white dark:bg-gray-800 dark:text-white duration-200'>
      <Router>
        <Navbar 
          handleOrderPopup={handleOrderPopup} 
          handleLoginPopup={handleLoginPopup} 
          handleRegisterPopup={handleRegisterPopup}  
        />
        <Routes>
          <Route path="/" element={<Home handleOrderPopup={handleOrderPopup} />} />
        </Routes>
        <Footer />
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        <Login loginPopup={loginPopup} setLoginPopup={setLoginPopup} handleRegisterPopup={handleRegisterPopup} />
        <RegisterPopUp registerPopup={registerPopup} setRegisterPopup={setRegisterPopup}/>
      </Router>
    </div>
  );
};

export default App;
