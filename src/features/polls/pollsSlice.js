import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {  _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../backend-mock/_DATA';

const initialState = {
    value: '',
    status: 'idle',
  };

  export const getAllPolls = createAsyncThunk(
    'polls/getAllPolls',
    async () => {
      const response = await _getQuestions();
      return response;
    }
  );

  export const savePollAnswer = createAsyncThunk(
    'polls/savePollAnswer', 
    async ({authedUser, qid, answer}) => {
      const response = await _saveQuestionAnswer({authedUser, qid, answer}); 
      return response;
    }
  )

  export const saveNewPoll = createAsyncThunk(
    'polls/saveNewPoll', 
    async (newPoll) => {
      const response = await _saveQuestion(newPoll); 
      return response;
    }
  )

  export const pollsSlice = createSlice({
    name: 'polls',
    initialState,
    reducers: {  
    },  
    extraReducers: (builder) => {
      builder
        .addCase(getAllPolls.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllPolls.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value = action.payload;
        })

      .addCase(savePollAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(savePollAnswer.fulfilled, (state, action) => {
        state.status = 'idle';     
      })
      
      .addCase(saveNewPoll.pending, (state) => {
        state.satue = 'loading';
      })
      .addCase(saveNewPoll.fulfilled, (state) => {
        state.satue = 'idle';
      })      
    }
  });
  
  export const selectPolls = (state) => state.polls.value;
  export const selectPollsStatus = (state) => state.polls.status;
  
  export default pollsSlice.reducer;
  