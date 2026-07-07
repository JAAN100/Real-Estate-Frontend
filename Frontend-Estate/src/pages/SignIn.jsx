import { Link , useNavigate} from "react-router-dom";
import { Landmark, Mail, Lock, User ,LoaderCircle , Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart , signInSuccess , signInFailed } from "../redux/user/userSlice";

export default function SignIn() {
   const [foamData , setFoamData] = useState({});
  const [showPassword , setShowPassword] = useState(false);
  const {loading , error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e)=>{
    setFoamData({
      ...foamData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch(signInStart(true));
    const response = await fetch('/api/auth/signin' , 
      {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foamData),
      }
    );
    const data = await response.json();
    if(data.success == false){
      dispatch(signInFailed(data.message));
      setTimeout(()=>{
        data.message =null;
      } , 5000);
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/');   
  }
  return (
     <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 text-emerald-700">Sign <span className="text-black">In</span></h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
          className="border p-3 
          rounded-lg" type="email" 
          placeholder="email"
          id="email" onChange={handleInput}
        />
        <div className="relative">
          <input 
            className="border p-3 w-full
            rounded-lg" type={showPassword ? "text" : "password"} 
            placeholder="password"
            id="password" onChange={handleInput}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button disabled={loading}
        className="bg-emerald-600
                   text-white p-3 
                      flex justify-center items-center
                      rounded-lg uppercase 
                      hover:opacity-90
                      disabled:opacity-50">
          {loading ? <LoaderCircle className="animate-spin h-6 w-6 text-white" /> : "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="font-semibold">Don't have an account?</p>
        <Link to="/sign-up" className="text-emerald-700">Sign Up</Link>
      </div>
      {error ? <p className="bg-orange-600
                  text-white mt-5 rounded-lg uppercase p-3">{error}</p> : ""}
    </div>
  )
}
