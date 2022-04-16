export default function moveTrack(req, res) {
    return new Promise(resolve => {
        fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${req.body.position}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${req.body.access_token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(result => console.log(result))
            .then(data => {
                res.status(200).send(JSON.stringify(data))
                resolve()
            })
            .catch(err => res.send(err))
    })
}