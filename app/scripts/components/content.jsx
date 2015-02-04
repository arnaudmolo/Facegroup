import React from 'react/addons';

import binderMixin from './../mixins/binder';

import GroupStore from './../stores/group-store';

import Sidebar from './sidebar.jsx';
import Group from './group.jsx';

function getStateFromStores() {
  return {
    groups: GroupStore.getAll()
  };
}

export default class Content extends React.Component {

  constructor(props) {
    super(props);
    this.binder();
    this.state = getStateFromStores();
  }

  componentDidMount() {
    GroupStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

  render() {

    return (
      <div className="application-container">
        <Sidebar groups={this.state.groups} />
        <div className="page-with-nav-content">
          <div className="posts-container">
            <Group />
          </div>
        </div>
      </div>
    );

  }

}

Object.assign(Content.prototype, binderMixin);
