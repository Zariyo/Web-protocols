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
            <h3>Edycja Filmu</h3>
            <Formik
                initialValues={{
                    name: movie.name,
                    genre: movie.genre,
                    releaseDate: new Date(movie.releaseDate).toISOString().slice(0, 10),
                    director: movie.director,
                    imageurl: movie.imageurl
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={movieSchema}>
                <Form>
                    <div className="movie-submit-form">
                        Nazwa filmu
                        <div className="form-name">
                            <Field name="name" /><br />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-genre">
                            Kategoria filmu
                            <Field name="genre" /><br />
                            <ErrorMessage name="genre" className="error" component="div" />
                        </div>
                        <div className="form-releaseDate">
                            Data wydania
                            <Field name="releaseDate" type="date" /><br />
                            <ErrorMessage name="releaseDate" className="error" component="div" />
                        </div>
                        <div className="form-director">
                            Reżyser
                            <Field name="director" /><br />
                            <ErrorMessage name="director" className="error" component="div" />
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
        movies: state.movies,
        movie: state.movies.find(movie => movie._id === props.match.params.id)
    }
};

const mapDispatchToProps = {
    editMovieAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieForm));
