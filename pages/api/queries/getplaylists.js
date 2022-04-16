export default function getPlaylists(req, res) {
	return new Promise(resolve => {
		fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
			method: 'GET',
			headers: {
                'Authorization': `Bearer ${req.body.access_token}`,
				'Content-Type': 'application/json'
			},
		})
			.then(result => result.json())
			.then(data => {
				res.status(200).send(JSON.stringify(data))
				resolve()
			})
			.catch(err => send(err))
	})
}