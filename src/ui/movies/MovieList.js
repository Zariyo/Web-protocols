import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addMovieAction, deleteMovieAction, updateMoviesAction, completeMovieAction } from "../../ducks/movies/MovieActions";
import { getMovies } from "../../ducks/movies/MovieOperations";
import { deleteMovie } from "../../ducks/movies/MovieOperations";
const _ = require('lodash')
const MovieList = ({ movies, addMovieAction, deleteMovieAction, getMovies, deleteMovie }, props) => {

    const [moviesTemp, setMoviesTemp] = useState(movies)

    useEffect(() => {
        setMoviesTemp(movies)
        if (movies.length === 0) {
            getMovies()
        }
    }, [movies])

    
    const getMoviesTemp = async (movie) => {
        console.log("getting movies temp")
        await getMovies()
        setMoviesTemp(movies)
    }
    
    const noMovies = () => {
        if (moviesTemp.length === 0) {
            return <button onClick={() => getMoviesTemp()}>Odswiez dane</button>
        }
    }

    const filterMovies = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredMovies = movies
        if (values.company) {
            filteredMovies = _.filter(filteredMovies, { 'aib': values.company })
        }
        if (values.manu) {
            filteredMovies = _.filter(filteredMovies, { 'company': values.manu })
        }
        if (values.rgb) {
            filteredMovies = _.filter(filteredMovies, { 'rgb': true })
        }
        setMoviesTemp(filteredMovies)
    }

    const sortMovies = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setMoviesTemp(_.sortBy(moviesTemp, ['aib', 'name', 'model']))
        }
        if (values.type === "datetime") {
            setMoviesTemp(_.sortBy(moviesTemp, ['releaseDate', 'aib']))
        }
        if (values.type === "score") {
            setMoviesTemp(_.sortBy(moviesTemp, ['score', 'aib']))
        }
    }

    const getUrl = (movie) => {
        if (movie.imageurl) {
            return movie.imageurl
        }
        else {
            return 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/movie-alt2-512.png'
        }
    }

    return (

        <div className="movies-main">


            <div className="view-options">
                <div className="Filters">
                    Filtrowanie
                    <Formik
                        initialValues={{
                            company: '',
                            manu: '',
                            rgb: '',
                        }}
                        onSubmit={(values) => filterMovies(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Firma karty
                                <Field as="select" name="company">
                                    <option value="">Wybierz firme</option>
                                    {_.uniq(_.map(movies, 'aib')).map(maker => <option key={maker} value={maker}>{maker}</option>)}
                                </Field>
                            </div>
                            <div className="manu">
                                Producent karty
                                <label>
                                    Brak
                                    <Field type="radio" name="manu" value="" />
                                </label>
                                <label>
                                    AMD
                                    <Field type="radio" name="manu" value="AMD" />
                                </label>
                                <label>
                                    Nvidia
                                    <Field type="radio" name="manu" value="Nvidia" />
                                </label>
                            </div>
                            <div className="rgb">
                                <h1>Czy ma rgb?</h1>
                                <Field type="checkbox" name="rgb" />
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
                <div className="Sorting">
                    Sortowanie
                    <Formik
                        initialValues={{
                            type: '',
                        }}
                        onSubmit={(values) => sortMovies(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data wydania</option>
                                    <option key="4" value="score">Wynik</option>
                                </Field>
                            </div>
                            <button type="submit">
                                Zatwierdz
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className="ItemList">
                <h5>Filmy</h5>
                <Link to={`/movies/add`}> <button>Dodaj nowy film</button></Link>
                {noMovies()}
                <div className="ItemList-movies">
                    {moviesTemp.map(movie => {
                        return (
                            <div className="Item" key={movie._id}>
                                <Link to={`/movies/${movie._id}`}>
                                    <img alt="" src={getUrl(movie)}></img>
                                    {movie.name}
                                </Link>
                                <button onClick={() => deleteMovie(movie)}>Usuń</button>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateMoviesAction,
    addMovieAction,
    deleteMovieAction,
    completeMovieAction,
    getMovies,
    deleteMovie
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);