import React , {useState} from "react";
import {db, auth} from '../firebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth";
import Graph from "../Components/Graph";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";

const UserPage = () => {

  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const [user, loading] = useAuthState(auth);


const fetchUserData = () => 
{

  const resultRef = db.collection("Results");
  let tempData = [];

let tempGraphData = [];
  const {uid} = auth.currentUser;
  // console.log(resultRef);
  // console.log(tempData);
  // console.log(uid);



  resultRef.where('userID' , '==', uid).get().then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        tempData.push({...doc.data()})
        tempGraphData.push([doc.data().timeStamp, doc.data().wpm])
      })
      // console.log(tempData)
      setData(tempData);
      setGraphData(tempGraphData);
  })


}


useEffect(()=>{
  if(!loading) {
  fetchUserData();
  }
} , [loading])


if(loading){
  return (<CircularProgress size={150}/>)
}

  return (
    <div className="canvas">
      <Graph graphData = {graphData} type='date' />
      <div className="table">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>WPM</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>Characters</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
                {data.map(i=> (
                  <TableRow>
                    <TableCell>{i.wpm}</TableCell>
                    <TableCell>{i.accuracy}</TableCell>
                    <TableCell>{i.characters}</TableCell>
                    <TableCell>{i.timeStamp.toDate().toString()}</TableCell>
                </TableRow>
                ))}


            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UserPage;
