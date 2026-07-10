import React from 'react'
import { app } from '../firebase';
import { GoogleAuthProvider , getAuth , signInWithPopup} from "firebase/auth";
import {signInStart , signInSuccess , signInFailed} from "../redux/user/userSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async()=>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth , provider);
            const user = result.user;
            
            dispatch(signInStart(true));
            const response = await fetch('/api/auth/google' ,
                {
                    method: 'POST',
                    headers:{   
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.displayName,
                        email: user.email,  
                        photo: user.photoURL,
                    }),
                }
            );
            const data = await response.json();
            if(!data.success){
                dispatch(signInSuccess(data.user));
                navigate("/");
            }else{
                dispatch(signInFailed(data.message));
                setTimeout(()=>{
                    dispatch(signInFailed(null));
                } , 5000);
                return;
            }
        }catch(err){
            dispatch(signInFailed(err.message));
            setTimeout(()=>{
                dispatch(signInFailed(null));
            } , 5000);
        }
    }
  return (
    <button onClick={handleGoogleClick} type="button" 
            className="bg-red-600
            text-white p-3 
            rounded-lg uppercase 
            hover:opacity-90 
            disabled:opacity-60" >
      Continue with Google
    </button>
  )
}
