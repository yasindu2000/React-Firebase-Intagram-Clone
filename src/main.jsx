import { firebase, FieldValue } from './Lib/Firebase.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FirebaseContext from './Context/Firebase.jsx'
import "react-loading-skeleton/dist/skeleton.css"

createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ firebase,FieldValue }}>
    <App />
    </FirebaseContext.Provider>
)
