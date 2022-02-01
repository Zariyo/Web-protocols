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
import DirectorList from './ui/directors/DirectorList';
import DirectorDetails from './ui/directors/DirectorDetails';
import DirectorForm from './ui/directors/DirectorForm';
import DirectorEdit from './ui/directors/DirectorEdit';
import ActorList from './ui/actors/ActorList';
import ActorDetails from './ui/actors/ActorDetails';
import ActorForm from './ui/actors/ActorForm';
import ActorEdit from './ui/actors/ActorEdit';
import ChatList from './ui/chats/ChatList';
import ChatDetails from './ui/chats/ChatDetails';
import ChatForm from './ui/chats/ChatForm';

function App() {
  return (
    <Router>
      <div className='main-body'>
        <nav className="Navbar">
          <ul>
            <li>
              <Link to="/movies">Filmy</Link>
            </li>
            <li>
              <Link to="/users">Użytkownicy</Link>
            </li>
            <li>
              <Link to="/directors">Reżyserowie</Link>
            </li>
            <li>
              <Link to="/actors">Aktorzy</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* Lista Route'ow dla /movies */}
            <Route exact path="/movies/:id/chat/details/:chatid">
              <ChatDetails />
            </Route>
            <Route exact path="/movies/:id/chat/add">
              <ChatForm />
            </Route>
            <Route exact path="/movies/:id/chat">
              <ChatList />
            </Route>
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
          {/* Lista Route'ow dla /users */}
            <Route exact path="/users/:name/chat/details/:chatid">
              <ChatDetails />
            </Route>
            <Route exact path="/users/:name/chat/add">
              <ChatForm />
            </Route>
            <Route exact path="/users/:name/chat">
              <ChatList />
            </Route>
            <Route exact path="/users/:name/edit">
              <UserEdit/>
            </Route>
            <Route exact path="/users/details/:name">
              <UserDetails/>
            </Route>
            <Route exact path="/users/add">
              <UserForm/>
            </Route>
            <Route exact path="/users">
              <UserList/>
            </Route>
          {/* Lista Route'ow dla /directors */}
            <Route exact path="/directors/:id/chat/details/:chatid">
              <ChatDetails />
            </Route>
            <Route exact path="/directors/:id/chat/add">
              <ChatForm />
            </Route>
            <Route exact path="/directors/:id/chat">
              <ChatList />
            </Route>
            <Route exact path="/directors/:id/edit">
              <DirectorEdit/>
            </Route>
            <Route exact path="/directors/add">
              <DirectorForm/>
            </Route>
            <Route exact path="/directors/:id">
              <DirectorDetails/>
            </Route>
            <Route exact path="/directors">
              <DirectorList/>
            </Route>
          {/* Lista Route'ow dla /actors */}
            <Route exact path="/actors/:id/chat/details/:chatid">
            <ChatDetails />
            </Route>
            <Route exact path="/actors/:id/chat/add">
              <ChatForm />
            </Route>
            <Route exact path="/actors/:id/chat">
              <ChatList />
            </Route>
            <Route exact path="/actors/:id/edit">
              <ActorEdit/>
            </Route>
            <Route exact path="/actors/add">
              <ActorForm/>
            </Route>
            <Route exact path="/actors/:id">
              <ActorDetails/>
            </Route>
            <Route exact path="/actors">
              <ActorList/>
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
