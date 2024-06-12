enum QuestionMode {
  Radio,
  Checkbox,
}

type OptionType = {
  text: string;
  isCorrect: boolean;
};

type QuestionType = {
  questionMode: QuestionMode;
  title: string;
  options: OptionType[];
};

type ExamType = {
  name: string;
  timer: boolean;
  examMaxDuration: number;
  questions: QuestionType[];
};

export { QuestionMode };
export type { ExamType, QuestionType, OptionType };
