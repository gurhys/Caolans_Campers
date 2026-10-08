import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Van Conversion - Caolán's Campers",
  description: "A complete campervan conversion designed around you — layout, electrics, heating, water, windows, and finishings. One person, start to finish.",
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
    width: 100px; height: 100px;
    color: rgba(170, 211, 156, 0.28);
  }
  .page-hero__ornament svg { width: 100%; height: 100%; }
  .page-hero__ornament--tl { top: 16px; left: 16px; }
  .page-hero__ornament--tr { top: 16px; right: 16px; transform: scaleX(-1); }
  .page-hero__breadcrumb {
    position: relative;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(234,243,222,0.45);
    margin-bottom: 0.6rem;
  }
  .page-hero__breadcrumb a { color: var(--teal); text-decoration: none; }
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
    max-width: 620px;
    margin: 0 auto;
    line-height: 1.7;
  }
  .service-intro {
    padding: 6rem 0;
    background: var(--white);
  }
  .service-intro__inner {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  .service-intro__eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--sage);
    margin-bottom: 0.8rem;
  }
  .service-intro__title { font-size: 2rem; color: var(--dark); margin-bottom: 1rem; }
  .service-intro__divider { margin-bottom: 1.5rem; }
  .service-intro__body {
    font-size: 0.95rem;
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  .service-intro__pull {
    border-left: 3px solid var(--sage);
    padding-left: 1.4rem;
    margin: 1.8rem 0;
    font-family: var(--font-cinzel), serif;
    font-size: 0.95rem;
    color: var(--dark);
    line-height: 1.7;
    font-style: italic;
  }
  .service-intro__image {
    background: var(--cream);
    border: 2px solid rgba(128,168,116,0.25);
    border-radius: 4px;
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .service-intro__image svg { width: 60%; opacity: 0.3; }
  .service-corner { position: absolute; width: 40px; height: 40px; color: var(--sage); }
  .service-corner svg { width: 100%; height: 100%; }
  .service-corner--tl { top: -12px; left: -12px; }
  .service-corner--br { bottom: -12px; right: -12px; transform: scale(-1); }
  .process {
    padding: 6rem 0;
    background: var(--cream);
  }
  .process__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 0;
    counter-reset: step;
  }
  .process-step {
    background: var(--white);
    border: 1px solid rgba(128,168,116,0.2);
    border-radius: 4px;
    padding: 2rem 1.6rem;
    position: relative;
    counter-increment: step;
  }
  .process-step::before {
    content: "0" counter(step);
    font-family: var(--font-cinzel), serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: rgba(128,168,116,0.18);
    position: absolute;
    top: 1rem;
    right: 1.4rem;
    line-height: 1;
  }
  .process-step__title { font-size: 1rem; color: var(--dark); margin-bottom: 0.6rem; }
  .process-step__desc { font-size: 0.87rem; color: var(--text-light); line-height: 1.7; }
  .process-step__accent {
    width: 36px;
    height: 3px;
    background: linear-gradient(90deg, var(--sage), var(--teal));
    border-radius: 2px;
    margin-bottom: 1.2rem;
  }
  .whats-included { padding: 6rem 0; background: var(--dark); }
  .included__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 3rem;
  }
  .included-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.4rem;
    border: 1px solid rgba(147,199,207,0.15);
    border-radius: 3px;
    background: rgba(255,255,255,0.04);
  }
  .included-item__icon { width: 36px; height: 36px; flex-shrink: 0; color: var(--teal); }
  .included-item__icon svg { width: 100%; height: 100%; }
  .included-item__title { font-family: var(--font-cinzel), serif; font-size: 0.85rem; color: var(--mint); margin-bottom: 0.35rem; }
  .included-item__desc { font-size: 0.82rem; color: rgba(234,243,222,0.6); line-height: 1.6; }
  .related { padding: 5rem 0; background: var(--white); }
  .related__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2.5rem;
  }
  .related-card {
    border: 1px solid rgba(128,168,116,0.25);
    border-radius: 4px;
    padding: 1.4rem 1.4rem 1.2rem;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, transform 0.2s;
    display: block;
  }
  .related-card:hover { border-color: var(--sage); transform: translateY(-3px); }
  .related-card__title { font-family: var(--font-cinzel), serif; font-size: 0.9rem; color: var(--dark); margin-bottom: 0.4rem; }
  .related-card__desc { font-size: 0.82rem; color: var(--text-light); line-height: 1.6; margin-bottom: 0.8rem; }
  .related-card__arrow { font-size: 0.75rem; color: var(--sage); letter-spacing: 0.08em; font-weight: 700; }
  .service-cta { padding: 5rem 0; background: var(--sage); text-align: center; }
  .service-cta__title { font-size: 1.8rem; color: var(--white); margin-bottom: 0.7rem; }
  .service-cta__sub { color: rgba(255,255,255,0.82); font-size: 0.95rem; margin-bottom: 2rem; max-width: 540px; margin-left: auto; margin-right: auto; }
  .service-cta .btn--primary { background: var(--dark); border-color: var(--dark); }
  .service-cta .btn--primary:hover { background: var(--white); border-color: var(--white); color: var(--dark); }
  @media (max-width: 900px) {
    .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; }
    .process__steps { grid-template-columns: 1fr 1fr; }
    .included__grid { grid-template-columns: 1fr; }
    .related__grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .process__steps { grid-template-columns: 1fr; }
    .related__grid { grid-template-columns: 1fr; }
  }
