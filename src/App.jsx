import { Route, Routes } from 'react-router';
import './App.css'
import Home from './pages/Home/Home';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Shop from './pages/Shop/Shop';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Cart from './pages/Cart/Cart';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/shop' element={<Shop />} ></Route>
        <Route path='/signIn' element={<SignIn />} ></Route>
        <Route path='/signUp' element={<SignUp />} ></Route>
        <Route path='/cart' element={<Cart />} ></Route>
      </Routes>
    </>
  )
}

export default App;