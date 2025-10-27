"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const current = questions[currentIndex];

  useEffect(() => {
    // Clear previous buttons
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Create new answer buttons dynamically
    current.answers.forEach((answer) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.className = "py-2 rounded bg-gray-200 hover:bg-gray-300 mb-2 w-full";

      // Mark correct answer
      if (answer === current.correct) {
        btn.dataset.correct = "true";
      }

      // Handle click
      btn.addEventListener("click", () => handleAnswer(btn));

      containerRef.current?.appendChild(btn);
    });

    // Animate in the buttons
    gsap.from(containerRef.current?.children, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Hide next button initially
    gsap.set(nextButtonRef.current, { opacity: 0 });
    setSelected(null);
  }, [currentIndex]);

  function handleAnswer(button: HTMLButtonElement) {
    if (selected) return; // prevent double-click
    setSelected(button.textContent);

    // check correctness
    if (button.dataset.correct === "true") {
      setScore((s) => s + 1);
    }

    // Animate all buttons out slightly
    const buttons = containerRef.current?.children;
    gsap.to(buttons, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    // Highlight correct button
    const correctBtn = containerRef.current?.querySelector('[data-correct="true"]');
    gsap.fromTo(
      correctBtn,
      { scale: 1, backgroundColor: "#86efac" },
      { scale: 1.15, backgroundColor: "#22c55e", duration: 0.4, yoyo: true, repeat: 1, ease: "power2.inOut" }
    );

    // Fade in next button
    gsap.to(nextButtonRef.current, { opacity: 1, duration: 0.4, delay: 0.4 });
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`All done! You scored ${score}/${questions.length}`);
    }
  }

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">{current.question}</h2>

      <div ref={containerRef} className="flex flex-col gap-2 mb-4"></div>

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