// import React, { useState, useEffect } from "react";
// import "./styles.css";

const speedMultiplierList = [1, 1.5, 2];

function PlayButton() {
  return (
    <svg
      className="play-button"
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28.5" cy="28.5" r="28" fill="white" stroke="black" />
      <path
        d="M43.5 25.4019C45.5 26.5566 45.5 29.4434 43.5 30.5981L24 41.8564C22 43.0111 19.5 41.5677 19.5 39.2583L19.5 16.7417C19.5 14.4323 22 12.9889 24 14.1436L43.5 25.4019Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="15"
          y1="20.5"
          x2="39"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#20C9FF" />
          <stop offset="1" stop-color="#8EFFE4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function PauseButton() {
  return (
    <svg
      className="pause-button"
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28.5" cy="28.5" r="28" fill="white" stroke="black" />
      <rect x="18" y="11" width="6" height="34" fill="#FF6868" />
      <rect x="33" y="11" width="6" height="34" fill="#FF6868" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg
      width="162"
      height="162"
      viewBox="0 0 162 162"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="81" cy="81" r="40" fill="#FFA800" />
      <rect x="74" width="15" height="33" fill="#FFA800" />
      <rect
        x="136.335"
        y="23"
        width="15"
        height="33"
        transform="rotate(45 136.335 23)"
        fill="#FFA800"
      />
      <rect
        x="40.3345"
        y="108"
        width="15"
        height="33"
        transform="rotate(45 40.3345 108)"
        fill="#FFA800"
      />
      <rect x="74" y="129" width="15" height="33" fill="#FFA800" />
      <rect
        x="129"
        y="88"
        width="15"
        height="33"
        transform="rotate(-90 129 88)"
        fill="#FFA800"
      />
      <rect
        y="88"
        width="15"
        height="33"
        transform="rotate(-90 0 88)"
        fill="#FFA800"
      />
      <rect
        x="17"
        y="30.6066"
        width="15"
        height="33"
        transform="rotate(-45 17 30.6066)"
        fill="#FFA800"
      />
      <rect
        x="110"
        y="118.607"
        width="15"
        height="33"
        transform="rotate(-45 110 118.607)"
        fill="#FFA800"
      />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg
      width="213"
      height="213"
      viewBox="0 0 213 213"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="213" height="213" fill="#303030" />
      <circle cx="131" cy="107" r="81" fill="url(#paint1_linear)" />
      <ellipse cx="90" cy="92.5" rx="84" ry="81.5" fill="#303030" />
      <defs>
        <linearGradient
          id="paint1_linear"
          x1="203.5"
          y1="65"
          x2="124"
          y2="182"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.131178" stop-color="#FFDE2F" />
          <stop offset="1" stop-color="#B6A374" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ModeSwitchButton({ darkMode, toggleDarkMode }) {
  return (
    <button
      className="dark-mode-button"
      type="button"
      onClick={() => toggleDarkMode()}
    >
      {darkMode ? MoonIcon() : SunIcon()}
    </button>
  );
}

function InputForm({ handleSubmit }) {
  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <label htmlFor="minuteInput">Countdown: </label>
      <input
        placeholder="(Min)"
        min="0"
        step="1"
        inputmode="numeric"
        id="minuteInput"
      />
      <button className="start-button" type="submit">
        Start
      </button>
    </form>
  );
}

function TimerComponent({ remainingTime, toggleTimer, activeTimer }) {
  return (
    <div className="timer-holder">
      <p
        className={`timer  
        // Wanted the timer to stop blinking after reaching "0"
        ${
          remainingTime <= 10 && remainingTime > 0
            ? "blinking-text"
            : "no-blinks"
        } 
        ${remainingTime <= 20 ? "red-text" : "defaultColor"}`}
      >
        {Math.floor(remainingTime / 60) < 10
          ? `0${Math.floor(remainingTime / 60)}`
          : Math.floor(remainingTime / 60)}
        :
        {remainingTime % 60 < 10
          ? `0${remainingTime % 60}`
          : remainingTime % 60}
      </p>
      <button onClick={() => toggleTimer()} className="play-pause-button">
        {activeTimer ? PauseButton() : PlayButton()}
      </button>
    </div>
  );
}

function App() {
  const [speedMultiplier, setSpeedMultiplier] = React.useState(1);
  const [timerLength, setTimerLength] = React.useState(1); // set in Minutes
  const [activeTimer, setActiveTimer] = React.useState(false);
  const [remainingTime, setRemainingTime] = React.useState(timerLength * 60); //set in seconds
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    let timer;
    function countdown() {
      setRemainingTime(remainingTime - 1);
    }
    if (activeTimer) {
      timer = setInterval(countdown, 1000 / speedMultiplier);
    }
    return () => clearInterval(timer);
  }, [activeTimer, timerLength, speedMultiplier, remainingTime]);

  // Conditional Timing Text
  function ConditionalText() {
    if (remainingTime === 0) {
      setActiveTimer(false);
      return <p className="conditional warning text">Time's up!</p>;
    } else if (remainingTime <= (timerLength * 60) / 2) {
      return (
        <p className="conditional warning text">More than halfway there!</p>
      );
    } else {
      return <p className="conditional invisible-warning">Invisible Text</p>;
    }
  }
  // input event handler
  function handleSubmit(event) {
    let minuteInputVal = event.target.elements.minuteInput.value;
    event.preventDefault();
    setTimerLength(minuteInputVal);
    setRemainingTime(minuteInputVal * 60);
    setActiveTimer(true);
  }
  // Pause/Play functionality
  function toggleTimer() {
    setActiveTimer(!activeTimer);
  }
  // Toggle Dark Mode
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    <div className={`main-holder ${darkMode ? "dark-mode" : "default"}`}>
      <ModeSwitchButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1 className="title-text">Varfaj Partners Timer Exercise</h1>
      <InputForm handleSubmit={handleSubmit} />
      <ConditionalText />
      <TimerComponent
        remainingTime={remainingTime}
        toggleTimer={toggleTimer}
        activeTimer={activeTimer}
      />
      <ul className="speed-button-holder">
        {speedMultiplierList.map(item => (
          <li key={item}>
            <button
              className={`speed-button ${
                speedMultiplier === item ? "selected" : "unselected"
              }`}
              type="button"
              onClick={() => setSpeedMultiplier(item)}
            >
              {item}X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'))