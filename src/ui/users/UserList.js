import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { addUserAction, deleteUserAction } from "../../ducks/users/UserActions";
const axios = require('axios')
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
    const getUrl = (user) => {
        if (user.imageurl) {
            return user.imageurl
        }
        else {
            return 'https://icons-for-free.com/iconfiles/png/512/guy+man+user+icon-1320166689116245256.png'
        }
    }

    return (
        <div className="users-main">
            <div className="ItemList">
                <h5>Użytkownicy</h5>
                <Link to={`/users/add`}> <button>Dodaj nowego użytkownika</button></Link>
                {noUsers()}
                <div className="ItemList-users">
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
