import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
      counting: false
    };
  }

  // this.intervalHandle;

  step() {
    console.log('tick', this.state.counting);

    if (this.state.counting) {
      setTimeout(() => {
        this.setState(state => ({ time: state.time - 1 }));
        window.requestAnimationFrame(() => this.step());
      }, 1000);
    }
  }

  startCountdown() {
    console.log('--start countdown--');
    this.setState({ counting: true });
    window.requestAnimationFrame(() => this.step());
  }

  stopCountdown() {
    this.setState({ counting: false });
  }

  render() {
    return (
      <div>
        <h2> Counter </h2>
        <p>
          {this.state.time}
        </p>
        <button onClick={() => this.startCountdown()}>
          start
        </button>
        <button onClick={() => this.stopCountdown()}>
          stop
        </button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    counter: state.counter,
  }
}

export default connect(mapStateToProps)(Timer);
