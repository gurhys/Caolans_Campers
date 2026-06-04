export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="site-nav" aria-label="Main navigation">
        <span className="site-nav-brand">Caoláns Campers</span>
        <div className="site-nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Projects</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="campers-hero" aria-label="Caoláns Campers hero">
        <div className="campers-hero-copy">
          <span className="campers-hero-kicker">Van Conversions · Ireland</span>
          <h1 className="campers-hero-title">Caoláns Campers</h1>
          <p className="campers-hero-sub">
            Bespoke van builds &amp; camper conversions, custom-made for your
            adventure
          </p>
        </div>
      </div>

      {/* Dev Banner */}
      <div className="dev-banner" role="status">
        <span className="dev-banner-badge">In Development</span>
        <p>
          New website coming soon — Caoláns Campers is currently being rebranded
          from Mobile Camper Solutions Ireland. Check back for updates.
        </p>
      </div>

      <main className="page-shell">
        {/* Services */}
        <section className="services-section" aria-labelledby="services-heading">
          <h2 className="services-heading" id="services-heading">
            What We Build
          </h2>
          <p className="services-sub">
            Every build is one-of-a-kind. Caoláns Campers specialises in fully
            custom van conversions designed around how you actually live and
            travel.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-card-icon" aria-hidden="true">◈</div>
              <h3>Full Van Conversions</h3>
              <p>
                Complete Sprinter and high-roof van conversions — designed from
                scratch around your life on the road. From layout and insulation
                through to fitted furniture and finishing touches.
              </p>
            </div>

            <div className="service-card">
              <div className="service-card-icon" aria-hidden="true">◎</div>
              <h3>Electrical &amp; Solar</h3>
              <p>
                Full off-grid electrical system design and installation, including
                solar panels, battery banks, and 12V/240V wiring — built to keep
                you powered wherever you park up.
              </p>
            </div>

            <div className="service-card">
              <div className="service-card-icon" aria-hidden="true">⬡</div>
              <h3>Heating &amp; Comfort</h3>
              <p>
                Diesel heating systems, skylights, and window installation for
                year-round comfort. Whether you&rsquo;re chasing surf in January or
                camping under the Irish summer sky.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Band */}
        <div className="quote-band">
          <p>
            &ldquo;There&rsquo;s no one-size-fits-all solution when it comes to building
            a campervan — and that&rsquo;s exactly what I love about it.&rdquo;
          </p>
          <span>Caoláns Campers · Custom builds from Ireland</span>
        </div>

        {/* About + Coming Soon */}
        <section className="about-section" aria-labelledby="about-heading">
          <div className="about-grid">
            <div className="about-card">
              <span className="about-card-kicker">About</span>
              <h2 id="about-heading">Built by an engineer, for adventurers</h2>
              <p>
                Caoláns Campers is the work of Caoláns — an engineer and
                van-dweller who has spent years surfing, kayaking, and living on
                the road across Ireland and beyond.
              </p>
              <p>
                Every conversion is designed with that lived experience in mind:
                practical layouts, reliable systems, and the kind of details that
                only matter once you&rsquo;re actually living in the van.
              </p>
              <p>
                Previously trading as Mobile Camper Solutions Ireland, the
                business is now rebranding under the Caoláns Campers name — same
                builds, same care, new identity.
              </p>
            </div>

            <div className="coming-soon-card">
              <h2>New Site Coming Soon</h2>
              <ul className="coming-soon-list">
                <li>Full project gallery with past builds</li>
                <li>Detailed service and pricing information</li>
                <li>Step-by-step build process walkthrough</li>
                <li>Online enquiry and quote request form</li>
                <li>Customer testimonials and reviews</li>
                <li>Blog — tips, builds, and life on the road</li>
                <li>Social media and contact links</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" aria-label="Site footer">
        <div className="footer-links">
          <h3>Navigate</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-brand">
          <h2>Caoláns Campers</h2>
          <p>Bespoke van conversions from Ireland</p>
        </div>

        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <p>New website in development.</p>
          <p>
            Designed by{" "}
            <a
              href="https://github.com/gurhys/shauna-gurhy"
              style={{
                textDecoration: "underline",
                color: "rgba(253,248,242,0.75)",
              }}
            >
              Shauna Gurhy
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
