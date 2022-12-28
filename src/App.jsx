import { useState, useEffect, useRef } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Stats from './components/Stats'
import Modal from './components/Modal'

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rollNo, setRollNo] = useState(0)
    const [bestTime, setBestTime] = useState({ "hours": 0, "minutes": 0, "seconds": 0, "milliseconds": 0 })
    const [gameTime, setGameTime] = useState({ "hours": 0, "minutes": 0, "seconds": 0, "milliseconds": 0 })
    const [isTheFirst, setIsTheFirst] = useState(true)
    const [isItBestTime, setIsItBestTime] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        // check the winner
        if (allHeld && allSameValue) {
            setTenzies(true)
            currentBestTimeRef.current = gameTime
            let previousBestTime
            if (localStorage.getItem("bestTime")) {
                setBestTime(currentBestTimeRef.current)
                previousBestTime = JSON.parse(localStorage.getItem('bestTime'))
                checkBestTime(currentBestTimeRef.current, previousBestTime)
            }
            else {
                localStorage.setItem('bestTime', JSON.stringify(currentBestTimeRef.current))
                setBestTime(currentBestTimeRef.current)
            } 
            clearInterval(timeRef.current)
        }
    }, [dice])


    // save best time to local storage
    useEffect(() => {
        if (localStorage.getItem("bestTime")) {
            setBestTime(JSON.parse(localStorage.getItem('bestTime')))
        }
        return () => clearInterval(timeRef.current)
    }, [])

    // check best time
    function checkBestTime(currentBT, prevBT) {
        const date1 = new Date(2022, 0, 1, +currentBT.hours, +currentBT.minutes, +currentBT.seconds, +currentBT.milliseconds);
        const date2 = new Date(2022, 0, 1, +prevBT.hours, +prevBT.minutes, +prevBT.seconds, +prevBT.milliseconds);
        if (date2.getTime() > date1.getTime()) {
            localStorage.setItem('bestTime', JSON.stringify(currentBestTimeRef.current))
            setIsItBestTime(true)
            setTimeout(() => {
                setIsItBestTime(false)
            }, 5000);
            return true
        }
        else {
            setBestTime(JSON.parse(localStorage.getItem('bestTime')))
        }
    }

    let timeRef = useRef();
    let currentBestTimeRef = useRef()

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function holdDice(id) {
        if (isTheFirst) {
            handleGameTime()
        }
        setIsTheFirst(false)
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function rollDice() {
        if (!tenzies) {
            setRollNo(prevRoll => prevRoll + 1 )
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRollNo(1)
            clearInterval(timeRef.current)
            setGameTime({ "hours": 0, "minutes": 0, "seconds": 0, "milliseconds": 0 })
        }
    }


    // take each game play time
    function handleGameTime() {
        timeRef.current = setInterval(() => {
            setGameTime(prevTime => {
                if (prevTime.milliseconds == 1000) {
                    return { ...prevTime, seconds: prevTime.seconds + 1, milliseconds: 0 }
                }
                if (prevTime.seconds == 60) {
                    return { ...prevTime, minutes: prevTime.minutes + 1, seconds: 0 }
                }
                if (prevTime.minutes == 60) {
                    return { ...prevTime,hours: prevTime.hours + 1 , minutes: 0, seconds: 0 }
                }

                return { ...prevTime, milliseconds: prevTime.milliseconds + 10 } 
            })
        }, 100);
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <>
            <Stats gameTime={gameTime} bestTime={bestTime} rollNo={ rollNo } />
        <main className='relative'>
            {tenzies && <Confetti />}
            {isItBestTime && <Modal bestTime = { bestTime } />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
                {tenzies ?
                    <button 
                        className="roll-dice" 
                        id='new-game'
                        onClick={() => { rollDice(); handleGameTime()}}>New Game</button> :
                    <button 
                        className="roll-dice" 
                        id='roll-dice'
                        onClick={rollDice}
                    > Roll </button> 
                }
            </main>
        </>
    )
}
