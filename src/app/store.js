import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import pollsreducer from '../features/polls/pollsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    polls: pollsreducer
  },
});
