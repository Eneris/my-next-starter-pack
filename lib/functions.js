import fetch from 'isomorphic-unfetch'

const apiUrl = 'https://animefest.azurewebsites.net/api/v1'
const language = 'cs'

export const timeFormat = date => {
  let result = (new Date(date)).toLocaleTimeString('cs-CZ', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Prague'
  })

  return result
}

export const formatDate = date => (new Date(date)).toLocaleString('cs-CZ')

export const isServer = () => typeof window === 'undefined'

export const deepCompare = (a, b) => JSON.stringify(a) === JSON.stringify(b)
