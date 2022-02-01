import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addMovieAction, deleteMovieAction, updateMoviesAction, completeMovieAction } from "../../ducks/movies/MovieActions";
import { getMovies } from "../../ducks/movies/MovieOperations";
import { deleteMovie } from "../../ducks/movies/MovieOperations";
import {v4 as uuidv4 } from 'uuid';
const _ = require('lodash')
const MovieList = ({ movies, getMovies, deleteMovie }) => {

    const [categories] = useState(["Akcja", "Przygodowy", "Thriller", "Komedia", "Dramat", "Horror", "Science fiction", "Wojenny", "Romantyczny"])
    const [moviesTemp, setMoviesTemp] = useState(movies)

    useEffect(() => {
        setMoviesTemp(movies)
        if (movies.length === 0) {
            getMovies()
        }
    }, [getMovies, movies])

    
    const getMoviesTemp = async () => {
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
        if (values.director) {
            filteredMovies = _.filter(filteredMovies, { 'director': values.director })
        }
        if (values.genre) {
            filteredMovies = filteredMovies.filter(gen => {return gen.genre.includes(values.genre)})
        }
        if (values.query) {
            filteredMovies = filteredMovies.filter(movie => {return movie.name.includes(values.query)})
        }
        setMoviesTemp(filteredMovies)
    }

    const sortMovies = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setMoviesTemp(_.sortBy(moviesTemp, ['name', 'director']))
            
        }
        if (values.type === "datetime") {
            setMoviesTemp(_.sortBy(moviesTemp, ['releaseDate', 'name']))
        }
        if (values.type === "score") {
            setMoviesTemp(_.sortBy(moviesTemp, ['scores', 'name']).reverse())
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
                            director: '',
                            genre: ''
                        }}
                        onSubmit={(values) => filterMovies(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="director">
                                Reżyser filmu
                                <Field as="select" name="director">
                                    <option value="">Wybierz reżysera</option>
                                    {_.uniq(_.map(movies, 'director')).map(person => <option key={uuidv4()} value={person}>{person}</option>)}
                                </Field>
                            </div>
                            <div className="genre">
                                Kategoria filmu
                                <Field as="select" name="genre">
                                    <option value="">Wybierz kategorię</option>
                                    {_.uniq(_.map(categories)).map(cat => {
                                        if(movies.find(gen => {return gen.genre.includes(cat)})){
                                    return <option key={uuidv4()} value={cat}>{cat}</option>
                                        }
                                        else return ""
                                    })}
                                </Field>
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
                <Formik
  initialValues={{ query: 'Szukaj . . .' }}
  onSubmit={(values) => {
      filterMovies(values)
  }}
>
  {formikProps => (
    <Form className="mb-5">
      <div className="form-query">
        <Field
          name="query"
        />
        <button type="submit" className="button-find">
                        Szukaj
                    </button>
        </div>
    </Form>
      )}
      </Formik>
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