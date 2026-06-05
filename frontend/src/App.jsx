import { useState, useEffect } from "react"
import { getEvents, postEvent, getUserSummary } from "./api"

function App() {
    const [events, setEvents] = useState([])
    const [summary, setSummary] = useState(null)
    const [filterUserId, setFilterUserId] = useState("")
    const [filterType, setFilterType] = useState("")
    const [form, setForm] = useState({ user_id: "", type: "login", payload: "" })

    useEffect(() => {
        fetchEvents()
    }, [])

    async function fetchEvents() {
        const filters = {}
        if (filterUserId) {
            filters.user_id = filterUserId
        }
        if (filterType) {
            filters.type = filterType
        }
        const data = await getEvents(filters)
        setEvents(data)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const event = {
            user_id: form.user_id,
            type: form.type,
            payload: form.payload ? JSON.parse(form.payload) : null
        }
        await postEvent(event)
        fetchEvents()
    }

    async function handleSummary() {
        const data = await getUserSummary(filterUserId)
        setSummary(data)
    }

    return (
        <div>
            <h1>Event Tracker</h1>

            <h2>Créer un événement</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="user_id" value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="login">login</option>
                    <option value="transaction">transaction</option>
                    <option value="report">report</option>
                </select>
                <input placeholder='payload (JSON)' value={form.payload} onChange={e => setForm({ ...form, payload: e.target.value })} />
                <button type="submit">Créer</button>
            </form>

            <h2>Événements</h2>
            <input placeholder="Filtrer par user_id" value={filterUserId} onChange={e => setFilterUserId(e.target.value)} />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="">Tous</option>
                <option value="login">login</option>
                <option value="transaction">transaction</option>
                <option value="report">report</option>
            </select>
            <button onClick={fetchEvents}>Filtrer</button>
            <button onClick={handleSummary}>Voir résumé</button>

            {summary && (
                <div>
                    <h3>Résumé de {summary.user_id}</h3>
                    <p>Total : {summary.total_events}</p>
                    <p>Premier : {summary.first_event}</p>
                    <p>Dernier : {summary.last_event}</p>
                    <pre>{JSON.stringify(summary.events_by_type, null, 2)}</pre>
                </div>
            )}

            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.user_id} — {event.type} — {event.created_at}</li>
                ))}
            </ul>
        </div>
    )
}

export default App