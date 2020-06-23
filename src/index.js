import { HelloWorld } from './app/HelloWorld'
import './styles/index.scss'

// Create heading node
const greeting = document.createElement('h1')
greeting.textContent = HelloWorld()

// Append SVG and heading nodes to the DOM
const app = document.querySelector('#root')
app.append(greeting)