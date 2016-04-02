import React from 'react';
import messageEntry from './commententry';

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
          <messageEntry onPost={this.props.onPost} />
        </li>
      </ul>
    )
  }
}
