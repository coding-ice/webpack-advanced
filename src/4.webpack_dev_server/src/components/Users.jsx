import React, { memo, useEffect,useState } from 'react'
import axios from 'axios'

const Users = memo(() => {
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('/api/users').then(res => {
      setList(res.data)
    })
  }, [])

  return (
    <div>
      <h4>Users:</h4>
      <ul>
        {list.map(({name, age}) => {
          return <li key={name}>{name}-{age}</li>
        })}
      </ul>
    </div>
  )
})

export default Users