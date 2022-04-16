import { useRef } from 'react'

import style from '../../styles/OpenButton.module.scss'

export default function OpenButton({ menuRef, menuStyles}) {

    const buttonRef = useRef()

    const toggleMenu = () => {
        const menu = menuRef.current
        const button = buttonRef.current
        if (!menu.classList.contains(menuStyles.opened)) {
            menu.classList.add(menuStyles.opened)
            button.classList.add(style.opened)
        } else {
            menu.classList.remove(menuStyles.opened)
            button.classList.remove(style.opened)
        }
    }

    return (
        <button
            className={`${style.button} ${style.opened}`}
            onClick={toggleMenu}
            ref={buttonRef}
        >
            <div className={style.firstLine}></div>
            <div className={style.secondLine}></div>
            <div className={style.thirdLine}></div>
            <div className={style.fourthLine}></div>
        </button>
    )
}