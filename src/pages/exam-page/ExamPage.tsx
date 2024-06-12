import ProgressBar from '../../components/progress-bar/ProgressBar';
import Question from '../../components/question/Question';
import Timer from '../../components/timer/Timer';
import mainStyles from '../../styles/modules/main.module.scss';
import pageStyles from './exam-page.module.scss';

export default function ExamPage() {
  return (
    <main className={mainStyles.main}>
      <div className={pageStyles.wrapTitle}>
        <h1>Тестирование</h1>
        <Timer />
      </div>
      <ProgressBar />
      <Question />
    </main>
  );
}
