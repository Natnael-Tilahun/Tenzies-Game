import React from 'react'

function Modal(props) {
  return (
         <div className='best-score-text' id='best-time-div'>
            <h3>🏆 Congratulation!</h3>
            <p>You got best time score.</p>
            <p className='score'>
                <strong>
                    {`${props.bestTime.hours.toLocaleString("en-US", {
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
                        })}`}
                </strong>
            </p>
        </div>
        )
    }

export default Modal