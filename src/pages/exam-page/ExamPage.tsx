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

import { getExam } from '../../connections/server-connection';
import { setProgressInLocalStorage } from '../../connections/local-storage-connection';

import ProgressBar from '../../components/progress-bar/ProgressBar';
import Question from '../../components/question/Question';
import Timer from '../../components/timer/Timer';

import mainStyles from '../../styles/modules/main.module.scss';
import pageStyles from './exam-page.module.scss';

export default function ExamPage() {
  const dispatch = useDispatch();
  const exam = useExam();
  const questionAmount = useQuestionsAmount();
  const examProgressIndex = useExamProgressIndex();

  const [isTimeOver, setIsTimeOver] = useState(false);

  const onSubmitAnswer = (value: boolean[]) => {
    dispatch(updateAnswerList(value));
    if (examProgressIndex < questionAmount - 1) {
      dispatch(updateProgress(examProgressIndex + 1));
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

  function handleCloseTab() {
    window.onbeforeunload = () => {
      const test = {
        progressIndex: examProgressIndex,
      };
      return 'Вы уверены, что хотите прервать тестирование?';
    };
  }

  useEffect(() => {
    if (exam) {
      handleCloseTab();
      startExam();
    }
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
          <ProgressBar questionAmount={questionAmount} currentIndex={examProgressIndex} />
          {exam.questions.length > 0 && (
            <Question question={exam.questions[examProgressIndex]} onSubmit={onSubmitAnswer} />
          )}
        </>
      )}
    </main>
  );
}
