import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    return(
    <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/hackathons">Hackathons</Link></li>
                <li><Link to="/meetups">Meetups</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <ul>
              <li><Link to="/partner">Partner with Us 🫱🏻‍🫲🏻</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Buidlt. Built by David J.</p>
          </div>
        </div>
      </footer>)
}

export default Footer;