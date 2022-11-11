import React from 'react'

function TypingBox({words}) {


  return (
    <>
        <div className='type-box'>
          <div className='words'>
            {/* Spans of words and chars */}

              {
                words.map((word, index)=>{return (
                  <span className='word'>
                      {word.split("").map((char, idx)=>(
                        <span className='char'>{char}</span>
                      ))}
                  </span>
                )})
              }
          </div>
        </div>

        <input 
          type="text"
          className='hidden-input'
        />
    </>
  )
}

export default TypingBox