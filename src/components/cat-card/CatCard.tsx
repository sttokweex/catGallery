import { useEffect, useState, useRef } from 'react';
import styles from './CatCard.module.css';

interface CatCardProps {
  imageUrl: string;
  onRefresh: () => void;
  timer: number;
  resetTimer: () => void;
  autoUpdate: boolean;
}

export default function CatCard({ imageUrl, onRefresh, timer, resetTimer, autoUpdate }: CatCardProps) {
  const [seconds, setSeconds] = useState(timer);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSeconds(timer);
  }, [timer, imageUrl]);

  useEffect(() => {
    if (autoUpdate) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoUpdate]);

  useEffect(() => {
    if (!autoUpdate) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSeconds(timer);
    }
  }, [autoUpdate, timer]);

  useEffect(() => {
    if (autoUpdate && seconds <= 0) {
      onRefresh();
      setSeconds(timer);
      resetTimer();
    }
  }, [seconds, autoUpdate, onRefresh, timer, resetTimer]);

  const handleClick = () => {
    if (!autoUpdate) {
      onRefresh();
      setSeconds(timer);
      resetTimer();
    }
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: autoUpdate ? 'default' : 'pointer' }}>
      <img className={styles.image} src={imageUrl} alt="Cat" />
      {autoUpdate && (
        <div className={styles.timer}>Обновление через: {seconds} сек</div>
      )}
      {!autoUpdate && (
        <div className={styles.timer}>Нажмите для обновления</div>
      )}
    </div>
  );
}
