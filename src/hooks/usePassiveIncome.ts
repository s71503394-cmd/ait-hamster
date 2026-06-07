import { useEffect } from 'react';
import { useGameStore } from '@/services/gameStore';

export const usePassiveIncome = () => {
  const { addPassiveIncome } = useGameStore();

  useEffect(() => {
    const interval = setInterval(() => {
      addPassiveIncome();
    }, 1000);

    return () => clearInterval(interval);
  }, [addPassiveIncome]);
};