// 'use client'

import { motion } from 'framer-motion'
import classNames from 'classnames';

export default function QuizQuestion({ question, handleAnswer, difficulty, answerGiven }) {

  
  function getColorCode(tailwindClass) {
    const colorMap = {
      'bg-green-500': '#22c55e',
      'bg-yellow-500': '#eab308',
      'bg-red-500': '#ef4444',
      'bg-blue-500': '#3b82f6',
      'bg-gray-500': '#6b7280',
    };
    return colorMap[tailwindClass.split(' ')[0]] || '#000';
  }
     

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{question.Question}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.Answer.map((option, index) => (
          <motion.button
            key={index}
            className={classNames(
              'p-4 rounded-lg text-white font-semibold text-lg',
              {
                [forCorrect(difficulty)]: answerGiven && option.trim() === question.CorrectAnswer.trim(),
                [getDifficultyColor(difficulty)]: !answerGiven || option.trim() !== question.CorrectAnswer.trim(),
              }
            )}
            // style={{
            //   backgroundColor: answerGiven
            //     ? option === question.CorrectAnswer
            //       ? getColorCode(forCorrect(difficulty))
            //       : getColorCode('gray')
            //     : getColorCode(getDifficultyColor(difficulty)),
            // }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleAnswer(option, question.CorrectAnswer)
            }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'bg-gradient-to-r from-lime-400 to-green-500 hover:from-green-500 hover:to-lime-600';
    case 'medium':
      return 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-600';
    case 'hard':
      return 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-rose-700';
    default:
      return 'bg-gradient-to-r from-sky-400 to-blue-500 hover:from-blue-500 hover:to-sky-600';
  }
}


function forCorrect(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'bg-blue-500 hover:bg-blue-600'
    case 'medium':
      return 'bg-green-500 hover:bg-green-600'
    case 'hard':
      return 'bg-green-500 hover:bg-green-600'
    default:
      return ''
  }
}
