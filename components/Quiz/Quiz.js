// Quiz.js
'use client'
import { useState, useEffect } from 'react';
import './Quiz.css';
import Question from '../Question/Question';
import Timer from '../Timer/Timer';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(10); 
  const [timerKey, setTimerKey] = useState(0); 
  const [quizStarted, setQuizStarted] = useState(false);



  useEffect(() => {
    if (quizStarted) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch('/questions.json');
          const data = await response.json();
          setQuestions(data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };

      fetchQuestions();
    }
  }, [quizStarted]);




  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } 
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setRemainingTime(10);
    setTimerKey((prevKey) => prevKey + 1); // Reset Timer component
  };


  const handleTimeUp = () => {
    
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRemainingTime(10);
      setTimerKey((prevKey) => prevKey + 1); // Reset Timer component
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className='start'>
        <div className='heading'><h1>Quiz Game</h1></div>

        <h3>Instructions</h3>
        <div className='instruct'>
          <li>There will be 10 Questions.</li>
          <li>Each Question contains Four options.</li>
          <li>10 Seconds are alloted for each question.</li>
          <li>Click "Next" after choosing your option to proceed to next question.</li>
          </div>
        <button onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }



  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // Quiz is finished
    return (
      <div className='start'>
        
        <h1>Quiz completed! </h1>
        <div className='score-btn'>
        {score > 4 ? (
          <h2 style={{ color: 'green' }}>Your Score: {score}</h2>
          ) : (
         <h2 style={{ color: 'red' }}>Your Score: {score}</h2>
          )}
         </div>

      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='full'>
      <div className='heading'><h1>Quiz Game</h1></div>
      
     <div className='body'>

      <div className='questionNo'>

         <h4 className='currentQuestions'>Question : {currentQuestionIndex+1}</h4>
         <h4 className='totalQuestions'>Total Questions: 20</h4>  
      </div>
      
      <Timer key={timerKey}  initialTime={remainingTime} onTimeUp={handleTimeUp} />
      
      <div className='Question-body'>
      
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswer={handleAnswer}
      />
      </div>

      </div> 
    </div>
  );
};

export default Quiz;
