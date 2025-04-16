import React from 'react'

const QuestionListContainer = ({questionList}) => {
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-400 flex flex-col gap-2">
    <h2 className="text-xl font-bold mb-2">Generated Questions</h2>
    <ul>
      {questionList.map((item, index) => (
        <li key={index} className="mb-4 rounded-2xl border border-gray-200 p-2">
          <p className="text-gray-700"><span className="font-bold text-black">Q.{index + 1}. </span>{item.question}</p>
          <p className="text-blue-500"> <span className="font-bold text-black">Type: </span>{item.type}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default QuestionListContainer