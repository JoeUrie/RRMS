import { apiGet } from './client'
import type { User } from '../types/user'

export function getUsers(): Promise<User[]> {
    return apiGet<User[]>('/users')
}