import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {  _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../backend-mock/_DATA';


const initialState = {
    value: {},
    status: 'idle',
  };

  export const getAllQuestions = createAsyncThunk(
    'users/getAllUsers',
    async () => {
      const response = await _getQuestions();
      return response.data;
    }
  );

  export const pollsSlice = createSlice({
    name: 'polls',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
      incrementByAmount: (state, action) => {
        state.value = action.payload;
      },
    },
  
    extraReducers: (builder) => {
      builder
        .addCase(getAllQuestions.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllQuestions.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        });
    },
  });
  
  export const { } = pollsSlice.actions;
  
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
  export const selectPolls = (state) => state.polls.value;
  
  // We can also write thunks by hand, which may contain both sync and async logic.
  // Here's an example of conditionally dispatching actions based on current state.
//   export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
  
  export default pollsSlice.reducer;
  