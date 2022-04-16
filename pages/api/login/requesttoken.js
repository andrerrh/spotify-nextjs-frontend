export default function requestToken(req, res) {
	return new Promise(resolve => {
		fetch(`https://spotif-backend.herokuapp.com/request_token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req.body)
		})
			.then(result => result.json())
			.then(data => {
				res.status(200).send(JSON.stringify(data))
				resolve()
			})
			.catch(err => res.send(err))
	})
}