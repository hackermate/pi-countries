import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Card from './components/Card';
import AddActivity from './components/AddActivity';
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Nav />
      <Route exact path="/countries" component={Home} />
      <Route exact path="/countries/:id" component={Card} />
      <Route exact path='/activity' component={AddActivity} />
    </BrowserRouter>
  );
}

export default App;
