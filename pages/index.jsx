import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../styles/Home.module.scss'


const login = async () => {
	const result = await fetch('/api/login/getcode')
	if (result.status === 400) return alert("Error logging in")
	window.location.href = await result.text()
}

const requestAccessToken = async (code, state) => {
	const result = await fetch('/api/login/requesttoken', {
		method: 'POST',
		headers: {
			'Content-Type': 'Application/json'
		},
		body: JSON.stringify({code, state})
	})

	if(result.status === 400) return alert("Error loggin in")
	const tokens = await result.json()
	localStorage.setItem('access_token', tokens.access_token)
	localStorage.setItem('refresh_token', tokens.refresh_token)
	window.location.pathname = "/main"
}

export default function Home() {
	const router = useRouter()
	useEffect(() => {
		if(router?.query?.code) requestAccessToken(router.query.code, router.query.state)
	}, [router?.query?.code])

	return (
		<div className={styles.homeContainer}>
			<section className={styles.main}>
				<button
					onClick={login}
				>
					Login with spotify <FontAwesomeIcon icon={faSpotify} />
				</button>
			</section>
			<footer className={styles.footer}>
				<h3 className={styles.madeBy}>Made by André Rodrigues, 2022</h3>
				<a href="https://www.github.com/andrerrh">
					<FontAwesomeIcon icon={faGithub} />
				</a>
			</footer>
		</div>
	)
}