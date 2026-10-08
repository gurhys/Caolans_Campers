import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Caolán's Campers",
  description: "Get in touch with Caolán directly — no sales team, no waiting. Talk to the man who builds the vans.",
};

const pageStyles = `
  .page-hero {
    padding: 140px 2rem 80px;
    background: linear-gradient(160deg, var(--dark) 0%, #1e6b7a 60%, #2a7a6a 100%);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .page-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 20% 60%, rgba(128,168,116,0.12) 0%, transparent 50%);
  }
  .page-hero__ornament {
    position: absolute;
    width: 100px;
    height: 100px;
    color: rgba(170, 211, 156, 0.28);
  }
  .page-hero__ornament svg { width: 100%; height: 100%; }
  .page-hero__ornament--tl { top: 16px; left: 16px; }
  .page-hero__ornament--tr { top: 16px; right: 16px; transform: scaleX(-1); }
  .page-hero__eyebrow {
    position: relative;
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 1rem;
  }
  .page-hero__title {
    position: relative;
    font-size: clamp(2rem, 5vw, 3.2rem);
    color: var(--cream);
    margin-bottom: 1rem;
  }
  .page-hero__sub {
    position: relative;
    font-size: 1rem;
    color: rgba(234,243,222,0.75);
    max-width: 520px;
    margin: 0 auto;
  }
  .contact-main {
    padding: 6rem 0;
    background: var(--cream);
  }
  .contact-main__inner {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: start;
  }
  .contact-info__eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 0.8rem;
  }
  .contact-info__title {
    font-size: 1.9rem;
    color: var(--dark);
    margin-bottom: 1rem;
  }
  .contact-info__divider { margin-bottom: 1.5rem; }
  .contact-info__body {
    font-size: 0.95rem;
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 0.9rem;
  }
  .contact-info__note {
    background: var(--white);
    border-left: 3px solid var(--sage);
    padding: 1rem 1.2rem;
    font-size: 0.88rem;
    color: var(--text-light);
    line-height: 1.65;
    margin: 1.5rem 0 2rem;
    border-radius: 0 3px 3px 0;
  }
  .contact-info__links {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .contact-info__link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    color: var(--dark);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s;
  }
  .contact-info__link svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    color: var(--sage);
  }
  .contact-info__link:hover { color: var(--sage); }
  .contact-info__link-label {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-light);
    display: block;
  }
  .contact-form {
    background: var(--white);
    border: 1px solid rgba(128,168,116,0.25);
    border-radius: 4px;
    padding: 2.8rem;
    position: relative;
  }
  .contact-form__title {
    font-size: 1.2rem;
    color: var(--dark);
    margin-bottom: 0.4rem;
  }
  .contact-form__sub {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 1.8rem;
    line-height: 1.55;
  }
  .form__ornament {
    position: absolute;
    width: 32px;
    height: 32px;
    color: var(--mint);
    opacity: 0.55;
  }
  .form__ornament svg { width: 100%; height: 100%; }
  .form__ornament--tl { top: -8px; left: -8px; }
  .form__ornament--br { bottom: -8px; right: -8px; transform: scale(-1); }
  .form__group {
    margin-bottom: 1.2rem;
  }
  .form__group label {
    display: block;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dark);
    margin-bottom: 0.4rem;
    font-weight: 700;
  }
  .form__group input,
  .form__group textarea,
  .form__group select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(128,168,116,0.4);
    border-radius: 3px;
    background: var(--cream);
    color: var(--text);
    font-family: var(--font-lato), sans-serif;
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    resize: vertical;
    appearance: none;
  }
  .form__group input:focus,
  .form__group textarea:focus,
  .form__group select:focus {
    border-color: var(--sage);
    box-shadow: 0 0 0 3px rgba(128,168,116,0.15);
  }
  .form__group input::placeholder,
  .form__group textarea::placeholder { color: rgba(74,99,88,0.45); }
  .faq {
    padding: 5rem 0;
    background: var(--white);
  }
  .faq__list {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .faq__item {
    border: 1px solid rgba(128,168,116,0.25);
    border-radius: 4px;
    overflow: hidden;
  }
  .faq__q {
    padding: 1.2rem 1.5rem;
    background: var(--cream);
    font-family: var(--font-cinzel), serif;
    font-size: 0.92rem;
    color: var(--dark);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .faq__q::after {
    content: '+';
    font-size: 1.2rem;
    color: var(--sage);
    flex-shrink: 0;
  }
  .faq__a {
    padding: 1rem 1.5rem 1.3rem;
    font-size: 0.9rem;
    color: var(--text-light);
    line-height: 1.75;
    border-top: 1px solid rgba(128,168,116,0.15);
  }
  @media (max-width: 900px) {
    .contact-main__inner { grid-template-columns: 1fr; gap: 3rem; }
  }
`;

