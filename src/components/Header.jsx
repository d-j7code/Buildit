import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LocaleSwitcher } from "lingo.dev/react/client"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToJoin = () => {
    const joinSection = document.getElementById('join-community')
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/#join-community')
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon"><img src="/logo.png" alt="Logo"/></span>
          <span className="logo-text">
            <span>B</span>
            <span>u</span>
            <span>i</span>
            <span>l</span>
            <span>d</span>
            <span>!</span>
            <span>t</span>
          </span>
        </Link>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/hackathons" onClick={() => setIsMobileMenuOpen(false)}>Hackathons</Link>
          <Link to="/meetups" onClick={() => setIsMobileMenuOpen(false)}>Meetups</Link>
          <LocaleSwitcher locales={["en", "es", "fr", "de"]} />
          <button onClick={scrollToJoin} className="join-btn">
            Join Community
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header