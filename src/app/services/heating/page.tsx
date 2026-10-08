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
  .heater-types { padding: 6rem 0; background: var(--cream); }
  .heater-types__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .heater-card { background: var(--white); border: 1px solid rgba(128,168,116,0.2); border-radius: 4px; padding: 2.4rem; position: relative; }
  .heater-card--featured { border-color: var(--sage); }
  .heater-card__badge { position: absolute; top: -1px; right: 1.5rem; background: var(--sage); color: var(--white); font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 0 0 4px 4px; font-family: var(--font-lato), sans-serif; font-weight: 700; }
  .heater-card__icon { width: 52px; height: 52px; color: var(--sage); margin-bottom: 1.2rem; }
  .heater-card__icon svg { width: 100%; height: 100%; }
  .heater-card__title { font-size: 1.2rem; color: var(--dark); margin-bottom: 0.4rem; }
  .heater-card__subtitle { font-size: 0.78rem; color: var(--teal); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; }
  .heater-card__desc { font-size: 0.88rem; color: var(--text-light); line-height: 1.75; margin-bottom: 1.2rem; }
  .heater-card__pros { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; }
  .heater-card__pros li { display: flex; gap: 0.6rem; font-size: 0.85rem; color: var(--text-light); }
  .heater-card__pros li::before { content: '✓'; color: var(--sage); flex-shrink: 0; }
  .install-steps { padding: 6rem 0; background: var(--dark); }
  .install-steps__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; position: relative; }
  .install-steps__grid::before { content: ''; position: absolute; top: 28px; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg, transparent, var(--teal), var(--sage), transparent); opacity: 0.35; }
  .install-step { text-align: center; padding: 1.2rem 0.8rem; }
  .install-step__num { width: 56px; height: 56px; border: 2px solid var(--sage); border-radius: 50%; margin: 0 auto 1.2rem; display: flex; align-items: center; justify-content: center; font-family: var(--font-cinzel), serif; font-size: 1rem; color: var(--mint); background: var(--dark); }
  .install-step__title { font-size: 0.9rem; color: var(--cream); margin-bottom: 0.5rem; }
  .install-step__desc { font-size: 0.8rem; color: rgba(234,243,222,0.55); line-height: 1.65; }
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
    .heater-types__grid { grid-template-columns: 1fr; }
    .install-steps__grid { grid-template-columns: 1fr 1fr; }
    .install-steps__grid::before { display: none; }
  }
  @media (max-width: 600px) { .install-steps__grid { grid-template-columns: 1fr; } }
  @media (max-width: 700px) { .option-group--3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .option-group--3 { grid-template-columns: 1fr; } }
