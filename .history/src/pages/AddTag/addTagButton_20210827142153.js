import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class AddTagButton extends Component {
  handleChange = (e) => {
    const { onChangeTagButton } = this.props;
    const value = e.target.value;
    onChangeTagButton(value);
  };

  render() {
    const { tag } = this.props;

    // const { index, handleChangeInput } = this.props;
    return (
      <>
        <Input
          type="text"
          // ref={this.textInput}
          placeholder="#"
          inputProps={{ 'aria-label': 'description' }}
          onChange={this.handleChange}
          name="inputs"
        />
        <br></br>
      </>
    );
  }
}
