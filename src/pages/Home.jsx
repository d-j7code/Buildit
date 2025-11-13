import EmailSubscription from '../components/EmailSubscription'
import EventCard from '../components/EventCard'
import { mockHackathons, mockMeetups } from '../utils/mockData'

const Home = () => {
  const upcomingHackathons = mockHackathons.filter(h => h.status === 'upcoming').slice(0, 3)
  const upcomingMeetups = mockMeetups.filter(m => m.status === 'upcoming').slice(0, 3)

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Where Developers Build, Learn & Connect</h1>
              <p>
                Join thousands of developers from across the world!<br></br>
                Breaking linguistic and regional barriers to unlock worldwide developer potential.
              </p>
              <div className="hero-actions">
                <button 
                  className="cta-primary"
                  onClick={() => document.querySelector('.featured-events').scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Events
                </button>
                <button 
                  className="cta-secondary"
                  onClick={() => document.getElementById('join-community').scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-events">
        <div className="container">
          <div className="section-header">
            <h2>Upcoming Hackathons</h2>
            <p>Challenge yourself and build innovative solutions</p>
          </div>
          <div className="events-grid">
            {upcomingHackathons.map(hackathon => (
              <EventCard key={hackathon.id} event={hackathon} type="hackathon" />
            ))}
          </div>

          <div className="section-header">
            <h2>Upcoming Meetups</h2>
            <p>Connect with fellow developers and learn together</p>
          </div>
          <div className="events-grid">
            {upcomingMeetups.map(meetup => (
              <EventCard key={meetup.id} event={meetup} type="meetup" />
            ))}
          </div>
        </div>
      </section>

      <EmailSubscription />
    </div>
  )
}

export default Home