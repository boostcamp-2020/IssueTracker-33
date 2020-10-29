import React, { Component, Fragment } from 'react';

export default class Basic extends Component {
  renderSeparate() {
    return (
      <div>코드를 분리합시다</div>
    );
  }
  render() {
    return (
      <Fragment>
        <span>저는 컴포넌트입니다!</span>
        <span>독립 만세!</span>
        <span>재사용 만세!</span>
        {this.renderSeparate()}
      </Fragment>
    );
  }
}

