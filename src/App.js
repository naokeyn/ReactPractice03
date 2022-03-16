import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    setInterval(
      () => this.timerID = this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ time: new Date() })
  }

  displayTime() {
    const nowTime = this.state.time;
    const year = nowTime.getFullYear();
    const month = ("0" + (nowTime.getMonth() + 1)).slice(-2);
    const date = ('0' + nowTime.getDate()).slice(-2);
    const hour = ('0' + nowTime.getHours()).slice(-2);
    const minute = ('0' + nowTime.getMinutes()).slice(-2);
    const second = ('0' + nowTime.getSeconds()).slice(-2);
    return (
      `${year}/${month}/${date} ${hour}:${minute}:${second}`
    );
  }

  render() {
    return (
      <div>
        {this.displayTime()}
      </div>
    );
  }
}

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Width: window.innerWidth - 20,
      Height: window.innerHeight - 20,
      left_position: 0,
      top_position: 0,
      left_increase: true,
      top_increase: false,
      dx: 2,
      dy: 2,
      interval: 10,
      btnNum: 0
    };
  }

  btnColors() {
    let colors = [
      'primary',
      'info',
      'success',
      'warning',
      'danger'
    ];
    let num = this.state.btnNum % 5;
    let btnColor = colors[num];
    return (
      'btn btn-' + btnColor 
    );
  }

  componentDidMount() {
    setInterval(
      () => this.MoveID = this.move(),
      this.state.interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.MoveID);
  }

  move() {
    let x = this.state.left_position;
    let y = this.state.top_position;
    let x_add = this.state.left_increase;
    let y_add = this.state.top_increase;
    let dx = this.state.dx;
    let dy = this.state.dy;
    if (x_add) {
      this.setState({ left_position: x + dx });
      if (x >= this.state.Width - 100 - dx * 2) {
        this.setState({
          left_increase: false,
          btnNum: this.state.btnNum + 1
        });
      }
    }
    else {
      this.setState({ left_position: x - dx });
      if (x <= dx) {
        this.setState({
          left_increase: true,
          btnNum: this.state.btnNum + 1
        })
      }
    }
    if (y_add) {
      this.setState({ top_position: y + dy });
      if (y >= this.state.Height - 50 - dy * 2) {
        this.setState({
          top_increase: false,
          btnNum: this.state.btnNum + 1
        });
      }
    }
    else {
      this.setState({ top_position: y - dy });
      if (y <= dy) {
        this.setState({
          top_increase: true,
          btnNum: this.state.btnNum + 1
        });
      }
    }

  }

  render() {
    return (
      <div style={{
        width: this.state.Width,
        height: this.state.Height,
        border: 'solid 1px #00bfff',
        margin: 10,
        position: 'absolute'
      }}
      >
        <div style={{
          position: 'relative',
          margin: 0,
          padding: 0,
          width: '100px',
          height: '50px',
          left: this.state.left_position + 'px',
          top: this.state.top_position + 'px'
        }}
          className={this.btnColors()}
        >
          <Clock />
        </div>

      </div>
    );
  }
}

const App = () => {
  return (
    <div style={{
      position: 'relative'
    }}>
      <Canvas />
    </div>
  );
}

export default App;