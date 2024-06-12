import { useSelector } from 'react-redux';
import { RootStateType } from '.';

function useExam() {
  return useSelector((store: RootStateType) => store.exam.value.exam);
}

function useExamProgress() {
  return useSelector((store: RootStateType) => store.exam.value.progress);
}

function useQuestionsAmount() {
  return useSelector((store: RootStateType) => {
    return store.exam.value.exam ? store.exam.value.exam.questions.length : 0;
  });
}

export { useExam, useExamProgress, useQuestionsAmount };
