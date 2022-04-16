import { useEffect, useState, useRef } from 'react'

import style from '../styles/Main.module.scss'
import AsideMenu from '../src/components/AsideMenu'
import Controller from '../src/components/Controller'
import requestRefresh from './api/login/requestRefresh'

let accessToken = ''

export default function Main() {

    const [currentImage, setCurrentImage] = useState()
    const [isPlaying, setIsPlaying] = useState()
    const [currentTrack, setCurrentTrack] = useState()

    const mainRef = useRef()


    const getCurrentTrack = () => {
        fetch('api/queries/getcurrenttrack', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ access_token: accessToken })
        })
            .then(res => res.json())
            .then(data => {
                if(data?.error?.status !== 429) {
                    setCurrentImage(data.item.album.images[0].url)
                    setCurrentTrack(data)
                    setIsPlaying(data.is_playing)
                    // console.log(data)
                    mainRef.current.style.backgroundImage = `url(${data.item.album.images[0].url})`
                    setTimeout(() => getCurrentTrack(), 1000)
                } else {
                    getCurrentTrack()
                }
            })
            .catch(err => {
                if (err.status === 401) requestRefresh()
                console.log(err)
                getCurrentTrack()
            })
    }

    useEffect(() => {
        accessToken = localStorage.getItem('access_token')
        getCurrentTrack()
    }, [])

    return (
        <>
            <div className={style.mainBackground} ref={mainRef}>
            </div>
            <div className={style.mainContainer}>
                <AsideMenu />
                <section className={style.displayContainer}>
                    <div className={style.currentImageContainer}>
                        <img src={currentImage} alt="trackimg" />
                    </div>
                </section>
                <Controller
                    requestRefresh={requestRefresh}
                    isPlaying={isPlaying}
                    currentTrack={currentTrack} />
            </div>
        </>
    )
}