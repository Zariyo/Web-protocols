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

    const filterDirectors = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredDirectors = directors
        if (values.company) {
            filteredDirectors = _.filter(filteredDirectors, { 'aib': values.company })
        }
        if (values.manu) {
            filteredDirectors = _.filter(filteredDirectors, { 'company': values.manu })
        }
        if (values.rgb) {
            filteredDirectors = _.filter(filteredDirectors, { 'rgb': true })
        }
        setDirectorsTemp(filteredDirectors)
    }

    const sortDirectors = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setDirectorsTemp(_.sortBy(directorsTemp, ['aib', 'name', 'model']))
        }
        if (values.type === "datetime") {
            setDirectorsTemp(_.sortBy(directorsTemp, ['releaseDate', 'aib']))
        }
        if (values.type === "score") {
            setDirectorsTemp(_.sortBy(directorsTemp, ['score', 'aib']))
        }
    }

    const getUrl = (director) => {
        if (director.imageurl) {
            return director.imageurl
        }
        else {
            return 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/movie-alt2-512.png'
        }
    }

    return (

        <div className="directors-main">


            <div className="view-options">
                <div className="Filters">
                    Filtrowanie
                    <Formik
                        initialValues={{
                            company: '',
                            manu: '',
                            rgb: '',
                        }}
                        onSubmit={(values) => filterDirectors(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Firma karty
                                <Field as="select" name="company">
                                    <option value="">Wybierz firme</option>
                                    {/*_.uniq(_.map(directors, 'aib')).map(maker => <option key={maker} value={maker}>{maker}</option>)*/}
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
                        onSubmit={(values) => sortDirectors(values)}
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