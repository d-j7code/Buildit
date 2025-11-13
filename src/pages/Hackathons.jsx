import { useState } from 'react'
import EventCard from '../components/EventCard'
import { mockHackathons } from '../utils/mockData'

const Hackathons = () => {
  const [filter, setFilter] = useState('all')

  const filteredHackathons = filter === 'all' 
    ? mockHackathons 
    : mockHackathons.filter(h => h.status === filter)

  return (
    <div className="hackathons-page">
      <div className="container">
        <h1>Hackathons</h1>
        
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'upcoming' ? 'active' : ''}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={filter === 'past' ? 'active' : ''}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>

        <div className="events-grid">
          {filteredHackathons.map(hackathon => (
            <EventCard key={hackathon.id} event={hackathon} type="hackathon" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hackathons