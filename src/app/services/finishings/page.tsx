import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finishings - Caolán's Campers",
  description: "Cladding, flooring, headliner, and lighting — the finishings that turn a van conversion into somewhere you actually want to live.",
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
    max-width: 580px;
    margin: 0 auto;
  }
  .service-intro { padding: 6rem 0; background: var(--white); }
  .service-intro__inner { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: center; }
  .service-intro__eyebrow { font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--sage); margin-bottom: 0.8rem; }
  .service-intro__title { font-size: 2rem; color: var(--dark); margin-bottom: 1rem; }
  .service-intro__body { font-size: 0.95rem; color: var(--text-light); line-height: 1.8; margin-bottom: 1rem; }
  .service-intro__pull { border-left: 3px solid var(--sage); padding-left: 1.4rem; margin: 1.8rem 0; font-family: var(--font-cinzel), serif; font-size: 0.95rem; color: var(--dark); line-height: 1.7; font-style: italic; }
  .service-intro__image { background: var(--cream); border: 2px solid rgba(128,168,116,0.25); border-radius: 4px; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }
  .service-intro__image svg { width: 55%; opacity: 0.3; }
  .finish-cats { padding: 6rem 0; background: var(--cream); }
  .finish-cats__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .finish-cat { background: var(--white); border: 1px solid rgba(128,168,116,0.2); border-radius: 4px; overflow: hidden; }
  .finish-cat__header { background: linear-gradient(120deg, var(--dark) 0%, #1e6b7a 100%); padding: 1.6rem 2rem; display: flex; align-items: center; gap: 1.2rem; }
  .finish-cat__icon { width: 44px; height: 44px; color: var(--mint); flex-shrink: 0; }
  .finish-cat__icon svg { width: 100%; height: 100%; }
  .finish-cat__title { font-size: 1rem; color: var(--cream); }
  .finish-cat__body { padding: 1.6rem 2rem; }
  .finish-cat__desc { font-size: 0.88rem; color: var(--text-light); line-height: 1.75; margin-bottom: 1.2rem; }
  .finish-cat__options { display: flex; flex-direction: column; gap: 0.5rem; }
  .finish-cat__option { display: flex; align-items: flex-start; gap: 0.7rem; font-size: 0.84rem; color: var(--text-light); line-height: 1.55; padding: 0.5rem 0; border-top: 1px solid rgba(128,168,116,0.1); }
  .finish-cat__option-name { font-weight: 700; color: var(--dark); min-width: 100px; }
  .insulation { padding: 6rem 0; background: var(--dark); }
  .insulation__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .insulation__title { font-size: 1.8rem; color: var(--cream); margin-bottom: 0.8rem; }
  .insulation__body { font-size: 0.92rem; color: rgba(234,243,222,0.7); line-height: 1.8; margin-bottom: 1rem; }
  .insulation__types { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
  .insulation__type { background: rgba(255,255,255,0.05); border: 1px solid rgba(147,199,207,0.2); border-radius: 4px; padding: 1.1rem; }
  .insulation__type-title { font-family: var(--font-cinzel), serif; font-size: 0.82rem; color: var(--mint); margin-bottom: 0.4rem; }
  .insulation__type-desc { font-size: 0.8rem; color: rgba(234,243,222,0.55); line-height: 1.6; }
  .insulation__visual { background: rgba(255,255,255,0.04); border: 1px solid rgba(147,199,207,0.2); border-radius: 4px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
  .insulation__visual svg { width: 65%; opacity: 0.35; }
  .bespoke { padding: 5rem 0; background: var(--cream); }
  .bespoke__inner { max-width: 760px; margin: 0 auto; text-align: center; }
  .bespoke__title { font-size: 1.8rem; color: var(--dark); margin-bottom: 0.8rem; }
  .bespoke__body { font-size: 0.95rem; color: var(--text-light); line-height: 1.8; margin-bottom: 1rem; }
  .bespoke__swatches { display: flex; justify-content: center; gap: 0.8rem; margin: 2rem 0 2.5rem; flex-wrap: wrap; }
  .bespoke__swatch { width: 52px; height: 52px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.5); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .service-cta { padding: 5rem 0; background: var(--sage); text-align: center; }
  .service-cta__title { font-size: 1.8rem; color: var(--white); margin-bottom: 0.7rem; }
  .service-cta__sub { color: rgba(255,255,255,0.82); font-size: 0.95rem; margin-bottom: 2rem; }
  .service-cta .btn--primary { background: var(--dark); border-color: var(--dark); }
  .service-cta .btn--primary:hover { background: var(--white); border-color: var(--white); color: var(--dark); }
  @media (max-width: 900px) {
    .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; }
    .finish-cats__grid { grid-template-columns: 1fr; }
    .insulation__inner { grid-template-columns: 1fr; gap: 3rem; }
    .insulation__types { grid-template-columns: 1fr; }
  }
`;

export default function FinishingsPage() {
  return (
    <>
      <style>{pageStyles}</style>

      <section className="page-hero">
        <p className="page-hero__eyebrow">Cladding, Flooring &amp; Trim</p>
        <h1 className="page-hero__title">Interior Finishings</h1>
        <p className="page-hero__sub">The finishings are what make a van feel like somewhere you actually want to be. Caolán treats this as seriously as any other part of the build — no shortcuts, no cheap materials.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">Detail That Lasts</p>
            <h2 className="service-intro__title">The Difference Between<br />Good and Great</h2>
            <p className="service-intro__body">The mechanical side of a build keeps you warm and powers your life. The finishings are what make you actually enjoy being in the space. Cladding, flooring, headliner, upholstery, trim — these are the details that separate a functional build from a beautiful one.</p>
            <p className="service-intro__body">Caolán chooses materials that look premium but can take the reality of van life — damp gear, muddy boots, condensation on winter mornings. He won&apos;t use materials that look great in a showroom and fall apart in six months. He lives in a van. He knows the difference.</p>
            <div className="service-intro__pull">
              &ldquo;Every material choice in a build is a trade-off between look, weight, and durability. I&apos;ll tell you what that trade-off is before we decide.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Discuss Your Finish</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 200 150" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="10" y="10" width="180" height="130" rx="4"/>
              <path d="M10 60 L190 60"/>
              <path d="M10 110 L190 110"/>
              <path d="M10 10 L10 60" strokeDasharray="4 3"/>
              <path d="M40 10 L40 60" strokeDasharray="4 3"/>
              <path d="M70 10 L70 60" strokeDasharray="4 3"/>
              <path d="M100 10 L100 60" strokeDasharray="4 3"/>
              <path d="M130 10 L130 60" strokeDasharray="4 3"/>
              <path d="M160 10 L160 60" strokeDasharray="4 3"/>
              <rect x="20" y="70" width="160" height="30" rx="2" fill="rgba(128,168,116,0.15)"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="finish-cats">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Finishing Options</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_campervan_knot.svg" alt="" width="400" />
          </div>
          <div className="finish-cats__grid">
            <div className="finish-cat">
              <div className="finish-cat__header">
                <div className="finish-cat__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="6" y="6" width="36" height="36" rx="2"/>
                    <path d="M6 14 L42 14 M6 22 L42 22 M6 30 L42 30 M6 38 L42 38"/>
                    <path d="M14 6 L14 42 M22 6 L22 42 M30 6 L30 42"/>
                  </svg>
                </div>
                <h3 className="finish-cat__title">Wall Cladding</h3>
              </div>
              <div className="finish-cat__body">
                <p className="finish-cat__desc">The walls set the character of the van interior. Caolán works with a few different materials depending on the look you&apos;re after — warm and natural, clean and modern, or somewhere in between.</p>
                <div className="finish-cat__options">
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Tongue &amp; Groove</span>
                    <span>Classic van life look — warm, natural, and light. Pine or hardwood. Caolán&apos;s personal choice.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Ply Lining</span>
                    <span>Smooth birch ply — contemporary, clean, and easy to paint or varnish any colour you want.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Composite Panel</span>
                    <span>Lightweight, durable, wipe-clean. Good for a more modern or commercial look.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="finish-cat">
              <div className="finish-cat__header">
                <div className="finish-cat__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="4" y="30" width="40" height="12" rx="2"/>
                    <path d="M8 30 L8 10 M16 30 L16 10 M24 30 L24 10 M32 30 L32 10 M40 30 L40 10"/>
                    <path d="M8 10 L40 10"/>
                  </svg>
                </div>
                <h3 className="finish-cat__title">Flooring</h3>
              </div>
              <div className="finish-cat__body">
                <p className="finish-cat__desc">Van flooring needs to handle mud, water, and heavy gear without looking rough after two months. Caolán fits over a properly levelled ply sub-floor — never straight onto the van metal.</p>
                <div className="finish-cat__options">
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Vinyl Plank</span>
                    <span>Waterproof, durable, and looks great in wood or stone effect. Caolán&apos;s most common recommendation.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Real Wood</span>
                    <span>Oak or bamboo hardwood. Beautiful, but needs more care and doesn&apos;t love sustained dampness.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Rubber / Anti-Slip</span>
                    <span>Ideal for garage areas, rear sections, or vans used for sport and outdoor gear.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="finish-cat">
              <div className="finish-cat__header">
                <div className="finish-cat__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M8 40 L8 16 Q8 8 16 8 L32 8 Q40 8 40 16 L40 40"/>
                    <path d="M8 40 L40 40"/>
                    <path d="M16 8 L16 40 M32 8 L32 40"/>
                  </svg>
                </div>
                <h3 className="finish-cat__title">Headliner &amp; Ceiling</h3>
              </div>
              <div className="finish-cat__body">
                <p className="finish-cat__desc">The ceiling finish is what most people forget about until it&apos;s done — and then they can&apos;t imagine the van without it. It also hides the insulation and any wiring runs above the cladding.</p>
                <div className="finish-cat__options">
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Carpet Lining</span>
                    <span>Warm, soft, no condensation on the surface, great for sound absorption. Very practical for Irish conditions.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Ply / Timber</span>
                    <span>Curved ply ceiling for a more architectural, finished feel. Takes more time but the result is worth it.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">PVC Headliner</span>
                    <span>Wipe-clean, modern, lightweight. Common in commercial applications or budget-conscious builds.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="finish-cat">
              <div className="finish-cat__header">
                <div className="finish-cat__icon">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="16" cy="24" r="8"/>
                    <circle cx="32" cy="24" r="8"/>
                    <path d="M24 16 L24 32"/>
                    <circle cx="24" cy="10" r="3"/>
                    <circle cx="24" cy="38" r="3"/>
                  </svg>
                </div>
                <h3 className="finish-cat__title">Lighting</h3>
              </div>
              <div className="finish-cat__body">
                <p className="finish-cat__desc">Good lighting changes everything about how liveable a van feels. Caolán plans lighting zones — task lighting, ambient, reading light by the bed — rather than just dotting LEDs around the ceiling.</p>
                <div className="finish-cat__options">
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">LED Spotlights</span>
                    <span>Recessed into the ceiling or cladding. Warm white for ambience, cool white over a kitchen worktop.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Strip Lighting</span>
                    <span>Under-cabinet, under-bed, or behind trim for indirect lighting. Creates a premium feel.</span>
                  </div>
                  <div className="finish-cat__option">
                    <span className="finish-cat__option-name">Dimmable Controls</span>
                    <span>All circuits can be put on dimmers — proper wired dimmers, not cheap inline ones.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="insulation">
        <div className="container insulation__inner">
          <div>
            <h2 className="insulation__title">Insulation First.<br />Always.</h2>
            <p className="insulation__body">Insulation is invisible in a finished van — but it&apos;s the difference between a van that&apos;s comfortable in January and one that you dread sleeping in. Caolán insulates before he clads, properly, with no cold bridges left untreated.</p>
            <p className="insulation__body">He&apos;s obsessive about it. Because he&apos;s lived in a van through Irish winters and knows exactly what inadequate insulation feels like at 3am in a Connemara car park.</p>
            <div className="insulation__types">
              <div className="insulation__type">
                <p className="insulation__type-title">Spray Foam</p>
                <p className="insulation__type-desc">Fills every gap and contour — great for complex body panels and eliminating cold bridges at ribs and joints.</p>
              </div>
              <div className="insulation__type">
                <p className="insulation__type-title">Rigid Foam Board</p>
                <p className="insulation__type-desc">High R-value, easy to cut to shape, good for floors and large flat panels. Caolán&apos;s main wall insulator.</p>
              </div>
              <div className="insulation__type">
                <p className="insulation__type-title">Thinsulate / Acoustic</p>
                <p className="insulation__type-desc">Fibrous insulation for awkward cavities and door cards — excellent sound damping as a bonus.</p>
              </div>
              <div className="insulation__type">
                <p className="insulation__type-title">Vapour Control</p>
                <p className="insulation__type-desc">Managing moisture properly is as important as the insulation itself. Condensation rot is real — Caolán accounts for it.</p>
              </div>
            </div>
          </div>
          <div className="insulation__visual">
            <svg viewBox="0 0 160 160" fill="none" stroke="#93C7CF" strokeWidth="1.5">
              <rect x="20" y="20" width="120" height="120" rx="4"/>
              <rect x="30" y="30" width="100" height="100" rx="2" fill="rgba(147,199,207,0.08)"/>
              <path d="M30 50 L130 50 M30 70 L130 70 M30 90 L130 90 M30 110 L130 110"/>
              <path d="M50 30 L50 130 M70 30 L70 130 M90 30 L90 130 M110 30 L110 130"/>
            </svg>
          </div>
        </div>
      </section>

      <section className="bespoke">
        <div className="container bespoke__inner">
          <div className="section-header">
            <h2 className="section-header__title">Your Palette. Your Build.</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_triquetra_vine.svg" alt="" width="300" />
          </div>
          <p className="bespoke__body">Finishings aren&apos;t just functional — they&apos;re personal. Caolán doesn&apos;t have a standard palette he applies to every van. He works with each client to figure out what colours, textures, and materials feel right for them and their lifestyle. If you&apos;ve got inspo photos, bring them.</p>
          <div className="bespoke__swatches">
            <div className="bespoke__swatch" style={{background:'#5c3a1a'}}></div>
            <div className="bespoke__swatch" style={{background:'#c9a96e'}}></div>
            <div className="bespoke__swatch" style={{background:'#e8e0d0'}}></div>
            <div className="bespoke__swatch" style={{background:'#2c3e35'}}></div>
            <div className="bespoke__swatch" style={{background:'#7a9e8e'}}></div>
            <div className="bespoke__swatch" style={{background:'#d4c5a9'}}></div>
            <div className="bespoke__swatch" style={{background:'#1a2530'}}></div>
            <div className="bespoke__swatch" style={{background:'#b0b8b4'}}></div>
          </div>
          <p className="bespoke__body">The swatches above are just examples of colour combinations from previous builds. Yours will be designed around what works for you.</p>
          <Link href="/quote" className="btn btn--primary">Discuss Your Finish</Link>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2 className="service-cta__title">Make It Beautiful</h2>
          <p className="service-cta__sub">Get in touch and tell Caolán about the feel you&apos;re going for. He&apos;ll help you get there.</p>
          <Link href="/quote" className="btn btn--primary">Get a Free Quote</Link>
        </div>
      </section>

      <section className="see-also">
        <div className="container">
          <p className="see-also__label">Also Available</p>
          <div className="see-also__grid">
            <Link href="/services/full-build" className="see-also__card">Full Van Conversion</Link>
            <Link href="/services/layout-storage" className="see-also__card">Layout</Link>
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
