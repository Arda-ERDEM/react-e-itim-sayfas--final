import { useState, useEffect } from 'react';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('reacthub-progress');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const markCompleted = (path: string) => {
    setCompletedLessons(prev => {
      if (prev.includes(path)) return prev;
      const next = [...prev, path];
      localStorage.setItem('reacthub-progress', JSON.stringify(next));
      return next;
    });
  };

  const isCompleted = (path: string) => completedLessons.includes(path);

  return { completedLessons, markCompleted, isCompleted };
}