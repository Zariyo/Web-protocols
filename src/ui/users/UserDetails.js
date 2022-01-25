import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { editUserAction } from "../../ducks/users/UserActions";
const _ = require('lodash')

const UserDetails = ({ user, cards, history, editUserAction }, props) => {

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
                    {/*<div>Siedziba firmy znajduje się w {user.address}, {user.country}</div>
                    <div>Założona została dnia {new Date(user.creationDate).toLocaleDateString('pl-PL')}</div>
                    <div>Numer kontaktowy do firmy: {user.phone}</div>
                    <div>Wydaje karty dla: {user.supports.map(company => <div key={company}>{company}</div>)}</div>
                    <div>Wydane karty: {_.filter(cards, { 'aib': user.name }).map(card => <div className="released-card" key={card._id}>{<Link to={`/cards/${card._id}`}>{card.name + ' ' + card.model}</Link>}</div>)}</div>
    <Link to={`/users/${user.name}/edit`}><button>Edytuj</button></Link>*/}
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