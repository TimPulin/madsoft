import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setEndExamDate,
  setExam,
  setStartExamDate,
  updateAnswerList,
  updateProgress,
} from '../../store/slices/exam-slice';
import { useExam, useExamProgressIndex, useQuestionsAmount } from '../../store/selectors';

import { getExam } from '../../server-connect/connections';

import ProgressBar from '../../components/progress-bar/ProgressBar';
import Question from '../../components/question/Question';
import Timer from '../../components/timer/Timer';

import mainStyles from '../../styles/modules/main.module.scss';
import pageStyles from './exam-page.module.scss';

export default function ExamPage() {
  const dispatch = useDispatch();
  const exam = useExam();
  const questionAmount = useQuestionsAmount();
  const examProgress = useExamProgressIndex();

  const [isTimeOver, setIsTimeOver] = useState(false);

  const onSubmitAnswer = (value: boolean[]) => {
    dispatch(updateAnswerList(value));
    if (examProgress < questionAmount - 1) {
      dispatch(updateProgress(examProgress + 1));
    } else {
      dispatch(setEndExamDate(new Date().getTime()));
    }
  };

  function startExam() {
    dispatch(setStartExamDate(new Date().getTime()));
  }

  async function getExamLocal() {
    const exam = await getExam();
    dispatch(setExam(exam));
  }

  useEffect(() => {
    getExamLocal();
  }, []);

  useEffect(() => {
    if (exam) startExam();
  }, [exam]);

  return (
    <main className={mainStyles.main}>
      <div className={pageStyles.wrapTitle}>
        <h1>Тестирование</h1>
        {exam?.timer && (
          <Timer
            duration={exam.examMaxDuration}
            isTimeOver={isTimeOver}
            setIsTimeOver={setIsTimeOver}
          />
        )}
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
