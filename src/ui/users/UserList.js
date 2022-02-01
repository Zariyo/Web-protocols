import { connect } from "react-redux";
import { Field, Form, Formik } from "formik"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addUserAction, deleteUserAction } from "../../ducks/users/UserActions";
import {v4 as uuidv4 } from 'uuid';
const axios = require('axios')
const _ = require('lodash')
const UsersList = ({ users, addUserAction, deleteUserAction }, props) => {


    const getUsers = async () => {
        console.log("def")
        await axios.post("http://localhost:5000/users/reload")
        await axios.get("http://localhost:5000/users")
            .then(async function (response) {
                console.log(response.data.allUsers)
                await response.data.allUsers.map(user => (addUserAction(user)))
            })
    }

    const [usersTemp, setUsersTemp] = useState(users)

    useEffect(() => {
        setUsersTemp(users)
    }, [users])

    useEffect(() => {
        if (users.length === 0) {
            getUsers()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteUser = async (user) => {
        deleteUserAction(user)
        await axios.delete(`http://localhost:5000/users/${user._id}`).then()
        console.log(users)
        setUsersTemp(usersTemp.filter(el => el._id !== user._id))
    }

    const noUsers = () => {
        if (users.length === 0) {
            return <button onClick={() => getUsers()}>Odswiez dane</button>
        }
    }

    const filterUsers = (values) => {
        console.log("filtering")
        console.log(values)
        let filteredUsers = users
        if (values.country) {
            filteredUsers = _.filter(filteredUsers, { 'country': values.country })
        }
        if (values.supports) {
            filteredUsers = _.filter(filteredUsers, { 'supports': values.supports })
        }
        setUsersTemp(filteredUsers)
    }

    const sortUsers = (values) => {
        console.log("sorting by " + values.type)
        if (values.type === "alphabet") {
            setUsersTemp(_.sortBy(usersTemp, ['name', 'creationDate']))
        }
        if (values.type === "datetime") {
            setUsersTemp(_.sortBy(usersTemp, ['creationDate', 'name']))
        }
    }

    const getUrl = (user) => {
        if (user.imgurl) {
            return user.imgurl
        }
        else {
            return 'https://loans2go.co.uk/wp-content/uploads/2021/10/35a6130fd209f482213be4663dbfc499.png'
        }
    }

    return (
        <div className="movies-main">
            <div className="view-options">
                <div className="Filters">
                    <Formik
                        initialValues={{
                            country: ''
                        }}
                        onSubmit={(values) => filterUsers(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="company">
                                Kraj firmy
                                <Field as="select" name="country">
                                    <option value="">Wybierz kraj</option>
                                    {_.uniq(_.map(users, 'country')).map(maker => <option key={uuidv4()} value={maker}>{maker}</option>)}
                                </Field>
                            </div>
                            Tworzy karty dla:
                            <div className="manu">
                                AMD
                                <Field type="checkbox" name="supports" value="amd" />
                                Nvidia
                                <Field type="checkbox" name="supports" value="nvidia" />
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
                        onSubmit={(values) => sortUsers(values)}
                        enableReinitialize={true}>
                        <Form>
                            <div className="sort-select">
                                <Field as="select" name="type">
                                    <option key="1" value="-">Wybierz sortowanie</option>
                                    <option key="2" value="alphabet">Alfabetycznie</option>
                                    <option key="3" value="datetime">Data wydania</option>
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
                <h5>Użytkownicy</h5>
                <Link to={`/users/add`}> <button>Dodaj nowego użytkownika</button></Link>
                {noUsers()}
                <div className="ItemList-movies">
                    {usersTemp.map(user => {
                        return (
                            <div className="Item" key={user._id}>
                                <Link to={`/users/details/${user.username}`}>
                                    <img alt="" src={getUrl(user)}></img>
                                    {user.username}</Link>
                                <button onClick={() => deleteUser(user)}>Usuń</button>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        downloaded: state.downloaded,
    };
}

const mapDispatchToProps = {
    addUserAction,
    deleteUserAction
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
