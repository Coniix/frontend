import useSWR from "swr";
import useTypingGame from "react-typing-game-hook";
import "../styles.css";
import Timer from "../components/Timer";
import { useState } from 'react';

export const ENDPOINT = "http://localhost:8080";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

const Play = () => {
    const { data, mutate } = useSWR("actors/", fetcher);
    let [text, setText] = useState("");
    let [timerId, setTimerId] = useState<number>();
    let [score, setScore] = useState<number>(0);

    const {
        states: {
          charsState,
          length,
          currIndex,
          currChar,
          correctChar,
          errorChar,
          phase,
          startTime,
          endTime
        },
        actions: { insertTyping, resetTyping, deleteTyping }
      } = useTypingGame(text);

    const handleKey = (key: any) => {
    if (key === "Escape") {
        resetTyping();
    } else if (key === "Backspace") {
        deleteTyping(false);
    } else if (key === "Enter") {
        clearTimeout(timerId);
        updateScore();
        nextWord();
    } else if (key.length === 1) {
        insertTyping(key);
    }
    };

    function updateScore() {

        if(correctChar == length){
            setScore(score + correctChar);
        } else {
            setScore(score - errorChar);
        }
        console.log(phase);
        console.log(correctChar);
        console.log(errorChar);
        console.log(length);
        console.log("score " + score);


        return <div />;
      }

    const nextWord = () => {
        setText(data[0].FirstName.toLowerCase() + " " + data[0].LastName.toLowerCase());
        data.shift();

        //Timer before changing words
        setTimerId(setTimeout(() => {
            updateScore();
            nextWord();
        }, 5000));
    }

    //Start game on click
    const handleClick = async (event: { preventDefault: () => void; }) => {
        nextWord();
        document.getElementById("typing-test")!.focus();        
    }

    return (
        <div>  
            <h1>{!score ? "Play" : 
                <p>Score: {score}</p>
            }</h1>

            {!data ? "Loading..." : 
            <div> 
                <button onClick={handleClick.bind(data)}>Start</button>
            </div>
            }
            <div
        className="typing-test"
        id="typing-test"
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
      >
        {text.split("").map((char: string, index: number) => {
          let state = charsState[index];
          let color = state === 0 ? "black" : state === 1 ? "green" : "red";
          return (
            <span
              key={char + index}
              style={{ color }}
              className={currIndex + 1 === index ? "curr-letter" : ""}
            >
              {char}
            </span>
          );
        })}
      </div>
      {/* {!countdown ? "" :  
          <Timer  max={countdown} />
      } */}
      
    </div> 
    );
}
  
export default Play;