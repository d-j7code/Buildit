import { useState } from 'react'
import EventCard from '../components/EventCard'
import { mockMeetups } from '../utils/mockData'

const Meetups = () => {
  const [filter, setFilter] = useState('all')

  const filteredMeetups = filter === 'all' 
    ? mockMeetups 
    : mockMeetups.filter(m => m.status === filter)

  return (
    <div className="meetups-page">
      <div className="container">
        <h1>Meetups</h1>
        
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
          {filteredMeetups.map(meetup => (
            <EventCard key={meetup.id} event={meetup} type="meetup" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Meetups