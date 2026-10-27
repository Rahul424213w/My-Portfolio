import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { contactLinks } from '../data/socials';

const FORMSPREE_URL = 'https://formspree.io/f/xbdqobez';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

const SUBMIT_LABEL: Record<SendStatus, string> = {
  idle: 'Send Message →',
  sending: 'Sending...',
  sent: 'Sent! ✦',
  error: 'Error! ✖',
};

export default function Contact() {
  const [status, setStatus] = useState<SendStatus>('idle');
  const resetTimer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Form submission failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" data-scene>
      <div className="scene__inner">
        <div className="section-label scene-item" style={{ '--i': 0 } as CSSProperties}>
          <span className="num">03 //</span>
          <h2>Connect</h2>
          <div className="line"></div>
        </div>
        <div className="contact-grid">
          <div className="contact-info scene-item" style={{ '--i': 1 } as CSSProperties}>
            <h3>Let's build something together.</h3>
            <p>
              Open to freelance projects, collaborations, and interesting opportunities. Drop a message or reach out
              via any of the links below.
            </p>
            <div className="status">
              <div className="status-dot"></div>
              Available for new projects
            </div>
            <br />
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="contact-link-item">
                  <div className="contact-icon">{link.icon}</div>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <form
            id="contact-form"
            action={FORMSPREE_URL}
            method="POST"
            onSubmit={handleSubmit}
            className="contact-form scene-item"
            style={{ '--i': 2 } as CSSProperties}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="e.g. Alex Chen" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="hello@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Hey Rahul, I'd love to..." required></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={status === 'sending'}
              style={{
                opacity: status === 'sending' ? 0.7 : 1,
                background: status === 'sent' ? 'var(--cyan)' : status === 'error' ? '#ff4444' : undefined,
              }}
            >
              {SUBMIT_LABEL[status]}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
