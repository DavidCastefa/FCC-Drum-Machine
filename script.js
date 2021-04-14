const data = [
  { id: 'kick bass', letter: 'Q', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Free%20Kick%20Sample%206-894-Free-Loops.com.mp3' },
  { id: 'snare drum', letter: 'W', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alchemist%20Snare%202-1833-Free-Loops.com.mp3' },
  { id: 'snare rim', letter: 'E', src: 'http://www.electrongate.com/dmxfiles/drumtraks/SCI_RIM.wav' },
  { id: 'sticks', letter: 'A', src: 'http://www.burnkit2600.com/temp/HR-16/HR-16-WAVs/49-drum%20sticks.wav' },
  { id: 'high hat', letter: 'S', src: 'http://www.denhaku.com/r_box/sr16/sr16hat/wet%20hat2.wav' },
  { id: 'ride cymbal', letter: 'D', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Ride%2003-5850-Free-Loops.com.mp3' },
  { id: 'crash cymbal', letter: 'Z', src: 'https://dight310.byu.edu/media/audio/FreeLoops.com/1/1/909%20Crash%2003-5820-Free-Loops.com.mp3' },
  { id: 'floor tom', letter: 'X', src: 'http://cd.textfiles.com/10000soundssongs/WAV/LO_DRUM.WAV' },
  { id: 'high tom', letter: 'C', src: 'http://www.denhaku.com/r_box/drumu/hitom.wav'  },
]

const activeStyle = {
  backgroundColor: '#5CDB95'
};
const inactiveStyle = {
  backgroundColor: '#d1c8c2'
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
    window.focus()
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }
  activatePad() {
    if (this.state.padStyle.backgroundColor === '#5CDB95') {
        this.setState({
          padStyle: inactiveStyle
        });
      } else {
        this.setState({
          padStyle: activeStyle
        });
      }
  }
  handleKeyDown = e => {
    if (e.keyCode === this.props.letter.charCodeAt()) {
      this.audio.play()
      this.audio.currentTime = 0
      this.props.handleDisplay(this.props.id)
      this.activatePad()
      setTimeout(() => this.activatePad(), 200)
    }
  }
  handleClick = () => {
    this.audio.play()
    this.audio.currentTime = 0
    this.props.handleDisplay(this.props.id)
    this.activatePad()
    setTimeout(() => this.activatePad(), 200)
  }
  render() {
    return (
      <div 
        className="drum-pad" 
        id={this.props.id}
        onClick={this.handleClick}
        style={this.state.padStyle}>
        <h1>{this.props.letter}</h1>
        <audio 
          ref={ref => this.audio = ref}
          id={this.props.letter}
          className="clip"
          src={this.props.src}>
        </audio>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "Click or Press Key"
    }
  }
  handleDisplay = display => this.setState({ display })
  render() {
    return(
      <div id="drum-machine">
        <div id="display">
          {this.state.display}
        </div>
        <div id="drum-pads" className="d-flex">
          {data.map(d => (
            <DrumPad
              id={d.id}
              letter={d.letter}
              src={d.src}
              key={d.letter}
              handleDisplay={this.handleDisplay}
            />
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
