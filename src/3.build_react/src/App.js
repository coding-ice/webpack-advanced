import React from 'react'
// import { createRoot } from 'react-dom'
import { createRoot } from '../node_modules/react-dom/client.js'
import Counter from './components/Counter.jsx'

const root = createRoot(document.getElementById('root'))
root.render(<Counter />)
