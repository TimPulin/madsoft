import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setExam,
  updateAnswerList,
  updateProgress,
  updateTimeLeft,
} from '../../store/slices/exam-slice';
import {
  useExam,
  useExamProgressIndex,
  useQuestionsAmount,
  useTimeLeft,
} from '../../store/selectors';

import { getExam } from '../../connections/server-connection';
import {
  deleteExamSessionFromLocalStorage,
  getExamSessionFromLocalStorage,
  setExamSessionInLocalStorage,
} from '../../connections/local-storage-connection';

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
  const timeLeftState = useTimeLeft();

  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isTimerStop, setIsTimerStop] = useState(true);

  const timeLeftRef = useRef(0);
  const examProgressIndexRef = useRef(0);
  const isExamFinishedRef = useRef(0);

  const onSubmitAnswer = (value: boolean[]) => {
    dispatch(updateAnswerList(value));
    if (examProgressIndex < questionAmount - 1) {
      dispatch(updateProgress(examProgressIndex + 1));
    } else {
      setIsTimerStop(true);
      stopExam();
    }
  };

  function startExam() {
    setIsTimerStop(false);
    isExamFinishedRef.current = 0;
  }

  function stopExam() {
    isExamFinishedRef.current = 1;
    if (exam) deleteExamSessionFromLocalStorage(String(exam.id));
    // TODO
  }

  const updateTimeLeftLocal = (value: number) => {
    timeLeftRef.current = value;
  };

  async function fetchExam() {
    try {
      const exam = await getExam();
      const prevExamSession = getExamSessionFromLocalStorage(String(exam.id));
      if (prevExamSession) {
        dispatch(updateTimeLeft(prevExamSession.timeLeft));
        dispatch(updateProgress(prevExamSession.progressIndex));
      }
      dispatch(setExam(exam));
    } catch (error) {
      // TODO
      console.log(error);
    }
  }

  function handleCloseTab() {
    if (isExamFinishedRef.current === 0) {
      const obj = {
        progressIndex: examProgressIndexRef.current,
        timeLeft: timeLeftRef.current,
      };
      if (exam) setExamSessionInLocalStorage(String(exam.id), JSON.stringify(obj));
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (isTimeOver) stopExam();
  }, [isTimeOver]);

  useEffect(() => {
    examProgressIndexRef.current = examProgressIndex;
  }, [examProgressIndex]);

  useEffect(() => {
    if (exam) {
      window.onbeforeunload = handleCloseTab;
      startExam();
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [exam]);

  useEffect(() => {
    fetchExam();
  }, []);

  return (
    <main className={mainStyles.main}>
      <div className={pageStyles.wrapTitle}>
        <h1>Тестирование</h1>
        {exam?.timer && (
          <Timer
            duration={timeLeftState ? timeLeftState : exam.examMaxDuration}
            updateTimeLeftExternal={updateTimeLeftLocal}
            setIsTimeOver={setIsTimeOver}
            isTimerStop={isTimerStop}
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
