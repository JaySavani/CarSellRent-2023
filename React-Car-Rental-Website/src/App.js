import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import CarListing from "./pages/BuyCar";
import CarDetails from "./pages/BuyCarDetails";
import NotFound from "./pages/NotFound";
import SellCar from "./pages/SellCar";
import RentCar from './pages/RentCar';
import Review from './pages/Review';
import Profile from './pages/Profile';
import BuyCar from './pages/BuyCar';
import CarRent from './pages/CarRent';
import BuyCarDetails from './pages/BuyCarDetails';
import RentCarDetails from './pages/RentCarDetails';
import Admin_RentCar from './pages/Admin/RentCar';
import Admin_SellCar from './pages/Admin/SellCar';
import Admin_Review from './pages/Admin/Review';
import Admin_User from './pages/Admin/User';
import ForgetPassword from './pages/Forgetpassword';
import ChangePassword from './pages/ChangePassword';
function App() {
  return(
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/buycar" element={<BuyCar/>} />
      <Route path="/rentcar" element={<CarRent/>} />
      <Route path="/buycar/:id" element={<BuyCarDetails />} />
      <Route path="/rentcar/:id" element={<RentCarDetails />} />
      <Route path="/review" element={<Review />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/carsell" element={<SellCar/>}/>
      <Route path="/carrent" element={<RentCar/>}/>
      <Route path="/adminrentcar" element={<Admin_RentCar/>}/>
      <Route path="/adminsellcar" element={<Admin_SellCar/>}/>
      <Route path="/adminreview" element={<Admin_Review/>}/>
      <Route path="/adminuser" element={<Admin_User/>}/>
      <Route path="/forget_pass" element={<ForgetPassword/>}/>
      <Route path="/forgetpassword/:email" element={<ChangePassword/>}/>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
