import classNames from 'classnames'
import React, {Component, PropTypes} from 'react'
import css from './BlockLoader.css'

function BlockLoader(props) {
  const {width, height, color, ...other} = props;

  const style = Object.assign({}, {
    width,
    height: height || width
  }, other.style);

  const views = [];
  for (let i = 1; i <= 9; i++) {
    views.push(renderCube(color, i));
  }

  return (
    <div className={css.skCubeGrid} style={style}>
      {views}
    </div>
  );
}

function renderCube(color, i) {
  const cubeStyle = {
    backgroundColor: color
  };
  const cssKey = 'skCube' + i;
  const className = classNames(css.skCube, css[cssKey]);
  return (
    <div key={i} className={className}>
      <div className={css.skInnerCube} style={cubeStyle} />
    </div>
  );
};

BlockLoader.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
  color: PropTypes.string
};

BlockLoader.defaultProps = {
  color: '#eaeaea'
};

export default BlockLoader;

