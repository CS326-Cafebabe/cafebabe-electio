import React from 'react';
import MessageEntry from './messageEntry';

export default class messageThread extends React.Component {
  render() {
    return (
      <ul className="media-list">
        {React.Children.map(this.props.children, function(child) {
          return (
            <li className="media">
              {child}
            </li>
          )
        })}
        <li className="media">
          <MessageEntry onPost={this.props.onPost} />
        </li>
      </ul>
    )
  }
}
