import { useParams } from 'react-router-dom'
import { mockMeetups } from '../utils/mockData'
"use i18n";

const MeetupDetail = () => {
  const { id } = useParams()
  const meetup = mockMeetups.find(m => m.id === parseInt(id))

  if (!meetup) {
    return <div className="container">Meetup not found</div>
  }

  return (
    <div className="event-detail">
      <div className="container">
        <div className="event-header">
          {meetup.image ? (
            <img src={meetup.image} alt={meetup.title} />
          ) : (
            <div className="detail-placeholder-image">
              <span className="detail-placeholder-icon">👥</span>
              <p>Meetup Image</p>
            </div>
          )}
          <div className="event-info">
            <h1>{meetup.title}</h1>
            <p className="event-date">{new Date(meetup.date).toLocaleDateString()}</p>
            {meetup.location && <p className="event-location">{meetup.location}</p>}
            <div className="event-tags">
              {meetup.tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="event-content">
          <section>
            <h2>About</h2>
            <p>{meetup.description}</p>
            <p>{meetup.longDescription || 'Join fellow developers for networking, learning, and sharing experiences in our tech community.'}</p>
          </section>

          <section>
            <h2>Details</h2>
            <ul>
              <li><strong>Duration:</strong> {meetup.duration || '2-3 hours'}</li>
              <li><strong>Format:</strong> {meetup.format || 'In-person'}</li>
              <li><strong>Capacity:</strong> {meetup.capacity || '50 attendees'}</li>
              <li><strong>Cost:</strong> {meetup.cost || 'Free'}</li>
            </ul>
          </section>

          {meetup.agenda && (
            <section>
              <h2>Agenda</h2>
              <ul>
                {meetup.agenda.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {meetup.status === 'upcoming' && (
            <section>
              <h2>RSVP</h2>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJOnAipBAi5sQqKDV4ISoSfHqUVFihGss7tGNn9A0gymVqRg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <button className="register-btn">RSVP for Meetup</button>
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeetupDetail