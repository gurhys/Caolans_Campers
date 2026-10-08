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
  .page-hero__sub { position: relative; font-size: 1rem; color: rgba(234,243,222,0.75); max-width: 580px; margin: 0 auto; }
  .service-intro { padding: 6rem 0; background: var(--white); }
  .service-intro__inner { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: center; }
  .service-intro__eyebrow { font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.8rem; }
  .service-intro__title { font-size: 2rem; color: var(--dark); margin-bottom: 1rem; }
  .service-intro__body { font-size: 0.95rem; color: var(--text-light); line-height: 1.8; margin-bottom: 1rem; }
  .service-intro__pull { border-left: 3px solid var(--sage); padding-left: 1.4rem; margin: 1.8rem 0; font-family: var(--font-cinzel), serif; font-size: 0.95rem; color: var(--dark); line-height: 1.7; font-style: italic; }
  .service-intro__image { background: var(--cream); border: 2px solid rgba(128,168,116,0.25); border-radius: 4px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }
  .service-intro__image svg { width: 55%; opacity: 0.3; }
  .water-tiers { padding: 6rem 0; background: var(--cream); }
  .water-tiers__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .tier-card { border-radius: 4px; overflow: hidden; border: 1px solid rgba(128,168,116,0.2); }
  .tier-card__head { background: var(--dark); padding: 1.6rem; text-align: center; }
  .tier-card__label { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.5rem; }
  .tier-card__title { font-size: 1.1rem; color: var(--cream); }
  .tier-card__body { background: var(--white); padding: 1.6rem; }
  .tier-card__desc { font-size: 0.87rem; color: var(--text-light); line-height: 1.72; margin-bottom: 1rem; }
  .tier-card__includes { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
  .tier-card__includes li { font-size: 0.82rem; color: var(--text-light); display: flex; align-items: flex-start; gap: 0.5rem; }
  .tier-card__includes li::before { content: '·'; color: var(--sage); font-size: 1.4rem; line-height: 0.85; flex-shrink: 0; }
  .hot-water { padding: 6rem 0; background: var(--dark); }
  .hot-water__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .hot-water__title { font-size: 1.8rem; color: var(--cream); margin-bottom: 0.8rem; }
  .hot-water__body { font-size: 0.92rem; color: rgba(234,243,222,0.7); line-height: 1.8; margin-bottom: 1rem; }
  .hot-water__options { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
  .hot-water__option { background: rgba(255,255,255,0.06); border: 1px solid rgba(147,199,207,0.2); border-radius: 4px; padding: 1.1rem 1.3rem; }
  .hot-water__option-title { font-family: var(--font-cinzel), serif; font-size: 0.88rem; color: var(--mint); margin-bottom: 0.4rem; }
  .hot-water__option-desc { font-size: 0.82rem; color: rgba(234,243,222,0.6); line-height: 1.6; }
  .hot-water__visual { background: rgba(255,255,255,0.04); border: 1px solid rgba(147,199,207,0.2); border-radius: 4px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
  .hot-water__visual svg { width: 65%; opacity: 0.35; }
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
  @media (max-width: 900px) {
    .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; }
    .water-tiers__grid { grid-template-columns: 1fr; }
    .hot-water__inner { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 700px) { .option-group--3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .option-group--3 { grid-template-columns: 1fr; } }
`;

type Checks = { sink: boolean; toilet: boolean; shower: boolean; wetroom: boolean; external: boolean };

const DEFAULTS: Checks = { sink: false, toilet: false, shower: false, wetroom: false, external: false };

const COSTS = {
  sink:     { min: 400,  max: 800  },
  toilet:   { min: 500,  max: 900  },
  shower:   { min: 900,  max: 1800 },
  wetroom:  { min: 600,  max: 1200 },
  external: { min: 150,  max: 300  },
};

function fmt(n: number) { return "€" + n.toLocaleString("en-IE"); }

export default function WaterNeedsPage() {
  const [checks, setChecks] = useState<Checks>(DEFAULTS);

  function toggle(key: keyof Checks) {
    setChecks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === "shower" && next.shower) next.wetroom = true;
      return next;
    });
  }

  const entries = (Object.keys(checks) as (keyof Checks)[]).filter(k => checks[k]);
  const total = entries.reduce((acc, k) => ({ min: acc.min + COSTS[k].min, max: acc.max + COSTS[k].max }), { min: 0, max: 0 });
  const estText = entries.length === 0 ? "Select options above" : `${fmt(total.min)} – ${fmt(total.max)}`;

  const card = (key: keyof Checks, name: string, desc: string) => (
    <div
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
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Water Needs</p>
        <p className="page-hero__eyebrow">Fresh Water Systems</p>
        <h1 className="page-hero__title">Water Needs</h1>
        <p className="page-hero__sub">From a simple hand pump and jerry can to a full plumbed system with a hot water boiler — Caolán builds water systems that actually work for the life you&apos;re living.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">More Than a Tap</p>
            <h2 className="service-intro__title">Built Around How<br />You Actually Live</h2>
            <p className="service-intro__body">A water system needs to match how you use the van. If you&apos;re wild camping for weeks at a time, you need a decent tank and efficient pump. If you&apos;re doing weekend trips and always near a campsite, something simpler might be all that&apos;s needed. Caolán doesn&apos;t upsell you on plumbing you don&apos;t need.</p>
            <p className="service-intro__body">He&apos;ll talk through how you plan to use the van — cooking, washing up, showering — and spec a system that makes sense. Then he&apos;ll fit it so everything is accessible, pipework is properly clipped and supported, and there are no hidden fittings buried behind panelling that you can&apos;t reach if something leaks.</p>
            <div className="service-intro__pull">
              &ldquo;The test of a good water system is when something eventually needs attention. Everything&apos;s accessible. Nothing&apos;s a mystery.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Discuss Your Setup</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="30" y="20" width="60" height="80" rx="4"/>
              <path d="M60 100 L60 130 L150 130"/>
              <path d="M150 110 L150 130"/>
              <rect x="130" y="80" width="30" height="50" rx="3"/>
              <path d="M145 80 L145 50 L100 50 L100 100"/>
              <circle cx="100" cy="100" r="8"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="water-tiers">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">System Options</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_shamrock.svg" alt="" width="400" />
          </div>
          <div className="water-tiers__grid">
            <div className="tier-card">
              <div className="tier-card__head">
                <p className="tier-card__label">Basic</p>
                <h3 className="tier-card__title">Simple Cold Supply</h3>
              </div>
              <div className="tier-card__body">
                <p className="tier-card__desc">A compact tank, 12V pump, and a tap. Straightforward, reliable, and fits under a bed or inside a bench. Right for weekend use or builds where simplicity is the priority.</p>
                <ul className="tier-card__includes">
                  <li>10–30L tank (positioned to suit your layout)</li>
                  <li>12V diaphragm or submersible pump</li>
                  <li>Single cold tap</li>
                  <li>Drain valve and grey water container</li>
                </ul>
              </div>
            </div>
            <div className="tier-card">
              <div className="tier-card__head">
                <p className="tier-card__label">Standard</p>
                <h3 className="tier-card__title">Cold Supply &amp; Grey Water</h3>
              </div>
              <div className="tier-card__body">
                <p className="tier-card__desc">A properly plumbed system with a larger tank, pressure-regulated pump, and a grey water tank to contain waste correctly. The right choice for longer trips or anyone living in the van regularly.</p>
                <ul className="tier-card__includes">
                  <li>30–60L fresh water tank</li>
                  <li>Pressure pump with accumulator</li>
                  <li>Kitchen tap with strainer</li>
                  <li>Dedicated grey water tank</li>
                  <li>Tank level gauge</li>
                </ul>
              </div>
            </div>
            <div className="tier-card">
              <div className="tier-card__head">
                <p className="tier-card__label">Full System</p>
                <h3 className="tier-card__title">Hot &amp; Cold Plumbing</h3>
              </div>
              <div className="tier-card__body">
                <p className="tier-card__desc">Hot and cold taps, an external shower hookup, and a water heater. What you need for full-time van life or if you want a genuinely comfortable setup that doesn&apos;t feel like camping.</p>
                <ul className="tier-card__includes">
                  <li>60–100L+ fresh water tank</li>
                  <li>Hot &amp; cold pressure supply</li>
                  <li>Diesel or electric water heater</li>
                  <li>External shower point</li>
                  <li>Grey water tank with level indicator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hot-water">
        <div className="container hot-water__inner">
          <div>
            <h2 className="hot-water__title">Hot Water Options</h2>
            <p className="hot-water__body">Hot water in a van is a genuine comfort upgrade — washing up in cold water every night gets old quickly. Caolán installs a few different systems depending on your setup and budget.</p>
            <div className="hot-water__options">
              <div className="hot-water__option">
                <p className="hot-water__option-title">Diesel Water Heater (Webasto / Eberspächer)</p>
                <p className="hot-water__option-desc">The premium choice. Heats water from diesel — same fuel as your space heater if you have one. Quiet, reliable, and works when it&apos;s -5° outside. Caolán&apos;s recommendation for full-timers.</p>
              </div>
              <div className="hot-water__option">
                <p className="hot-water__option-title">Calorifier / Heat Exchanger</p>
                <p className="hot-water__option-desc">Uses the van&apos;s engine cooling system to heat water as you drive. Free hot water every time you arrive at your destination — no extra fuel, no extra power draw.</p>
              </div>
              <div className="hot-water__option">
                <p className="hot-water__option-title">Electric Boiler (Hookup)</p>
                <p className="hot-water__option-desc">A small 240V water heater that works on site hookup. Lowest cost to install, perfectly adequate if you&apos;re mostly on campsites.</p>
              </div>
            </div>
          </div>
          <div className="hot-water__visual">
            <svg viewBox="0 0 160 160" fill="none" stroke="#93C7CF" strokeWidth="1.5">
              <rect x="40" y="20" width="80" height="100" rx="6"/>
              <path d="M55 50 Q80 35 105 50 Q80 65 55 50Z"/>
              <path d="M80 65 L80 120"/>
              <path d="M65 90 L95 90"/>
              <circle cx="80" cy="135" r="8"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="service-quote" id="estimate">
        <div className="container">
          <div className="service-quote__head">
            <h2 className="service-quote__title">Estimate Your Water System</h2>
            <p className="service-quote__sub">Select what you&apos;d like included — the cost range updates instantly. Selecting Shower automatically adds Wet Room.</p>
          </div>
          <div className="option-group option-group--3">
            {card("sink",     "Kitchen Sink",       "Tank, 12V pump, sink, and cold tap. Drains to grey water container.")}
            {card("toilet",   "Toilet",             "Cassette, composting, or porta-potti — Caolán can advise on what works for your layout.")}
            {card("shower",   "Shower",             "Internal shower with pump and drain. Requires hot water system. Also adds Wet Room.")}
            {card("wetroom",  "Wet Room",           "Waterproofed area with drainage and non-slip floor. Required for an internal shower.")}
            {card("external", "External Shower Point", "A hose connection on the outside — great for washing gear, wetsuits, or dogs.")}
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
          <h2 className="service-cta__title">Running Water. Anywhere.</h2>
          <p className="service-cta__sub">Tell Caolán how you&apos;ll be using the van and he&apos;ll spec the right water system for you — no overengineering, no cutting corners.</p>
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
            <Link href="/services/power-and-electrics" className="see-also__card">Power &amp; Electrics</Link>
            <Link href="/services/heating" className="see-also__card">Heating</Link>
            <Link href="/services/skylights-and-windows" className="see-also__card">Skylights &amp; Windows</Link>
          </div>
        </div>
      </section>
    </>
  );
}
