import React, { useState, useEffect, useRef, useMemo } from "react";
import TinderCard from 'react-tinder-card'
import VideoContainer from "./VideoContainer";
import WsExample from "../WsExample";
import { createOffer } from '../../helpers/WebRTC';

const db = ["joemama", "ligmaballs", "poopmapants"];

function SwipePage() {

    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(() => Array(db.length).fill(0).map((i) => React.createRef()),[])
    const updateCurrentIndex = (val) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    }

    // const canSwipe = currentIndex >= 0;

    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }
    
    // TODO: ONLY CALL PLAYVIDEO ONSWIPE
    return (
        <div className="cardContainer">
            { db.map((match, index) => {
                return (
                    <TinderCard
                        ref={childRefs[index]}
                        className='swipe'
                        key={match}
                        onSwipe={(dir) => swiped(dir, match, index)}
                        onCardLeftScreen={() => outOfFrame(match, index)}
                    >   
                        <VideoContainer match={match}/>
                    </TinderCard>
                )})
            }
            <button id={`button`} style={{position: "absolute", top: "80%"}} onClick={createOffer}>CONNECT</button>
        </div>
    );
}

export default SwipePage;