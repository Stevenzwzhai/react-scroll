import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';


const propTypes = {
  dir: PropTypes.string,
  mask: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  show: PropTypes.bool
};


class ActionSheet extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      show: false,
      showContainer: false
    }
  }

  touchMoveHandle(e) {
    e.preventDefault();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    })
    //异步设置内容区域动画
    let timer = setTimeout(() => {
      clearTimeout(timer);
      this.setState({
        showContainer: nextProps.show
      })
    })
  }

  componentDidMount() {
    console.log(this.props.width, this.refs['action-sheet-container'])
    this.refs['action-sheet-container'].style.cssText = `
      ${this.props.height ? 'height:'+this.props.height + 'px;' : '' }
      ${this.props.width ? 'width:'+this.props.width + 'px;' : '' }
    `
  }

  close = (e) => {
    e.stopPropagation();
    this.setState({
      show: false,
      showContainer: false
    })
  }

  render() {
    return (
      <div className={`action-sheet`} onTouchMove={this.touchMoveHandle} style={{'display': this.state.show ? '' : 'none'}}>
        <div ref="action-sheet-container" className={`action-sheet-container ${this.props.dir} ${this.state.showContainer ? 'active-' + this.props.dir : ''}`}>
          {this.props.children}
        </div>
        {this.props.mask ? (<div className="action-sheet-mask" onClick={this.close}></div>) : null}
      </div>
    );
  }
}


ActionSheet.propTypes = propTypes;


export default ActionSheet;


