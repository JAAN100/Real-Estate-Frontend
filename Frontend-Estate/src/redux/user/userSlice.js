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
    }
  }
})


export const {signInStart , signInSuccess , signInFailed , setShowPassword} = userSlice.actions;
export default userSlice.reducer;