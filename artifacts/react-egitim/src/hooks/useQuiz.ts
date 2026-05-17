import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = 'reactlearn-quiz-scores';

export function useQuiz() {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setScores(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load scores from localStorage", e);
    }
  }, []);

  const getScore = useCallback((lessonKey: string): number | null => {
    return scores[lessonKey] !== undefined ? scores[lessonKey] : null;
  }, [scores]);

  const saveScore = useCallback((lessonKey: string, score: number) => {
    setScores(prev => {
      const currentScore = prev[lessonKey] || 0;
      const newScores = {
        ...prev,
        [lessonKey]: Math.max(currentScore, score)
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
      } catch (e) {
        console.error("Failed to save score to localStorage", e);
      }
      return newScores;
    });
  }, []);

  const getAllScores = useCallback(() => {
    return scores;
  }, [scores]);

  const hasPassedAll = useCallback(() => {
    const requiredKeys = [
      'giris', 'kurulum', 'jsx', 'componentler', 'state', 
      'effect', 'events', 'listeler', 'formlar', 'hooks', 'router'
    ];
    return requiredKeys.every(key => (scores[key] || 0) >= 70);
  }, [scores]);

  return {
    getScore,
    saveScore,
    getAllScores,
    hasPassedAll
  };
}