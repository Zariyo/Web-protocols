import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieList from './ui/movies/MovieList'
import MovieDetails from './ui/movies/MovieDetails';
import MovieForm from './ui/movies/MovieForm';
import MovieEdit from './ui/movies/MovieEdit';
import UserList from './ui/users/UserList';
import UserForm from './ui/users/UserForm';
import UserDetails from './ui/users/UserDetails';
import UserEdit from './ui/users/UserEdit';

function App() {
  return (
    <Router>
      <div className='main-body'>
        <nav className="Navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Filmy</Link>
            </li>
            <li>
              <Link to="/users">Użytkownicy</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/movies/:id/edit">
            <MovieEdit />
          </Route>
          <Route exact path="/movies/add">
            <MovieForm/>
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails />
          </Route>
          <Route exact path="/movies">
            <MovieList />
          </Route>
          <Route exact path="/users">
            <UserList/>
          </Route>
          <Route exact path="/users/add">
            <UserForm/>
          </Route>
          <Route exact path="/users/details/:name">
            <UserDetails/>
          </Route>
          <Route exact path="/users/:name/edit">
            <UserEdit/>
          </Route>
          <Route exact path="/">
            <MovieList /> {/*Zmienic na Menu glowne?*/}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
