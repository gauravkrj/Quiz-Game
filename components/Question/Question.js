'use client'
import { useState } from 'react';
import './Question.css'
const Question = ({ question, options, correctAnswer, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === correctAnswer;
    onAnswer(isCorrect);
    setSelectedOption('');
  };

  return (
    <div>
      <h2 className='question'>{question}</h2>
      
      <form>
        {options.map((option) => (
          
          <div className='options' key={option}>
            <label>
              <input type="radio" value={option} checked={selectedOption === option} onChange={handleOptionChange}/>
              <div className='optionText'>{option}</div>
            </label>
          </div>

        ))}
      </form>

      <button type="button" onClick={handleSubmit}>
        Next
      </button>
    </div>
  );
};

export default Question;
