export default function login(req, res) {
	return new Promise(resolve => {
		fetch(`https://spotif-backend.herokuapp.com/login`, {
			method: 'GET'
		})
			.then(data => data.text())
			.then(link => {
				res.status(200).send(link)
				resolve()
			})
			.catch(err => {
				res.status(400).send(err)
				resolve()
			})
	})
}