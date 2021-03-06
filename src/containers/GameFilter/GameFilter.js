import React, { Component } from 'react';
import { setFilter } from '../../actions/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './GameFilter.css';

class GameFilter extends Component {

  render() {
    // using this data to create the filter buttons. Keeping code dry.
    let filters = [
                   {filter: 'card', iconClass: 'card_hand', iconName: 'style', text: 'Card'},
                   {filter: 'board', iconClass: '', iconName: 'dashboard', text: 'Board'},
                   {filter: 'dice', iconClass: '', iconName: 'casino', text: 'Dice'},
                   {filter: 'sports', iconClass: '', iconName: 'golf_course', text: 'Sport'},
                   {filter: 'all', iconClass: 'all_games_filter', iconName: 'clear', text: 'Clear'}
                  ];

    let filterButtons = filters.map((filter, index) => {
      return  <Link to="#" key={index}
              style={filter.filter === this.props.filter ? {color: '#ff533d'} : {color: 'darkgray'}}
              onClick={() => this.props.setFilter(filter.filter)}>
                <i className={'material-icons ' + filter.iconClass}>
                  {filter.iconName}
                </i>
                <p>
                  <span style={filter.filter === this.props.filter ? {color: '#ff533d'} : {color: '#02558b'}}>{filter.text}</span>
                </p>
              </Link>
    });

    return(
      <div className="filter-bar">

        {filterButtons}

        {/*<h5 className="filter_header"> Filter Game Types</h5>*/}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { filter: state.filter }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (payload) =>
      dispatch(setFilter(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameFilter);
