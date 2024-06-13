import { useSelector } from 'react-redux';
import { RootStateType } from '.';

function useExam() {
  return useSelector((store: RootStateType) => store.exam.value.exam);
}

function useExamProgressIndex() {
  return useSelector((store: RootStateType) => store.exam.value.progressIndex);
}

function useQuestionsAmount() {
  return useSelector((store: RootStateType) => {
    return store.exam.value.exam ? store.exam.value.exam.questions.length : 0;
  });
}

function useTimeLeft() {
  return useSelector((store: RootStateType) => store.exam.value.timeLeft);
}

export { useExam, useExamProgressIndex, useQuestionsAmount, useTimeLeft };
