import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class AddTagButton extends Component {
  // constructor(props) {
  //   this.inputRef = React.createRef();
  // }
  // focusTextInput = () => {
  //   this.inputRef.current.focus();
  // };

  render() {
    const { index, handleChangeInput } = this.props;
    return (
      <>
        <Input
          type="text"
          // ref={this.inputRef}
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
