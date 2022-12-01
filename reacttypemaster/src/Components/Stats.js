import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
import { auth, db } from '../firebaseConfig';
import Graph from './Graph'

export default function Stats({wpm, accuracy, graphData, correctChars, incorrectChars, extraChars, missedChars}) {

  var timeSet = new Set();
  const newGraph = graphData.filter((i)=>{
      if(!timeSet.has(i[0]))
      {
          timeSet.add(i[0]);
          return i;

      }
  })

  const pushResultsToDB = async () => {
    const resultsRef = db.collection("Results");
    const {uid} = auth.currentUser;

    if(!isNaN(accuracy))
    {
      //push results to Database
        await resultsRef.add({
          userID: uid,
          wpm: wpm,
          accuracy: accuracy,
          characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
          timeStamp: new Date()
        }).then((res)=>{
          setAlert({
            open: true,
            type: 'success',
            message: 'Result saved to DB'
          })
        })
    }
    else
    {
      setAlert({
        open: true,
        type: 'error',
        message: 'Invalid Test'
      })
    }


  }
  const [user] = useAuthState(auth)
  const {setAlert} = useAlert();

  useEffect(()=>{

    if(user){
      pushResultsToDB();
    }
    else
    {
      setAlert({
        open: true,
        type: 'warning',
        message: 'Login to save results'
      })

    }

  }, [])
 
  return (
    <div className='=stats-box'>
        <div className='left-stats'>
            <div className='title'>WPM</div>
            <div className='subtitle'>{wpm}</div>
            <div className='title'>Accuracy</div>
            <div className='subtitle'>{accuracy}%</div>
            <div className='title'>Characters</div>
            <div className='subtitle'>{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>

        </div>
        <div className='right-stats'>
                <Graph graphData={newGraph} />
        </div>

        
    </div>
  )
}
