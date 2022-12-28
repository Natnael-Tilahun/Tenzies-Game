import React from 'react'

function Stats(props) {
  return (
        <div className='header-info'>
            <div>
                <label>Attempts: </label>
                <p>{props.rollNo}</p>
            </div>

            <div>
                <label htmlFor=""> ⏱ : </label>
                <p id="game-time">
                    {`${props.gameTime.hours.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.gameTime.minutes.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.gameTime.seconds.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.gameTime.milliseconds.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })}`}
                </p>
            </div>

            <div>
                <label htmlFor="">🏆 : </label>
                <p>{`${props.bestTime.hours.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.bestTime.minutes.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.bestTime.seconds.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })} :
                    ${props.bestTime.milliseconds.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    })}`
                }</p>
            </div>
        </div>
    )
}

export default Stats