
import { GlobalStyles } from '@mui/styled-engine';
import './App.css';
import TypingBox from './Components/TypingBox';

function App() {
  return (
    <div className="canvas">
        <GlobalStyles />
        <h1>Typing Test</h1>
        <TypingBox/>
        <h1>Footer</h1>
    </div>
  );
}

export default App;
