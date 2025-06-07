import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import {AppContexProvider} from "./context/AppContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <AppContexProvider>
        <App />
      </AppContexProvider>
    </AuthContextProvider>
  </StrictMode>,
)
