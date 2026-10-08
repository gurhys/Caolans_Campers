"use client";
import Link from "next/link";
import { useState } from "react";

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
  .page-hero__breadcrumb { position: relative; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(234,243,222,0.45); margin-bottom: 0.6rem; }
  .page-hero__breadcrumb a { color: var(--teal); text-decoration: none; }
  .page-hero__eyebrow { position: relative; font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--teal); margin-bottom: 1rem; }
  .page-hero__title { position: relative; font-size: clamp(2rem, 5vw, 3.2rem); color: var(--cream); margin-bottom: 1rem; }
  .service-intro { padding: 6rem 0; background: var(--white); }
  .service-intro__inner { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: center; }
  .service-intro__eyebrow { font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.8rem; }
  .service-intro__title { font-size: 2rem; color: var(--dark); margin-bottom: 1rem; }
  .service-intro__body { font-size: 0.95rem; color: var(--text-light); line-height: 1.8; margin-bottom: 1rem; }
  .service-intro__image { background: var(--cream); border: 2px solid rgba(128,168,116,0.25); border-radius: 4px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }
  .service-intro__image svg { width: 55%; opacity: 0.3; }
  .service-quote { background: var(--cream); padding: 5rem 2rem; }
  .service-quote__head { text-align: center; max-width: 700px; margin: 0 auto 2.5rem; }
  .service-quote__title { font-size: 1.8rem; color: var(--dark); margin-bottom: 0.5rem; }
  .service-quote__sub { font-size: 0.9rem; color: var(--text-light); }
  .service-quote__estimate { max-width: 900px; margin: 2rem auto 0; background: var(--dark); border-radius: 4px; padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
  .service-quote__val-label { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(234,243,222,0.4); margin-bottom: 0.2rem; }
  .service-quote__val { font-family: var(--font-cinzel), serif; font-size: 1.8rem; color: var(--mint); }
  .service-quote__note { font-size: 0.75rem; color: rgba(234,243,222,0.45); max-width: 280px; line-height: 1.5; }
  .option-group { display: grid; gap: 0.6rem; max-width: 900px; margin: 0 auto; }
  .option-group--3 { grid-template-columns: repeat(3, 1fr); }
  .opt-check-card { display: block; border: 2px solid rgba(128,168,116,0.25); border-radius: 3px; padding: 0.9rem 1rem; cursor: pointer; transition: border-color 0.18s, background 0.18s; position: relative; background: white; user-select: none; }
  .opt-check-card:hover { border-color: var(--sage); background: rgba(128,168,116,0.05); }
  .opt-check-card--checked { border-color: #39cccc; background: rgba(57,204,204,0.07); }
  .opt-check-card--checked::after { content: "✓"; position: absolute; top: 6px; right: 8px; color: #39cccc; font-size: 0.9rem; font-weight: 700; }
  .opt-check-card__name { font-family: var(--font-cinzel), serif; font-size: 0.82rem; color: var(--dark); margin-bottom: 0.25rem; }
  .opt-check-card__desc { font-size: 0.73rem; color: var(--text-light); line-height: 1.5; }
  .service-cta { padding: 5rem 0; background: var(--sage); text-align: center; }
  .service-cta__title { font-size: 1.8rem; color: var(--white); margin-bottom: 0.7rem; }
  .service-cta__sub { color: rgba(255,255,255,0.82); font-size: 0.95rem; margin-bottom: 2rem; }
  .service-cta .btn--primary { background: var(--dark); border-color: var(--dark); }
  .service-cta .btn--primary:hover { background: var(--white); border-color: var(--white); color: var(--dark); }
  @media (max-width: 900px) { .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; } }
  @media (max-width: 700px) { .option-group--3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .option-group--3 { grid-template-columns: 1fr; } }
`;

type Checks = { light: boolean; charge: boolean; battery: boolean; solar: boolean; induction: boolean; gas: boolean; mains: boolean };
const DEFAULTS: Checks = { light: false, charge: false, battery: false, solar: false, induction: false, gas: false, mains: false };
const COSTS = {
  light:     { min: 200, max: 500  },
  charge:    { min: 150, max: 300  },
  battery:   { min: 400, max: 1200 },
  solar:     { min: 500, max: 1500 },
  induction: { min: 300, max: 800  },
  gas:       { min: 150, max: 450  },
  mains:     { min: 300, max: 700  },
};

function fmt(n: number) { return "€" + n.toLocaleString("en-IE"); }

export default function PowerAndElectricsPage() {
  const [checks, setChecks] = useState<Checks>(DEFAULTS);

  function toggle(key: keyof Checks) {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const entries = (Object.keys(checks) as (keyof Checks)[]).filter(k => checks[k]);
  const total = entries.reduce((acc, k) => ({ min: acc.min + COSTS[k].min, max: acc.max + COSTS[k].max }), { min: 0, max: 0 });
  const estText = entries.length === 0 ? "Select options above" : `${fmt(total.min)} – ${fmt(total.max)}`;

  const card = (key: keyof Checks, name: string, desc: string) => (
    <div
      key={key}
      className={`opt-check-card${checks[key] ? " opt-check-card--checked" : ""}`}
      onClick={() => toggle(key)}
    >
      <div className="opt-check-card__name">{name}</div>
      <div className="opt-check-card__desc">{desc}</div>
    </div>
  );

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
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Power &amp; Electrics</p>
        <p className="page-hero__eyebrow">12V Systems</p>
        <h1 className="page-hero__title">Power &amp; Electrics</h1>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">Why It Matters</p>
            <h2 className="service-intro__title">The Backbone of Every Build</h2>
            <p className="service-intro__body">A van&apos;s electrical system is the one thing you really don&apos;t want to get wrong. Undersized cables, poorly fused circuits, and dodgy connections are a fire risk — full stop. Caolán designs every system from scratch, sized to your actual usage, not a generic template.</p>
            <p className="service-intro__body">As a qualified engineer, he understands load calculations, cable ratings, and fault protection in a way most conversion builders simply don&apos;t. Every circuit is fused correctly, every connection is solid, and the whole system is documented so you know exactly what&apos;s in your van.</p>
            <Link href="/quote" className="btn btn--primary">Discuss Your Power Needs</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="20" y="20" width="160" height="110" rx="4"/>
              <path d="M60 70 L80 40 L100 70 L120 40 L140 70"/>
              <path d="M40 95 L160 95"/>
              <circle cx="65" cy="95" r="6"/>
              <circle cx="100" cy="95" r="6"/>
              <circle cx="135" cy="95" r="6"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="service-quote" id="estimate">
        <div className="container">
          <div className="service-quote__head">
            <h2 className="service-quote__title">Estimate Your Power Setup</h2>
            <p className="service-quote__sub">Select the components you need — the cost range updates instantly. No commitment required.</p>
          </div>
          <div className="option-group option-group--3">
            {card("light",     "Lighting",              "LED strip and spot lighting throughout the van.")}
            {card("charge",    "Charging Ports & Plugs", "USB-A, USB-C, and 12V power points throughout.")}
            {card("battery",   "Leisure Battery",        "Deep-cycle battery, isolator, and battery management system.")}
            {card("solar",     "Solar Panels",            "Roof-mounted panels with MPPT charge controller.")}
            {card("induction", "Induction Cooker",        "Portable induction hob wired to your leisure battery via inverter.")}
            {card("gas",       "Gas Cooker",              "Gas hob with proper bottle storage, regulator, and safety cut-off.")}
            {card("mains",     "Mains Hookup",            "240V hookup socket. Plug in on campsites for free charging.")}
          </div>
          <div className="service-quote__estimate">
            <div>
              <p className="service-quote__val-label">Rough Estimate</p>
              <p className="service-quote__val">{estText}</p>
            </div>
            <p className="service-quote__note">Ballpark only — not a quote. Get in touch for a real number based on your van and spec.</p>
            <Link href="/quote" className="btn btn--primary">Full Quote →</Link>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2 className="service-cta__title">Talk Power with Caolán</h2>
          <p className="service-cta__sub">Not sure how much solar you need, or whether lithium is worth it for you? Ask him — he&apos;s happy to talk it through with no strings attached.</p>
          <Link href="/quote" className="btn btn--primary">Get a Free Quote</Link>
        </div>
      </section>

      <section className="see-also">
        <div className="container">
          <p className="see-also__label">Also Available</p>
          <div className="see-also__grid">
            <Link href="/services/full-build" className="see-also__card">Full Van Conversion</Link>
            <Link href="/services/layout-storage" className="see-also__card">Layout</Link>
            <Link href="/services/finishings" className="see-also__card">Finishings</Link>
            <Link href="/services/heating" className="see-also__card">Heating</Link>
            <Link href="/services/skylights-and-windows" className="see-also__card">Skylights &amp; Windows</Link>
            <Link href="/services/water-needs" className="see-also__card">Water Needs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
