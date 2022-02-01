import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { editMovieAction } from "../../ducks/movies/MovieActions";
const _ = require('lodash')

const MovieDetails = ({ producents, movie, history,actors, editMovieAction }, props) => {


    const getUrl = (movie) => {
        if (movie.imageurl) {
            return movie.imageurl
        }
        else {
            return 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/movie-alt2-512.png'
        }
    }

    const getProducentUrl = () => {
        if (_.find(producents, { 'name': movie.aib })) {
            console.log(movie.aib)
            return <Link to={`/producents/details/${movie.aib}`}>{movie.aib}</Link>
        }
        else return "Producenta nie ma w bazie producentów"
    }

    return (

        <div>
            <button onClick={() => (history.goBack())}>Powrót</button>
            <h5>{movie.name}</h5>
            <div>
                <div className="details">

                    <img alt="" src={getUrl(movie)}></img>
                    <div className="producent-link">{getProducentUrl()}</div>
                    <div>Kategorie filmu: {movie.genre.map((gen, i, arr) => {
                        if (i+1 === arr.length){
                            return gen
                        } 
                        return gen + ', '})}</div>
                    <div>Wydana w dniu {new Date(movie.releaseDate).toLocaleDateString('pl-PL')}</div>
                    <div>Reżyser: {movie.director}</div>
                    <div>Oceny filmu: {movie.scores.map((score, i, arr) => {
                        if (i+1 === arr.length){
                            return score
                        } 
                        return score + ', '})}</div>
                    <Link to={`/movies/${movie._id}/edit`}><button>Edytuj</button></Link>
                    <Link to={`/movies/${movie._id}/chat`}><button>Dyskusja</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => {
    return {
    movie: state.movies.find(movie => movie._id === props.match.params.id),
    producents: state.producents,
    actors: state.actors
}};

const mapDispatchToProps = {
    editMovieAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));
