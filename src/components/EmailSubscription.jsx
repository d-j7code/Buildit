import { useState } from 'react'
import { useMutation, useAction } from 'convex/react'
import { useLingoLocale } from 'lingo.dev/react/client'
import { api } from '../../convex/_generated/api'

const EmailSubscription = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const addSubscriber = useMutation(api.subscribers.add)
  const sendWelcomeEmail = useAction(api.emails.sendWelcomeEmail)
  const currentLocale = useLingoLocale()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      await addSubscriber({
        email: email,
        language: currentLocale || 'en'
      })
      
      await sendWelcomeEmail({
        email: email,
        language: currentLocale || 'en'
      })
      
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section id="join-community" className="email-subscription">
      <div className="container">
        <h2>Join Our Developer Community</h2>
        <p>Get updates on hackathons, meetups, and community events!</p>
        
        <form onSubmit={handleSubmit} className="subscription-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'submitting'}
          />
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="success-message">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="error-message">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  )
}

export default EmailSubscription