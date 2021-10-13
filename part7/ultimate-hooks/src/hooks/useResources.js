import axios from "axios"
import { useEffect, useState } from "react"



export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  const getResources = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  useEffect(() => {
    getResources()
  }, [])
 
  const create = async (resource) => {
    await axios.post(baseUrl, resource)
    getResources()
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}