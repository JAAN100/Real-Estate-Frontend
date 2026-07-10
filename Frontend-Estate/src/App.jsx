import React from 'react'
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFound404 from './pages/NotFound404'
import PrivateProfile from './components/PrivateProfile'


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route element={<PrivateProfile/>}>
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound404/>}/>
     </Routes>
  )
}
