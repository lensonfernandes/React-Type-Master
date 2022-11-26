
import { GlobalStyles } from './Styles/global' 
import './App.css';
import TypingBox from './Components/TypingBox';
import Footer from './Components/Footer'




function App() {

 

  return (
    <div className="canvas">
        <GlobalStyles />
        <h1 style={{textAlign:'center'}}>Typing Test</h1>
        <TypingBox />
        <Footer />
    </div>
  );
}

export default App;
