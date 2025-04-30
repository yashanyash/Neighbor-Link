import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//app.jsx

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className='flex-grow max-w-screen-2xl mx-auto px-4 py-6 w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
