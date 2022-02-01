import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { addDirectorAction } from "../../ducks/directors/DirectorActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const DirectorForm = ({ history, addDirectorAction }, props) => {
    useEffect(() => {
        console.log(props.directors);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const directorToAdd = await axios.post("http://localhost:5000/directors", values)
            console.log("123")
            console.log(directorToAdd.data)
            addDirectorAction(directorToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/directors`);
    }

    const directorSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Imie jest wymagane"),
        surname: Yup.string("Nazwisko musi byc typu string").required("Nazwisko jest wymagane"),
        birthDate: Yup.date("Data musi byc typu daty").required("Data urodzenia jest wymagana"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku")
    })

    return (
        <div>
            <h3>Dodawanie reżysera</h3>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    birthDate: '',
                    imageurl: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={directorSchema}>
                <Form>
                    <div className="director-submit-form">
                        Imie reżysera
                        <div className="form-name">
                            <Field name="name" />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-surname">
                            Nazwisko reżysera
                            <Field name="surname" />
                            <ErrorMessage name="surname" className="error" component="div" />
                        </div>
                        <div className="form-birthDate">
                            Data urodzenia
                            <Field name="birthDate" type="date" />
                            <ErrorMessage name="birthDate" className="error" component="div" />
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

const mapStateToProps = (state) => {
    return {
        directors: state.directors,

    }
};

const mapDispatchToProps = {
    addDirectorAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DirectorForm));