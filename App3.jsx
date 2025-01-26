import React, { useState } from "react";
import styles from "./App3.module.css";

const App3 = () => {
    
  const quizData = [
    {
      id: 1,
      name: "Väistämisvelvollisuus",
      image: "/yield.png",
      options: ["Stop-merkki", "Väistämisvelvollisuus", "Kärkikolmio"],
      correct: "Väistämisvelvollisuus",
    },
    {
      id: 2,
      name: "Nopeusrajoitus", 
      image: "/speed50.png",
      options: ["Nopeusrajoitus 30", "Nopeusrajoitus 50", "Nopeusrajoitus 70"],
      correct: "Nopeusrajoitus 50",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  

  

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = quizData[currentQuestionIndex];
    setSelectedAnswer(selectedOption); // Tallenna valittu vastaus
    setShowCorrectAnswer(true); // Näytä oikea vastaus
    if (selectedOption === currentQuestion.correct){
        setScore((prevScore) => prevScore + 1);
    }


    // Viivästetty siirtyminen seuraavaan kysymykseen (esim. 2 sekunnin kuluttua)
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      if (currentQuestionIndex + 1 < quizData.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    
    } else {
    setShowResult(true);
  }},2000);
  };
  if (showResult){
    return(
    <div className={styles.body}>
        <h2>Visa päättyi!</h2>
        <p>Pisteesi: {score} / {quizData.length}</p>
      </div>
    );
  }
  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className={styles.body}>
      <h1>Tervetuloa autosimulaatioon</h1>
      <div>
        <img
          src={currentQuestion.image}
          alt={currentQuestion.name}
          className="traffic-sign"
          style={{ maxWidth: "200px", marginBottom: "20px" }}
        />
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            // Määritetään nappien väri
            let buttonStyle = {};
            if (showCorrectAnswer) {
              if (option === currentQuestion.correct) {
                buttonStyle = { backgroundColor: "green", color: "white" };
              } else if (option === selectedAnswer) {
                buttonStyle = { backgroundColor: "red", color: "white" };
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={showCorrectAnswer} // Estetään lisäklikkaukset vastauksen jälkeen
                style={{
                  ...buttonStyle,
                  margin: "5px",
                  padding: "10px",
                  cursor: showCorrectAnswer ? "not-allowed" : "pointer",
                }}
              >
                {option}
              </button>
              
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App3;
