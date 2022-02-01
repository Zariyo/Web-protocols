import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { deleteChatAction } from "../../ducks/chats/ChatActions";
const ChatList = ({ movie, chats, user, director, actor, history, deleteChatAction }, props) => {




    const listChats = () =>{
        if(movie){
            return (
                <div className="chats">
                    <Link to={`/movies/${movie._id}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-chats">
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
                <div className="chats">
                    <Link to={`/users/${user.username}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-chats">
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
                <div className="chats">
                    <Link to={`/directors/${director._id}/chat/add`}> <button>Dodaj nowy czat</button></Link>

                    <div className="ItemList-chats">
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

        <div className="chats-main">

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