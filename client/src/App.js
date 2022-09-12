import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import VideoGameCreate from './components/videoGameCreate/VideoGameCreate';
import Details from './components/details/Details';
import NotFound from './components/notFound/NotFound';
import Favourites from './components/favourites/Favourites';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path='/videogame/create' component={VideoGameCreate}/>
          <Route path='/details/:id' component={Details}/>
          <Route path='/videogame/favourites' component={Favourites}/>
          <Route path='/*' component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
