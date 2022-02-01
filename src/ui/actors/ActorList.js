import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addActorAction, deleteActorAction, updateActorsAction, completeActorAction } from "../../ducks/actors/ActorActions";
import { getActors } from "../../ducks/actors/ActorOperations";
import { deleteActor } from "../../ducks/actors/ActorOperations";
const _ = require('lodash')
const ActorList = ({ actors, addActorAction, deleteActorAction, getActors, deleteActor }, props) => {

    const [actorsTemp, setActorsTemp] = useState(actors)

    useEffect(() => {
        setActorsTemp(actors)
        if (actors.length === 0) {
            getActors()
        }
    }, [actors, getActors])

    
    const getActorsTemp = async (actor) => {
        console.log("getting actors temp")
        await getActors()
        setActorsTemp(actors)
    }
    
    const noActors = () => {
        if (actorsTemp.length === 0) {
            return <button onClick={() => getActorsTemp()}>Odswiez dane</button>
        }
    }

    const sortActors = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setActorsTemp(_.sortBy(actorsTemp, ['surname', 'name']))
        }
        if (values.type === "datetime") {
            setActorsTemp(_.sortBy(actorsTemp, ['birthDate', 'surname']))
        }
    }

    const getUrl = (actor) => {
        if (actor.imageurl) {
            return actor.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/3309/3309330.png'
        }
    }

    return (

        <div className="actors-main">


            <div className="view-options">
                <div className="Sorting">
                    Sortowanie
                    <Formik
                        initialValues={{
                            type: '',
                        }}
                        onSubmit={(values) => sortActors(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data urodzenia</option>
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
                <h5>Aktorzy</h5>
                <Link to={`/actors/add`}> <button>Dodaj nowego aktora</button></Link>
                {noActors()}
                <div className="ItemList-actors">
                    {actorsTemp.map(actor => {
                        return (
                            <div className="Item" key={actor._id}>
                                <Link to={`/actors/${actor._id}`}>
                                    <img alt="" src={getUrl(actor)}></img>
                                    {actor.name}
                                </Link>
                                <button onClick={() => deleteActor(actor)}>Usuń</button>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        actors: state.actors,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateActorsAction,
    addActorAction,
    deleteActorAction,
    completeActorAction,
    getActors,
    deleteActor
}


export default connect(mapStateToProps, mapDispatchToProps)(ActorList);