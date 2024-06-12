import styles from './progress.module.scss';

type ProgressBarPropsType = {
  questionAmount: number;
  currentIndex: number;
};

export default function ProgressBar(props: ProgressBarPropsType) {
  const { questionAmount, currentIndex } = props;
  const indexList = [...Array(questionAmount)].map((_, index) => index);
  return (
    <div className={styles.progress}>
      {indexList.map((item) => (
        <div key={item} className={`${styles.item}  ${currentIndex === item ? styles.itemCurrent : ''}`}></div>
      ))}
    </div>
  );
}
