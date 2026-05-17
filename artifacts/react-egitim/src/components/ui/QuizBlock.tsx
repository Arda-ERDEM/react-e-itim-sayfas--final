import { useState } from "react";
import { Trophy, CheckCircle2, XCircle, Star, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuiz } from "@/hooks/useQuiz";
import { QUIZ_DATA } from "@/data/quizData";
import { Button } from "@/components/ui/button";

interface QuizBlockProps {
  lessonKey: string;
  title?: string;
}

type QuizState = 'idle' | 'active' | 'complete';

export function QuizBlock({ lessonKey, title = "Bilgini Test Et!" }: QuizBlockProps) {
  const { getScore, saveScore } = useQuiz();
  
  const questions = QUIZ_DATA[lessonKey] || [];
  
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [scoreCount, setScoreCount] = useState(0);
  
  const previousScore = getScore(lessonKey);
  const question = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (!questions.length) return null;

  const handleStart = () => {
    setQuizState('active');
    setCurrentQuestionIndex(0);
    setScoreCount(0);
    setSelectedOption(null);
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    setSelectedOption(index);
    if (index === question.correctIndex) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score percentage
      const finalScorePercent = Math.round(((scoreCount + (selectedOption === question.correctIndex ? 1 : 0)) / questions.length) * 100);
      saveScore(lessonKey, finalScorePercent);
      setQuizState('complete');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  // Status Badge for Idle state
  let badgeClass = "";
  let badgeText = "";
  
  if (previousScore !== null) {
    if (previousScore >= 90) {
      badgeClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      badgeText = "Mükemmel!";
    } else if (previousScore >= 70) {
      badgeClass = "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-500";
      badgeText = "Geçti!";
    } else {
      badgeClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      badgeText = "Tekrar Çalış";
    }
  }

  return (
    <div className="my-12 relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500">
      <div className="bg-card rounded-[14px] p-6 sm:p-8 h-full">
        
        {/* IDLE STATE */}
        {quizState === 'idle' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6">
              Bu derste öğrendiklerini {questions.length} soruluk kısa bir quiz ile pekiştir.
            </p>
            
            {previousScore !== null && (
              <div className="mb-6 flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Önceki Skorun: %{previousScore}</span>
                <span className={"px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 " + badgeClass}>
                  {previousScore >= 90 && <Star className="w-4 h-4 fill-current" />}
                  {badgeText}
                </span>
              </div>
            )}
            
            <Button onClick={handleStart} size="lg" className="w-full sm:w-auto font-bold bg-violet-600 hover:bg-violet-700 text-white" data-testid="button-start-quiz">
              Quize Başla
            </Button>
          </div>
        )}

        {/* ACTIVE STATE */}
        {quizState === 'active' && (
          <div>
            <div className="flex justify-between items-center mb-6 text-sm font-medium text-muted-foreground">
              <span>Soru {currentQuestionIndex + 1} / {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={"w-2 h-2 rounded-full " + (idx <= currentQuestionIndex ? "bg-violet-500" : "bg-muted")}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xl font-bold mb-6">{question.question}</h4>
                
                <div className="flex flex-col gap-3">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === question.correctIndex;
                    const showCorrectness = selectedOption !== null;
                    
                    let buttonClass = "justify-start text-left h-auto py-4 px-6 ";
                    if (!showCorrectness) {
                      buttonClass += "hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/10";
                    } else {
                      if (isCorrect) {
                        buttonClass += "bg-green-100 border-green-500 text-green-900 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "bg-red-100 border-red-500 text-red-900 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500";
                      } else {
                        buttonClass += "opacity-50";
                      }
                    }

                    return (
                      <Button
                        key={idx}
                        variant="outline"
                        className={buttonClass}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={showCorrectness}
                        data-testid={"button-option-" + idx}
                      >
                        <span className="flex-1 whitespace-normal">{option}</span>
                        {showCorrectness && isCorrect && <CheckCircle2 className="w-5 h-5 ml-2 text-green-600 dark:text-green-400 shrink-0" />}
                        {showCorrectness && isSelected && !isCorrect && <XCircle className="w-5 h-5 ml-2 text-red-600 dark:text-red-400 shrink-0" />}
                      </Button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={"mt-6 p-4 rounded-lg " + (selectedOption === question.correctIndex ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30" : "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30")}
                  >
                    <p className="text-sm font-medium mb-4">
                      {selectedOption === question.correctIndex ? "🎉 Doğru Yanıt!" : "❌ Yanlış Yanıt."} 
                      <span className="block mt-1 font-normal opacity-90">{question.explanation}</span>
                    </p>
                    <Button onClick={handleNext} className="w-full" data-testid="button-next-question">
                      {isLastQuestion ? "Sonuçları Gör" : "Sonraki Soru"} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* COMPLETE STATE */}
        {quizState === 'complete' && (() => {
          // Note: scoreCount is the number of correct answers before the last question was answered.
          // Because handleNext sets complete state, we need to read from the getScore() hook to get the actual best score.
          // However, for the *current* attempt, we can calculate it again just for display.
          const finalScoreCount = scoreCount + (selectedOption === question.correctIndex ? 1 : 0);
          const percent = Math.round((finalScoreCount / questions.length) * 100);
          const passed = percent >= 70;

          return (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={"w-24 h-24 rounded-full flex items-center justify-center mb-6 " + (passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30")}>
                {passed ? <Trophy className="w-12 h-12 text-green-600 dark:text-green-400" /> : <RotateCcw className="w-12 h-12 text-red-600 dark:text-red-400" />}
              </div>
              
              <h3 className={"text-3xl font-bold mb-2 " + (passed && percent >= 90 ? "bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500" : "")}>
                {percent >= 90 ? "Mükemmel!" : passed ? "Tebrikler!" : "Daha İyi Olabilir."}
              </h3>
              
              <p className="text-xl mb-8">
                Skorun: <span className="font-bold text-2xl">%{percent}</span> ({questions.length} soruda {finalScoreCount} doğru)
              </p>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={handleStart}>
                  Tekrar Dene
                </Button>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
}