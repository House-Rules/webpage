import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { gameSelected } from '../../actions/action';
import TraditionalRules from '../../components/TraditionalRules/TraditionalRules';
import AlternatesList from '../AlternatesList/AlternatesList';
// import TopButton from '../../components/TopButton/TopButton';
import services from '../../services/services';
import utils from '../../utilities/utilities';
import './SingleGame.css';

class SingleGame extends Component {
  constructor() {
    super()
    this.state = {
      normalRules: true
    }
  };

  // navigation to the traditional and house rules buttons to slide the view down once clicked.
  handleRulesNav = (boolean, element) => {
    this.setState({normalRules: boolean});
    setTimeout(() => utils.scrollTo(element), 400);
  }

  handleDeleteGame = (gameId) => {
    services.deleteGame(gameId);
    this.props.history.push('/webpage/games');
  };

  componentDidMount() {
    utils.scrollTo('myNavBar');
  };

  render() {
    let game = this.props.selectedGame;
    if (!game) {
      // using a fetch call if the filter is undefined
      const id = this.props.match.params.id;
      services.fetchSingleGame(id)
      .then(data => {
        this.props.gameSelected(data);
      });
    };

    return (
      <div className="singleGame" id="singleGame">
        <div className='card card-block'>

          <div className="title-section">
            <div>
              <h2 className='card-title alert'>{game.title}</h2>
            </div>

            <div className="arrow_container">
              <Link to='/webpage/games'>
                <i className="material-icons md-36">clear</i>
              </Link>
            </div>
          </div>

          <div className="title_block">
            <div className='icon_bar'>
              <div>
                <i className="material-icons group" id={game.category}>{utils.getIconType(game.category)}</i>
                <p>Category</p>
                <p>{game.category === 'sports' ? 'sports' : game.category}</p>
              </div>

              <div>
                <i className="material-icons group">group</i>
                <p>Players</p>
                <p className=''>{game.numberOfPlayers}</p>
              </div>

              <div>
                <i className="material-icons face">face</i>
                <p>Ages</p>
                <p className=''>{game.playerAgeRange}</p>
              </div>
            </div>

            <div className='game_objective'>
              <h5>How to Win</h5>
              <p>{game.objective}</p>
            </div>

            <div className="rules-buttons">
              <div className={this.state.normalRules ? "btn active" : "btn"}
                onClick={() => this.handleRulesNav(true, 'bottom')}>
                Traditional Rules
              </div>
              <div className={!this.state.normalRules ? "btn active" : "btn"}
                onClick={() => this.handleRulesNav(false, 'bottom')}>
                House Rules
              </div>
            </div>
          </div>


          {this.state.normalRules ?
             <TraditionalRules rules={game.rules}/> :
             <div id="altGamesList">
               <AlternatesList />
             </div>}

        </div>

        {/*<Link to="#" id="delete_button" className="btn" onClick={() => this.handleDeleteGame(`${game.id}`)}><i className="material-icons">delete</i></Link>*/}

        {/*<TopButton />*/}

        {/*<div className="footer">
        </div>*/}

        <div id="bottom"></div>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    gamesList: state.gamesList,
    selectedGame: state.selectedGame
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameSelected: (payload) => dispatch(gameSelected(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleGame));
