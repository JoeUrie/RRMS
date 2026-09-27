const BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not set. Check your .env file.')
}

export class ApiError extends Error {
    status: number
    
    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.name = 'ApiError'
    }
}

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`)

    if (!response.ok) {
        throw new ApiError(
        response.status,
        `Request to ${path} failed with status ${response.status}`
        )
    }

    return response.json() as Promise<T>
}