`;

type Checks = { insulation: boolean; diesel: boolean; hotwater: boolean };
const DEFAULTS: Checks = { insulation: false, diesel: false, hotwater: false };
const COSTS = {
  insulation: { min: 500,  max: 1200 },
  diesel:     { min: 1000, max: 2500 },
  hotwater:   { min: 600,  max: 1500 },
};

function fmt(n: number) { return "€" + n.toLocaleString("en-IE"); }

export default function HeatingPage() {
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
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Heating</p>
        <p className="page-hero__eyebrow">Diesel Air Heaters</p>
        <h1 className="page-hero__title">Stay Warm in Ireland</h1>
        <p className="page-hero__sub">Irish weather doesn&apos;t do warm winters. A properly installed diesel heater changes everything — warm van in minutes, whatever the weather outside.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">Why Diesel Heating</p>
            <h2 className="service-intro__title">The Right Call for<br />Year-Round Van Life</h2>
            <p className="service-intro__body">In a country where you can get four seasons in one afternoon, a quality heating system isn&apos;t optional — it&apos;s what separates a useable van from one that gets parked up from October to March. Diesel heaters are the gold standard for campervan use: they&apos;re fuel-efficient, reliable, and work even when it&apos;s proper Baltic outside.</p>
            <p className="service-intro__body">Caolán sources and installs top-range units — properly, with the fuel line routed safely, the combustion air intake and exhaust positioned correctly, and the controller wired so it&apos;s actually easy to use.</p>
            <div className="service-intro__pull">
              &ldquo;A badly fitted heater is a carbon monoxide risk. There&apos;s no cutting corners on this one.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Get a Heating Quote</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <path d="M100 30 C80 30 60 50 60 75 C60 100 80 120 100 120 C120 120 140 100 140 75 C140 50 120 30 100 30Z"/>
              <path d="M100 50 C90 60 85 70 90 80 C95 90 105 90 110 80 C115 70 110 60 100 50Z" fill="rgba(128,168,116,0.2)"/>
              <path d="M60 75 L30 75 M140 75 L170 75"/>
              <path d="M100 120 L100 140"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="heater-types">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Heater Options</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_braid.svg" alt="" width="300" />
          </div>
          <div className="heater-types__grid">
            <div className="heater-card heater-card--featured">
              <div className="heater-card__badge">Most Popular</div>
              <div className="heater-card__icon">
                <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M26 10 C18 16 14 22 16 30 C18 38 22 42 26 42 C30 42 34 38 36 30 C38 22 34 16 26 10Z"/>
                  <path d="M26 42 L26 48"/>
                  <path d="M10 30 L6 30 M42 30 L46 30"/>
                </svg>
              </div>
              <h3 className="heater-card__title">Diesel Air Heater</h3>
              <p className="heater-card__subtitle">Webasto / Eberspächer / Chinese Unit</p>
              <p className="heater-card__desc">Burns diesel from a small dedicated tank or a tee off your main fuel line. Heats the van fast and runs quietly on very little fuel. The practical choice for Irish conditions and Caolán&apos;s go-to recommendation for most builds.</p>
              <ul className="heater-card__pros">
                <li>Warm van in under 10 minutes</li>
                <li>Runs overnight on a fraction of a litre</li>
                <li>No gas bottles, no hassle at borders</li>
                <li>Works independently of shore power</li>
              </ul>
            </div>
            <div className="heater-card">
              <div className="heater-card__icon">
                <svg viewBox="0 0 52 52" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="10" y="14" width="32" height="28" rx="4"/>
                  <path d="M18 14 L18 8 M26 14 L26 8 M34 14 L34 8"/>
                  <path d="M18 42 L18 46 M34 42 L34 46"/>
                </svg>
              </div>
              <h3 className="heater-card__title">Diesel Water Heater</h3>
              <p className="heater-card__subtitle">Webasto Thermo Top / Eberspächer Hydronic</p>
              <p className="heater-card__desc">Heats water via a heat exchanger and circulates it to radiators or a hot water tank. More complex to install but gives you both space heating and hot water from one unit. Right for serious full-timers.</p>
              <ul className="heater-card__pros">
                <li>Space heating and hot water in one</li>
                <li>Silent operation — no fan noise</li>
                <li>More even heat distribution</li>
                <li>Can integrate with engine cooling circuit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="install-steps">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title section-header__title--light">The Installation</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_fourleaf_bold.svg" alt="" width="400" className="divider-teal" />
          </div>
          <div className="install-steps__grid">
            <div className="install-step">
              <div className="install-step__num">01</div>
              <h3 className="install-step__title">Position &amp; Plan</h3>
              <p className="install-step__desc">Caolán plans the heater, fuel tank tap, intake and exhaust positions before touching anything — safety first, always.</p>
            </div>
            <div className="install-step">
              <div className="install-step__num">02</div>
              <h3 className="install-step__title">Fuel &amp; Mounting</h3>
              <p className="install-step__desc">Fuel line routed safely away from heat, properly clipped and supported. Heater body mounted solidly to the van structure.</p>
            </div>
            <div className="install-step">
              <div className="install-step__num">03</div>
              <h3 className="install-step__title">Ducting &amp; Outlets</h3>
              <p className="install-step__desc">Hot air ducted where it&apos;s actually needed — under the bed, into the living space — not just dumped behind a panel.</p>
            </div>
            <div className="install-step">
              <div className="install-step__num">04</div>
              <h3 className="install-step__title">Wire &amp; Commission</h3>
              <p className="install-step__desc">Wired directly to the battery with a proper fuse. Commissioned, run-tested, and handed over with the controller fully explained.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-quote" id="estimate">
        <div className="container">
          <div className="service-quote__head">
            <h2 className="service-quote__title">Estimate Your Heating Setup</h2>
            <p className="service-quote__sub">Select what you&apos;d like included — the cost range updates instantly. No commitment required.</p>
          </div>
          <div className="option-group option-group--3">
            {card("insulation", "Insulation", "Full insulation pack — spray foam, rigid board, and thermal break treatment throughout.")}
            {card("diesel",     "Diesel Heater", "Air heater unit (Webasto, Eberspächer, or quality Chinese unit). Warm van in minutes.")}
            {card("hotwater",   "Hot Water", "Diesel water heater or calorifier for constant hot water. Full-timer standard.")}
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
          <h2 className="service-cta__title">Ready to Never Be Cold Again?</h2>
          <p className="service-cta__sub">Talk to Caolán about the right heater for your van, your budget, and how you use it.</p>
          <Link href="/quote" className="btn btn--primary">Get a Heating Quote</Link>
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
            <Link href="/services/skylights-and-windows" className="see-also__card">Skylights &amp; Windows</Link>
            <Link href="/services/water-needs" className="see-also__card">Water Needs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
