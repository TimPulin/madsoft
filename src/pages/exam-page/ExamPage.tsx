import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setExam, updateAnswerList, updateProgress } from '../../store/slices/exam-slice';

import { getExam } from '../../server-connect/connections';

import ProgressBar from '../../components/progress-bar/ProgressBar';
import Question from '../../components/question/Question';
import Timer from '../../components/timer/Timer';

import mainStyles from '../../styles/modules/main.module.scss';
import pageStyles from './exam-page.module.scss';
import { useExam, useExamProgressIndex, useQuestionsAmount } from '../../store/selectors';

export default function ExamPage() {
  const dispatch = useDispatch();
  const exam = useExam();
  const questionAmount = useQuestionsAmount();
  const examProgress = useExamProgressIndex();

  const onSubmitAnswer = (value: boolean[]) => {
    dispatch(updateAnswerList(value));
    if (examProgress < questionAmount - 1) dispatch(updateProgress(examProgress + 1));
  };

  async function getExamLocal() {
    const exam = await getExam();
    dispatch(setExam(exam));
  }

  useEffect(() => {
    getExamLocal();
  }, []);

  return (
    <main className={mainStyles.main}>
      <div className={pageStyles.wrapTitle}>
        <h1>Тестирование</h1>
        {exam && <Timer />}
      </div>
      {exam && (
        <>
          <ProgressBar questionAmount={questionAmount} currentIndex={examProgress} />
          {exam.questions.length > 0 && (
            <Question question={exam.questions[examProgress]} onSubmit={onSubmitAnswer} />
          )}
        </>
      )}
    </main>
  );
}
