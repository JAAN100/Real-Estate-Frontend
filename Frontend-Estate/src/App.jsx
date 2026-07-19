import {React , useEffect} from 'react'
import {Routes , Route} from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreateListing from './pages/CreateListing'
import About from './pages/About'
import NotFound404 from './pages/NotFound404'
import PrivateProfile from './components/PrivateProfile'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/listing/:listingId' element={<Listing />} />
      <Route element={<PrivateProfile/>}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/edit-listing/:id' element={<EditListing />} />
      </Route>
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound404/>}/>
     </Routes>
  )
}
