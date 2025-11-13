import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LocaleSwitcher } from "lingo.dev/react/client"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

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
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛠️</span>
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
        <nav className="nav">
          <Link to="/hackathons">Hackathons</Link>
          <Link to="/meetups">Meetups</Link>
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