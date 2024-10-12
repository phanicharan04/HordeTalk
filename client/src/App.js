import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Profiles from './pages/Profiles';
import UserContext from './context/UserContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Signup/>} path='/'/>
        <Route element={<Login/>} path='/login'/>
      </Routes>
      <Navbar/>
      <UserContext>
      <Routes>
        <Route element={<Home/>} path='/home' />
        <Route element={<Profile/>} path='/profile' />
        <Route element={<Profiles/>} path='/profiles/:id' />
      </Routes>
      </UserContext>
      </div>
  );
}

export default App;
