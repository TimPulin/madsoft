import { createSlice } from '@reduxjs/toolkit';
import { ExamType } from '../../types/exam-type';

type ExamStateValueType = {};

type ExamStateType = {
  value: {
    progress: number;
    exam: ExamType | null;
  };
};

type SetExamActionType = {
  type: string;
  payload: ExamType;
};

type UpdateProgressActionType = {
  type: string;
  payload: number;
};

const initialState: ExamStateType = {
  value: {
    progress: 0,
    exam: null,
  },
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExam: (state: ExamStateType, action: SetExamActionType) => {
      state.value.exam = action.payload;
    },
    updateProgress: (state: ExamStateType, action: UpdateProgressActionType) => {
      state.value.progress = action.payload;
    },
  },
});

export const { setExam, updateProgress } = examSlice.actions;
export const examReducer = examSlice.reducer;

export type ExamReducerType = {
  updateExam: (state: ExamStateType, action: SetExamActionType) => void;
  updateProgress: (state: ExamStateType, action: UpdateProgressActionType) => void;
};
