import {useState, useEffect} from 'react'

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token')
    console.log('token: ', sessionToken)
    if (sessionToken) {
      setToken(sessionToken)
    } else {
      setToken(null)
    }
  }, [])
  return token
}
