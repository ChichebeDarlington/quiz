import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    answerCheck,
  } = useGlobalContext();
  // const { question } = questions[0];
  // console.log(questions[index]);

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const correctAnswer = questions[index]?.correct_answer;
  let inCorrectAnswer = questions[index]?.incorrect_answers;
  const question = questions[index]?.question;
  const answers = [...inCorrectAnswer];

  if (correctAnswer) {
    // answers.push(...inCorrectAnswer);
    const random = Math.floor(Math.random() * 4);
    if (random === 3) {
      answers.push(correctAnswer);
    } else {
      answers.push(answers[random]);
      answers[random] = correctAnswer;
    }
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => answerCheck(correctAnswer === answer)}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          Next
        </button>
      </section>
    </main>
  );
}

export default App;
