export interface Service {
  href:     string;
  title:    string;
  desc:     string;
  featured: boolean;
  linkText: string;
}

export const SERVICES: Service[] = [
  {
    featured: true,
    href:     "/services/full-build",
    title:    "Full Van Conversion",
    desc:     "The complete package — layout, electrics, heating, water, windows, and finishings. One person, start to finish. Designed around how you actually want to live and travel.",
    linkText: "Explore full builds",
  },
  {
    featured: false,
    href:     "/services/power-and-electrics",
    title:    "Power & Electrics",
    desc:     "Solar panels, lithium batteries, 12V and 240V circuits — all designed and wired by an engineer. Off-grid power done properly and safely.",
    linkText: "Learn more",
  },
  {
    featured: false,
    href:     "/services/heating",
    title:    "Heating",
    desc:     "Diesel and Chinese heater installations, servicing, and repairs. Stay warm through Irish winters — even the long ones.",
    linkText: "Learn more",
  },
  {
    featured: false,
    href:     "/services/water-needs",
    title:    "Water Solutions",
    desc:     "Fresh and grey water tanks, pumps, sinks, and hot water setups. Clean running water wherever you park up.",
    linkText: "Learn more",
  },
  {
    featured: false,
    href:     "/services/skylights-and-windows",
    title:    "Skylights & Windows",
    desc:     "Roof lights, fan vents, and side windows cut and fitted to weatherproof standards. Let the Irish sky in without letting the Irish rain in.",
    linkText: "Learn more",
  },
  {
    featured: false,
    href:     "/services/layout-storage",
    title:    "Layout & Storage Solutions",
    desc:     "Every build starts with a plan. Bespoke floor plans, sleeping arrangements, kitchen areas, and storage designed around how you actually travel.",
    linkText: "Learn more",
  },
  {
    featured: false,
    href:     "/services/finishings",
    title:    "Finishings",
    desc:     "Cladding, flooring, upholstery, and furniture. The finishing touches that turn a van into somewhere you actually want to live.",
    linkText: "Learn more",
  },
];
