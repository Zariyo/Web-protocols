import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { editUserAction } from "../../ducks/users/UserActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const { createHash } = require('crypto')
const axios = require('axios')

const UserEdit = ({ history, editUserAction, user }, props) => {
    useEffect(() => {
        console.log(props.users);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const userToAdd = await axios.put(`http://localhost:5000/users/${user._id}`, values)
            console.log("123")
            console.log(userToAdd.data)
            editUserAction(userToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/users`);
    }

    const [passwordVerified, setPasswordVerified] = useState(false)
    const [passwordWrong, setPasswordWrong] = useState(false)

    const userSchema = Yup.object().shape({
        username: Yup.string("Nazwa musi byc typu string").required("Imie jest wymagane"),
        password: Yup.string("Hasło musi byc typu string").required("Hasło jest wymagane"),
        email: Yup.string("Email musi byc typu string").email("Nieprawidlowy adres email").required("Email jest wymagany"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku")
    })

    const passwordSchema = Yup.object().shape({
        password: Yup.string("Hasło musi byc typu string").required("Hasło jest wymagane")
    })

    const handleVerify = async (valuesToSend) =>{
        try{
            valuesToSend.password = createHash('sha256').update(valuesToSend.password).digest('hex')
            const response = await axios.post(`http://localhost:5000/users/verify`, valuesToSend)
            if(response.status===201){
                setPasswordVerified(true)
            }
            else if(response.status===202){
                setPasswordWrong(true)
            }
            
        }
        catch(err){
            console.log(err)
        }
        
    }

    const passwrodWrongError = () =>{
        if(passwordWrong){
            return <div className="error">Nieprawidłowe hasło</div>
        }
    }

    const userVerify = () =>{
        if(!passwordVerified){
            return(
                
                <div>
                    
                    <Formik
                initialValues={{
                    id: user._id,
                    password: "",
                }}
                onSubmit={(values, {resetForm}) => {
                    handleVerify(values)
                    resetForm({})
        }}
                validationSchema={passwordSchema}>
                <Form>
                    <div className="user-submit-form">
                        <div className="form-password">
                            Hasło
                            <Field name="password" />
                            <ErrorMessage name="password" className="error" component="div" />
                            {passwrodWrongError()}
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
        return(
        <div>
        <h3>Edycja użytkownika</h3>
            <Formik
                initialValues={{
                    username: user.username,
                    email: user.email,
                    password: "",
                    imageurl: user.imageurl
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={userSchema}>
                <Form>
                    <div className="user-submit-form">
                        Nazwa użytkownika
                        <div className="form-username">
                            <Field name="username" />
                            <ErrorMessage name="username" className="error" component="div" />
                        </div>
                        <div className="form-email">
                            Email
                            <Field name="email" />
                            <ErrorMessage name="email" className="error" component="div" />
                        </div>
                        <div className="form-password">
                            Hasło
                            <Field name="password" />
                            <ErrorMessage name="password" className="error" component="div" />
                        </div>
                        <div className="form-imageurl">
                            Adres do zdjecia
                            <Field as="textarea" name="imageurl" />
                            <ErrorMessage name="imageurl" className="error" component="div" />
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

    return (
        <div>
            {userVerify()}
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: state.users.find(user => user.username === props.match.params.name),

    }
};

const mapDispatchToProps = {
    editUserAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEdit));