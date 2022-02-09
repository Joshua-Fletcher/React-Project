import React, { useEffect, useState } from 'react';
import './Home.css';
import Page from './Page';

const word = "abbie".toUpperCase();
const wordArray = word.split("");
export var guessCounter = 0;
const numGuesses = 6;
var guessedWord = false;
var visibility = "hidden";

const Guess = ({ data }) => {
    return (
        <div className="guess">
            {data.map((data, index) => (
                <div key={index} className={"letter letter-" + data.result}><span>{data.value}</span></div>
            ))}
            
        </div>
    );
}

const Grid = () => {
    const [guess, setGuesses] = useState("");
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const onKeyUp = (e) => {
            if(e.keyCode >= 65 && e.keyCode <= 90 && !guessedWord) {
                setGuesses(prev => `${prev}${e.key}`.slice(0,5).toUpperCase());
            }
            else if(e.keyCode === 8 && !guessedWord) {
                setGuesses(prev => prev.slice(0, prev.length - 1));
            }
            else if(e.keyCode === 13 && guess.length === 5 && guessCounter < 6 && !guessedWord){
                setHistory((prev) => {
                    let row = new Array(5);
                    var correct = 0;

                    for(let y=0; y<row.length; y++){
                        row[y] = {
                            value: guess.charAt(y),
                            result: "blank"
                        };
                    }

                    for(let z=0; z<row.length; z++){
                        if(row[z]["value"] === wordArray[z]){
                            correct++;
                            row[z]["result"] = "correct";

                        }
                        else if(wordArray.includes(row[z]["value"])){
                            correct = 0;
                            row[z]["result"] = "inWord";
                        }
                        else {
                            correct = 0;
                            row[z]["result"] = "wrong";
                        }
                    }

                    correct === 5 ? guessedWord = true : guessedWord = false;

                    if(guessedWord) {
                        visibility = "visible";
                    }

                    return prev.concat([row]);
                });
                guessCounter++;
                setGuesses("");
            }
        };

        window.addEventListener("keyup", onKeyUp);

        return () => window.removeEventListener("keyup", onKeyUp);
    }, [guess]);

    const guesses = [...history];
    const currentRow = new Array(5);
    if(guessCounter < 6) {
        for(let x = 0; x < currentRow.length; x++) {
            currentRow[x] = {value: guess.charAt(x), result: "blank"};
        }

        guesses.push(currentRow);

        for(let i = guesses.length; i<6; i++) {
            let blankRow = new Array(5);

            for(let j = 0; j < blankRow.length; j++) {
                blankRow[j] = {value: null, result:"blank"};
            }
            guesses.push(blankRow);
        }
    } 
    
    return (
        <div className='container'>
            <div className='counter'>
                <p style={{visibility: visibility}}>You took {guessCounter} guesses</p>
            </div>
            {guesses.map((data, index) => <Guess key={index} data={data}/>)}
        </div>
    );  
}

export default Grid;