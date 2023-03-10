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
    saveNewPollToUser: (state, action) => {
      state.value[action.payload.author].questions.push(action.payload.id);     
  }},

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

export const { saveNewPollToUser } = usersSlice.actions;

export const selectUsers = (state) => state.users.value;

export default usersSlice.reducer;
