import * as React from 'react';
import { connect } from 'react-redux';

// import styles from './Heatmap.css';
import './Heatmap.css';

const Timer = ({ timer }) => (
  <div className={'main'}>
    <p> Heatmap </p>
  </div>
);

const mapStateToProps = state => ({
  timer: state.timer,
});

export default connect(mapStateToProps)(Timer);
