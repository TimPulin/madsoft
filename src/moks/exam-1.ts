import { ExamType } from '../types/exam-type';

const exam_1: ExamType = {
  name: 'Экзамен-1',
  timer: false,
  examMaxDuration: 0,
  questions: [
    {
      title: 'Вопрос-1',
      multiple: false,
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
      multiple: false,
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
      multiple: false,
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
