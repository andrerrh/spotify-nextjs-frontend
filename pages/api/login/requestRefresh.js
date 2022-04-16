let refreshToken
if(typeof window !== "undefined") {
    refreshToken = localStorage.getItem('refresh_token')
}

export default async function requestRefresh () {
    const result = await fetch('/api/login/refreshtoken', {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ refresh_token: refreshToken})
    })
    const data = await result.json()
    localStorage.setItem('access_token', data.access_token)
}