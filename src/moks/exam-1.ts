import { ExamType, QuestionMode } from '../types/exam-type';

const exam_1: ExamType = {
  id: 1,
  name: 'Экзамен-1',
  timer: true,
  examMaxDuration: 60000,
  questions: [
    {
      title: 'Вопрос-1',
      questionMode: QuestionMode.Radio,
      options: [
        {
          text: 'вариант-1',
          isCorrect: false,
        },
        {
          text: 'вариант-2',
          isCorrect: true,
        },
        {
          text: 'вариант-3',
          isCorrect: false,
        },
      ],
    },
    {
      title: 'Вопрос-2',
      questionMode: QuestionMode.Checkbox,
      options: [
        {
          text: 'вариант-1',
          isCorrect: false,
        },
        {
          text: 'вариант-2',
          isCorrect: false,
        },
        {
          text: 'вариант-3',
          isCorrect: true,
        },
        {
          text: 'вариант-4',
          isCorrect: false,
        },
      ],
    },
    {
      title: 'Вопрос-3',
      questionMode: QuestionMode.Checkbox,
      options: [
        {
          text: 'вариант-1',
          isCorrect: true,
        },
        {
          text: 'вариант-2',
          isCorrect: false,
        },
        {
          text: 'вариант-3',
          isCorrect: false,
        },
      ],
    },
  ],
};

export { exam_1 };
