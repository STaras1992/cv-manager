import './App.css';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Nav from './components/Nav/Nav.js';
import CvPanel from './components/CvPanel/CvPanel.js';
import CoverPanel from './components/CoverPanel/CoverPanel.js';
import TemplatePanel from './components/TemplatePanel/TemplatePanel.js';
import SendMailPage from './components/SendMailPage/SendMailPage.js';

function App() {
  return (
    <div className='app'>
      {/* <Container> */}
      <Nav />
      <Switch>
        <Route exact path='/cv' render={(routeParams) => <CvPanel {...routeParams} />} />
        <Route exact path='/cover' render={(routeParams) => <CoverPanel {...routeParams} />} />
        <Route exact path='/template' render={(routeParams) => <TemplatePanel {...routeParams} />} />
        <Route exact path='/' render={() => <SendMailPage />} />
      </Switch>
      {/* </Container> */}
    </div>
  );
}

export default App;
