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
  .window-options { padding: 6rem 0; background: var(--cream); }
  .window-options__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .window-card { background: var(--white); border: 1px solid rgba(128,168,116,0.2); border-radius: 4px; overflow: hidden; }
  .window-card__header { background: var(--dark); padding: 1.8rem 1.6rem 1.4rem; display: flex; flex-direction: column; align-items: flex-start; gap: 0.8rem; }
  .window-card__icon { width: 44px; height: 44px; color: var(--mint); }
  .window-card__icon svg { width: 100%; height: 100%; }
  .window-card__title { font-size: 1rem; color: var(--cream); }
  .window-card__body { padding: 1.4rem 1.6rem; font-size: 0.87rem; color: var(--text-light); line-height: 1.72; }
  .window-card__detail { padding: 0 1.6rem 1.6rem; }
  .window-card__detail-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-light); padding: 0.3rem 0; border-top: 1px solid rgba(128,168,116,0.1); }
  .window-card__detail-item::before { content: '·'; color: var(--sage); font-size: 1.2rem; }
  .why-matters { padding: 6rem 0; background: var(--dark); }
  .why-matters__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .why-matters__title { font-size: 1.8rem; color: var(--cream); margin-bottom: 0.8rem; }
  .why-matters__body { font-size: 0.92rem; color: rgba(234,243,222,0.72); line-height: 1.8; margin-bottom: 1rem; }
  .why-matters__points { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-top: 1.2rem; }
  .why-matters__points li { display: flex; gap: 0.7rem; font-size: 0.88rem; color: rgba(234,243,222,0.65); line-height: 1.55; }
  .why-matters__points li::before { content: '—'; color: var(--teal); flex-shrink: 0; }
  .why-matters__visual { background: rgba(255,255,255,0.05); border: 1px solid rgba(147,199,207,0.25); border-radius: 4px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }
  .why-matters__visual svg { width: 65%; opacity: 0.35; }
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
  .opt-qty-row { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.3rem; padding: 0.15rem 0.3rem; }
  .opt-qty-label { font-size: 0.72rem; color: rgba(25,87,100,0.45); }
  .opt-qty-num { width: 52px; padding: 0.18rem 0.35rem; border: 1px solid rgba(25,87,100,0.2); border-radius: 3px; font-size: 0.82rem; text-align: center; background: #fff; color: var(--dark); }
  .opt-qty-num--active { border-color: #39cccc; }
  .service-cta { padding: 5rem 0; background: var(--sage); text-align: center; }
  .service-cta__title { font-size: 1.8rem; color: var(--white); margin-bottom: 0.7rem; }
  .service-cta__sub { color: rgba(255,255,255,0.82); font-size: 0.95rem; margin-bottom: 2rem; }
  .service-cta .btn--primary { background: var(--dark); border-color: var(--dark); }
  .service-cta .btn--primary:hover { background: var(--white); border-color: var(--white); color: var(--dark); }
  @media (max-width: 900px) {
    .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; }
    .window-options__grid { grid-template-columns: 1fr 1fr; }
    .why-matters__inner { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 600px) { .window-options__grid { grid-template-columns: 1fr; } }
  @media (max-width: 700px) { .option-group--3 { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .option-group--3 { grid-template-columns: 1fr; } }
`;

type Item = { id: string; min: number; max: number; qty: number; checked: boolean };

const ITEMS: Item[] = [
  { id: "fan",      min: 300, max: 600,  qty: 1, checked: false },
  { id: "toilet",   min: 150, max: 300,  qty: 1, checked: false },
  { id: "largesky", min: 450, max: 800,  qty: 1, checked: false },
  { id: "smallsky", min: 280, max: 500,  qty: 1, checked: false },
  { id: "smallwin", min: 200, max: 400,  qty: 1, checked: false },
  { id: "largewin", min: 300, max: 600,  qty: 1, checked: false },
];

function fmt(n: number) { return "€" + n.toLocaleString("en-IE"); }

export default function SkylightsAndWindowsPage() {
  const [items, setItems] = useState(ITEMS);

  function toggle(id: string) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, checked: !it.checked } : it));
  }

  function setQty(id: string, val: number) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, val || 1), checked: true } : it));
  }

  const checked = items.filter(it => it.checked);
  const total = checked.reduce((acc, it) => ({ min: acc.min + it.min * it.qty, max: acc.max + it.max * it.qty }), { min: 0, max: 0 });
  const estText = checked.length === 0 ? "Select options above" : `${fmt(total.min)} – ${fmt(total.max)}`;

  const item = (id: string) => items.find(it => it.id === id)!;
  const hasQty = (id: string) => ["largesky","smallsky","smallwin","largewin"].includes(id);

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
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Skylights &amp; Windows</p>
        <p className="page-hero__eyebrow">Light &amp; Fresh Air</p>
        <h1 className="page-hero__title">Skylights &amp; Windows</h1>
        <p className="page-hero__sub">A van with good light and ventilation feels bigger and more liveable. Cut and fitted properly so the Irish rain stays where it belongs — outside.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">Why It Transforms a Van</p>
            <h2 className="service-intro__title">More Than Just Holes<br />in the Roof</h2>
            <p className="service-intro__body">The difference between a van with a roof fan and one without is enormous — in comfort, in air quality, in how long you can actually stay in the thing. Proper ventilation removes moisture that would otherwise rot your insulation and your furniture from the inside out. In Ireland, that matters more than most places.</p>
            <p className="service-intro__body">Cutting holes in a van roof is a job that needs to be done right — once. Caolán templates the cut carefully, trims the opening cleanly, fits the unit with the correct butyl tape and sealant, and finishes the interior edge neatly. You won&apos;t be mopping up leaks six months later.</p>
            <div className="service-intro__pull">
              &ldquo;Moisture is the enemy of a van interior. One decent roof fan deals with most of it before it becomes a problem.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Get a Quote</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="20" y="20" width="160" height="110" rx="4"/>
              <rect x="60" y="10" width="80" height="60" rx="4"/>
              <line x1="100" y1="10" x2="100" y2="70"/>
              <line x1="60" y1="40" x2="140" y2="40"/>
              <circle cx="100" cy="40" r="15" strokeDasharray="4 3"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="window-options">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">What Caolán Installs</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_fourleaf_stem.svg" alt="" width="400" />
          </div>
          <div className="window-options__grid">
            <div className="window-card">
              <div className="window-card__header">
                <div className="window-card__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="8" width="32" height="24" rx="3"/>
                    <path d="M8 20 L40 20"/>
                    <path d="M22 32 L22 40 M26 32 L26 40"/>
                    <path d="M24 14 L28 17 L24 20 L20 17 Z"/>
                  </svg>
                </div>
                <h3 className="window-card__title">Roof Fan Vent</h3>
              </div>
              <div className="window-card__body">The single most impactful addition to any van. A powered fan like the MaxxAir or Fiamma draws out stale, humid air and massively improves comfort — especially when cooking or after a wet day on the hill.</div>
              <div className="window-card__detail">
                <div className="window-card__detail-item">Reversible — in or out airflow</div>
                <div className="window-card__detail-item">Speed controls included</div>
                <div className="window-card__detail-item">Rain cover fitted as standard</div>
              </div>
            </div>
            <div className="window-card">
              <div className="window-card__header">
                <div className="window-card__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="10" width="36" height="28" rx="3"/>
                    <path d="M6 24 L42 24"/>
                    <circle cx="24" cy="17" r="3"/>
                    <circle cx="24" cy="31" r="3"/>
                  </svg>
                </div>
                <h3 className="window-card__title">Fixed Skylight</h3>
              </div>
              <div className="window-card__body">Floods a dark van with natural light without losing any security or waterproofing. Ideal positioned above the living area, kitchen, or over the bed for morning light.</div>
              <div className="window-card__detail">
                <div className="window-card__detail-item">Smoked or clear options</div>
                <div className="window-card__detail-item">Interior trim ring fitted</div>
                <div className="window-card__detail-item">Fully sealed and tested</div>
              </div>
            </div>
            <div className="window-card">
              <div className="window-card__header">
                <div className="window-card__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="14" width="40" height="26" rx="3"/>
                    <path d="M4 27 L44 27"/>
                    <path d="M20 14 L20 40"/>
                  </svg>
                </div>
                <h3 className="window-card__title">Side Windows</h3>
              </div>
              <div className="window-card__body">Sliding or fixed side windows open up a van enormously. Caolán cuts and fits van-specific windows properly trimmed — no rattling, no leaking around the seal in a downpour.</div>
              <div className="window-card__detail">
                <div className="window-card__detail-item">Sliding or fixed</div>
                <div className="window-card__detail-item">Privacy glass available</div>
                <div className="window-card__detail-item">Interior trim included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-matters">
        <div className="container why-matters__inner">
          <div>
            <h2 className="why-matters__title">The Cut Matters as Much as the Unit</h2>
            <p className="why-matters__body">Anyone can fit a roof fan. The quality is in the preparation, the cut, and the seal. A rushed job — wrong tape, poor edge finish, sealant applied in the rain — is a slow leak waiting to happen. In Ireland, a slow leak in a van roof ruins everything underneath it.</p>
            <p className="why-matters__body">Caolán takes the time to do it properly — every time, on every van, regardless of what else is going on in the build.</p>
            <ul className="why-matters__points">
              <li>Butyl tape seal on every installation</li>
              <li>Cut edge protected against rust before fitting</li>
              <li>Tested with water before handover</li>
              <li>Neat interior finish — no raw edges showing</li>
              <li>Fitted to complement your insulation, not cut through it carelessly</li>
            </ul>
          </div>
          <div className="why-matters__visual">
            <svg viewBox="0 0 200 150" fill="none" stroke="#93C7CF" strokeWidth="1.5">
              <ellipse cx="100" cy="75" rx="70" ry="50"/>
              <path d="M30 75 Q100 20 170 75 Q100 130 30 75Z"/>
              <circle cx="100" cy="75" r="20"/>
              <path d="M100 55 L100 75 M85 65 L100 75 L115 65"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="service-quote" id="estimate">
        <div className="container">
          <div className="service-quote__head">
            <h2 className="service-quote__title">Estimate Your Skylights &amp; Windows</h2>
            <p className="service-quote__sub">Select what you&apos;d like — costs update instantly. For items with a quantity, just enter how many.</p>
          </div>
          <div className="option-group option-group--3">
            {[
              { id: "fan",      name: "Roof Fan",          desc: "Powered roof vent (MaxxAir / Fiamma). Best ventilation per euro." },
              { id: "toilet",   name: "Toilet Vent",       desc: "Small roof vent above the toilet area for odour extraction." },
              { id: "largesky", name: "Large Skylight",    desc: "Fixed polycarbonate skylight with interior trim ring. Price per unit." },
              { id: "smallsky", name: "Small Skylight",    desc: "Compact fixed skylight — adds light without dominating the roof. Price per unit." },
              { id: "smallwin", name: "Small Side Window", desc: "Privacy-tinted sliding or fixed window. Price per window." },
              { id: "largewin", name: "Large Side Window", desc: "Larger opening or panoramic style window. Price per window." },
            ].map(({ id, name, desc }) => {
              const it = item(id);
              return (
                <div key={id}>
                  <div
                    className={`opt-check-card${it.checked ? " opt-check-card--checked" : ""}`}
                    onClick={() => toggle(id)}
                  >
                    <div className="opt-check-card__name">{name}</div>
                    <div className="opt-check-card__desc">{desc}</div>
                  </div>
                  {hasQty(id) && (
                    <div className="opt-qty-row">
                      <span className="opt-qty-label">Qty:</span>
                      <input
                        type="number"
                        className={`opt-qty-num${it.checked ? " opt-qty-num--active" : ""}`}
                        min={1} max={6}
                        value={it.qty}
                        onClick={e => e.stopPropagation()}
                        onChange={e => setQty(id, parseInt(e.target.value))}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
          <h2 className="service-cta__title">Let the Light In</h2>
          <p className="service-cta__sub">Tell Caolán what you&apos;re after — roof fan, skylight, windows, or all three — and he&apos;ll give you an honest quote.</p>
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
            <Link href="/services/water-needs" className="see-also__card">Water Needs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
