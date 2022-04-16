export default function playTrack(req, res) {
    return new Promise(resolve => {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${req.body.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                context_uri: req.body.playlist,
                offset: {
                    position: req.body.index
                },
                position_ms: 0
            })
        })
            .then(result => result.json())
            .then(data => {
                res.status(200).send(JSON.stringify(data))
                resolve()
            })
            .catch(err => res.send(err))
    })
}