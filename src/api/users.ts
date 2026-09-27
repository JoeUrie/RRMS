import { apiGet } from './client'
import type { User } from '../types/users'

export function getUsers(): Promise<User[]> {
    return apiGet<User[]>('/users')
}