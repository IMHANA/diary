import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

export default class AddTagButton extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  focusTextInput = () => {
    this.textInput.current.focus();
  };

  render() {
    const { index, handleChangeInput } = this.props;
    return (
      <>
        <Input
          type="text"
          ref={this.textInput}
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
