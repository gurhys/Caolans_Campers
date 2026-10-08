export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__border">
        <svg width="100%" height="30" preserveAspectRatio="none">
          <line
            x1="0" y1="15" x2="100%" y2="15"
            stroke="#195764" strokeWidth="1" strokeDasharray="6 4"
          />
        </svg>
      </div>
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">Caolán&#39;s Campers</p>
          <p className="footer__tagline">Your Dream Campervan, Made Reality</p>
          <p className="footer__formerly">formerly Mobile Camper Solutions Ireland</p>
        </div>
        <nav className="footer__nav">
          <a href="/#services">Services</a>
          <a href="/about">About</a>
          <a href="/#gallery">Gallery</a>
          <a href="/contact">Contact</a>
        </nav>
        <p className="footer__copy">© 2026 Caolán&#39;s Campers. Ireland.</p>
      </div>
    </footer>
  );
}
