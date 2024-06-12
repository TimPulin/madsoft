import styles from './progress.module.scss';

export default function ProgressBar() {
  return (
    <div className={styles.progress}>
      <div className={`${styles.item} ${styles.itemUnlock}`}></div>
      <div className={`${styles.item} ${styles.itemUnlock}`}></div>
      <div className={`${styles.item} ${styles.itemUnlock}`}></div>
      <div className={`${styles.item} ${styles.itemUnlock}`}></div>
      <div className={`${styles.item} ${styles.itemUnlock}`}></div>
    </div>
  );
}
