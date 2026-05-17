import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ChoiceItem {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface InteractiveQuizProps {
  question: string;
  choices: ChoiceItem[];
}

export function InteractiveQuiz({ question, choices }: InteractiveQuizProps) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  const selectedChoice = useMemo(
    () => choices.find((choice) => choice.id === selectedChoiceId) ?? null,
    [choices, selectedChoiceId],
  );

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setAttemptCount((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setSelectedChoiceId(null);
    setAttemptCount(0);
  };

  return (
    <Card className="border-emerald-500/30 bg-background/80">
      <CardHeader>
        <CardTitle className="text-xl">Etkileşimli Mini Soru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{question}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {choices.map((choice) => {
            const selected = choice.id === selectedChoiceId;
            return (
              <Button
                key={choice.id}
                type="button"
                variant={selected ? "default" : "outline"}
                className="h-auto min-h-12 justify-start whitespace-normal text-left"
                onClick={() => handleSelectChoice(choice.id)}
              >
                {choice.text}
              </Button>
            );
          })}
        </div>

        {selectedChoice ? (
          <p className={selectedChoice.isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
            {selectedChoice.explanation}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Bir seçenek seçerek cevabı gör.</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Deneme sayısı: {attemptCount}</span>
        <Button type="button" variant="ghost" onClick={resetQuiz}>
          Sıfırla
        </Button>
      </CardFooter>
    </Card>
  );
}
