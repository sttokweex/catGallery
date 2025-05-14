import { useEffect, useState } from 'react';
import CatCard from '../cat-card/CatCard';
import './CatGallery.scss';

interface CatImage {
  id: string;
  url: string;
}

const TIMER_SECONDS = 15;

interface CatGalleryProps {
  autoUpdate: boolean;
}

export default function CatGallery({ autoUpdate }: CatGalleryProps) {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [timers, setTimers] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=12')
      .then(res => res.json())
      .then(data => {
        setCats(data);
        setTimers(Array(data.length).fill(TIMER_SECONDS));
      });
  }, []);

  const refreshCat = (idx: number) => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=1')
      .then(res => res.json())
      .then(data => {
        setCats((prev) => {
          const updated = [...prev];
          updated[idx] = data[0];
          return updated;
        });
      });
  };

  const resetTimer = (idx: number) => {
    setTimers((prev) => {
      const updated = [...prev];
      updated[idx] = TIMER_SECONDS;
      return updated;
    });
  };

  return (
    <div className="cat-gallery">
      {cats.map((cat, idx) => (
        <CatCard
          key={cat.id}
          imageUrl={cat.url}
          onRefresh={() => refreshCat(idx)}
          timer={timers[idx]}
          resetTimer={() => resetTimer(idx)}
          autoUpdate={autoUpdate}
        />
      ))}
    </div>
  );
}
