import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Caolán's Campers",
  description: "Engineer. Van-lifer. Craftsman. Building the campervan he wished he could've bought.",
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
    background-image: radial-gradient(circle at 25% 60%, rgba(128,168,116,0.12) 0%, transparent 50%),
                      radial-gradient(circle at 75% 30%, rgba(147,199,207,0.10) 0%, transparent 50%);
  }
  .page-hero__ornament {
    position: absolute;
    width: 100px;
    height: 100px;
    color: rgba(170, 211, 156, 0.3);
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
    margin-bottom: 1.2rem;
  }
  .page-hero__sub {
    position: relative;
    font-size: 1rem;
    color: rgba(234,243,222,0.75);
    max-width: 540px;
    margin: 0 auto;
  }
  .page-hero__formerly {
    position: relative;
    font-size: 0.72rem;
    color: rgba(234,243,222,0.4);
    letter-spacing: 0.06em;
    font-style: italic;
    margin-top: 0.6rem;
  }
  .story {
    padding: 6rem 0;
    background: var(--white);
  }
  .story__inner {
    max-width: 720px;
    margin: 0 auto;
  }
  .story__image-frame {
    position: relative;
    border: 2px solid rgba(128,168,116,0.3);
    border-radius: 4px;
  }
  .story__image-placeholder {
    aspect-ratio: 3/4;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .story__image-placeholder svg { width: 55%; opacity: 0.35; }
  .story__corner {
    position: absolute;
    width: 44px;
    height: 44px;
    color: var(--sage);
  }
  .story__corner svg { width: 100%; height: 100%; }
  .story__corner--tl { top: -13px; left: -13px; }
  .story__corner--br { bottom: -13px; right: -13px; transform: scale(-1); }
  .story__eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 0.8rem;
  }
  .story__title {
    font-size: 2rem;
    color: var(--dark);
    margin-bottom: 1rem;
  }
  .story__divider { margin-bottom: 1.5rem; }
  .story__body {
    font-size: 0.95rem;
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 1.1rem;
  }
  .story__pull {
    border-left: 3px solid var(--sage);
    padding-left: 1.4rem;
    margin: 2rem 0;
    font-family: var(--font-cinzel), serif;
    font-size: 1.05rem;
    color: var(--dark);
    line-height: 1.6;
    font-style: italic;
  }
  .values {
    padding: 6rem 0;
    background: var(--cream);
  }
  .values__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 0;
  }
  .value-card {
    text-align: center;
    padding: 2.5rem 1.8rem;
    background: var(--white);
    border: 1px solid rgba(128,168,116,0.2);
    border-radius: 4px;
  }
  .value-card__icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 1.4rem;
    color: var(--sage);
  }
  .value-card__icon svg { width: 100%; height: 100%; }
  .value-card__title {
    font-size: 1.05rem;
    color: var(--dark);
    margin-bottom: 0.6rem;
  }
  .value-card__desc {
    font-size: 0.88rem;
    color: var(--text-light);
    line-height: 1.7;
  }
  .process {
    padding: 6rem 0;
    background: var(--dark);
  }
  .process__steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 0;
    position: relative;
  }
  .process__steps::before {
    content: '';
    position: absolute;
    top: 28px;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--teal), var(--sage), transparent);
    opacity: 0.4;
  }
  .process-step {
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .process-step__num {
    width: 56px;
    height: 56px;
    border: 2px solid var(--sage);
    border-radius: 50%;
    margin: 0 auto 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-cinzel), serif;
    font-size: 1.1rem;
    color: var(--mint);
    background: var(--dark);
  }
  .process-step__title {
    font-size: 0.95rem;
    color: var(--cream);
    margin-bottom: 0.5rem;
  }
  .process-step__desc {
    font-size: 0.82rem;
    color: rgba(234,243,222,0.6);
    line-height: 1.65;
  }
  .about-cta {
    padding: 5rem 0;
    background: var(--sage);
    text-align: center;
  }
  .about-cta__title {
    font-size: 1.8rem;
    color: var(--white);
    margin-bottom: 0.8rem;
  }
  .about-cta__sub {
    color: rgba(255,255,255,0.8);
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
  .about-cta .btn--primary {
    background: var(--dark);
    border-color: var(--dark);
  }
  .about-cta .btn--primary:hover {
    background: var(--white);
    border-color: var(--white);
    color: var(--dark);
  }
  @media (max-width: 900px) {
    .story__inner { grid-template-columns: 1fr; gap: 3rem; }
    .story__image-frame { max-width: 380px; margin: 0 auto; }
    .values__grid { grid-template-columns: 1fr 1fr; }
    .process__steps { grid-template-columns: 1fr 1fr; }
    .process__steps::before { display: none; }
  }
  @media (max-width: 600px) {
    .values__grid, .process__steps { grid-template-columns: 1fr; }
  }
`;

export default function AboutPage() {
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
        <symbol id="leaf-motif" viewBox="0 0 40 60">
          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20,58 C20,40 4,30 4,16 C4,6 12,2 20,2 C28,2 36,6 36,16 C36,30 20,40 20,58Z"/>
            <path d="M20,58 C20,40 20,20 20,2" strokeWidth="1"/>
            <path d="M20,30 C14,28 8,22 8,16"/>
            <path d="M20,30 C26,28 32,22 32,16"/>
            <path d="M20,44 C16,42 12,38 10,34"/>
            <path d="M20,44 C24,42 28,38 30,34"/>
          </g>
        </symbol>
      </svg>

      {/* HERO */}
      <section className="page-hero">
        <p className="page-hero__eyebrow">The Man Behind the Van</p>
        <h1 className="page-hero__title">About Caolán</h1>
        <p className="page-hero__sub">Engineer. Van-lifer. Craftsman. Building the campervan he wished he could&apos;ve bought.</p>
        <p className="page-hero__formerly">formerly Mobile Camper Solutions Ireland</p>
      </section>

      {/* STORY */}
      <section className="story">
        <div className="container story__inner">
          <div className="story__text-col">
            <p className="story__eyebrow">The Story</p>
            <h2 className="story__title">He Built His Own First</h2>
            <p className="story__body">Before building for clients, Caolán converted his own Sprinter van into a full-time home. As a qualified engineer with a passion for the outdoors and the open road, he wanted a space that was practical, comfortable, and built to last — not a cookie-cutter kit conversion.</p>
            <p className="story__body">After months of research, wiring, and woodwork, he had a van he was proud of. Friends started asking questions. Then asking for help. Then asking him to build theirs.</p>
            <div className="story__pull">
              &ldquo;No two people travel the same way. That&apos;s why every build starts with a conversation, not a catalogue.&rdquo;
            </div>
            <p className="story__body">Based in Ireland, Caolán works directly with every client from first enquiry to final handover — no project managers in the middle, no outsourced trades. You know exactly who&apos;s working on your van and exactly what you&apos;re paying for.</p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">The Work</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_fourleaf_loops.svg" alt="" width="400" />
          </div>
          <div className="values__grid">
            <div className="value-card">
              <div className="value-card__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"/>
                </svg>
              </div>
              <h3 className="value-card__title">Craftsmanship First</h3>
              <p className="value-card__desc">Every joint, every wire run, every panel fit is done to a standard Caolán would be happy living with himself. Because he has.</p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="24" r="18"/>
                  <path d="M24 12 L24 24 L32 30"/>
                </svg>
              </div>
              <h3 className="value-card__title">Transparent Timelines</h3>
              <p className="value-card__desc">You&apos;ll know the schedule before work begins, get regular updates throughout, and never be left chasing for answers.</p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 36 L8 16 L24 8 L40 16 L40 36 L24 44 Z"/>
                  <path d="M24 8 L24 44 M8 16 L40 16 M8 36 L40 36"/>
                </svg>
              </div>
              <h3 className="value-card__title">No Hidden Costs</h3>
              <p className="value-card__desc">The quote you get is the price you pay. No surprise invoices mid-build. No upselling on parts you don&apos;t need.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title section-header__title--light">The Build Process</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_shamrock.svg" alt="" width="400" className="divider-teal" />
          </div>
          <div className="process__steps">
            <div className="process-step">
              <div className="process-step__num">01</div>
              <h3 className="process-step__title">First Chat</h3>
              <p className="process-step__desc">Tell Caolán how you plan to use the van — weekends, full-time, surf trips. He&apos;ll listen first, advise second.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">02</div>
              <h3 className="process-step__title">Design &amp; Quote</h3>
              <p className="process-step__desc">A layout sketch and itemised quote — no vague estimates. You see exactly what you&apos;re getting and what it costs.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">03</div>
              <h3 className="process-step__title">The Build</h3>
              <p className="process-step__desc">Work begins with regular photo updates. You&apos;re kept in the loop at every stage, with nothing hidden.</p>
            </div>
            <div className="process-step">
              <div className="process-step__num">04</div>
              <h3 className="process-step__title">Handover</h3>
              <p className="process-step__desc">A full walkthrough of every system in your van before you drive away. No manual needed — he&apos;ll show you himself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2 className="about-cta__title">Ready to Start Your Build?</h2>
          <p className="about-cta__sub">No obligation. Just an honest conversation about what you want.</p>
          <Link href="/quote" className="btn btn--primary">Request a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
