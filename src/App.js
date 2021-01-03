import './App.css';
import Header from './components/Header/Header.js';
import Nav from './components/Nav/Nav.js';
import CvPanel from './components/CvPanel/CvPanel.js';
import CoverPanel from './components/CoverPanel/CoverPanel.js';

function App() {
  return (
    <div className='app'>
      <header className='App-header'>
        <Nav />
        <CoverPanel />
      </header>
    </div>
  );
}

export default App;
