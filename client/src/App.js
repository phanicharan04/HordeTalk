import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserContext from './context/UserContext';
import ProfileById from './pages/ProfileById';
import UserPost from './pages/UserPost';
import UpdateProfile from './components/Updateprofile';
import Networks from './pages/Networks';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Login/>} path='/'/>
        <Route element={<Signup/>} path='/signup'/>
      </Routes>
      <UserContext>
      <Routes>
        <Route element={<Home/>} path='/home' />
        <Route element={<Profile/>} path='/profile' />
        <Route element={<Networks/>} path='/networks' />
        <Route element={<UpdateProfile/>} path='updateprofile/:userId' />
        <Route element={<ProfileById/>} path='/profiles/:id' />
        <Route element={<UserPost/>} path='/mypost/:postId' />
      </Routes>
      </UserContext>
      </div>
  );
}

export default App;
