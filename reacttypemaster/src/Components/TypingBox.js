import React, { useRef, useEffect, createRef, useState, useMemo } from "react";
import { useTestMode } from "../Context/TestMode";
import Stats from "./Stats";
import UpperMenu from "./UpperMenu";

var randomWords = require("random-words");

function TypingBox({}) {
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver, setTestOver] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);

  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(100);
  });

  const words = useMemo(() => {
    return wordsArray;
  }, [wordsArray]);

  const wordSpanRef = useMemo(() => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [words]);

  const { testTime } = useTestMode();

  const inputTextRef = useRef(null);

  // const wordSpanRef = Array(words.length)
  //   .fill(0)
  //   .map((i) => createRef(null));
  // // console.log(inputTextRef);



//graph data requirements   > correct Chars

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);

    function timer() {
      setCountDown((prevCountDown) => {

        setCorrectChars((correctChars)=>{
          setGraphData((data)=>{
            return [...data, [testTime-prevCountDown, Math.round((correctChars/5)/((testTime-prevCountDown+1)/60))]]
          })
          return correctChars;
        })


        if (prevCountDown === 1) {
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true);
        } else {
          return prevCountDown - 1;
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    let allChildrenSpans =
      wordSpanRef[currWordIndex].current.querySelectorAll("span");

    console.log("children spans", allChildrenSpans);

    console.log("Key pressed:" + e.keyCode);
    // console.log(wordSpanRef[1].current)

    //Space code

    // console.log(e);

    if (e.keyCode === 32) {

      const correctChar =
        wordSpanRef[currWordIndex].current.querySelectorAll(".correct");

        const incorrectChar =
        wordSpanRef[currWordIndex].current.querySelectorAll(".incorrect");

        setMissedChars(missedChars + (allChildrenSpans.length - (incorrectChar.length + correctChar.length)))

      if (correctChar.length === allChildrenSpans.length) {
        setCorrectWords(correctWords + 1);
      }

      //remove cursor from word when using space
      if (allChildrenSpans.length <= currCharIndex) {
        allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[
          currCharIndex - 1
        ].className.replace("right", " ");
      } else {
        allChildrenSpans[currCharIndex].className = allChildrenSpans[
          currCharIndex
        ].className.replace("current", " ");
      }

      //add cursor to next word first char

      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "char current";

      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      return;
    }

    //Backspace code

    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allChildrenSpans.length) {
          if (allChildrenSpans[currCharIndex - 1].className.includes("extra")) {
            allChildrenSpans[currCharIndex - 1].remove();
            allChildrenSpans[currCharIndex - 2].className += " right";
          } else {
            allChildrenSpans[currCharIndex - 1].className = "char current";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allChildrenSpans[currCharIndex].className = "char";
        allChildrenSpans[currCharIndex - 1].className = "char current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allChildrenSpans.length) {
      let newSpan = document.createElement("span"); //returns new Span
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect right extra";
      allChildrenSpans[currCharIndex - 1].className = allChildrenSpans[
        currCharIndex - 1
      ].className.replace("right", " ");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars+1)
      return;
    }

    //Incorrect and Correct code

    if (e.key === allChildrenSpans[currCharIndex].innerText) {
      console.log("Correct");
      allChildrenSpans[currCharIndex].className = "char correct";
      setCorrectChars(correctChars + 1);
    } else {
      console.log("Incorrect");
      allChildrenSpans[currCharIndex].className = "char incorrect";
      setIncorrectChars(incorrectChars + 1)
    }

    if (currCharIndex + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIndex].className += " right";
    } else {
      allChildrenSpans[currCharIndex + 1].className = "char current";
    }
    setCurrCharIndex(currCharIndex + 1);
  };

  const resetTest = () => {
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestOver(false);
    clearInterval(intervalId);
    setCountDown(testTime);
    let random = randomWords(100);
    setWordsArray(random);
    resetWordSpanRefClassNames();
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  const resetWordSpanRefClassNames = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => (j.className = "char"));
    });

    wordSpanRef[0].current.childNodes[0].className = "char current";
  };
  const focusInput = () => {
    inputTextRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  React.useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  return (
    <>
      <UpperMenu countDown={countDown} />
      {testOver ? (
        <Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} graphData={graphData} correctChars={correctChars} incorrectChars={incorrectChars} extraChars={extraChars} missedChars={missedChars}></Stats>
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {/* Spans of words and chars */}

            {words.map((word, index) => {
              return (
                <span className="word" ref={wordSpanRef[index]} key={index}>
                  {word.split("").map((char, idx) => (
                    <span className="char" key={`char${idx}`}>
                      {char}
                    </span>
                  ))}
                </span>
              );
            })}
          </div>
        </div>
      )}


            {/* wpm vs time  */}



      <input
        type="text"
        className="hidden-input"
        ref={inputTextRef}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </>
  );
}

export default TypingBox;
