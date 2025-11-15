import { useParams } from 'react-router-dom'
import { mockHackathons } from '../utils/mockData'

const HackathonDetail = () => {
  const { id } = useParams()
  const hackathon = mockHackathons.find(h => h.id === parseInt(id))

  if (!hackathon) {
    return <div className="container">Hackathon not found</div>
  }

  return (
    <div className="event-detail">
      <div className="container">
        <div className="event-header">
          {hackathon.image ? (
            <img src={hackathon.image} alt={hackathon.title} />
          ) : (
            <div className="detail-placeholder-image">
              <span className="detail-placeholder-icon">💻</span>
              <p>Hackathon Image</p>
            </div>
          )}
          <div className="event-info">
            <h1>{hackathon.title}</h1>
            <p className="event-date">{new Date(hackathon.date).toLocaleDateString()}</p>
            {hackathon.location && <p className="event-location">{hackathon.location}</p>}
            <div className="event-tags">
              {hackathon.tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="event-content">
          <section>
            <h2>About</h2>
            <p>{hackathon.description}</p>
            <p>{hackathon.longDescription || 'Join us for an exciting hackathon where developers, designers, and innovators come together to build amazing projects in a limited time frame.'}</p>
          </section>

          <section>
            <h2>Details</h2>
            <ul>
              <li><strong>Duration:</strong> {hackathon.duration || '48 hours'}</li>
              <li><strong>Team Size:</strong> {hackathon.teamSize || '2-4 members'}</li>
              <li><strong>Prize Pool:</strong> {hackathon.prizePool || '$10,000'}</li>
              <li><strong>Registration:</strong> {hackathon.status === 'upcoming' ? 'Open' : 'Closed'}</li>
            </ul>
          </section>

          {hackathon.status === 'upcoming' && (
            <section>
              <h2>Register Now</h2>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJOnAipBAi5sQqKDV4ISoSfHqUVFihGss7tGNn9A0gymVqRg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                <button className="register-btn">Register for Hackathon</button>
              </a>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default HackathonDetail