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
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.props.cancel();
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
      Height: window.innerHeight - 120,
      left_position: 0,
      top_position: 0,
      left_increase: true,
      top_increase: true,
      dx: 2,
      dy: 2,
      interval: 10,
      btnNum: 0,
      value: 2,
      rotate: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.rotateChange = this.rotateChange.bind(this);
  }

  handleChange(event) {
    let speed = event.target.value;
    this.setState({
      value: speed,
      dx: Number(speed),
      dy: Number(speed)
    });
  }

  rotateChange(event) {
    this.setState({
      rotate: event.target.value
    });
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
      if (y >= this.state.Height - 100 - dy * 2) {
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
      <div>

        <div style={{
          width: this.state.Width,
          height: this.state.Height,
          border: 'solid 1px #00bfff',
          margin: 10
        }}
        >
          <div style={{
            position: 'relative',
            margin: 0,
            padding: 0,
            width: '100px',
            height: '100px',
            left: this.state.left_position + 'px',
            top: this.state.top_position + 'px',
            borderRadius: '50%'
          }}
            className={this.btnColors()}
          >
            <div
              style={{
                position: 'relative',
                top: '25px',
                transform: `rotate(${this.state.rotate}deg)`
              }}
            >

              <Clock />
            </div>
          </div>
        </div>

        <div
          style={{
            height: 80,
            width: this.state.Width,
            margin: '10px'
          }}
        >
          <label
            htmlFor='speedRange'
            className='form-range'
          >
            速度 : {this.state.value} 
          </label>
          <input
            id="speedRange"
            className='form-range'
            type='range'
            min='0'
            max='10'
            value={this.state.value}
            onChange={this.handleChange}
          />

          <label
            htmlFor='rotateRange'
            className='form-range'
          >
            回転 : {this.state.rotate} [deg]
          </label>
          <input
            id="rotateRange"
            className='form-range'
            type='range'
            min='0'
            max='360'
            value={this.state.rotate}
            onChange={this.rotateChange}
          />
        </div>

      </div>
    );
  }
}

let App = () => {
  return (
    <div style={{
      position: 'relative'
    }}>
      <Canvas />
    </div>
  );
}

export default App;