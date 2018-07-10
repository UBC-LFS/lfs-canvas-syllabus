import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { unregister } from './registerServiceWorker'
unregister()

ReactDOM.render(<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>,
  document.getElementsByTagName("HEAD")[0])

ReactDOM.render(<App />, document.getElementById('root'))
