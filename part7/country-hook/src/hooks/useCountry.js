import { useState, useEffect } from "react"
import axios from 'axios'


const getCountry = async (name) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    return response
  }catch(e) {
    return e
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getCountry(name)
      setCountry(response)
    })()
   }, [name])

  return country
}