import axios from "axios";

const JSON_BIN_MASTER_KEY = import.meta.env.VITE_JSON_BIN_MASTER_KEY

const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/666c0dc1e41b4d34e403275e',
  headers: {
    'X-Master-Key': JSON_BIN_MASTER_KEY
  }
})

export async function getAll() {
  const res = await instance.get('/latest')

  return res.data.record
}