export default function ContactPage() {
  return (
    <>
      <style>{pageStyles}</style>

      <svg style={{display:'none'}} xmlns="http://www.w3.org/2000/svg">
        <symbol id="celtic-divider" viewBox="0 0 300 30">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="0" y1="15" x2="110" y2="15"/>
            <line x1="190" y1="15" x2="300" y2="15"/>
            <path d="M110,15 C120,5 130,25 150,15 C170,5 180,25 190,15"/>
            <circle cx="150" cy="15" r="4" strokeWidth="2"/>
            <circle cx="130" cy="15" r="2.5"/>
            <circle cx="170" cy="15" r="2.5"/>
          </g>
        </symbol>
      </svg>

      <section className="page-hero">
        <p className="page-hero__eyebrow">Get in Touch</p>
        <h1 className="page-hero__title">Talk to Caolán</h1>
        <p className="page-hero__sub">Drop him a message — no sales team, no waiting. You&apos;re talking directly to the man who&apos;ll be building your van.</p>
      </section>

      <section className="contact-main">
        <div className="container contact-main__inner">
          <div className="contact-info">
            <p className="contact-info__eyebrow">Direct Contact</p>
            <h2 className="contact-info__title">No Middlemen.<br />Just Caolán.</h2>
            <p className="contact-info__body">This is a one-man operation. When you send a message, Caolán reads it. When you call, Caolán answers. He&apos;s hands-on from first conversation to final handshake — that&apos;s the whole point.</p>
            <div className="contact-info__note">
              Caolán&apos;s usually in the workshop during the day, so messages are often quicker than calls. He&apos;ll aim to get back to you the same day.
            </div>
            <div className="contact-info__links">
              <a href="tel:0894774522" className="contact-info__link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
                <span>
                  <span className="contact-info__link-label">Phone</span>
                  089 477 4522
                </span>
              </a>
              <a href="mailto:info@caolans-campers.ie" className="contact-info__link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                <span>
                  <span className="contact-info__link-label">Email</span>
                  info@caolans-campers.ie
                </span>
              </a>
              <a href="https://instagram.com/mobilecampersolutions" className="contact-info__link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                <span>
                  <span className="contact-info__link-label">Instagram</span>
                  @Caolánscampers
                </span>
              </a>
              <a href="https://facebook.com/mobilecampersolutions" className="contact-info__link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M15 2v4h-2a1 1 0 00-1 1v3h3l-.5 4H12v8"/></svg>
                <span>
                  <span className="contact-info__link-label">Facebook</span>
                  @Caolánscampers
                </span>
              </a>
            </div>
          </div>

          <form className="contact-form">
            <h3 className="contact-form__title">Send a Message</h3>
            <p className="contact-form__sub">Tell Caolán a bit about yourself and what you&apos;re after. No commitment, no hard sell.</p>
            <div className="form__group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="Aoife Murphy" />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="aoife@example.ie" />
            </div>
            <div className="form__group">
              <label htmlFor="phone">Phone (optional)</label>
              <input type="tel" id="phone" name="phone" placeholder="087 ..." />
            </div>
            <div className="form__group">
              <label htmlFor="subject">What&apos;s It About?</label>
              <select id="subject" name="subject">
                <option value="">Choose one…</option>
                <option>Full van conversion</option>
                <option>Solar / electrical system</option>
                <option>Heating installation</option>
                <option>Skylights or windows</option>
                <option>Water system</option>
                <option>Interior fit-out</option>
                <option>Just exploring options</option>
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell Caolán what you&apos;re dreaming of…"></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--full">Send Message</button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Common Questions</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_shamrock.svg" alt="" width="400" />
          </div>
          <div className="faq__list">
            <div className="faq__item">
              <div className="faq__q">How long does a full conversion take?</div>
              <div className="faq__a">Every build is different, but a full conversion typically takes 4–8 weeks depending on complexity and the spec you&apos;re after. Caolán will give you a realistic timeline before any work starts — not an optimistic one that slips.</div>
            </div>
            <div className="faq__item">
              <div className="faq__q">Do I need to supply my own van?</div>
              <div className="faq__a">Yes — Caolán works on your van, not a dealer&apos;s stock. He can point you in the right direction if you&apos;re still hunting for the right base vehicle, and will flag anything worth knowing before you commit to buying it.</div>
            </div>
            <div className="faq__item">
              <div className="faq__q">What does a conversion cost?</div>
              <div className="faq__a">It depends entirely on what you want. A basic solar and bed setup is a very different job to a full plumbed and heated build with custom cabinetry. Caolán gives you an honest itemised quote so you can see exactly where the money goes.</div>
            </div>
            <div className="faq__item">
              <div className="faq__q">Will you work on a camper I&apos;m partly building myself?</div>
              <div className="faq__a">Absolutely. Whether you want Caolán to handle specific elements — electrics, heating, skylights — or to step in partway through a self-build, he&apos;s happy to talk through what makes sense.</div>
            </div>
            <div className="faq__item">
              <div className="faq__q">Is there a warranty on the work?</div>
              <div className="faq__a">Yes. Caolán stands behind everything he builds. If something isn&apos;t right, he&apos;ll sort it. That&apos;s what it means to deal with the person who actually did the work.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
