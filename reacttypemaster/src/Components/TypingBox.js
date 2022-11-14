import React, { useRef, useEffect, createRef, useState } from "react";

function TypingBox({ words }) {
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(15)

  const inputTextRef = useRef(null);

  const wordSpanRef = Array(words.length)
    .fill(0)
    .map((i) => createRef(null));
  // console.log(inputTextRef);


const  startTimer = () => {

  const intervalId = setInterval(timer, 1000);

  function timer(){
    setCountDown((prevCount)=> {
      
      if(prevCount ===1)
      {
        clearInterval(intervalId);
        setCountDown(0)
      }
      else{
        return prevCount-1;
      }
      
      
      });
  }
}



  const handleKeyDown = (e) => {

      startTimer();

    let allChildrenSpans =
      wordSpanRef[currWordIndex].current.querySelectorAll("span");

    console.log("children spans", allChildrenSpans);

    console.log("Key pressed:" + e.keyCode);
    // console.log(wordSpanRef[1].current)

    //Space code

    // console.log(e);

    if (e.keyCode === 32) {

      //remove cursor from word when using space
        if(allChildrenSpans.length <= currCharIndex ){
          allChildrenSpans[currCharIndex-1].className = allChildrenSpans[currCharIndex-1].className.replace('right' , ' ')
        }
        else{
          allChildrenSpans[currCharIndex].className = allChildrenSpans[currCharIndex].className.replace('current', ' ')
        }


        //add cursor to next word first char

        wordSpanRef[currWordIndex+1].current.childNodes[0].className = 'char current'


      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);

      return;
    }

    //Backspace code


    if(e.keyCode === 8){

      if(currCharIndex !== 0){

        if(currCharIndex === allChildrenSpans.length)
        {
          
          if(allChildrenSpans[currCharIndex-1].className.includes('extra')){
            allChildrenSpans[currCharIndex-1].remove();
            allChildrenSpans[currCharIndex-2].className += ' right';
          }
          else
          {
            allChildrenSpans[currCharIndex-1].className = 'char current'
          }

          
          setCurrCharIndex(currCharIndex -1);
          return;
        }
        allChildrenSpans[currCharIndex].className = 'char';
        allChildrenSpans[currCharIndex-1].className = 'char current';
        setCurrCharIndex(currCharIndex -1)
      }
       

      
      

      return ;
    }

    if(currCharIndex === allChildrenSpans.length){
      let newSpan = document.createElement('span');   //returns new Span
      newSpan.innerText = e.key;
      newSpan.className = 'char incorrect right extra';
      allChildrenSpans[currCharIndex-1].className = allChildrenSpans[currCharIndex-1].className.replace('right', " ");

      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex+1);
      return;
    }

    //Incorrect and Correct code

    if (e.key === allChildrenSpans[currCharIndex].innerText) {
      console.log("Correct");
      allChildrenSpans[currCharIndex].className = "char correct";
    } else {
      console.log("Incorrect");
      allChildrenSpans[currCharIndex].className = "char incorrect";
    }

    if (currCharIndex + 1 === allChildrenSpans.length) {
      allChildrenSpans[currCharIndex].className += " right";
    } else {
      allChildrenSpans[currCharIndex + 1].className = "char current";
    }
    setCurrCharIndex(currCharIndex + 1);
  };

  const focusInput = () => {
    inputTextRef.current.focus();
  };

  React.useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "char current";
  }, []);

  return (
    <>
    <h1>{countDown}</h1>
      <div className="type-box" onClick={focusInput}>
        <div className="words">
          {/* Spans of words and chars */}

          {words.map((word, index) => {
            return (
              <span className="word" ref={wordSpanRef[index]} key={index}>
                {word.split("").map((char, idx) => (
                  <span className="char" key={`char${idx}`}>{char}</span>
                ))}
              </span>
            );
          })}
        </div>
      </div>

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
