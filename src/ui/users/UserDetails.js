import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editUserAction } from "../../ducks/users/UserActions";

const UserDetails = ({ user }, props) => {

    const getUrl = (user) => {
        if (user.imageurl) {
            return user.imgurl
        }
        else {
            return 'https://loans2go.co.uk/wp-content/uploads/2021/10/35a6130fd209f482213be4663dbfc499.png'
        }
    }

    return (

        <div>
            <h5>Konfiguracja przedmiotu w paczce</h5>
            <div>
                <div className="details">
                    <h5>{user.username}</h5>
                    <img alt="" src={getUrl(user)}></img>
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