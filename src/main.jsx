import React from 'react'
import ReactDOM from 'react-dom/client'
import {Clock} from './Clock' //change

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Clock /> 
  </React.StrictMode> //change the <.../>
)