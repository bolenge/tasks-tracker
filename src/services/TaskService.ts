import axios from "axios";
import { Task } from "../types/task";

const JSON_BIN_MASTER_KEY = import.meta.env.VITE_JSON_BIN_MASTER_KEY

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/666c0dc1e41b4d34e403275e',
  headers: {
    'X-Master-Key': JSON_BIN_MASTER_KEY
  }
})

/**
 * Returns list of all tasks
 * @returns tasks
 */
export async function getAll(): Promise<Task[]> {
  const res = await instance.get('/latest')

  return res.data.record
}

/**
 * Update all tasks
 * @param {Task[]} tasks new tasks version
 */
export async function updateAll(tasks: Task[]): Promise<void> {
  await instance.put('/', tasks)
}
