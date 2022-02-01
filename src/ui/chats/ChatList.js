import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { deleteChatAction } from "../../ducks/chats/ChatActions";
const _ = require('lodash')
const ChatList = ({ movie, chats, user, director, actor, history, deleteChatAction }, props) => {




    const listChats = () =>{
        if(movie){
            return (
                <div className="movie-chats">
                    <Link to={`/movies/${movie._id}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-movies">
                        {chats.map(chat => {
                            if(chat.type==='movies' && chat.owner===movie._id){
                            return (
                                <div className="Item" key={chat.id}>
                                    <Link to={`/movies/${movie._id}/chat/details/${chat.id}`}>
                                        {chat.name}
                                    </Link>
                                    <button onClick={() => deleteChatAction(chat)}>Usuń</button>
                                </div>)
                            }
                            return(null)
                        })}
                    </div>
                </div>
            )
        }
        else if(user){
            return(
                <div className="user-chats">
                    <Link to={`/users/${user.username}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-users">
                        {chats.map(chat => {
                            if(chat.type==='users' && chat.owner===user._id){
                            return (
                                <div className="Item" key={chat.id}>
                                    <Link to={`/users/${user.username}/chat/details/${chat.id}`}>
                                        {chat.name}
                                    </Link>
                                    <button onClick={() => deleteChatAction(chat)}>Usuń</button>
                                </div>)
                            }
                            return(null)
                        })}
                    </div>
                </div>
            )
        }
        if(director){
            return (
                <div className="movie-chats">
                    <Link to={`/directors/${director._id}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-directors">
                        {chats.map(chat => {
                            if(chat.type==='director' && chat.owner===director._id){
                            return (
                                <div className="Item" key={chat.id}>
                                    <Link to={`/directors/${director._id}/chat/details/${chat.id}`}>
                                        {chat.name}
                                    </Link>
                                    <button onClick={() => deleteChatAction(chat)}>Usuń</button>
                                </div>)
                            }
                            return(null)
                        })}
                    </div>
                </div>
            )
        }
        if(actor){
            return (
                <div className="movie-chats">
                    <Link to={`/actors/${actor._id}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-actors">
                        {chats.map(chat => {
                            if(chat.type==='actor' && chat.owner===actor._id){
                            return (
                                <div className="Item" key={chat.id}>
                                    <Link to={`/actors/${actor._id}/chat/details/${chat.id}`}>
                                        {chat.name}
                                    </Link>
                                    <button onClick={() => deleteChatAction(chat)}>Usuń</button>
                                </div>)
                            }
                            return(null)
                        })}
                    </div>
                </div>
            )
        }
    }

    return (

        <div className="movies-main">


            <div className="view-options">
                <div className="Filters">
                    Filtrowanie
                    <Formik
                        initialValues={{
                            company: '',
                            manu: '',
                            rgb: '',
                        }}
                        onSubmit={(values) => (null)}//filterMovies(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Firma karty
                                <Field as="select" name="company">
                                    <option value="">Wybierz firme</option>
                                    {_.uniq(_.map(null, 'aib')).map(maker => <option key={maker} value={maker}>{maker}</option>)}
                                </Field>
                            </div>
                            <div className="manu">
                                Producent karty
                                <label>
                                    Brak
                                    <Field type="radio" name="manu" value="" />
                                </label>
                                <label>
                                    AMD
                                    <Field type="radio" name="manu" value="AMD" />
                                </label>
                                <label>
                                    Nvidia
                                    <Field type="radio" name="manu" value="Nvidia" />
                                </label>
                            </div>
                            <div className="rgb">
                                <h1>Czy ma rgb?</h1>
                                <Field type="checkbox" name="rgb" />
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="Sorting">
                    Sortowanie
                    <Formik
                        initialValues={{
                            type: '',
                        }}
                        onSubmit={(values) => (null)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data wydania</option>
                                    <option key="4" value="score">Wynik</option>
                                </Field>
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="ItemList">
                <h5>Czaty</h5>
                {listChats()}
            </div>
        </div>
    )
};

const mapStateToProps = (state, props) => {
    if (props.match.path.includes('users')){
    console.log('users')
    return{
        user: state.users.find(user => user.username === props.match.params.name),
        chats: state.chats
    }
}
    else if(props.match.path.includes('movies')){
    console.log('movies')
    return {
        movie: state.movies.find(movie => movie._id === props.match.params.id),
        chats: state.chats
    };
}
    else if(props.match.path.includes('directors')){
        console.log('directors')
        return {
            director: state.directors.find(director => director._id === props.match.params.id),
            chats: state.chats
        };
    }
    else if(props.match.path.includes('actors')){
        console.log('actors')
        return {
            actor: state.actors.find(actor => actor._id === props.match.params.id),
            chats: state.chats
        };
    }
}

const mapDispatchToProps = {
    deleteChatAction,
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));