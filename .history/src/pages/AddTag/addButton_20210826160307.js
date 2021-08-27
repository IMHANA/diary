import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class AddTag extends Component {
  render() {
    return (
      <>
        <Input placeholder="#" inputProps={{ 'aria-label': 'description' }} />
      </>
    );
  }
}
