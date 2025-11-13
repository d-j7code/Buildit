import { useState } from 'react'

const Partner = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const response = await fetch('https://formspree.io/f/mwpapwjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setStatus('success')
        setFormData({ email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="partner-page">
      <div className="container">
        <div className="partner-content">
          <h1>Partner with Us</h1>
          <p>Join forces with us to create amazing developer experiences and grow the tech community together.</p>
          
          <form onSubmit={handleSubmit} className="partner-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={status === 'submitting'}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your partnership ideas..."
                rows="6"
                required
                disabled={status === 'submitting'}
              />
            </div>
            
            <button type="submit" disabled={status === 'submitting'} className="submit-btn">
              {status === 'submitting' ? `Sending...` : `Send Message`}
            </button>
          </form>
          
          {status === 'success' && (
            <p className="success-message">{`Thank you! We'll get back to you soon.`}</p>
          )}
          {status === 'error' && (
            <p className="error-message">{`Something went wrong. Please try again.`}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Partner