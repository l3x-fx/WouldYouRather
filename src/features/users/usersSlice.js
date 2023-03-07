import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../../backend-mock/_DATA';


const initialState = {
  value: '',
  status: 'idle',
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const response = await _getUsers();
    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = usersSlice.actions;

export const selectUsers = (state) => state.users.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectUsers(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default usersSlice.reducer;
