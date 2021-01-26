import ReactDOM from 'react-dom'
import Login from './login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './store'
import React, {Component} from 'react'


ReactDOM.render(<Provider store={store}><Login /></Provider>, document.getElementById('root'))