import { useState, useEffect } from 'react'
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faPlay,
    faPause,
    faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'

import style from '../../styles/Controller.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let accessToken = ''

export default function Controller({ currentTrack, isPlaying, requestRefresh }) {

    const [playButton, setPlayButton] = useState()
    const [track, setTrack] = useState()

    useEffect(() => {
        accessToken = localStorage.getItem('access_token')
    }, [])

    useEffect(() => {
        setPlayButton(isPlaying)
    }, [isPlaying])

    useEffect(() => {
        setTrack(currentTrack)
    }, [currentTrack])

    const changePlaybackState = () => {
        console.log(currentTrack)
        if (!isPlaying) {
            fetch('api/controllers/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ access_token: accessToken })
            })
                .catch(err => {
                    if (err.status === 401) requestRefresh()
                })
        } else {
            fetch('api/controllers/pause', {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({ access_token: accessToken })
            })
                .catch(err => {
                    if (err.status === 401) requestRefresh()
                })
        }
    }

    const previousTrack = () => {
        fetch('api/controllers/previous', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ access_token: accessToken })
        })
            .catch(err => {
                if (err.status === 401) requestRefresh()
            })
    }

    const nextTrack = () => {
        fetch('api/controllers/next', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ access_token: accessToken })
        })
            .catch(err => {
                if (err.status === 401) requestRefresh()
            })
    }

    const moveTrack = (e) => {
        fetch('api/controllers/moveTrack', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                access_token: accessToken,
                position: e.target.value
            })
        })
            .catch(err => {
                if (err.status === 401) requestRefresh()
            })
    }

    return (
        <div className={style.controllerContainer}>
            <div className={style.playbackBarContainer}>
                <input
                    type="range"
                    min="0"
                    max={currentTrack?.item?.duration_ms || 100}
                    value={track?.progress_ms || 50}
                    onChange={(e) => setTrack({ ...track, progress_ms: e.target.value })}
                    onMouseUp={moveTrack}
                />
            </div>
            <p className={style.trackInfo}>
                {currentTrack?.item?.name} - {currentTrack?.item?.artists[0]?.name}
            </p>
            <div className={style.controller}>
                <button
                    onClick={previousTrack}
                >
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
                <button
                    onClick={changePlaybackState}
                >
                    {playButton && <FontAwesomeIcon icon={faPause} />}
                    {!playButton && <FontAwesomeIcon icon={faPlay} />}
                </button>
                <button
                    onClick={nextTrack}
                >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </div>
        </div>
    )
}