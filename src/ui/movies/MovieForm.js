import { Field, Form, Formik, ErrorMessage } from "formik"
import { useEffect } from "react";
import * as Yup from 'yup';
import { addMovieAction } from "../../ducks/movies/MovieActions";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
const axios = require('axios')

const MovieForm = ({ history, addMovieAction }, props) => {
    useEffect(() => {
        console.log(props.movies);
    }, [props])

    const handleSubmit = async (values) => {
        try {
            const movieToAdd = await axios.post("http://localhost:5000/movies", values)
            console.log("123")
            console.log(movieToAdd.data)
            addMovieAction(movieToAdd.data);
        }
        catch (err) {
            console.log(err)
        }

        history.push(`/movies`);
    }

    const movieSchema = Yup.object().shape({
        name: Yup.string("Nazwa musi byc typu string").required("Nazwa filmu jest wymagana"),
        genre: Yup.array().required("Kategoria filmu jest wymagana"),
        releaseDate: Yup.date("Data musi byc typu daty").required("Data wydania filmu jest wymagana"),
        director: Yup.string("Reżyser musi byc typu string").required("Reżyser filmu jest wymagany"),
        scores: Yup.array("Oceny musza byc tablica"),
        imageurl: Yup.string("Link musi byc typu string").url("Nieprawidlowy URL linku")
    })

    return (
        <div>
            <h3>Dodawanie filmu</h3>
            <Formik
                initialValues={{
                    name: '',
                    genre: '',
                    releaseDate: '',
                    director: '',
                    imageurl: ''
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}
                validationSchema={movieSchema}>
                <Form>
                    <div className="movie-submit-form">
                        Nazwa filmu
                        <div className="form-name">
                            <Field name="name" />
                            <ErrorMessage name="name" className="error" component="div" />
                        </div>
                        <div className="form-genre">
                            Kategorie filmu
                            <div>
                            <label>
                            Akcja
                                <Field type="checkbox" name="genre" value="Akcja" />
                                
                            </label>
                            <label>
                            Przygodowy
                                <Field type="checkbox" name="genre" value="Przygodowy" />
                                
                            </label>
                            <label>
                            Thriller
                                <Field type="checkbox" name="genre" value="Thriller" />
                            </label>
                            <label>
                            Komedia
                                <Field type="checkbox" name="genre" value="Komedia" />
                            </label>
                            <label>
                            Dramat
                                <Field type="checkbox" name="genre" value="Dramat" />
                            </label>
                            <label>
                            Horror
                                <Field type="checkbox" name="genre" value="Horror" />
                            </label>
                            <label>
                            Science fiction
                                <Field type="checkbox" name="genre" value="Science fiction" />
                            </label>
                            <label>
                            Wojenny
                                <Field type="checkbox" name="genre" value="Wojenny" />
                            </label>
                            <label>
                            Romantyczny
                                <Field type="checkbox" name="genre" value="Romantyczny" />
                            </label>
                            <ErrorMessage name="genre" className="error" component="div" />
                            </div>
                        </div>
                        <div className="form-releaseDate">
                            Data wydania
                            <Field name="releaseDate" type="date" />
                            <ErrorMessage name="releaseDate" className="error" component="div" />
                        </div>
                        <div className="form-director">
                            Reżyser
                            <Field name="director" />
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

const mapStateToProps = (state) => {
    return {
        movies: state.movies,

    }
};

const mapDispatchToProps = {
    addMovieAction
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieForm));