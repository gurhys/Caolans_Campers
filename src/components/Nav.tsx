"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const leftLinks = [
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        btnRef.current && !btnRef.current.contains(e.target as Node) &&
        dropRef.current && !dropRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav className="nav">
      <div className="nav__inner">

        <ul className="nav__links nav__links--left">
          {leftLinks.map((link) => (
            <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
          ))}
        </ul>

        <Link href="/" className="nav__brand">
          <span className="nav__brand-word">Caolán&#39;s</span>
          <div className="nav__logo-placeholder">
            <img src="/images/logo_no_name.svg" alt="Caolán's Campers" />
          </div>
          <span className="nav__brand-word">Campers</span>
        </Link>

        <ul className="nav__links nav__links--right">
          <li className="nav__cta-li">
            <Link href="/quote" className="nav__cta">Get a Quote</Link>
          </li>
          <li className="nav__portal-li">
            <Link href="/client">Client Portal</Link>
          </li>
          <li className="nav__menu-wrap">
            <button
              ref={btnRef}
              className="nav__menu-btn"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span /><span /><span />
            </button>
            <div ref={dropRef} className={`nav__dropdown${open ? " open" : ""}`}>
              {leftLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
              <Link href="/client">Client Portal</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/quote" className="nav__dropdown-cta">Get a Quote</Link>
            </div>
          </li>
        </ul>

      </div>
    </nav>
  );
}
