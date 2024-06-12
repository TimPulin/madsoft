type OptionType = {
  text: string;
  isCorrect: boolean;
};

type QuestionType = {
  multiple: boolean;
  title: string;
  options: OptionType[];
};

type ExamType = {
  name: string;
  timer: boolean;
  examMaxDuration: number;
  questions: QuestionType[];
};

export type { ExamType, QuestionType, OptionType };
