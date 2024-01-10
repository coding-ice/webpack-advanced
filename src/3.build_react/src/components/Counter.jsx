import React, { memo,useState } from 'react'

const Counter = memo(() => {
  const [count, setCount] = useState(0)
  return (
    <div className='count'>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <span style={{padding: '0 8px'}}>{count}</span>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
})

export default Counter