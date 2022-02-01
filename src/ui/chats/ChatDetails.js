/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import { withRouter } from "react-router";
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import mqtt from 'mqtt';
//import jwt from 'jsonwebtoken'

const Cookies = require('js-cookie')
const _ = require('lodash')

const ChatDetails = ({ producents,chat,chats, movie,history, user, director, actor, deleteChatAction }, props) => {

    const [client, setClient] = useState(mqtt.connect('ws://localhost:4040'));
    const [payload, setPayload] = useState({});
    const [connectStatus, setConnectStatus] = useState('Connect');
    const [messages, setMessages] = useState([])
    const [chatUser, setChatUser] = useState("")
    const [chatName, setChatName] = useState(chat.id)

    //useEffect(() => {
	//	const token = Cookies.get("token")
	//	if (!token) {
    //        Cookies.set("token", false, { expires: 7 })
	//	}else{
    //        if(token === "false"){
    //            history.push("/login")
    //        }
    //        else{
    //            //setUser(jwt.decode(token));
    //        }
    //    }
	//}, [])

  const displayChat = () => {
    if(movie){
      return (
        <div id="chat-block">
        <h1>Czat {chat.name} filmu {movie.name}</h1>
        <h3>{connectStatus}</h3>
        <button onClick={() => (history.goBack())}>Powrót</button>
        <Formik
          initialValues={{
              chatUser: "",
              message:""
              
          }}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            handleSubmit(values)
            resetForm({message:""})
            setSubmitting(false);
          }}
          enableReinitialize={true}>
            
          <Form>
              <div className="chat-submit-form">
          <label id="message">User: </label>
            <Field type="text" id="chatUser" name="chatUser"/>
            <label id="message">Message: </label>
            <Field type="text" id="message" name="message"/>
            <button type="submit">Send!</button>
            </div>
          </Form>
        </Formik>
      </div>
      )
  }
  else if(user){
      return(
        <div id="chat-block">
        <h1>Czat {chat.name} użytkownika {user.username}</h1>
        <h3>{connectStatus}</h3>
        <button onClick={() => (history.goBack())}>Powrót</button>
        <Formik
          initialValues={{
              chatUser: "",
              message:""
              
          }}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            handleSubmit(values)
            resetForm({message:""})
            setSubmitting(false);
          }}
          enableReinitialize={true}>
            
          <Form>
              <div className="chat-submit-form">
          <label id="message">User: </label>
            <Field type="text" id="chatUser" name="chatUser"/>
            <label id="message">Message: </label>
            <Field type="text" id="message" name="message"/>
            <button type="submit">Send!</button>
            </div>
          </Form>
        </Formik>
      </div>
      )
  }
  else if(director){
    return(
      <div id="chat-block">
      <h1>Czat {chat.name} Reżysera {director.surname}</h1>
      <h3>{connectStatus}</h3>
      <button onClick={() => (history.goBack())}>Powrót</button>
      <Formik
        initialValues={{
            chatUser: "",
            message:""
            
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          handleSubmit(values)
          resetForm({message:""})
          setSubmitting(false);
        }}
        enableReinitialize={true}>
          
        <Form>
            <div className="chat-submit-form">
        <label id="message">User: </label>
          <Field type="text" id="chatUser" name="chatUser"/>
          <label id="message">Message: </label>
          <Field type="text" id="message" name="message"/>
          <button type="submit">Send!</button>
          </div>
        </Form>
      </Formik>
    </div>
    )
  }
  else if(actor){
    return(
      <div id="chat-block">
      <h1>Czat {chat.name} aktora {actor.surname}</h1>
      <h3>{connectStatus}</h3>
      <button onClick={() => (history.goBack())}>Powrót</button>
      <Formik
        initialValues={{
            chatUser: "",
            message:""

        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          handleSubmit(values)
          resetForm({message:""})
          setSubmitting(false);
        }}
        enableReinitialize={true}>

        <Form>
            <div className="chat-submit-form">
        <label id="message">User: </label>
          <Field type="text" id="chatUser" name="chatUser"/>
          <label id="message">Message: </label>
          <Field type="text" id="message" name="message"/>
          <button type="submit">Send!</button>
          </div>
        </Form>
      </Formik>
    </div>
    )
  }
  }

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        client.subscribe(chatName)
        setConnectStatus('Connected');
        console.log("Connected");
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (chatName, message) => {
        const payload = { message: message.toString() };
        setPayload(payload);
        setMessages(messages => [...messages, message.toString()])
        console.log(chatName, message.toString());
      });
    }
  }, [chatName, client]);

  const handleSubmit = (value) => {
    client.publish(chatName, `${value.chatUser}: '${value.message}'`)
  }

    return (
        <div id="chat">
          {displayChat()}
          
    
          
          {messages.map(m => {
            return(
              <p key={m}> {m} </p>
            )
          })}
        </div>
      );
};


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
      chat: state.chats.find(chat => chat.id === props.match.params.chatid),
      chats: state.chats
  };
}
else if(props.match.path.includes('actors')){
  console.log('actors')
  return {
      actor: state.actors.find(actor => actor._id === props.match.params.id),
      chat: state.chats.find(chat => chat.id === props.match.params.chatid),
      chats: state.chats
  };
}
}

const mapDispatchToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatDetails));
