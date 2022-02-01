import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addDirectorAction, deleteDirectorAction, updateDirectorsAction, completeDirectorAction } from "../../ducks/directors/DirectorActions";
import { getDirectors } from "../../ducks/directors/DirectorOperations";
import { deleteDirector } from "../../ducks/directors/DirectorOperations";
const _ = require('lodash')
const DirectorList = ({ directors, addDirectorAction, deleteDirectorAction, getDirectors, deleteDirector }, props) => {

    const [directorsTemp, setDirectorsTemp] = useState(directors)

    useEffect(() => {
        setDirectorsTemp(directors)
        if (directors.length === 0) {
            getDirectors()
        }
    }, [directors, getDirectors])

    
    const getDirectorsTemp = async (director) => {
        console.log("getting directors temp")
        await getDirectors()
        setDirectorsTemp(directors)
    }
    
    const noDirectors = () => {
        if (directorsTemp.length === 0) {
            return <button onClick={() => getDirectorsTemp()}>Odswiez dane</button>
        }
    }

    const sortDirectors = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setDirectorsTemp(_.sortBy(directorsTemp, ['surname', 'name']))
        }
        if (values.type === "datetime") {
            setDirectorsTemp(_.sortBy(directorsTemp, ['birthDate', 'surname']))
        }
    }

    const getUrl = (director) => {
        if (director.imageurl) {
            return director.imageurl
        }
        else {
            return 'https://cdn-icons-png.flaticon.com/512/3522/3522902.png'
        }
    }

    return (

        <div className="directors-main">


            <div className="view-options">
                <div className="Sorting">
                    Sortowanie
                    <Formik
                        initialValues={{
                            type: '',
                        }}
                        onSubmit={(values) => sortDirectors(values)}
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
                <h5>Reżyserowie</h5>
                <Link to={`/directors/add`}> <button>Dodaj nowego reżysera</button></Link>
                {noDirectors()}
                <div className="ItemList-directors">
                    {directorsTemp.map(director => {
                        return (
                            <div className="Item" key={director._id}>
                                <Link to={`/directors/${director._id}`}>
                                    <img alt="" src={getUrl(director)}></img>
                                    {director.name}
                                </Link>
                                <button onClick={() => deleteDirector(director)}>Usuń</button>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        directors: state.directors,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    updateDirectorsAction,
    addDirectorAction,
    deleteDirectorAction,
    completeDirectorAction,
    getDirectors,
    deleteDirector
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectorList);