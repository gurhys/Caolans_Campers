import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout & Furniture - Caolán's Campers",
  description: "Custom van layouts and bespoke furniture — designed and built around how you actually travel. No flat-pack, nothing generic.",
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
  .service-intro__image svg { width: 65%; opacity: 0.3; }
  .layouts { padding: 6rem 0; background: var(--cream); }
  .layouts__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .layout-card { background: var(--white); border: 1px solid rgba(128,168,116,0.2); border-radius: 4px; padding: 2rem; display: grid; grid-template-columns: 100px 1fr; gap: 1.6rem; align-items: start; }
  .layout-card__diagram { background: var(--cream); border: 1px solid rgba(128,168,116,0.25); border-radius: 3px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
  .layout-card__diagram svg { width: 85%; opacity: 0.55; }
  .layout-card__label { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.4rem; }
  .layout-card__title { font-size: 1rem; color: var(--dark); margin-bottom: 0.5rem; }
  .layout-card__desc { font-size: 0.85rem; color: var(--text-light); line-height: 1.7; }
  .layout-card__suitability { margin-top: 0.7rem; font-size: 0.78rem; color: var(--sage); font-weight: 700; }
  .storage { padding: 6rem 0; background: var(--dark); }
  .storage__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .storage__title { font-size: 1.8rem; color: var(--cream); margin-bottom: 0.8rem; }
  .storage__body { font-size: 0.92rem; color: rgba(234,243,222,0.7); line-height: 1.8; margin-bottom: 1rem; }
  .storage__items { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1.2rem; }
  .storage__item { background: rgba(255,255,255,0.05); border: 1px solid rgba(147,199,207,0.2); border-radius: 3px; padding: 0.9rem 1.1rem; display: flex; gap: 0.9rem; align-items: flex-start; }
  .storage__item-icon { width: 32px; height: 32px; color: var(--teal); flex-shrink: 0; }
  .storage__item-icon svg { width: 100%; height: 100%; }
  .storage__item-text { font-size: 0.85rem; color: rgba(234,243,222,0.65); line-height: 1.55; }
  .storage__item-title { font-family: var(--font-cinzel), serif; font-size: 0.82rem; color: var(--mint); margin-bottom: 0.2rem; }
  .storage__cabinetry { padding: 2rem; background: rgba(128,168,116,0.1); border: 1px solid rgba(128,168,116,0.3); border-radius: 4px; }
  .storage__cabinetry-title { font-size: 1rem; color: var(--cream); margin-bottom: 0.8rem; }
  .storage__cabinetry-body { font-size: 0.87rem; color: rgba(234,243,222,0.65); line-height: 1.7; }
  .service-cta { padding: 5rem 0; background: var(--sage); text-align: center; }
  .service-cta__title { font-size: 1.8rem; color: var(--white); margin-bottom: 0.7rem; }
  .service-cta__sub { color: rgba(255,255,255,0.82); font-size: 0.95rem; margin-bottom: 2rem; }
  .service-cta .btn--primary { background: var(--dark); border-color: var(--dark); }
  .service-cta .btn--primary:hover { background: var(--white); border-color: var(--white); color: var(--dark); }
  @media (max-width: 900px) {
    .service-intro__inner { grid-template-columns: 1fr; gap: 3rem; }
    .layouts__grid { grid-template-columns: 1fr; }
    .storage__inner { grid-template-columns: 1fr; gap: 3rem; }
    .layout-card { grid-template-columns: 80px 1fr; }
  }
`;

export default function LayoutStoragePage() {
  return (
    <>
      <style>{pageStyles}</style>

      <section className="page-hero">
        <p className="page-hero__breadcrumb"><Link href="/#services">Services</Link> / Layout</p>
        <p className="page-hero__eyebrow">Custom Furniture &amp; Fit-Out</p>
        <h1 className="page-hero__title">Layout &amp; Furniture</h1>
        <p className="page-hero__sub">No two layouts are the same because no two people use a van the same way. Caolán designs and builds everything from scratch — nothing flat-packed, nothing generic.</p>
      </section>

      <section className="service-intro">
        <div className="container service-intro__inner">
          <div>
            <p className="service-intro__eyebrow">Built to Fit Your Life</p>
            <h2 className="service-intro__title">Your Van.<br />Your Layout.</h2>
            <p className="service-intro__body">The layout is the most personal part of any build. A solo surfer needs something completely different from a couple travelling together, or a remote worker who needs a proper desk setup. Before Caolán picks up a saw, he takes the time to understand exactly how you&apos;ll be using the van — and designs around that, not around what&apos;s easiest to build.</p>
            <p className="service-intro__body">Every piece of furniture is custom made — sized to fit the van&apos;s curves and contours, making use of every available centimetre. Drawer slides, hinges, and hardware are all quality fittings. The woodwork is finished to a standard Caolán would be happy with in his own van, because he was.</p>
            <div className="service-intro__pull">
              &ldquo;I designed my own layout three times before I was happy with it. That obsession over detail is what you get in your build.&rdquo;
            </div>
            <Link href="/quote" className="btn btn--primary">Discuss Your Layout</Link>
          </div>
          <div className="service-intro__image">
            <svg viewBox="0 0 220 160" fill="none" stroke="#80A874" strokeWidth="1.5">
              <rect x="10" y="20" width="200" height="120" rx="4"/>
              <rect x="120" y="30" width="80" height="50" rx="2" strokeDasharray="4 2"/>
              <rect x="10" y="90" width="90" height="40" rx="2" strokeDasharray="4 2"/>
              <rect x="110" y="90" width="50" height="40" rx="2" strokeDasharray="4 2"/>
              <path d="M10 70 L30 70"/>
              <text x="55" y="120" fontSize="7" fill="#80A874" fontFamily="sans-serif" opacity="0.8">KITCHEN</text>
              <text x="140" y="60" fontSize="7" fill="#80A874" fontFamily="sans-serif" opacity="0.8">BED</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="layouts">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">Common Layouts</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_campervan_knot.svg" alt="" width="400" />
          </div>
          <p style={{textAlign:'center',fontSize:'0.88rem',color:'var(--text-light)',maxWidth:'600px',margin:'0 auto 2.5rem'}}>These are starting points — Caolán will adapt any of these to your van&apos;s specific dimensions and your specific needs.</p>
          <div className="layouts__grid">
            <div className="layout-card">
              <div className="layout-card__diagram">
                <svg viewBox="0 0 60 60" fill="none" stroke="#195764" strokeWidth="1.5">
                  <rect x="4" y="4" width="52" height="52" rx="2"/>
                  <rect x="28" y="8" width="24" height="22" rx="1" fill="rgba(128,168,116,0.2)"/>
                  <rect x="8" y="34" width="44" height="18" rx="1" fill="rgba(147,199,207,0.2)"/>
                </svg>
              </div>
              <div>
                <p className="layout-card__label">Most Popular</p>
                <h3 className="layout-card__title">Fixed Rear Bed</h3>
                <p className="layout-card__desc">Permanent bed at the back — you make it once and you&apos;re done. Kitchen or seating in the mid-section, storage underneath. Simple, functional, and easy to live with.</p>
                <p className="layout-card__suitability">Best for: Solo travellers, couples, full-timers</p>
              </div>
            </div>
            <div className="layout-card">
              <div className="layout-card__diagram">
                <svg viewBox="0 0 60 60" fill="none" stroke="#195764" strokeWidth="1.5">
                  <rect x="4" y="4" width="52" height="52" rx="2"/>
                  <rect x="28" y="8" width="24" height="14" rx="1" fill="rgba(128,168,116,0.2)" strokeDasharray="3 2"/>
                  <rect x="4" y="26" width="52" height="30" rx="1" fill="rgba(147,199,207,0.15)" strokeDasharray="3 2"/>
                </svg>
              </div>
              <div>
                <p className="layout-card__label">Space Saving</p>
                <h3 className="layout-card__title">Convertible Bed</h3>
                <p className="layout-card__desc">Seating by day, bed by night. Maximises usable space during the day — better for people who spend a lot of time inside, or who need the van floor clear for gear or dogs.</p>
                <p className="layout-card__suitability">Best for: Weekend use, van with a dog, flexible living</p>
              </div>
            </div>
            <div className="layout-card">
              <div className="layout-card__diagram">
                <svg viewBox="0 0 60 60" fill="none" stroke="#195764" strokeWidth="1.5">
                  <rect x="4" y="4" width="52" height="52" rx="2"/>
                  <rect x="30" y="4" width="26" height="52" rx="1" fill="rgba(128,168,116,0.2)"/>
                  <rect x="4" y="34" width="22" height="22" rx="1" fill="rgba(147,199,207,0.2)"/>
                </svg>
              </div>
              <div>
                <p className="layout-card__label">Best for Two</p>
                <h3 className="layout-card__title">Island / Side Bed</h3>
                <p className="layout-card__desc">Bed runs lengthwise on one side, kitchen on the other. You can walk around three sides of the bed — a proper comfort upgrade that works really well in a longer van.</p>
                <p className="layout-card__suitability">Best for: Couples, LWB vans, regular travel</p>
              </div>
            </div>
            <div className="layout-card">
              <div className="layout-card__diagram">
                <svg viewBox="0 0 60 60" fill="none" stroke="#195764" strokeWidth="1.5">
                  <rect x="4" y="4" width="52" height="52" rx="2"/>
                  <rect x="8" y="8" width="20" height="44" rx="1" fill="rgba(128,168,116,0.15)"/>
                  <rect x="32" y="8" width="20" height="18" rx="1" fill="rgba(147,199,207,0.2)"/>
                  <rect x="32" y="30" width="20" height="22" rx="1" fill="rgba(170,211,156,0.2)"/>
                </svg>
              </div>
              <div>
                <p className="layout-card__label">Work &amp; Travel</p>
                <h3 className="layout-card__title">Office / Desk Build</h3>
                <p className="layout-card__desc">A permanent desk or work surface that doesn&apos;t feel like an afterthought. Monitor mounts, cable management, proper chair space — Caolán builds for remote workers who actually need to work.</p>
                <p className="layout-card__suitability">Best for: Remote workers, digital nomads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="storage">
        <div className="container storage__inner">
          <div>
            <h2 className="storage__title">Storage. Lots of It.</h2>
            <p className="storage__body">Van life without smart storage is van chaos. Caolán thinks storage into every build from the start — not as an afterthought once the bed and kitchen are in. Under-bed drawers, overhead lockers, garage space under the floor, side pockets — every centimetre counted.</p>
            <p className="storage__body">He builds drawers that open smoothly and stay shut on a bumpy road. Overhead lockers that are actually accessible standing up. Under-floor storage that doesn&apos;t require moving the entire contents of the van to get to your gear.</p>
            <div className="storage__items">
              <div className="storage__item">
                <div className="storage__item-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="4" y="16" width="24" height="12" rx="2"/>
                    <path d="M10 16 L10 28 M22 16 L22 28"/>
                    <path d="M4 20 L28 20"/>
                  </svg>
                </div>
                <div>
                  <p className="storage__item-title">Under-Bed Drawers</p>
                  <p className="storage__item-text">Full-extension drawer slides, properly mounted. Every centimetre under the bed put to work.</p>
                </div>
              </div>
              <div className="storage__item">
                <div className="storage__item-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="4" y="4" width="24" height="14" rx="2"/>
                    <path d="M4 12 L28 12"/>
                    <path d="M16 18 L16 28"/>
                  </svg>
                </div>
                <div>
                  <p className="storage__item-title">Overhead Lockers</p>
                  <p className="storage__item-text">Sized and positioned so you can actually reach them, with proper latches that won&apos;t fly open on the road.</p>
                </div>
              </div>
              <div className="storage__item">
                <div className="storage__item-icon">
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="2" y="22" width="28" height="8" rx="2"/>
                    <path d="M8 22 L8 10 M24 22 L24 10"/>
                    <path d="M8 10 Q16 4 24 10"/>
                  </svg>
                </div>
                <div>
                  <p className="storage__item-title">Garage Space</p>
                  <p className="storage__item-text">Dedicated space for wetsuits, bikes, boards, boots — accessible from the rear doors without disturbing the living area.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="storage__cabinetry">
              <h3 className="storage__cabinetry-title">Handbuilt Cabinetry</h3>
              <p className="storage__cabinetry-body">Every cabinet in a Caolán build is made to measure — no off-the-shelf flat-pack units trimmed to fit. Hardwood-faced ply, solid wood edging, quality hardware. It looks right, fits right, and lasts.</p>
              <p className="storage__cabinetry-body" style={{marginTop:'0.8rem'}}>Worktops are typically solid oak, butcher block, or composite — again, chosen to match the finish you&apos;re going for, not just what happens to be in the workshop.</p>
              <p className="storage__cabinetry-body" style={{marginTop:'0.8rem'}}>Caolán can show you what previous builds looked like before you commit, so you know exactly the quality you&apos;re getting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2 className="service-cta__title">Let&apos;s Plan Your Layout</h2>
          <p className="service-cta__sub">Tell Caolán how you live in a van and he&apos;ll design something that actually works for you.</p>
          <Link href="/quote" className="btn btn--primary">Get a Free Quote</Link>
        </div>
      </section>

      <section className="see-also">
        <div className="container">
          <p className="see-also__label">Also Available</p>
          <div className="see-also__grid">
            <Link href="/services/full-build" className="see-also__card">Full Van Conversion</Link>
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
