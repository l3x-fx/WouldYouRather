import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../../backend-mock/_DATA';



const initialState = {
  value: 0,
  status: 'idle',
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const response = await _getUsers();
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.users.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectUser(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default usersSlice.reducer;
