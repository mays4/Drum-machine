const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const audioClips2 = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};
const soundsGroup = {
  heaterKit: audioClips,
  smoothPianoKit: audioClips2
}



function App() {
  const [volume,setVolume] = React.useState(1)
  const [recording,setRecording] = React.useState("");
  const [power,setPower]=React.useState(true);
  const [speed,setSpeed]=React.useState(0.5);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundsGroup[soundType]);
  const playRecording =()=>{
    let index = 0;
    let recordArray = recording.split("");
   const interval = setInterval(()=>{
    const audioTag = document.getElementById(recordArray[index]);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play() 
    index++;
   },speed * 600);
   setTimeout(
     ()=> clearInterval(interval),600 * speed * recordArray.length-1
   )
  }
  const changeGroup=()=>{
    setSoundName("")
    if(soundType==='heaterKit'){
      setSoundType("smoothPianoKit");
      setSounds(soundsGroup.smoothPianoKit)
      setSoundName("smoothPianoKit")
    }else{
      setSoundType("heaterKit");
      setSounds(soundsGroup.heaterKit)
      setSoundName("heaterKit")
    }

  }
 const stop=()=>{
   setPower(!power)
   
   
 }
  return (
    <>
      <div id="drum-machine">
        <div id="display" >
          { power ? (<>
           { sounds.map((clip) =>(
               <Pad key={clip.id} clip={clip} volume={volume}
                setSoundName = {setSoundName}
               setRecording={setRecording}
               />
           ))} 
         </>):(<>{ sounds.map((clip) =>(
               <Pad key={clip.id} clip={clip} volume={0}
        
               />
           ))}</>) }
          <br/>
        </div>
        
        <div className="button">
           <p> Power</p>
          <div >
           <label class="switch">
             <input onClick={stop} type="checkbox" />
            <span  class="slider"></span>
          </label>
        
          </div>
          <br/>
          <div>
          <h4>name</h4>
          <input type="text" value={soundName || soundName[soundType]}  className="w-50"/>
          </div>
          <br/>
          <h4 >Volume</h4>
          <input max="1"   min="0"  step="0.01" type="range"  value={volume}
          onChange={(e)=> setVolume(e.target.value)}  className="w-50"/>
          <h3>{recording}</h3>
          {recording &&
          <><button onClick={playRecording} className="btn btn-success">play</button>
          <button onClick={()=>setRecording("")} className="btn btn-danger">clear</button>
          <br/>
          <h4>Speed</h4>
          <input max="1.2"   min="0.1" step="0.01"  type="range" value={speed}
          onChange={(e)=> setSpeed(e.target.value)} className="w-50"/>
          </>}

          <p >Bank</p>
          <label class="switch">
             <input type="checkbox" />
            <span   onClick={changeGroup} class="slider"></span>
          </label>
        </div>
      </div>
    </>
  );
};
function Pad({clip,volume,setRecording,setSoundName}){
  const [active,setActive]= React.useState(false)

  React.useEffect(() => {
    document.addEventListener('keydown',handleKeyPress);
    return () => {
      document.removeEventListener('keydown',handleKeyPress);
    }
  },[])
  const handleKeyPress=(e)=>{
    if(e.keyCode === clip.keyCode){
      playSound();
    }
  }
  const playSound=()=>{
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true)
    setTimeout(()=> setActive(false,500));
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play() 
    setRecording((prev) => prev + clip.keyTrigger + "");
    setSoundName(clip.id);
 }
  return(
    <>
 
    <button onClick={playSound} className={`drum-pad btn btn-secondary  ${active && "btn-warning"}`}  >
      <audio  className="clip"   id={clip.keyTrigger} src={clip.url}/>
      {clip.keyTrigger} 
    </button>
    
    </>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
