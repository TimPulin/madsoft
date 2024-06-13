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

  const windowBeforeUnloadRef = useRef(false);

  const onSubmitAnswer = (value: boolean[]) => {
    dispatch(updateAnswerList(value));
    if (examProgressIndex < questionAmount - 1) {
      dispatch(updateProgress(examProgressIndex + 1));
    } else {
      setIsTimerStop(true);
    }
  };

  function startExam() {
    setIsTimerStop(false);
  }

  function stopExam() {
    // if (exam) deleteExamSessionFromLocalStorage(String(exam.id));
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
        dispatch(setExam({ ...exam, ...JSON.parse(prevExamSession) }));
      } else {
        dispatch(setExam(exam));
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
  }

  useEffect(() => {
    stopExam();
  }, [isTimeOver]);

  useEffect(() => {
    fetchExam();
  }, []);

  function handleCloseTab() {
    const obj = {
      progressIndex: examProgressIndex,
      timeLeft: timeLeftRef.current,
    };
    console.log(obj);

    if (exam) setExamSessionInLocalStorage(String(exam.id), JSON.stringify(obj));
  }

  useEffect(() => {
    if (exam) {
      window.onbeforeunload = () => {
        windowBeforeUnloadRef.current = true;
        handleCloseTab();
        return 'Вы уверены, что хотите прервать тестирование?';
      };
      startExam();
    }
  }, [exam]);

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
