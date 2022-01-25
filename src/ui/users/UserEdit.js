import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { editUserAction } from "../../ducks/users/UserActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const UserForm = ({ user, history, editUserAction }, props) => {
    useEffect(() => {
        console.log(props.users);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const userToAdd = await axios.put(`http://localhost:5000/users/${user._id}`, values)
            console.log(userToAdd.data)
            editUserAction(userToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/users`);
    }

    const userSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa usera jest wymagana"),
        phone: Yup.number("Numer telefonu musi byc typu numerycznego").required("Numer kontaktowy jest wymagany"),
        creationDate: Yup.date("Data musi byc typu daty").required("Data powstania usera jest wymagana"),
        address: Yup.string("Adres musi byc typu string").required("Adres usera jest wymagany"),
        country: Yup.string("Panstwo musi byc typu string").required("Panstwo usera jest wymagane"),
        imgurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku"),
    })

    return (
        <div>
            <h3>Karta</h3>
            <Formik
                initialValues={{
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    country: user.country,
                    supports: user.supports,
                    imgurl: user.imgurl,
                    creationDate: user.creationDate,
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={userSchema}>
                <Form>
                    <div className="card-submit-form">
                        <div className="supports">
                            AMD
                            <Field type="checkbox" name="supports" value="amd" />
                            Nvidia
                            <Field type="checkbox" name="supports" value="nvidia" />
                            <ErrorMessage name="supports" className="error" component="div" />
                        </div>
                    
                    <div className="form-name">
                        Nazwa firmy
                        <Field name="name" />
                        <ErrorMessage name="name" className="error" component="div" />
                    </div>
                    <div className="form-phone">
                        Telefon firmy
                        <Field name="phone" />
                        <ErrorMessage name="phone" className="error" component="div" />
                    </div>
                    <div className="form-address">
                        Adres firmy
                        <Field name="address" />
                        <ErrorMessage name="address" className="error" component="div" />
                    </div>
                    <div className="form-country">
                        Kraj firmy
                        <Field name="country" />
                        <ErrorMessage name="country" className="error" component="div" />
                    </div>
                    <div className="form-imageurl">
                        Adres do zdjecia
                        <Field as="textarea" name="imgurl" />
                        <ErrorMessage name="imgurl" className="error" component="div" />
                    </div>
                    <div className="form-creationDate">
                        Data założenia
                        <Field name="creationDate" type="date" />
                        <ErrorMessage name="creationDate" className="error" component="div" />
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

const mapStateToProps = (state, props) => {
    return {
        users: state.users,
        user: state.users.find(user => user.name === props.match.params.name)
    }
};

const mapDispatchToProps = {
    editUserAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm));