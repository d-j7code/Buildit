import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/footer'
import Home from './pages/Home'
import Hackathons from './pages/Hackathons'
import Meetups from './pages/Meetups'
import HackathonDetail from './pages/HackathonDetail'
import MeetupDetail from './pages/MeetupDetail'
import Partner from './pages/Partner'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/meetups" element={<Meetups />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
          <Route path="/meetup/:id" element={<MeetupDetail />} />
          <Route path="/partner" element={<Partner />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App