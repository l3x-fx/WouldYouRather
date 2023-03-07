import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/users/usersSlice';
import pollsReducer from '../features/polls/pollsSlice';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    polls: pollsReducer, 
    auth: authReducer
  },
});
