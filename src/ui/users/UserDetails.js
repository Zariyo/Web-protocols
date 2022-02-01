import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editUserAction } from "../../ducks/users/UserActions";

const UserDetails = ({ user,history }, props) => {

    const getUrl = (user) => {
        if (user.imageurl) {
            return user.imageurl
        }
        else {
            return 'https://icons-for-free.com/iconfiles/png/512/guy+man+user+icon-1320166689116245256.png'
        }
    }

    return (

        <div>
            <button onClick={() => (history.goBack())}>Powrót</button>
            <h5>{user.username}</h5>
            <div>
                <div className="details">
                    <img alt="" src={getUrl(user)}></img>
                    <div>Kontakt: {user.email}</div>
                    <div><Link to={`/users/${user.username}/edit`}><button>Edytuj</button></Link></div>
                    <Link to={`/users/${user.username}/chat`}><button>Dyskusja</button></Link>
                </div>


            </div>
        </div>
    )
};


const mapStateToProps = (state, props) => ({
    user: state.users.find(user => user.username === props.match.params.name),
    cards: state.cards
});

const mapDispatchToProps = {
    editUserAction
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetails));