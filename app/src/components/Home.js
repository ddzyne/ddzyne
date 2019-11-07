import React, { Component } from 'react'
import logo from '../images/ddzyne_logo.svg'
import Isvg from 'react-inlinesvg'
import { changeBackground } from '../actions'
import { connect } from 'react-redux'
import cn from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'

class Home extends Component {
  constructor(props) {
    super(props)
    this.changeBackgroundClick = this.changeBackgroundClick.bind(this)
    this.state = {
      visible: false,
    }
    this.onChangeVisibility = this.onChangeVisibility.bind(this)
  }
  changeBackgroundClick(color) {
    this.props.dispatch(changeBackground(color))
  }
  onChangeVisibility (isVisible) {
    this.setState({visible: isVisible});
  }
  render() {
    const { background } = this.props
    return (
      <VisibilitySensor 
        onChange={this.onChangeVisibility} 
        active={!this.state.visible}
        partialVisibility={true}>
        <div className={`wrapper home ${this.state.visible ? 'animate-me' : ''}`}>
          <div className="item leftside" id="logo">
            <Isvg src={logo}>
              Ddzyne - bespoke webdevelopment & design
            </Isvg>
          </div>
          <div className="item rightside colorpicker">
            <h4>Hoe voel je je vandaag?</h4>
            <div className="big-wrap">
              <Button text="Black is back" color="black" changeBackgroundClick={this.changeBackgroundClick} active={background === 'black'}/>
              <Button text="Zeer sereen" color="white" changeBackgroundClick={this.changeBackgroundClick} active={background === 'white'}/>
              <Button text="Vrolijk" color="pink" changeBackgroundClick={this.changeBackgroundClick} active={background === 'pink'}/>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}

function mapStateToProps(state) {
    const background = state.background.color
    return {
        background: background,
    }
}

export default connect(mapStateToProps)(Home)

class Button extends Component {
  render() {
    const { text, color, changeBackgroundClick, active } = this.props
    const className = cn('button-wrap', {active: active})
    return (
      <div className={className} id={color} onClick={changeBackgroundClick.bind(this, color)}>
        <span className="circle"></span>
        <span className="txt">{text}</span>
      </div>
    )
  }
}