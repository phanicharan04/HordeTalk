import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Signup/>} path='/'/>
        <Route element={<Login/>} path='/login'/>
        <Route element={<Home/>} path='/home' />
        <Route element={<Profile/>} path='/profile' />
      </Routes>
      </div>
  );
}

export default App;
