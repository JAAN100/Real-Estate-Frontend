import { use, useEffect, useRef, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { useSelector } from "react-redux";
import CloudinaryUpload from "../components/CloudinaryUpload";
import{updateUserStart, updateUserSuccess, updateUserFailed ,setShowPassword
  , deleteUserStart, deleteUserSuccess, deleteUserFailed,
  signOutStart, signOutSuccess, signOutFailed
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Eye, EyeOff , Loader, LoaderCircle} from "lucide-react";

export default function Profile() {
  const dispatch = useDispatch();
  const {currentUser ,loading ,  error , showPassword} = useSelector((state) => state.user);
  const uploadRef = useRef(null);
  const listingRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [showListingErr , setShowListingErr] = useState(false);
  const [listingLoader , setListingLoader] = useState(false);
  const [userListings , setUserListings] = useState([]);
  const [deleteListingLoader , setDeleteListingLoader] = useState(false);
  const navigate = useNavigate();

  const handleFoamDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success == false) {
        dispatch(updateUserFailed(data.message));
        return;
      }
      else{
        dispatch(updateUserSuccess(data));
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
      }    
    } catch (error) {
        dispatch(updateUserFailed(error.message));
    }
    
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success == false) {
        dispatch(deleteUserFailed(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
    }
  }
  const handleSignOut = async() => {
    try {
      dispatch(signOutStart());
      const response = await fetch(`/api/user/signout`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.success);
      
      if (data.success == false) {
        dispatch(signOutFailed(data.message));
        return;
      }
        dispatch(signOutSuccess());
        navigate("/sign-in");
    } catch (error) {
      dispatch(signOutFailed(error.message));
    }
  }
  const handleListing = async() => {
    try {
      setListingLoader(true);
      const response = await fetch(`/api/user/listing/${currentUser._id}`, {
        method: "GET",
      });
      const data = await response.json();
      setListingLoader(false);
      if(data.success == false){
        setShowListingErr(true);
        setTimeout(()=>{
        setShowListingErr(false);
      },5000)
        return;
      }
      setShowListingErr(false);
      setUserListings(data);
    } catch (error) {
      setListingLoader(false);
      setShowListingErr(true);
    }
  }
  async function handleDeleteListing(id , e){
    e.preventDefault();
    try {
      setDeleteListingLoader(true);
      const response = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setDeleteListingLoader(false);
      if (data.success == false) {
        setShowListingErr(true);
        return;
      }
      setUserListings(data);
      setShowListingErr(false);
    } catch (error) {
      setShowListingErr(true);
    }
  }
  useEffect(()=>{
    listingRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  } , [userListings])
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        <div className="flex flex-col items-center gap-3">
          <img
            src={formData.avatar || currentUser?.avatar}
            alt="profile"
            className="rounded-full border-2 border-gray-300 cursor-pointer"
            width={150}
            height={150}
            onClick={() => uploadRef.current.openUpload()}
          />

          <CloudinaryUpload
            ref={uploadRef}
            onUpload={(url) =>
              handleFoamDataChange({
                target: {
                  id: "avatar",
                  value: url,
                },
              })
            }
          />
          <p className="text-sm text-gray-500">
            Click on the image to upload a new profile picture
          </p>
          <p className="text-sm text-green-500">
           {formData.avatar !== undefined && formData.avatar !== currentUser?.avatar ? "Photo updated successfully" : ""}
          </p>
        </div>


        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.username}
          onChange={handleFoamDataChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.email}
          onChange={handleFoamDataChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />


        <div className="relative">
          <input 
            className="border p-3 w-full
            rounded-lg" type={showPassword ? "text" : "password"} 
            placeholder="password"
            id="password" onChange={handleFoamDataChange}
          />
          <button
            type="button"
            onClick={() => dispatch(setShowPassword(!showPassword))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>


        <button
          disabled={loading}
          type="submit"
          className="uppercase flex justify-center items-center bg-blue-500 text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 transition"
        >
         {loading ? <LoaderCircle className="animate-spin h-6 w-6 text-white" /> : "Update"}
        </button>
        <Link to="/create-listing" className="text-center p-2 uppercase rounded-md text-white bg-emerald-700 hover:opacity-90 transition">
          Create Listing
        </Link>

        <p className="text-green-500 text-center">
          {successMessage ? "Profile updated successfully" : ""}
        </p>
            {error ? <p className="bg-orange-600
              text-white mt-2 rounded-lg uppercase p-3">{error}</p> : ""}
        <div className="flex justify-between">
          <span onClick={handleDelete} className="text-red-700 cursor-pointer hover:opacity-60">
            Delete Account
          </span>

          <span onClick={handleSignOut} className="text-red-700 cursor-pointer hover:opacity-60">
            Sign out
          </span>
        </div>
      </form>
      <button onClick={handleListing} className="text-green-700 m-auto block mt-4">
          {listingLoader ? "Load Listing..." : "Show Listng"}
      </button>
      {showListingErr && <p className="text-red-700 text-center mt-1">No listing found</p>}
       
          {userListings && userListings.length > 0 && 
           (<div className="mt-5" ref={listingRef}>
            <h1 className="text-center text-2xl font-semibold">Your Listing</h1>
            {deleteListingLoader && <p className="text-center text-red-700">Deleting Listing...</p>}
            {
              userListings.map((listing)=>(
                <div key={listing._id} className="flex flex-row justify-between items-center mt-3 border border-slate-300 p-4 rounded-md">
                  <Link to={`/listing/${listing._id}`}>
                    <img className="h-16 w-16 object-contain" src={listing.imageUrls[0]} alt="listing-cover"/>
                  </Link>
                  <Link to={`/listing/${listing._id}`} className="flex-1 mx-3 hover:underline truncate">
                    <p className="font-semibold">{listing.name}</p>
                  </Link>
                  <div className="flex flex-col gap-1">
                    <button onClick={(e) => handleDeleteListing(listing._id, e)} className="text-red-700 uppercase hover:opacity-60">Delete</button>
                    <button className="text-green-700 uppercase hover:opacity-60">Edit</button>
                  </div>
                </div>
              ))
            }
          </div>)
          }    
    </div>
  );
}