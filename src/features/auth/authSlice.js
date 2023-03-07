import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authUser: '',
    isLoggedIn: false,
  };

  export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        login: (state, action) => {
            state.authUser = action.payload;
            state.isLoggedIn = true;
        }, 
        logout: (state) => {
            state.authUser = '';
            state.isLoggedIn = false;
        }, 

    }
  })

  export const {login, logout} = authSlice.actions; 

  export const selectAuth = (state) => state.auth.authUser; 
  export const selectLoggedIn = (state) => state.auth.isLoggedIn;

  export default authSlice.reducer;