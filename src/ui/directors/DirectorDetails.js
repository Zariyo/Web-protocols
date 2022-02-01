import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { editDirectorAction } from "../../ducks/directors/DirectorActions";

const DirectorDetails = ({ producents, director, history, editDirectorAction }, props) => {

    const getUrl = (director) => {
        if (director.imageurl) {
            return director.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/3522/3522902.png'
        }
    }

    return (

        <div>
            <button onClick={() => (history.goBack())}>Powrót</button>
            <h5>{director.name}</h5>
            
            <div>
                <div className="details">

                    <img alt="" src={getUrl(director)}></img>
                    <div>{director.name} {director.surname}, urodzony w dniu {new Date(director.birthDate).toLocaleDateString('pl-PL')}</div>
                    <Link to={`/directors/${director._id}/edit`}><button>Edytuj</button></Link>
                    <Link to={`/directors/${director._id}/chat`}><button>Dyskusja</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    director: state.directors.find(director => director._id === props.match.params.id),
    producents: state.producents
});

const mapDispatchToProps = {
    editDirectorAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DirectorDetails));
