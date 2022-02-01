import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { editActorAction } from "../../ducks/actors/ActorActions";

const ActorDetails = ({ producents, actor, history, editActorAction }, props) => {

    const getUrl = (actor) => {
        if (actor.imageurl) {
            return actor.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/3309/3309330.png'
        }
    }

    return (

        <div>
            <button onClick={() => (history.goBack())}>Powrót</button>
            <h5>{actor.name}</h5>
            <div>
                <div className="details">

                    <img alt="" src={getUrl(actor)}></img>
                    <div>{actor.name} {actor.surname}, urodzony w dniu {new Date(actor.birthDate).toLocaleDateString('pl-PL')}</div>
                    <Link to={`/actors/${actor._id}/edit`}><button>Edytuj</button></Link>
                    <Link to={`/actors/${actor._id}/chat`}><button>Dyskusja</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    actor: state.actors.find(actor => actor._id === props.match.params.id),
    producents: state.producents
});

const mapDispatchToProps = {
    editActorAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActorDetails));
