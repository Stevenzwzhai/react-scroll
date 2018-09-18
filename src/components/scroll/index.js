import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';


const propTypes = {
  
};


class Scroll extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      showDefaultPull: false,
      horizon: false
    }
  }

  componentDidMount() {
    const scrollWrapper = this.refs['scroll-wrapper']
    const scrollList = this.refs['scroll-list']
    let { horizon, showDefaultPull } = this.state;
    // ====
    let defaultOffset = showDefaultPull ? -30 : 0;
    this.defaultOffset = defaultOffset;
    let maxTopTransY = 30;
    let maxBottomTransY = 30;
    
    // ====

    const startPos = {}
    let curTrans = this.getTranslate(scrollList)
    let curOffsetY = 0
    let maxTransY = this.getMaxTrans(scrollWrapper, scrollList, horizon);
    this.setTranslate(scrollList, defaultOffset, horizon)
    scrollWrapper.addEventListener('touchstart', (e) => {
      startPos.x = e.touches[0].pageX
      startPos.y = e.touches[0].pageY
      curTrans = this.getTranslate(scrollList, horizon)
    })
    scrollWrapper.addEventListener('touchmove', (e) => {
      if(this.correctTrans(horizon, startPos, {x: e.touches[0].pageX, y: e.touches[0].pageY})){
        return ;
      }
      let offset = horizon ? e.touches[0].pageX - startPos.x + curTrans : e.touches[0].pageY - startPos.y + curTrans
      curOffsetY = horizon ? e.touches[0].pageX - startPos.x : e.touches[0].pageY - startPos.y
      if(offset > 0 && offset > maxTopTransY){
        offset = maxTopTransY + defaultOffset
      }else if(offset < 0 && offset < (-maxTransY-maxBottomTransY)){
        offset = -maxTransY-maxBottomTransY
      }
      this.setTranslate(scrollList, offset, horizon)
    })
    scrollWrapper.addEventListener('touchend', (e) => {
      let offsetY = Math.max((curOffsetY * 0.6 + this.getTranslate(scrollList, horizon)), -maxTransY);
      let maxOffset = horizon ? scrollList.offsetWidth - scrollWrapper.offsetWidth : scrollList.offsetHeight - scrollWrapper.offsetHeight;
      curTrans = this.getTranslate(scrollList)
      if(offsetY > defaultOffset){
        console.log(1)
        offsetY = defaultOffset;
        this.setTranslate(scrollList, offsetY, horizon)
        return ;
      }else if((maxOffset - defaultOffset) < Math.abs(curTrans)){
        console.log(2)
        offsetY = -(scrollList.offsetHeight - scrollWrapper.offsetHeight) - defaultOffset
        this.setTranslate(scrollList, offsetY, horizon)
        return;
      }else{
        console.log(3)
        this.setTranslate(scrollList, offsetY, horizon)
      }
    })
  }

  getMaxTrans (domWrapper, domList, horizon) {
    if (horizon) {
      return domList.offsetWidth - domWrapper.offsetWidth + this.defaultOffset
    } else {
      return domList.offsetHeight - domWrapper.offsetHeight + this.defaultOffset
    }
  }

  getTranslate (dom, horizon) {
      let pattern = new RegExp("\\((.| )+?\\)","igm");
      let st = window.getComputedStyle(dom,null).getPropertyValue("transform");
      if(!st){
          return 0;
      }
      let target = pattern.exec(st)[0];
      if (horizon) {
        return parseInt(target.split(',')[4].split(')')[0]) - 0;
      } else {
        return parseInt(target.split(',')[5].split(')')[0]) - 0;
      }
  }

  setTranslate (dom, value, horizon) {
    if (horizon) {
      dom.style.cssText = `
          transform: translate3d(${value}px, 0, 0);
        `
    } else {
      dom.style.cssText = `
        transform: translate3d(0, ${value}px, 0);
      `
    }
  }

  correctTrans(horizon, startPos, nowPos) {
    let tan = Math.abs((nowPos.y-startPos.y)/(nowPos.x - startPos.x))
    let deg = 360 * tan/2*Math.PI 
    return horizon ? tan > 1 : tan < 1;
  }
  
  render() {
    return (
      <div ref="scroll-wrapper" className="scroll-wrapper">
        <div ref="scroll-list" className="scroll-container">
          { this.state.showDefaultPull && !this.state.horizon ? <div className="scroll-pulldown">下拉刷新</div> : null}
          {this.props.children}
          { this.state.showDefaultPull && !this.state.horizon ? <div className="scroll-pullup">加载更多</div> : null}
        </div>
      </div>
    );
  }
}


Scroll.propTypes = propTypes;


export default Scroll;


