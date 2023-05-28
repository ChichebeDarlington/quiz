import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questionsFetch = async (url) => {
    try {
      const response = await axios.get(url);
      if (response) {
        const data = response.data.results;
        console.log(data);
        if (data.length > 0) {
          setQuestions(data);
          setError(false);
          setLoading(false);
          setWaiting(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setIndex((next) => {
      const index = next + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const answerCheck = (answer) => {
    if (answer) {
      setCorrect((correct) => correct + 1);
    }

    nextQuestion();
  };

  const changeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setQuiz({ ...quiz, [name]: value });
    console.log(name, value);
  };

  const submitHandle = (event) => {
    event.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    questionsFetch(url);
  };

  // useEffect(() => {
  //   questionsFetch(tempUrl);
  // }, []);
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        quiz,
        isModalOpen,
        nextQuestion,
        closeModal,
        answerCheck,
        changeHandle,
        submitHandle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
