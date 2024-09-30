import axios from 'axios'
import { token } from '../env'

const ApiDiscord = axios.create({
  baseURL: 'https://discord.com/api/v9/',
  headers: {
    authorization: token,
  },
})

export default ApiDiscord
