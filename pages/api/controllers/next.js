export default function next(req, res) {
    return new Promise(resolve => {
        fetch(`https://api.spotify.com/v1/me/player/next`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${req.body.access_token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(result => result.json())
            .then(data => {
                res.status(200).send(JSON.stringify(data))
                console.log(data)
                resolve()
            })
            .catch(err => res.send(err))
    })
}