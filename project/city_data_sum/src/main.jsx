import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ListProvider } from './context/ListContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ListProvider>
        <App />
    </ListProvider>
    
)
