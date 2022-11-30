import { GlobalStyles } from "./Styles/global";
import "./App.css";
import TypingBox from "./Components/TypingBox";
import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { auth } from "./firebaseConfig";
import Header from "./Components/Header";
import {Routes, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import UserPage from './Pages/UserPage';
// import { useTheme } from "./Context/ThemeContext";

function App() {


  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/user' element={<UserPage />}></Route>

    </Routes>

  )
}

export default App;
