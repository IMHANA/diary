import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class AddTagButton extends Component {
  render() {
    const { index, handleChangeInput } = this.props;
    return (
      <>
        <Input
          placeholder="#"
          inputProps={{ 'aria-label': 'description' }}
          onChange={(e) => {
            handleChangeInput(e, index);
          }}
          name="inputs"
        />
        <br></br>
      </>
    );
  }
}
