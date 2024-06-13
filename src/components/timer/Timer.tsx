import { useEffect, useRef, useState } from 'react';
import styles from './timer.module.scss';

type TimerPropsType = {
  duration: number;
  isTimeOver: boolean;
  setIsTimeOver: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerStop: boolean;
  setIsTimerStop: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { duration, isTimeOver, setIsTimeOver } = props;
  const [time, setTime] = useState<number>(0);
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

  function setNewTime(prevTime: number) {
    const newTime = prevTime - ONE_SECOND;
    return newTime <= 0 ? 0 : newTime;
  }

  function stopTimer() {
    clearInterval(timerRef.current);
  }

  function runTimer() {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTime((prevTime) => setNewTime(prevTime));
    }, ONE_SECOND);
  }

  useEffect(() => {
    if (isTimeOver) {
      stopTimer();
    } else {
      setTime(duration);
      runTimer();
    }
    return () => {
      stopTimer();
    };
  }, [duration, isTimeOver]);

  useEffect(() => {
    formatTime(time);
    if (time === 0) {
      setIsTimeOver(true);
    } else {
      setIsTimeOver(false);
    }
  }, [time]);

  return (
    <div className={styles.timer}>
      {formatedTime.minutes} : {formatedTime.seconds}
    </div>
  );
}
