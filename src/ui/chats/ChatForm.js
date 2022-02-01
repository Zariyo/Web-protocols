import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import {v4 as uuidv4 } from 'uuid';
import { addChatAction, deleteChatAction } from "../../ducks/chats/ChatActions";

const ChatForm = ({ history, addChatAction, user, movie, director, actor }, props) => {
    useEffect(() => {
        console.log(props.movies);
    }, [props])

    const getType = () => {
        if(user){
            return "users"
        }
        else if(movie){
            return "movies"
        }
        else if(director){
            return "director"
        }
        else if(actor){
            return "actor"
        }
    }

    const getOwner = () => {
        if(user){
            return user._id
        }
        else if(movie){
            return movie._id
        }
        else if(director){
            return director._id
        }
        else if(actor){
            return actor._id
        }
    }

    const handleSubmit = async (values) => {
        try {
            const chatToAdd = {
                id: uuidv4(),
                name: values.name,
                tags: values.tags,
                type: getType(),
                owner: getOwner()
            }
            console.log("123")
            console.log(chatToAdd)
            addChatAction(chatToAdd);
        }
        catch (err) {
            console.log(err)
        }

        history.goBack();
    }

    const movieSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa czatu jest wymagana"),
        tags: Yup.string("Tagi musza byc typu string"),
    })

    return (
        <div>
            <h3>Dodawanie czatu</h3>
            <Formik
                initialValues={{
                    name: '',
                    tags: '',
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={movieSchema}>
                <Form>
                    <div className="movie-submit-form">
                        Nazwa czatu
                        <div className="form-name">
                            <Field name="name" /><br />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-tags">
                            Tagi
                            <Field name="tags" /><br />
                            <ErrorMessage name="tags" className="error" component="div" />
                        </div>
                        <button type="submit">
                            Zatwierdz
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

const mapStateToProps = (state, props) => {
  if (props.match.path.includes('users')){
  console.log('users')
  return{
      user: state.users.find(user => user.username === props.match.params.name),
      chat: state.chats.find(chat => chat.id === props.match.params.chatid),
      chats: state.chats
  }
}
  else if(props.match.path.includes('movies')){
  console.log(state.chats)
  return {
      movie: state.movies.find(movie => movie._id === props.match.params.id),
      chat: state.chats.find(chat => chat.id === props.match.params.chatid),
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
};

const mapDispatchToProps = {
    addChatAction,
    deleteChatAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatForm));