import React from 'react';

import EditableChildren from './NotNeeded/EditableChildren';

export default class Drawing extends React.Component {
  render() {
    return (
      <div>
        <EditableChildren>
          <p id="0">Another zero</p>
          <p id="1">Another one</p>
          <p id="2">Another two</p>
          <p id="3">Another three</p>
          <p id="4">Another four</p>
        </EditableChildren>
      </div>
    );
  }
}