`;

export default function FullBuildPage() {
  return (
    <>
      <style>{pageStyles}</style>

      <section className="page-hero">
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Full Build</p>
        <p className="page-hero__eyebrow">From Bare Metal to the Road</p>
        <h1 className="page-hero__title">Full Van Conversion</h1>
        <p className="page-hero__sub">A complete conversion designed around you — layout, electrics, heating, water, windows, and finishings. One person, start to finish, no subcontractors.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">The Full Package</p>
            <h2 className="service-intro__title">Everything Under<br />One Roof</h2>
            <p className="service-intro__body">A full conversion is the most personal thing you can put in a van. Caolán handles every part of the build himself — no passing off the electrics to one person and the joinery to another. That means every decision is joined up, every system works together, and nothing gets lost in translation between trades.</p>
            <p className="service-intro__body">He starts with a proper conversation about how you&apos;ll actually use the van. Weekend surfer or full-time remote worker? Solo or with a partner? Need a proper bed or happy with a fold-down? The answers shape everything that follows.</p>
            <div className="service-intro__pull">
              &ldquo;I don&apos;t start building until I understand your life. The van has to fit around you — not the other way around.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Start Your Build</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="10" y="15" width="180" height="110" rx="5"/>
              <path d="M10 35 L40 15 L160 15 L190 35"/>
              <rect x="20" y="50" width="60" height="65" rx="2" strokeDasharray="4 2"/>
              <rect x="90" y="50" width="90" height="40" rx="2" strokeDasharray="4 2"/>
              <rect x="90" y="95" width="90" height="20" rx="2" strokeDasharray="4 2"/>
              <circle cx="165" cy="30" r="6"/>
              <path d="M10 70 L20 70"/>
            </svg>
          </div>
        </div>
      </section>

      {/* BUILD PROCESS */}
      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">How It Works</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_fourleaf_knotwork.svg" alt="" width="400" />
          </div>
          <div className="process__steps">
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">Initial Consultation</h3>
              <p className="process-step__desc">A proper conversation — in person, on a call, or over WhatsApp. Caolán gets to know how you travel, what you need, and what your budget looks like. No pressure, no sales pitch.</p>
            </div>
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">Design &amp; Quote</h3>
              <p className="process-step__desc">Based on your brief, he puts together a layout plan and a detailed quote. Every component is itemised — you know exactly what you&apos;re paying for and why.</p>
            </div>
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">Parts Sourced</h3>
              <p className="process-step__desc">Caolán sources quality components — not the cheapest thing on the shelf, but value-for-money parts he&apos;s used before and trusts. Lead times are agreed upfront.</p>
            </div>
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">The Build</h3>
              <p className="process-step__desc">Work is carried out at his workshop or on location. You&apos;re kept updated throughout — progress photos, questions answered, no surprises at handover.</p>
            </div>
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">Sign-Off &amp; Handover</h3>
              <p className="process-step__desc">Every system is tested and commissioned before handover. Caolán walks you through everything so you know how it all works — and what to do if something ever needs attention.</p>
            </div>
            <div className="process-step">
              <div className="process-step__accent"></div>
              <h3 className="process-step__title">Ongoing Support</h3>
              <p className="process-step__desc">The job doesn&apos;t end at handover. Caolán is available if you ever have questions, need a tweak, or run into something unexpected on the road.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="whats-included">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title section-header__title--light">What&apos;s Included</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_triskele_scroll.svg" alt="" width="300" className="divider-teal" />
          </div>
          <div className="included__grid">
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="4" y="10" width="40" height="28" rx="3"/>
                  <line x1="4" y1="22" x2="44" y2="22"/>
                  <line x1="24" y1="22" x2="24" y2="38"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Layout &amp; Furniture</p>
                <p className="included-item__desc">Custom floor plan, bespoke joinery, bed, kitchen units, seating, and storage built to fit your van&apos;s exact dimensions.</p>
              </div>
            </div>
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="24" cy="20" r="8"/>
                  <path d="M24 4 L24 8 M24 32 L24 36 M8 20 L4 20 M40 20 L44 20"/>
                  <path d="M14 38 L34 38 L30 44 L18 44 Z"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Power &amp; Electrics</p>
                <p className="included-item__desc">Solar panels, leisure battery, 12V circuits, USB points, lighting, and 240V inverter where needed. Engineered and documented.</p>
              </div>
            </div>
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M24 8 C16 8 10 14 10 22 C10 32 24 42 24 42 C24 42 38 32 38 22 C38 14 32 8 24 8Z"/>
                  <circle cx="24" cy="22" r="5"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Heating</p>
                <p className="included-item__desc">Diesel or Chinese heater installed and commissioned. Properly routed exhaust, fuel feed, and controls — warm and safe.</p>
              </div>
            </div>
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M24 6 C24 6 10 20 10 30 C10 38 16 44 24 44 C32 44 38 38 38 30 C38 20 24 6 24 6Z"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Water System</p>
                <p className="included-item__desc">Fresh and grey water tanks, 12V pump, sink, and hot water option. Clean running water wherever you are.</p>
              </div>
            </div>
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="8" y="10" width="32" height="20" rx="2"/>
                  <circle cx="24" cy="20" r="5"/>
                  <path d="M8 30 L4 36 L44 36 L40 30"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Skylights &amp; Windows</p>
                <p className="included-item__desc">Roof vents, fan lights, and side windows cut and sealed properly. Light, ventilation, and a view — without leaks.</p>
              </div>
            </div>
            <div className="included-item">
              <div className="included-item__icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="6" y="18" width="36" height="22" rx="3"/>
                  <path d="M6 22 L14 12 L34 12 L42 22"/>
                  <path d="M14 28 Q18 24 24 26 Q30 28 34 24"/>
                </svg>
              </div>
              <div>
                <p className="included-item__title">Interior Finishings</p>
                <p className="included-item__desc">Wall cladding, ceiling lining, flooring, and upholstery. The details that make it feel like somewhere you actually want to be.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="related">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Individual Services</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_fourleaf_loops.svg" alt="" width="400" />
          </div>
          <p style={{textAlign:'center',fontSize:'0.88rem',color:'var(--text-light)',maxWidth:'580px',margin:'0 auto 2rem'}}>Not ready for a full build? Caolán also takes on individual jobs — one service at a time.</p>
          <div className="related__grid">
            <Link className="related-card" href="/services/layout-storage">
              <p className="related-card__title">Layout &amp; Interior</p>
              <p className="related-card__desc">Custom furniture and floor plans.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
            <Link className="related-card" href="/services/power-and-electrics">
              <p className="related-card__title">Power &amp; Electrics</p>
              <p className="related-card__desc">Solar, batteries, and 12V wiring.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
            <Link className="related-card" href="/services/heating">
              <p className="related-card__title">Heating</p>
              <p className="related-card__desc">Diesel and Chinese heater installs.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
            <Link className="related-card" href="/services/skylights-and-windows">
              <p className="related-card__title">Skylights &amp; Windows</p>
              <p className="related-card__desc">Roof lights, vents, and side windows.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
            <Link className="related-card" href="/services/water-needs">
              <p className="related-card__title">Water Systems</p>
              <p className="related-card__desc">Tanks, pumps, and plumbing.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
            <Link className="related-card" href="/services/finishings">
              <p className="related-card__title">Interior Finishings</p>
              <p className="related-card__desc">Cladding, flooring, and upholstery.</p>
              <span className="related-card__arrow">View service &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2 className="service-cta__title">Ready to Start Your Build?</h2>
          <p className="service-cta__sub">Tell Caolán what you&apos;re thinking. He&apos;ll come back with honest advice, a clear plan, and a price that doesn&apos;t change.</p>
          <Link href="/quote" className="btn btn--primary">Get a Free Quote</Link>
        </div>
      </section>

      <section className="see-also">
        <div className="container">
          <p className="see-also__label">Also Available</p>
          <div className="see-also__grid">
            <Link href="/services/layout-storage" className="see-also__card">Layout</Link>
            <Link href="/services/finishings" className="see-also__card">Finishings</Link>
            <Link href="/services/power-and-electrics" className="see-also__card">Power &amp; Electrics</Link>
            <Link href="/services/heating" className="see-also__card">Heating</Link>
            <Link href="/services/skylights-and-windows" className="see-also__card">Skylights &amp; Windows</Link>
            <Link href="/services/water-needs" className="see-also__card">Water Needs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
