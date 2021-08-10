import React, { Component, createRef } from 'react';
import { Add, ArrowBack, Flag, ExpandMore, Minimize } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import './newDay.css';
import IconButton from '@material-ui/core/IconButton';
import {Delete, SaveAlt} from '@material-ui/icons';
// import CanvasDraw from "react-canvas-draw";
import {SketchField, Tools} from '../../components/customSketchField';
import { SketchPicker } from 'react-color';


export default class NewDay extends Component {

  state = {
    background: '#fff',
    lineColor:'black'
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };


  handleChangePenColor = (e) => {
    console.log('color: ', e.target.value);
    this.setState=({ lineColor: e.target.value });
  }
  // state = {
  //   color: "#ffc600",
  //   width: "550px",
  //   height: 400,
  //   brushRadius: 10,
  //   lazyRadius: 12
  // };

  // componentDidMount() {
  //   const canvas = this.refs.canvas;
  //   const ctx = canvas.getContext("2d");
  // }


  render() {
    const good = '/image/good.png';

    return (
      <div id="container">
        <div style={{width: "75%", height:"5%"}} id='mid_container'>
          <div id="list_container">
            <TextField
              id="menu_box"
              label="일기찾기"
              color="secondary"
              style={{ width: '80px' }}
            />
            <Add style={{ fontSize: '45px' }} />
            <ArrowBack style={{ fontSize: '45px' }} />
            </div>
          </div>
        <div>
        <div id="writing_date">
          <h2>20210803</h2>
        </div>
        <div id='writing_title'>
          <h3 id='little_title'>#주말 #집 #토마토 #텃밭</h3>
          <div id='title_sticker'>
            <img className="title_sticker" src={good} alt={good} title={good} />
          </div>
        </div>
        <div id='writing_container'>
          {/* <div id='paint_area'></div> */}
          {/* <CanvasDraw brushColor="rgba(155,12,60,0.3)" onChange={() => console.log("onChange")} /> */}
          <SketchField width='550px' 
                        height='400px' 
                        tool={Tools.Pencil} 
                        {...this.state.lineColor}
                        lineWidth={3}
                        
                        backgroundColor='#fff'
                        />
                        
          <div style={{display:"none"}}>
          
          </div>
          {/* <TextField onKeyDown="if(event.keyCode===13) {let v=this.value, s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}" id="write_area" style={{whiteSpace: "pre-line;"}}></TextField> */}
          
          <div className="write_area">
            {/* <textarea className="writing-board"></textarea> */}
            <div className="writing-board" contentEditable={true}>하나</div>
          </div>
          
        </div>
        <div>
        {/* <SketchPicker
        color={ this.state.background }
        onChangeComplete={ this.handleChangeComplete }
      /> */}
      {/* <label for="colorWell">Color:</label> */}
      <input type="color" onChange={this.handleChangePenColor} />
          </div>
        <div id='btn_container'>
        <IconButton cols="20" rows="10" aria-label="delete" id="cancle_btn">
        <Delete />
      </IconButton>
      <IconButton aria-label="save" id="save_btn">
        <SaveAlt />
      </IconButton>
          {/* <span id="cancle_btn">이전</span> */}
          {/* <span id='save_btn'>저장</span> */}
        </div>
        </div>
      </div>
    );
  }
}
