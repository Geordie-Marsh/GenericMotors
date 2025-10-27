"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";


interface AnswerProps {
  text: string;
  correct: boolean;
  onClick: (text: string, correct: boolean) => void;
}

export function Answer({ text, correct, onClick }: AnswerProps) {
  return (
    <button
      className="py-2 rounded bg-gray-200 hover:bg-gray-300 mb-2 w-full"
      onClick={() => onClick(text, correct)}
      data-correct={correct ? "true" : "false"}
    >
      {text}
    </button>
  );
}


const questions = [
  {
    question: "What’s the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra"],
    correct: "Canberra",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter"],
    correct: "Mars",
  },
];

export default function Trivia() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const [activeAnswers, setActiveAnswers] = useState<
    { text: string; correct: boolean; key: string }[]
  >([]);

  const answersContainer = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const current = questions[currentIndex];

  useEffect(() => {
    // Create new answer components for this question
    const newAnswers = current.answers.map((text) => ({
      text,
      correct: text === current.correct,
      key: `${currentIndex}-${text}`,
    }));
    setActiveAnswers(newAnswers);

    // Animate them in
    gsap.from(answersContainer.current?.children, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Hide next button
    gsap.set(nextButtonRef.current, { opacity: 0 });
    setSelected(null);
  }, [currentIndex]);

  function handleAnswer(text: string, correct: boolean) {
    if (selected) return;
    setSelected(text);

    if (correct) setScore((s) => s + 1);

    // Animate answers out slightly
    gsap.to(answersContainer.current?.children, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    // Highlight correct answer
    const correctBtn = answersContainer.current?.querySelector(
      '[data-correct="true"]'
    );
    gsap.fromTo(
      correctBtn,
      { scale: 1, backgroundColor: "#86efac" },
      { scale: 1.15, backgroundColor: "#22c55e", duration: 0.4, yoyo: true, repeat: 1 }
    );

    gsap.to(nextButtonRef.current, { opacity: 1, duration: 0.4, delay: 0.4 });
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
    else alert(`All done! Score: ${score}/${questions.length}`);
  }

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">{current.question}</h2>

      <div ref={answersContainer} className="flex flex-col gap-2 mb-4">
        {activeAnswers.map((a) => (
          <Answer
            key={a.key}
            text={a.text}
            correct={a.correct}
            onClick={handleAnswer}
          />
        ))}
      </div>

      {selected && (
        <button
          ref={nextButtonRef}
          onClick={nextQuestion}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded opacity-0"
        >
          Next question
        </button>
      )}
    </div>
  );
}