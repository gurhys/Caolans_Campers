"use client";
import Link from "next/link";
import { useState } from "react";
import { REVIEWS } from "@/data/reviews";
import { SERVICES } from "@/data/services";

export default function HomePage() {
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  return (
    <>
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
      <section className="hero">
        <div className="hero__brand">
          <img src="/images/logo_with_name.svg" alt="Caolán's Campers" className="hero__logo" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">Handcrafted in Ireland</p>
          <h1 className="hero__title">Your Dream Campervan,<br />Made Reality</h1>
          <div className="hero__divider">
            <img src="/dividers/divider_braid.svg" alt="" width="300" />
          </div>
          <p className="hero__sub">Bespoke van conversions built for the way you adventure.<br />No two builds the same. No hidden costs. Ever.</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">Start Your Build</a>
            <a href="#services" className="btn btn--ghost">Services</a>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span></span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title">The Build</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_braid.svg" alt="" width="200" />
          </div>

          {SERVICES.filter(s => s.featured).map(s => (
            <Link key={s.href} className="service-card service-card--featured" href={s.href}>
              <div className="service-card__image service-card__image--featured"></div>
              <div className="service-card__featured-text">
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
              <span className="service-card__link">{s.linkText} &rarr;</span>
            </Link>
          ))}

          <div className="services__grid">
            {SERVICES.filter(s => !s.featured).map(s => (
              <Link key={s.href} className="service-card" href={s.href}>
                <div className="service-card__image"></div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <span className="service-card__link">{s.linkText} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about__bg-ornament">
          <img src="/images/corner_chain.svg" alt="" />
        </div>
        <div className="container about__inner">
          <div className="about__image-col">
            <div className="about__image-frame">
              <div className="about__image-placeholder">
                <svg viewBox="0 0 300 400" fill="none" stroke="#80A874" strokeWidth="1.5">
                  <rect x="10" y="10" width="280" height="380" rx="4"/>
                  <path d="M60 200 Q150 100 240 200 Q150 300 60 200Z"/>
                  <circle cx="150" cy="180" r="40"/>
                  <path d="M150 220 L150 300 M110 250 L190 250"/>
                </svg>
              </div>
              <div className="about__corner about__corner--tl"><img src="/images/clover_fourleaf_knotwork.svg" alt="" width="40" /></div>
              <div className="about__corner about__corner--br"><img src="/images/clover_fourleaf_knotwork.svg" alt="" width="40" /></div>
            </div>
          </div>
          <div className="about__text-col">
            <p className="about__eyebrow">The Craftsman</p>
            <h2 className="about__title">Built by Someone<br />Who Lives the Life</h2>
            <div className="about__divider">
              <img src="/dividers/divider_braid.svg" alt="" width="300" />
            </div>
            <Link href="/about" className="btn btn--primary">Meet Caolán &rarr;</Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title section-header__title--light">Previous Builds</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_campervan_knot.svg" alt="" width="420" className="divider-teal" />
          </div>
          <div className="gallery__grid">
            <div className="gallery__item gallery__item--tall">
              <div className="gallery__placeholder">Build 01</div>
            </div>
            <div className="gallery__item">
              <div className="gallery__placeholder">Build 02</div>
            </div>
            <div className="gallery__item">
              <div className="gallery__placeholder">Build 03</div>
            </div>
            <div className="gallery__item gallery__item--wide">
              <div className="gallery__placeholder">Build 04</div>
            </div>
            <div className="gallery__item">
              <div className="gallery__placeholder">Build 05</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header__title section-header__title--light">What Customers Say</h2>
          </div>
          <div className="section-header__divider">
            <img src="/dividers/divider_triquetra_vine.svg" alt="" width="300" />
          </div>
          <div className="reviews__summary">
            <p className="reviews__score">5.0</p>
            <span className="reviews__stars">★★★★★</span>
            <p className="reviews__meta">20 reviews &middot; Google</p>
          </div>
          <div className="reviews__grid">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className="review-card"
                style={i >= 4 && !reviewsExpanded ? {display: 'none'} : undefined}
              >
                <span className="review-card__quote">&ldquo;</span>
                <div className="review-card__stars">{r.stars}</div>
                <p className="review-card__text">{r.text}</p>
                <div className="review-card__footer">
                  <span className="review-card__name">{r.name}</span>
                  <span className="review-card__date">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="reviews__toggle"
            onClick={() => setReviewsExpanded(e => !e)}
          >
            {reviewsExpanded ? "Show fewer reviews ▲" : "Show all 18 reviews ▾"}
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="container contact__inner">
          <div className="contact__text">
            <p className="contact__eyebrow">Get Started</p>
            <h2 className="contact__title">Ready to Build<br />Your Adventure?</h2>
            <p className="contact__body">Tell Caolán about your dream build. He&apos;ll get back to you quickly with an honest conversation — no sales pitch, no obligation.</p>
            <div className="contact__details">
              <a href="tel:0894774522" className="contact__link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
                089 477 4522
              </a>
              <a href="mailto:caolanscampers@gmail.com" className="contact__link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                caolanscampers@gmail.com
              </a>
              <a href="https://instagram.com/caolanscampers" className="contact__link" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                @caolanscampers
              </a>
            </div>
          </div>
          <form className="contact__form">
            <div className="form__ornament form__ornament--tl"><img src="/images/clover_fourleaf_loops.svg" alt="" /></div>
            <div className="form__ornament form__ornament--br"><img src="/images/clover_fourleaf_loops.svg" alt="" /></div>
            <div className="form__group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="Shauna Gurhy" />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="shauna@example.ie" />
            </div>
            <div className="form__group">
              <label htmlFor="van">Van Type / Project</label>
              <input type="text" id="van" name="van" placeholder="e.g. Ford Transit, full conversion" />
            </div>
            <div className="form__group">
              <label htmlFor="message">Tell Caolán About Your Build</label>
              <textarea id="message" name="message" rows={5} placeholder="What are you dreaming of?"></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--full">Send Enquiry</button>
          </form>
        </div>
      </section>
    </>
  );
}
