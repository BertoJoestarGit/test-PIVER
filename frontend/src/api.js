const API_URL = import.meta.env.VITE_API_URL

export async function getEvents(filters = {}) {
    const params = new URLSearchParams()
    if (filters.user_id) {
        params.append("user_id", filters.user_id)
    }
    if (filters.type) {
        params.append("type", filters.type)
    }
    const res = await fetch(`${API_URL}/events?${params}`)
    return res.json()
}

export async function postEvent(event) {
    const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    })
    return res.json()
}

export async function getUserSummary(user_id) {
    const res = await fetch(`${API_URL}/users/${user_id}/summary`)
    return res.json()
}