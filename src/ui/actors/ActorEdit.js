import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { editActorAction } from "../../ducks/actors/ActorActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const ActorEdit = ({ history, editActorAction, actor }, props) => {
    useEffect(() => {
        console.log(props.actors);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const actorToAdd = await axios.put(`http://localhost:5000/actors/${actor._id}`, values)
            console.log("123")
            console.log(actorToAdd.data)
            editActorAction(actorToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/actors`);
    }

    const actorSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Imie jest wymagane"),
        surname: Yup.string("Nazwisko musi byc typu string").required("Nazwisko jest wymagane"),
        birthDate: Yup.date("Data musi byc typu daty").required("Data urodzenia jest wymagana"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku")
    })

    return (
        <div>
            <h3>Edycja aktora</h3>
            <Formik
                initialValues={{
                    name: actor.name,
                    surname: actor.surname,
                    birthDate: new Date(actor.birthDate).toISOString().slice(0, 10),
                    imageurl: actor.imageurl
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={actorSchema}>
                <Form>
                    <div className="actor-submit-form">
                        Imie aktora
                        <div className="form-name">
                            <Field name="name" />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-surname">
                            Nazwisko aktora
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

const mapStateToProps = (state, props) => {
    return {
        actor: state.actors.find(actor => actor._id === props.match.params.id),

    }
};

const mapDispatchToProps = {
    editActorAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActorEdit));