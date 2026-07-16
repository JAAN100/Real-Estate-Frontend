import {React , useEffect} from 'react'
import {Routes , Route} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { logout } from './redux/user/userSlice';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import About from './pages/About'
import NotFound404 from './pages/NotFound404'
import PrivateProfile from './components/PrivateProfile'

export default function App() {
  const dispatch = useDispatch();
    async function checkAuth() {
      try {
        const response = await fetch("api/user/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      } catch (error) {
        if (error.response?.status === 401) {
          dispatch(logout());
          localStorage.removeItem("persist:root");
        }
      }
    }
    checkAuth();

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateProfile/>}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound404/>}/>
     </Routes>
  )
}
