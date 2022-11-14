import React from 'react'

export default function UpperMenu({counterDown}) {
  return (
    <div className='upper-menu'>
       <div className='counter'>
            {counterDown}
       </div>

        <div className='time-modes'>
            <div className='time'> 15s</div>
            <div className='time'> 30s</div>
            <div className='time'> 60s</div>
        </div>


    </div>
  )
}
