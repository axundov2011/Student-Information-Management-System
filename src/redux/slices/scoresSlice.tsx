import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Score } from '../../types';


const initialState: Score[] = [];

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    setScores: (state, action: PayloadAction<Score[]>) => {
      return action.payload; 
    },
    addScore: (state, action: PayloadAction<Score>) => {
      state.push(action.payload);
    },
  },
});

export const {setScores, addScore } = scoresSlice.actions;
export default scoresSlice.reducer;
