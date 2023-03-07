import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authUser: '',
  };

  export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        login: (state, action) => {
            state.authUser = action.payload;
        }, 
        logout: (state) => {
            state.authUser = '';
        }
    }
  })

  export const {login, logout} = authSlice.actions; 

  export const selectAuth = (state) => state.auth.authUser; 

  export default authSlice.reducer;