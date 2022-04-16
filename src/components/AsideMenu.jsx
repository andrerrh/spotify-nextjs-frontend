import { useRef, useEffect, useState } from 'react'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from '../../styles/AsideMenu.module.scss'
import OpenButton from './OpenButton'
import requestRefresh from '../../pages/api/login/requestRefresh'

export default function AsideMenu() {

    const [playlists, setPlaylists] = useState()
    const [context, setContext] = useState()
    const [trackIndex, setTrackIndex] = useState()
    const [tracks, setTracks] = useState()

    const menuRef = useRef()
    const arrowLeftRef = useRef()
    const playlistsRef = useRef()
    const tracksRef = useRef()

    const exit = () => {
        localStorage.setItem('access_token', '')
        localStorage.setItem('refresh_token', '')
        window.location.replace('/')
    }

    const getSinglePlaylist = (playlistId) => {
        fetch('api/queries/getplaylistitems', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ access_token: localStorage.getItem('access_token'), playlistId })
        })
            .then(res => res.json())
            .then(data => {
                setTracks(data)
                //Change container from playslists to tracks
                playlistsRef.current.style.transform = "translateX(-100%)"
                tracksRef.current.style.transform = "translateX(-100%)"
                arrowLeftRef.current.style.display = 'initial'
            })
            .catch(err => {
                if (err.status === 401) requestRefresh()
            })

    }

    const moveToPlaylists = () => {
        setTracks()
        playlistsRef.current.style.transform = "translateX(0%)"
        tracksRef.current.style.transform = "translateX(0%)"
        arrowLeftRef.current.style.display = 'none'
    }

    useEffect(() => {
        fetch('api/queries/getplaylists', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ access_token: localStorage.getItem('access_token') })
        })
            .then(res => res.json())
            .then(data => setPlaylists(data.items))
            .catch(err => {
                console.log(err.status)
                if (err.status === 401) requestRefresh()
            })
    }, [])

    //Play track useEffect
    const playTrack = () => {
        fetch('api/controllers/play', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                access_token: localStorage.getItem('access_token'),
                index: trackIndex,
                playlist: context
            })
        })
            .catch(err => {
                console.log(err.status)
                if (err.status === 401) requestRefresh()
            })
    }

    return (
        <aside ref={menuRef} className={`${style.asideMenu} ${style.opened}`}>
            <OpenButton menuRef={menuRef} menuStyles={style} />
            <div className={style.mainContainer}>
                <div className={style.listsContainer}>
                    <div className={style.playlistsContainer} ref={playlistsRef}>
                        {playlists && playlists.map((playlist) => {
                            return <p
                                key={playlist.id}
                                onClick={() => {
                                    getSinglePlaylist(playlist.id)
                                    setContext(playlist.uri)
                                }}
                            >
                                {playlist.name}
                            </p>
                        })}
                    </div>
                    <div className={style.tracksContainer} ref={tracksRef}>
                        <span
                            onClick={moveToPlaylists}
                            className={style.leftArrow}
                            ref={arrowLeftRef}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                        {tracks && tracks.items.map((t, i) => {
                            return <p
                                key={t.track.id}
                                onClick={() => {
                                    setTrackIndex(i)
                                    playTrack()
                                }
                                }
                            >
                                {t.track.name}
                            </p>
                        })}
                    </div>
                </div>
                <button
                    onClick={exit}
                >
                    Sair
                </button>
            </div>
        </aside>
    )
}