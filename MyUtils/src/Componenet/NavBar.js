import React from "react";
import { useState,useEffect  } from 'react';


export default function NavBar() {
  const [Dark, setDark] = useState("Dark Mode Off");
  const [text, setText] = useState('');
  const [primary, dark] = useState("dark");
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [utterance, setUtterance] = useState(null);
  const [color,setColor] = useState("light");
  const [color1,setColor2] = useState("dark");

  
    useEffect(() => {
      const synthesis = window.speechSynthesis;
      if (synthesis != undefined) {
        setSpeechSynthesis(synthesis);
      }
    }, []);
  
    const speakText = (text) => {
      if (!speechSynthesis) return;
  
      const newUtterance = new SpeechSynthesisUtterance(text);
  
      // Get all available voices
      const voices = speechSynthesis.getVoices();
  
      // Find a female voice
      const femaleVoice = voices.find(
        (voice) => voice.name.includes('female') && voice.lang.startsWith('en')
      );
  
      if (femaleVoice) {
        newUtterance.voice = femaleVoice;
      } else {
        // If a female voice is not found, use the default voice
        newUtterance.voice = voices[0];
      }
  
      setUtterance(newUtterance);
      speechSynthesis.speak(newUtterance);
    };
  
    const stopSpeech = () => {
      if (speechSynthesis && utterance) {
        speechSynthesis.cancel();
      }
    };

  const countWords = (text) => {
    const wordsArray = text.trim().split(/\s+/);
    return wordsArray.length;

  };

  const handleTextareaChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const wordsCount = countWords(text);

  const convertToUpperCase = () => {
    setText(text.toUpperCase());
  };


  const convertToLowerCase = () => {
    setText(text.toLowerCase());
  };


  const copyText = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Text successfully copied to clipboard
        alert('Text copied to clipboard!');
      })
      .catch((error) => {
        // Unable to copy text to clipboard
        console.error('Error copying text to clipboard:', error);
        alert('Failed to copy text to clipboard!');
      });
  };



  const ChangeTitle = () => {
    if (Dark === "Dark Mode Off") {
      setDark("Dark Mode On");
      dark("primary");
      setColor("dark");
      setColor2("white");
    }
    else {
      setDark("Dark Mode Off")
      dark("dark");
      setColor("light");
      setColor2("black");
    }
  };




  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${color} bg-${color}`}>
        <div className="container-fluid" >
          <a className="navbar-brand " href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page" href="#">
                  Home
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link" href="#">
                  About
                </span>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={ChangeTitle}
              />
              <label className={`form-check-label text-${color1}`} htmlFor="flexSwitchCheckDefault">
                {Dark}
              </label>
            </div>
          </div>
        </div>
      </nav>

      <div className={`navbar-${color} bg-${color}`} style={{border:"2px solid white",height:"92.4vh"}}>

    
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="form-group">
              <textarea className="form-control" placeholder="Type here..."
                value={text}
                onChange={handleTextareaChange}  rows="10" cols="20" style={{ resize: "none" }}></textarea>
              <button disabled = {text.length == 0} onClick={convertToUpperCase} className={`btn btn-${primary} mt-4`} >Text In UpperCase</button>
              <button disabled = {text.length == 0} onClick={convertToLowerCase} className={`btn btn-${primary} mt-4 mx-2`} >Text In LowerCase</button>
              <button disabled = {text.length == 0} onClick={copyText} className={`btn btn-${primary} mt-4 `} >Copy All Text</button>
              <button onClick={() => speakText(text)} disabled = {text.length == 0} className={`btn btn-${primary} mt-4 mx-2 `}>Speaking Start</button>
              <button onClick={stopSpeech} disabled = {text.length == 0} className={`btn btn-${primary} mt-4 `} >Speaking Stop</button>
      
              
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-8 ">
            <div className="form-group">
             <span className={`text-${color1}`}>
             Number Of Words: {wordsCount}
              </span> 
              <span className={`mx-4 text-${color1}`}>
              Number Of Character : {text.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}


