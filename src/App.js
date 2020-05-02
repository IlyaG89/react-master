import React from 'react'
import './App.css'

const obj = {}
const check = obj?.a?.b?.c
function App() {
  return (
    <div>
      <p>
        Hi There { check }
      </p>
    </div>
  )
}

export default App
