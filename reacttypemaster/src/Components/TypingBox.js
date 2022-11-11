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
                      {word}
                  </span>
                )})
              }
          </div>
        </div>

    </>
  )
}

export default TypingBox