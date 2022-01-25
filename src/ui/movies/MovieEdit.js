import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { editMovieAction } from "../../ducks/movies/MovieActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const MovieForm = ({ movie, history, editMovieAction }, props) => {
    useEffect(() => {
        console.log(props.movies);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const movieToAdd = await axios.put(`http://localhost:5000/movies/${movie._id}`, values)
            editMovieAction(movieToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/movies`);
    }

    const movieSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa filmu jest wymagana"),
        series: Yup.string("Seria musi byc typu string").required("Seria filmu jest wymagana"),
        releaseDate: Yup.date("Data musi byc typu daty").required("Data wydania filmu jest wymagana"),
        architecture: Yup.string("Architektura musi byc typu string").required("Architektura filmu jest wymagana"),
        company: Yup.string("Firma musi byc typu string").required("Firma filmu jest wymagana"),
        aib: Yup.string("Producent musi byc typu string").required("Producent filmu jest wymagany"),
        model: Yup.string("Model musi byc typu string").required("Model filmu jest wymagany"),
        score: Yup.number("Wynik musi byc typu numerowego").required("Wynik filmu jest wymagany"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku"),
        rgb: Yup.boolean("rgb musi byc booleanskie")
    })

    return (
        <div>
            <h3>Film</h3>
            <Formik
                initialValues={{
                    name: movie.name,
                    series: movie.series,
                    releaseDate: movie.releaseDate,
                    architecture: movie.architecture,
                    company: movie.company,
                    aib: movie.aib,
                    model: movie.model,
                    score: movie.score,
                    imageurl: movie.imageurl,
                    rgb: movie.rgb,
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={movieSchema}>
                <Form>
                    <div className="movie-submit-form">
                        Firma
                        <div className="manu">
                            <label>
                                AMD
                                <Field type="radio" name="company" value="AMD" />
                            </label>
                            <label>
                                Nvidia
                                <Field type="radio" name="company" value="Nvidia" />
                                <ErrorMessage name="company" className="error" component="div" />
                            </label>
                        </div>
                        Nazwa filmu
                        <div className="form-name">
                            <Field name="name" />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-series">
                            Seria filmu
                            <Field name="series" />
                            <ErrorMessage name="series" className="error" component="div" />
                        </div>
                        <div className="form-releaseDate">
                            Data wydania
                            <Field name="releaseDate" type="date" />
                            <ErrorMessage name="releaseDate" className="error" component="div" />
                        </div>
                        <div className="form-architecture">
                            Architektura
                            <Field name="architecture" />
                            <ErrorMessage name="architecture" className="error" component="div" />
                        </div>
                        <div className="form-aib">
                            Producent
                            <Field name="aib" />
                            <ErrorMessage name="aib" className="error" component="div" />
                        </div>
                        <div className="form-model">
                            Model filmu
                            <Field name="model" />
                            <ErrorMessage name="model" className="error" component="div" />
                        </div>
                        <div className="form-imageurl">
                            Adres do zdjecia
                            <Field name="imageurl" />
                            <ErrorMessage name="imageurl" className="error" component="div" />
                        </div>
                        <div className="form-rgb">
                            RGB
                            <Field type="checkbox" name="rgb" />
                            <ErrorMessage name="rgb" className="error" component="div" />
                        </div>
                        <div className="form-score">
                            Wynik benchmark
                            <Field name="score" />
                            <ErrorMessage name="score" className="error" component="div" />
                        </div >
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
        movies: state.movies,
        movie: state.movies.find(movie => movie._id === props.match.params.id)
    }
};

const mapDispatchToProps = {
    editMovieAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieForm));
