import { Link } from 'react-router-dom'

const EventCard = ({ event, type }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="event-card">
      <div className="event-image">
        {event.image ? (
          <img src={event.image} alt={event.title} />
        ) : (
          <div className="placeholder-image">
            <span className="placeholder-icon">
              {type === 'hackathon' ? '💻' : '👥'}
            </span>
          </div>
        )}
        <div className="event-status">
          {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
        </div>
      </div>
      
      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        <div className="event-meta">
          <span className="event-date">{formatDate(event.date)}</span>
          {event.location && <span className="event-location">{event.location}</span>}
        </div>
        
        <div className="event-tags">
          {event.tags?.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        
        <Link to={`/${type}/${event.id}`} className="event-link">
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default EventCard