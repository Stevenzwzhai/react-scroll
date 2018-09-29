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


class Scroll extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      active: ''
    }
  }

  touchMoveHandle(e) {
    e.preventDefault();
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     active: 'active'
    //   })
    // }, 3000)
  }
  render() {
    console.log(this.props.show)
    return (
      <div className={`action-sheet ${this.props.dir} ${this.props.show ? 'active-' + this.props.dir : ''}`} onTouchMove={this.touchMoveHandle}>
        <div ref="scroll-list" className="action-sheet-container">
          {this.props.children}
        </div>
        {this.props.mask ? (<div class="action-sheet-mask"></div>) : null}
      </div>
    );
  }
}


Scroll.propTypes = propTypes;


export default Scroll;


