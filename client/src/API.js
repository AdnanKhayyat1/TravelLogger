const DEPLOYED_API_URL = 'https://travel-logger-react.herokuapp.com/';
const API_URL='htt://localhost:1337'

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}
export async function createLogEntry(entry) {
    const apiKey = entry.apiKey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(entry),
    });
    const json = await response.json();
    if(response.ok){
        return json;
    } else {
        const error = new Error(json.message);
        error.response = json;
        throw error;
    }
}
export async function deleteLogEntry(entry) {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'DELETE',
        
        body: entry._id,
    });
    return response.json();
}