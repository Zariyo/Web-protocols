import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { addUserAction } from "../../ducks/users/UserActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const UserForm = ({ history, addUserAction }, props) => {
    useEffect(() => {
        console.log(props.users);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const userToAdd = await axios.post("http://localhost:5000/users", values)
            console.log(userToAdd.data)
            addUserAction(userToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/users`);
    }

    const userSchema = Yup.object().shape({
        username: Yup.string("Nazwa musi byc typu string").required("Nazwa użytkownika jest wymagana"),
        email: Yup.string("Email musi byc typu string").email("Nieprawidlowy adres email").required("Email jest wymagany"),
        password: Yup.string("Haslo musi byc typu string").required("Haslo jest wymagane"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku"),
    })

    return (
        <div>
            <h3>Rejestracja użytkownika</h3>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    imageurl: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={userSchema}>
                <Form>
                    <div className="movie-submit-form">         
                    <div className="form-name">
                        Nazwa użytkownika
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
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

const mapDispatchToProps = {
    addUserAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm));