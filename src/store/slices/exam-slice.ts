import { createSlice } from '@reduxjs/toolkit';
import { ExamType } from '../../types/exam-type';
import { cloneDeep } from 'lodash';

type ExamStateType = {
  value: {
    progressIndex: number;
    currentDuration: number | null;
    answerList: boolean[][];
    exam: ExamType | null;
  };
};

interface IAction {
  type: string;
}

interface ISetExamAction extends IAction {
  payload: ExamType;
}

interface IUpdateProgressAction extends IAction {
  payload: number;
}

interface IUpdateAnswerListAction extends IAction {
  payload: boolean[];
}

interface ISetExamDate extends IAction {
  payload: number;
}

const initialState: ExamStateType = {
  value: {
    progressIndex: 0,
    currentDuration: null,
    answerList: [],
    exam: null,
  },
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExam: (state: ExamStateType, action: ISetExamAction) => {
      state.value.exam = action.payload;
    },
    updateProgress: (state: ExamStateType, action: IUpdateProgressAction) => {
      state.value.progressIndex = action.payload;
    },
    updateAnswerList: (state: ExamStateType, action: IUpdateAnswerListAction) => {
      const tempAnswer = cloneDeep(state.value.answerList);
      tempAnswer.push(action.payload);
      state.value.answerList = tempAnswer;
    },
  },
});

export const { setExam, updateProgress, updateAnswerList } = examSlice.actions;
export const examReducer = examSlice.reducer;

export type ExamReducerType = {
  updateExam: (state: ExamStateType, action: ISetExamAction) => void;
  updateProgress: (state: ExamStateType, action: IUpdateProgressAction) => void;
};
