import { useEffect, useRef, useState } from 'react';
import styles from './timer.module.scss';

type TimerPropsType = {
  duration: number;
  updateTimeLeftExternal: (value: number) => void;
  updateIsTimeOver: (value: number) => void;
  isTimerStop: boolean;
};

const ONE_HOUR = 3600000;
const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

const initialFormatedTime = {
  hours: '00',
  minutes: '00',
  seconds: '00',
};

export default function Timer(props: TimerPropsType) {
  const { duration, updateTimeLeftExternal, updateIsTimeOver, isTimerStop } = props;
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [formatedTime, setFormatedTime] = useState(initialFormatedTime);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  function formatTime(time: number) {
    const hours = Math.floor(time / ONE_HOUR);
    const minutes = Math.floor((time % ONE_HOUR) / ONE_MINUTE);
    const seconds = Math.floor((time % ONE_MINUTE) / ONE_SECOND);

    setFormatedTime({
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    });
  }

  function calcNewTime(prevTime: number) {
    const newTime = prevTime - ONE_SECOND;
    return newTime <= 0 ? 0 : newTime;
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  }

  function runTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = calcNewTime(prevTime);
        updateTimeLeftExternal(newTime);
        if (!newTime) updateIsTimeOver(1);
        return newTime;
      });
    }, ONE_SECOND);
  }

  useEffect(() => {
    if (isTimerStop) {
      stopTimer();
    } else {
      setTimeLeft(duration);
      runTimer();
    }

    return () => {
      stopTimer();
    };
  }, [duration, isTimerStop]);

  useEffect(() => {
    formatTime(timeLeft);
    if (timeLeft === 0) {
      stopTimer();
    } else {
      runTimer();
    }
  }, [timeLeft]);

  return (
    <div className={styles.timer}>
      {formatedTime.minutes} : {formatedTime.seconds}
    </div>
  );
}
