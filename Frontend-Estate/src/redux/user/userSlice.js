import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentUser: null,
  error : null,
  loading : false,
  showPassword : false,
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    signInStart: (state)=>{
      state.loading = true;
    },
    signInSuccess: (state , action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailed:(state ,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    setShowPassword:(state , action)=>{
      state.showPassword = action.payload
    },
    updateUserStart:(state)=>{
      state.loading = true;
    },
    updateUserSuccess:(state , action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailed:(state ,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart:(state)=>{
      state.loading = true;
    },
    deleteUserSuccess:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailed:(state ,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart:(state)=>{
      state.loading = true;
    },
    signOutSuccess:(state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailed:(state ,action)=>{
      state.error = action.payload;
      state.loading = false;
    }
  }
})


export const {signInStart , 
  signInSuccess , 
  signInFailed , 
  setShowPassword,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed
} = userSlice.actions;
export default userSlice.reducer;