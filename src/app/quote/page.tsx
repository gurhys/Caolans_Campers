"use client";
import Link from "next/link";
import { useState } from "react";
import { VAN_SCALE, COSTS, TIME, SLOTS } from "@/data/quote";
import type { VanSize, SkyKey } from "@/data/quote";

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
  .page-hero__sub { position: relative; font-size: 1rem; color: rgba(234,243,222,0.7); max-width: 580px; margin: 0 auto; line-height: 1.7; }
  .quote-chooser { background: var(--dark); padding: 2.5rem 2rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
  .quote-type-btn { font-family: var(--font-cinzel), serif; font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.75rem 2.2rem; border: 2px solid rgba(234,243,222,0.25); background: transparent; color: rgba(234,243,222,0.7); cursor: pointer; border-radius: 2px; transition: all 0.18s; }
  .quote-type-btn:hover { border-color: var(--teal); color: var(--teal); }
  .quote-type-btn--active { border-color: var(--teal); background: rgba(57,204,204,0.12); color: var(--cream); }
  .config-section { padding: 3.5rem 0; border-bottom: 1px solid rgba(128,168,116,0.15); }
  .config-section__head { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .config-section__num { font-family: var(--font-cinzel), serif; font-size: 0.7rem; letter-spacing: 0.2em; color: var(--teal); width: 2rem; flex-shrink: 0; }
  .config-section__title { font-family: var(--font-cinzel), serif; font-size: 1rem; color: var(--dark); }
  .config-section__hint { font-size: 0.75rem; color: var(--text-light); margin-left: auto; }
  .option-cards { display: grid; gap: 0.6rem; }
  .option-cards--3 { grid-template-columns: repeat(3, 1fr); }
  .option-cards--4 { grid-template-columns: repeat(4, 1fr); }
  .option-cards--radio { grid-template-columns: repeat(3, 1fr); }
  .opt-check-card { display: block; border: 2px solid rgba(128,168,116,0.25); border-radius: 3px; padding: 0.9rem 1rem; cursor: pointer; transition: border-color 0.18s, background 0.18s; position: relative; background: white; user-select: none; }
  .opt-check-card:hover { border-color: var(--sage); background: rgba(128,168,116,0.05); }
  .opt-check-card--checked { border-color: #39cccc; background: rgba(57,204,204,0.07); }
  .opt-check-card--checked::after { content: "✓"; position: absolute; top: 6px; right: 8px; color: #39cccc; font-size: 0.9rem; font-weight: 700; }
  .opt-check-card__name { font-family: var(--font-cinzel), serif; font-size: 0.82rem; color: var(--dark); margin-bottom: 0.25rem; }
  .opt-check-card__desc { font-size: 0.73rem; color: var(--text-light); line-height: 1.5; }
  .opt-check-card__qty { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.5rem; }
  .opt-check-card__qty label { font-size: 0.7rem; color: var(--text-light); }
  .opt-check-card__qty input { width: 3rem; padding: 0.2rem 0.4rem; border: 1px solid rgba(128,168,116,0.35); border-radius: 2px; font-size: 0.8rem; text-align: center; }
  .van-faq { margin: 1.5rem 0 0; }
  .van-faq__item { border: 1px solid rgba(128,168,116,0.2); border-radius: 3px; margin-bottom: 0.5rem; overflow: hidden; }
  .van-faq__q { display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.1rem; cursor: pointer; background: rgba(128,168,116,0.04); }
  .van-faq__q-text { font-size: 0.88rem; color: var(--dark); }
  .van-faq__icon { font-size: 1rem; color: var(--teal); transition: transform 0.2s; }
  .van-faq__icon--open { transform: rotate(45deg); }
  .van-faq__a { padding: 0 1.1rem 0.9rem; font-size: 0.82rem; color: var(--text-light); line-height: 1.6; }
  .estimate-display { background: var(--dark); border-radius: 4px; padding: 2rem 2.5rem; margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
  .estimate-display__block { flex: 1; min-width: 120px; }
  .estimate-display__label { font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(234,243,222,0.4); margin-bottom: 0.3rem; }
  .estimate-display__val { font-family: var(--font-cinzel), serif; font-size: 1.6rem; color: var(--mint); }
  .estimate-display__sub { font-size: 0.7rem; color: rgba(234,243,222,0.4); margin-top: 0.25rem; }
  .estimate-display__note { font-size: 0.75rem; color: rgba(234,243,222,0.45); max-width: 260px; line-height: 1.5; }
  .contact-block { background: var(--cream); border-radius: 4px; padding: 2rem 2.5rem; margin-top: 1.5rem; }
  .contact-block h3 { font-family: var(--font-cinzel), serif; font-size: 1rem; color: var(--dark); margin-bottom: 1rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.3rem; }
  .form-group label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-light); }
  .form-group input, .form-group textarea, .form-group select { padding: 0.65rem 0.9rem; border: 1px solid rgba(128,168,116,0.35); border-radius: 2px; font-size: 0.88rem; background: white; color: var(--dark); font-family: inherit; }
  .form-group textarea { resize: vertical; min-height: 90px; }
  .opt-radio-card { display: block; border: 2px solid rgba(128,168,116,0.25); border-radius: 3px; padding: 0.9rem 1rem; cursor: pointer; transition: border-color 0.18s, background 0.18s; position: relative; background: white; user-select: none; }
  .opt-radio-card:hover { border-color: var(--sage); background: rgba(128,168,116,0.05); }
  .opt-radio-card--selected { border-color: #39cccc; background: rgba(57,204,204,0.07); }
  .opt-radio-card--selected::after { content: "●"; position: absolute; top: 6px; right: 8px; color: #39cccc; font-size: 0.9rem; }
  .opt-radio-card__name { font-family: var(--font-cinzel), serif; font-size: 0.82rem; color: var(--dark); margin-bottom: 0.25rem; }
  .opt-radio-card__desc { font-size: 0.73rem; color: var(--text-light); line-height: 1.5; }
  .booking-block { margin-top: 2rem; }
  .booking-block h3 { font-family: var(--font-cinzel), serif; font-size: 1rem; color: var(--dark); margin-bottom: 0.5rem; }
  .booking-block p { font-size: 0.82rem; color: var(--text-light); margin-bottom: 1rem; }
  .slots-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.5rem; margin-bottom: 1.5rem; }
  .slot-card { border: 2px solid rgba(128,168,116,0.25); border-radius: 3px; padding: 0.75rem 1rem; cursor: pointer; transition: border-color 0.18s, background 0.18s; background: white; }
  .slot-card:hover { border-color: var(--sage); background: rgba(128,168,116,0.05); }
  .slot-card--selected { border-color: #39cccc; background: rgba(57,204,204,0.07); }
  .slot-card__week { font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.2rem; }
  .slot-card__time { font-family: var(--font-cinzel), serif; font-size: 0.85rem; color: var(--dark); }
  .payment-block { background: var(--dark); border-radius: 4px; padding: 1.5rem 2rem; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
  .payment-block__info { color: rgba(234,243,222,0.7); font-size: 0.85rem; line-height: 1.6; }
  .payment-block__amount { font-family: var(--font-cinzel), serif; font-size: 2rem; color: var(--mint); }
  .quote-panel { padding: 3rem 0 5rem; background: var(--white); }
  @media (max-width: 900px) { .option-cards--3, .option-cards--4, .option-cards--radio { grid-template-columns: repeat(2,1fr); } .form-row { grid-template-columns: 1fr; } }
  @media (max-width: 600px) { .option-cards--3, .option-cards--4, .option-cards--radio { grid-template-columns: 1fr; } .estimate-display { flex-direction: column; } }
`;

type SkyItem = { checked: boolean; qty: number };

function fmt(n: number) { return "€" + Math.round(n).toLocaleString("en-IE"); }

export default function QuotePage() {
  const [panel, setPanel] = useState<'quick' | 'detailed'>('quick');
  const [faqOpen, setFaqOpen] = useState([false, false, false]);

  // Quick Quote state
  const [vanSize, setVanSize] = useState<VanSize>('medium');
  const [power, setPower]   = useState({ light:false, charge:false, battery:false, solar:false, induction:false, gas:false, mains:false });
  const [heat, setHeat]     = useState({ insulation:false, diesel:false, hotwater:false });
  const [sky, setSky]       = useState<Record<SkyKey, SkyItem>>({
    fan:       {checked:false, qty:1},
    toiletvent:{checked:false, qty:1},
    largesky:  {checked:false, qty:1},
    smallsky:  {checked:false, qty:1},
    smallwin:  {checked:false, qty:1},
    largewin:  {checked:false, qty:1},
  });
  const [water, setWater]   = useState({ sink:false, toilet:false, shower:false, wetroom:false, external:false });
  const [layout, setLayout] = useState({ dbed:false, sbed:false, couch:false, kitchen:false, garage:false, bathroom:false, desk:false, storage:false, finish:false });

  // Detailed Quote state
  const [dPower,   setDPower]   = useState('');
  const [dHeat,    setDHeat]    = useState('');
  const [dSky,     setDSky]     = useState('');
  const [dWater,   setDWater]   = useState('');
  const [dWaterEx, setDWaterEx] = useState({ shower:false, wetroom:false, external:false });
  const [dLayout,  setDLayout]  = useState({ dbed:false, sbed:false, couch:false, kitchen:false, garage:false, bathroom:false, desk:false, storage:false, finish:false });
  const [slot, setSlot] = useState('');

  function toggleFaq(i: number) {
    setFaqOpen(prev => prev.map((v, idx) => idx === i ? !v : v));
  }

  function toggleWater(key: keyof typeof water) {
    setWater(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'shower' && next.shower) next.wetroom = true;
      if (key === 'wetroom' && !next.wetroom) next.shower = false;
      return next;
    });
  }

  // Quick Quote estimate calculation
  const scale = VAN_SCALE[vanSize];
  let matMin = 0, matMax = 0, timeMin = 0, timeMax = 0;

  (Object.keys(power) as (keyof typeof power)[]).forEach(k => {
    if (!power[k]) return;
    matMin += COSTS.power[k][0] * scale;
    matMax += COSTS.power[k][1] * scale;
    timeMin += TIME[k][0]; timeMax += TIME[k][1];
  });
  (Object.keys(heat) as (keyof typeof heat)[]).forEach(k => {
    if (!heat[k]) return;
    matMin += COSTS.heat[k][0] * scale;
    matMax += COSTS.heat[k][1] * scale;
    timeMin += TIME[k][0]; timeMax += TIME[k][1];
  });
  (Object.keys(sky) as SkyKey[]).forEach(k => {
    if (!sky[k].checked) return;
    const qty = sky[k].qty;
    matMin += COSTS.sky[k][0] * scale * qty;
    matMax += COSTS.sky[k][1] * scale * qty;
    timeMin += TIME[k][0]; timeMax += TIME[k][1];
  });
  (Object.keys(water) as (keyof typeof water)[]).forEach(k => {
    if (!water[k]) return;
    matMin += COSTS.water[k][0] * scale;
    matMax += COSTS.water[k][1] * scale;
    timeMin += TIME[k][0]; timeMax += TIME[k][1];
  });
  (Object.keys(layout) as (keyof typeof layout)[]).forEach(k => {
    if (!layout[k]) return;
    matMin += COSTS.layout[k][0] * scale;
    matMax += COSTS.layout[k][1] * scale;
    timeMin += TIME[k][0]; timeMax += TIME[k][1];
  });
  // Van prep time
  const vanTimeKey = `van${vanSize.charAt(0).toUpperCase()}${vanSize.slice(1)}` as keyof typeof TIME;
  timeMin += TIME[vanTimeKey][0]; timeMax += TIME[vanTimeKey][1];

  const labMin = timeMin * 350;
  const labMax = timeMax * 500;
  const totalMin = matMin + labMin;
  const totalMax = matMax + labMax;
  const hasSelections = matMin > 0;

  function checkCard(checked: boolean, onClick: () => void, name: string, desc: string, extra?: React.ReactNode) {
    return (
      <div className={`opt-check-card${checked ? " opt-check-card--checked" : ""}`} onClick={onClick}>
        <div className="opt-check-card__name">{name}</div>
        <div className="opt-check-card__desc">{desc}</div>
        {extra}
      </div>
    );
  }

  function radioCard(selected: boolean, onClick: () => void, name: string, desc: string) {
    return (
      <div className={`opt-radio-card${selected ? " opt-radio-card--selected" : ""}`} onClick={onClick}>
        <div className="opt-radio-card__name">{name}</div>
        <div className="opt-radio-card__desc">{desc}</div>
      </div>
    );
  }

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
        <p className="page-hero__breadcrumb"><Link href="/">Home</Link> / Get a Quote</p>
        <p className="page-hero__eyebrow">No Obligation</p>
        <h1 className="page-hero__title">Get a Quote</h1>
        <p className="page-hero__sub">Choose how you&apos;d like to proceed — a quick rough estimate, or a detailed quote request that Caolán will review personally.</p>
      </section>

      <div className="quote-chooser">
        <button
          className={`quote-type-btn${panel === 'quick' ? " quote-type-btn--active" : ""}`}
          onClick={() => setPanel('quick')}
        >Quick Quote</button>
        <button
          className={`quote-type-btn${panel === 'detailed' ? " quote-type-btn--active" : ""}`}
          onClick={() => setPanel('detailed')}
        >Detailed Quote</button>
      </div>

      {/* QUICK QUOTE PANEL */}
      {panel === 'quick' && (
        <div className="quote-panel">
          <div className="container">

            {/* Van Size */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">01</span>
                <span className="config-section__title">Van Size</span>
                <span className="config-section__hint">{vanSize.charAt(0).toUpperCase() + vanSize.slice(1)} selected</span>
              </div>
              <div className="option-cards option-cards--radio">
                {radioCard(vanSize==='small',  ()=>setVanSize('small'),  "Small Van", "SWB Transit, Sprinter, or similar. Compact builds — great for solo travellers.")}
                {radioCard(vanSize==='medium', ()=>setVanSize('medium'), "Medium Van", "LWB Transit or similar. The most common conversion size — good balance of space and driveability.")}
                {radioCard(vanSize==='large',  ()=>setVanSize('large'),  "Large Van", "Luton, Crafter, or high-roof LWB. Maximum living space — longer build time and cost.")}
              </div>
              <div className="van-faq">
                {[
                  { q:"What counts as a small van?", a:"A short-wheelbase (SWB) van — typically under 5m long. Examples: Ford Transit SWB, VW T6/T6.1, Mercedes Sprinter SWB. These suit solo travellers or couples who prioritise a smaller footprint." },
                  { q:"Is a large van worth the extra cost?", a:"Depends on your lifestyle. Large vans give you a proper stand-up shower, separate bathroom, and a real kitchen — but they cost more to insure, fuel, and park. If you&apos;re living in it full-time, it&apos;s usually worth it." },
                  { q:"Does van size affect the build cost much?", a:"Yes — more materials, more surface area to line and clad, and often more complex installs. We apply a size factor to our estimates to reflect this. A large van build typically costs 15–25% more than the same spec in a medium van." },
                ].map((item, i) => (
                  <div className="van-faq__item" key={i}>
                    <div className="van-faq__q" onClick={() => toggleFaq(i)}>
                      <span className="van-faq__q-text">{item.q}</span>
                      <span className={`van-faq__icon${faqOpen[i] ? " van-faq__icon--open" : ""}`}>+</span>
                    </div>
                    {faqOpen[i] && <div className="van-faq__a">{item.a}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Power */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">02</span>
                <span className="config-section__title">Power &amp; Electrics</span>
                <span className="config-section__hint">
                  {(Object.keys(power) as (keyof typeof power)[]).filter(k=>power[k]).length > 0
                    ? `${(Object.keys(power) as (keyof typeof power)[]).filter(k=>power[k]).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {checkCard(power.light,     ()=>setPower(p=>({...p,light:!p.light})),         "Lighting",              "LED strip and spot lighting throughout.")}
                {checkCard(power.charge,    ()=>setPower(p=>({...p,charge:!p.charge})),        "Charging Ports",        "USB-A, USB-C, and 12V power points.")}
                {checkCard(power.battery,   ()=>setPower(p=>({...p,battery:!p.battery})),      "Leisure Battery",       "Deep-cycle battery with BMS and isolator.")}
                {checkCard(power.solar,     ()=>setPower(p=>({...p,solar:!p.solar})),          "Solar Panels",          "Roof panels with MPPT charge controller.")}
                {checkCard(power.induction, ()=>setPower(p=>({...p,induction:!p.induction})),  "Induction Cooker",      "Hob wired via inverter to leisure battery.")}
                {checkCard(power.gas,       ()=>setPower(p=>({...p,gas:!p.gas})),              "Gas Cooker",            "Gas hob with bottle storage and safety cut-off.")}
                {checkCard(power.mains,     ()=>setPower(p=>({...p,mains:!p.mains})),          "Mains Hook-Up",         "240V socket for campsite hookup charging.")}
              </div>
            </div>

            {/* Heating */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">03</span>
                <span className="config-section__title">Heating &amp; Insulation</span>
                <span className="config-section__hint">
                  {(Object.keys(heat) as (keyof typeof heat)[]).filter(k=>heat[k]).length > 0
                    ? `${(Object.keys(heat) as (keyof typeof heat)[]).filter(k=>heat[k]).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {checkCard(heat.insulation, ()=>setHeat(h=>({...h,insulation:!h.insulation})), "Full Insulation",      "Spray foam plus Celotex boards throughout.")}
                {checkCard(heat.diesel,     ()=>setHeat(h=>({...h,diesel:!h.diesel})),         "Diesel Heater",        "Webasto or Eberspächer — reliable winter heating.")}
                {checkCard(heat.hotwater,   ()=>setHeat(h=>({...h,hotwater:!h.hotwater})),     "Hot Water System",     "Diesel-fed hot water for sink and shower.")}
              </div>
            </div>

            {/* Skylights */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">04</span>
                <span className="config-section__title">Skylights &amp; Windows</span>
                <span className="config-section__hint">
                  {(Object.keys(sky) as SkyKey[]).filter(k=>sky[k].checked).length > 0
                    ? `${(Object.keys(sky) as SkyKey[]).filter(k=>sky[k].checked).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {(["fan","toiletvent"] as SkyKey[]).map(k => {
                  const labels: Record<string,[string,string]> = {
                    fan:       ["Roof Fan / Vent",   "MaxxAir or Fantastic Fan — ventilation and air circulation."],
                    toiletvent:["Toilet Vent",        "Small rooflight above the toilet area for air and light."],
                  };
                  return checkCard(sky[k].checked, ()=>setSky(s=>({...s,[k]:{...s[k],checked:!s[k].checked}})), labels[k][0], labels[k][1]);
                })}
                {(["largesky","smallsky","smallwin","largewin"] as SkyKey[]).map(k => {
                  const labels: Record<string,[string,string]> = {
                    largesky: ["Large Skylight",  "Full-opening rooflight — great for stargazing and airflow."],
                    smallsky: ["Small Skylight",  "Fixed or tilt-only rooflight for light without full opening."],
                    smallwin: ["Small Side Window","Fixed glazed panel — adds light to a dark area."],
                    largewin: ["Large Side Window","Opening side window — fresh air and a view."],
                  };
                  return (
                    <div
                      key={k}
                      className={`opt-check-card${sky[k].checked ? " opt-check-card--checked" : ""}`}
                      onClick={() => setSky(s=>({...s,[k]:{...s[k],checked:!s[k].checked}}))}
                    >
                      <div className="opt-check-card__name">{labels[k][0]}</div>
                      <div className="opt-check-card__desc">{labels[k][1]}</div>
                      {sky[k].checked && (
                        <div className="opt-check-card__qty" onClick={e=>e.stopPropagation()}>
                          <label htmlFor={`qty-${k}`}>Qty:</label>
                          <input
                            id={`qty-${k}`}
                            type="number"
                            min={1}
                            max={4}
                            value={sky[k].qty}
                            onChange={e => setSky(s=>({...s,[k]:{...s[k],qty:Math.max(1,parseInt(e.target.value)||1)}}))}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Water */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">05</span>
                <span className="config-section__title">Water System</span>
                <span className="config-section__hint">
                  {(Object.keys(water) as (keyof typeof water)[]).filter(k=>water[k]).length > 0
                    ? `${(Object.keys(water) as (keyof typeof water)[]).filter(k=>water[k]).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {checkCard(water.sink,     ()=>toggleWater('sink'),     "Sink",           "Fresh and grey water tanks with pump and tap.")}
                {checkCard(water.toilet,   ()=>toggleWater('toilet'),   "Cassette Toilet", "Compact toilet with removable waste cassette.")}
                {checkCard(water.shower,   ()=>toggleWater('shower'),   "Shower",          "Handheld or fixed shower — includes hot water connection.")}
                {checkCard(water.wetroom,  ()=>toggleWater('wetroom'),  "Wet Room",        "Waterproofed floor-to-ceiling wet room — combined with shower.")}
                {checkCard(water.external, ()=>toggleWater('external'), "External Shower", "Outdoor rinse shower — great for beach or hiking trips.")}
              </div>
            </div>

            {/* Layout */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">06</span>
                <span className="config-section__title">Layout &amp; Furniture</span>
                <span className="config-section__hint">
                  {(Object.keys(layout) as (keyof typeof layout)[]).filter(k=>layout[k]).length > 0
                    ? `${(Object.keys(layout) as (keyof typeof layout)[]).filter(k=>layout[k]).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {checkCard(layout.dbed,     ()=>setLayout(l=>({...l,dbed:!l.dbed})),       "Double Bed",       "Fixed double bed — the most popular option.")}
                {checkCard(layout.sbed,     ()=>setLayout(l=>({...l,sbed:!l.sbed})),       "Single/Rock & Roll","Convertible seating-to-bed — saves space.")}
                {checkCard(layout.couch,    ()=>setLayout(l=>({...l,couch:!l.couch})),     "Seating / Couch",  "Fixed seating area with storage underneath.")}
                {checkCard(layout.kitchen,  ()=>setLayout(l=>({...l,kitchen:!l.kitchen})), "Kitchen Unit",     "Worktop, storage, and appliance housing.")}
                {checkCard(layout.garage,   ()=>setLayout(l=>({...l,garage:!l.garage})),   "Garage Area",      "Under-bed storage accessible from the rear doors.")}
                {checkCard(layout.bathroom, ()=>setLayout(l=>({...l,bathroom:!l.bathroom})),"Bathroom Unit",  "Enclosed bathroom pod with door.")}
                {checkCard(layout.desk,     ()=>setLayout(l=>({...l,desk:!l.desk})),       "Desk / Workspace", "Fold-down or fixed desk for working on the road.")}
                {checkCard(layout.storage,  ()=>setLayout(l=>({...l,storage:!l.storage})), "Overhead Storage", "Overhead cabinets and lockers.")}
                {checkCard(layout.finish,   ()=>setLayout(l=>({...l,finish:!l.finish})),   "Cladding & Flooring","Walls, ceiling, and floor — the finishing layer.")}
              </div>
            </div>

            {/* Estimate */}
            <div className="estimate-display">
              <div className="estimate-display__block">
                <div className="estimate-display__label">Materials</div>
                <div className="estimate-display__val">{hasSelections ? `${fmt(matMin)} – ${fmt(matMax)}` : "—"}</div>
              </div>
              <div className="estimate-display__block">
                <div className="estimate-display__label">Labour</div>
                <div className="estimate-display__val">{hasSelections ? `${fmt(labMin)} – ${fmt(labMax)}` : "—"}</div>
                {hasSelections && <div className="estimate-display__sub">{Math.round(timeMin)}–{Math.round(timeMax)} days</div>}
              </div>
              <div className="estimate-display__block">
                <div className="estimate-display__label">Rough Total</div>
                <div className="estimate-display__val">{hasSelections ? `${fmt(totalMin)} – ${fmt(totalMax)}` : "Select options above"}</div>
              </div>
              <p className="estimate-display__note">Ballpark only — not a quote. Get in touch for a real number based on your van and spec.</p>
            </div>

            {/* Contact form */}
            <div className="contact-block">
              <h3>Send This Estimate to Caolán</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="qq-name">Your Name</label>
                  <input id="qq-name" type="text" placeholder="Jane Smith" />
                </div>
                <div className="form-group">
                  <label htmlFor="qq-email">Email</label>
                  <input id="qq-email" type="email" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="form-group" style={{marginBottom:"1rem"}}>
                <label htmlFor="qq-van">Van Make / Model / Year</label>
                <input id="qq-van" type="text" placeholder="e.g. Ford Transit LWB 2021" />
              </div>
              <div className="form-group" style={{marginBottom:"1.5rem"}}>
                <label htmlFor="qq-msg">Anything else to add?</label>
                <textarea id="qq-msg" placeholder="Tell Caolán anything useful — timeline, specific requirements, questions…" />
              </div>
              <button className="btn btn--primary">Send Quick Quote Request</button>
            </div>

          </div>
        </div>
      )}

      {/* DETAILED QUOTE PANEL */}
      {panel === 'detailed' && (
        <div className="quote-panel">
          <div className="container">

            {/* Power */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">01</span>
                <span className="config-section__title">Power &amp; Electrics</span>
                <span className="config-section__hint">{dPower || "Pick the option closest to what you need"}</span>
              </div>
              <div className="option-cards option-cards--radio">
                {radioCard(dPower==='basic',   ()=>setDPower('basic'),   "Basic Electrics",     "Lighting, USB charging, and a modest leisure battery — enough for weekend trips.")}
                {radioCard(dPower==='mid',     ()=>setDPower('mid'),     "Mid-Range Setup",     "Everything in basic plus solar and a proper LiFePO4 battery — good for extended trips off-grid.")}
                {radioCard(dPower==='full',    ()=>setDPower('full'),    "Full Off-Grid System", "Full solar array, large lithium bank, inverter/charger, mains hookup, and induction cooking.")}
              </div>
            </div>

            {/* Heating */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">02</span>
                <span className="config-section__title">Heating &amp; Insulation</span>
                <span className="config-section__hint">{dHeat || "Pick the option closest to what you need"}</span>
              </div>
              <div className="option-cards option-cards--radio">
                {radioCard(dHeat==='insulation', ()=>setDHeat('insulation'), "Insulation Only",  "Full spray foam and rigid board insulation — keeps heat in without a heater install.")}
                {radioCard(dHeat==='heater',     ()=>setDHeat('heater'),     "Heater + Insulation","Diesel air heater (Webasto or Eberspächer) plus full insulation.")}
                {radioCard(dHeat==='full',        ()=>setDHeat('full'),       "Full Heating System","Diesel air heater, diesel hot water, and full insulation — total climate control.")}
              </div>
            </div>

            {/* Skylights */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">03</span>
                <span className="config-section__title">Skylights &amp; Windows</span>
                <span className="config-section__hint">{dSky || "Pick the option closest to what you need"}</span>
              </div>
              <div className="option-cards option-cards--radio">
                {radioCard(dSky==='none',      ()=>setDSky('none'),      "No Windows",     "Keep the van stealthy — no cuts in the bodywork.")}
                {radioCard(dSky==='vent',      ()=>setDSky('vent'),      "Roof Fan Only",  "MaxxAir or Fantastic Fan for ventilation — no side windows.")}
                {radioCard(dSky==='full',      ()=>setDSky('full'),      "Full Glazing",   "Roof fan, rooflight, and side windows — bright and airy.")}
              </div>
            </div>

            {/* Water */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">04</span>
                <span className="config-section__title">Water System</span>
                <span className="config-section__hint">{dWater || "Pick the option closest to what you need"}</span>
              </div>
              <div className="option-cards option-cards--radio">
                {radioCard(dWater==='none',   ()=>setDWater('none'),   "No Water System",  "No plumbing — use campsite facilities.")}
                {radioCard(dWater==='sink',   ()=>setDWater('sink'),   "Sink Only",         "Fresh and grey water tanks with pump and tap.")}
                {radioCard(dWater==='full',   ()=>setDWater('full'),   "Full Water System", "Sink, toilet, shower, and hot water.")}
              </div>
              <div style={{marginTop:"1rem"}}>
                <p style={{fontSize:"0.8rem",color:"var(--text-light)",marginBottom:"0.6rem"}}>Add-ons (select all that apply):</p>
                <div className="option-cards option-cards--3">
                  {checkCard(dWaterEx.shower,   ()=>setDWaterEx(x=>({...x,shower:!x.shower})),     "Shower",         "Handheld or fixed shower — includes hot water connection.")}
                  {checkCard(dWaterEx.wetroom,  ()=>setDWaterEx(x=>({...x,wetroom:!x.wetroom})),   "Wet Room",       "Waterproofed wet room around the shower.")}
                  {checkCard(dWaterEx.external, ()=>setDWaterEx(x=>({...x,external:!x.external})), "External Shower","Outdoor rinse point — great for surfing or hiking.")}
                </div>
              </div>
            </div>

            {/* Layout */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">05</span>
                <span className="config-section__title">Layout &amp; Furniture</span>
                <span className="config-section__hint">
                  {(Object.keys(dLayout) as (keyof typeof dLayout)[]).filter(k=>dLayout[k]).length > 0
                    ? `${(Object.keys(dLayout) as (keyof typeof dLayout)[]).filter(k=>dLayout[k]).length} selected`
                    : "Select all that apply"}
                </span>
              </div>
              <div className="option-cards option-cards--3">
                {checkCard(dLayout.dbed,    ()=>setDLayout(l=>({...l,dbed:!l.dbed})),    "Double Bed",       "Fixed double bed.")}
                {checkCard(dLayout.sbed,    ()=>setDLayout(l=>({...l,sbed:!l.sbed})),    "Rock & Roll Bed",  "Converts from seating to bed.")}
                {checkCard(dLayout.couch,   ()=>setDLayout(l=>({...l,couch:!l.couch})),  "Seating Area",     "Fixed bench seating with storage.")}
                {checkCard(dLayout.kitchen, ()=>setDLayout(l=>({...l,kitchen:!l.kitchen})),"Kitchen Unit",   "Worktop, sink housing, and storage.")}
                {checkCard(dLayout.garage,  ()=>setDLayout(l=>({...l,garage:!l.garage})), "Garage Storage",  "Under-bed storage from rear doors.")}
                {checkCard(dLayout.bathroom,()=>setDLayout(l=>({...l,bathroom:!l.bathroom})),"Bathroom Pod", "Enclosed bathroom with door.")}
                {checkCard(dLayout.desk,    ()=>setDLayout(l=>({...l,desk:!l.desk})),    "Desk / Workspace", "Fold-down or fixed work desk.")}
                {checkCard(dLayout.storage, ()=>setDLayout(l=>({...l,storage:!l.storage})),"Overhead Storage","Cabinets and overhead lockers.")}
                {checkCard(dLayout.finish,  ()=>setDLayout(l=>({...l,finish:!l.finish})), "Cladding & Flooring","Walls, ceiling, and floor finish.")}
              </div>
            </div>

            {/* Personal details */}
            <div className="config-section">
              <div className="config-section__head">
                <span className="config-section__num">06</span>
                <span className="config-section__title">Your Details</span>
              </div>
              <div className="contact-block" style={{marginTop:0}}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dq-name">Full Name</label>
                    <input id="dq-name" type="text" placeholder="Jane Smith" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dq-email">Email</label>
                    <input id="dq-email" type="email" placeholder="jane@example.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dq-phone">Phone (optional)</label>
                    <input id="dq-phone" type="tel" placeholder="+353 87 000 0000" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dq-van">Van Make / Model / Year</label>
                    <input id="dq-van" type="text" placeholder="e.g. Ford Transit LWB 2021" />
                  </div>
                </div>
                <div className="form-group" style={{marginBottom:"1rem"}}>
                  <label htmlFor="dq-msg">Tell Caolán about your build</label>
                  <textarea id="dq-msg" placeholder="How do you plan to use the van? Any specific requirements, timeline, or inspiration? The more detail the better…" />
                </div>
              </div>
            </div>

            {/* Booking slots */}
            <div className="booking-block">
              <h3>Book a Free Consultation Call</h3>
              <p>Pick a slot that suits you — Caolán will call you at the booked time to talk through your quote. No obligation.</p>
              <div className="slots-grid">
                {SLOTS.map(s => (
                  <div
                    key={s.id}
                    className={`slot-card${slot===s.id ? " slot-card--selected" : ""}`}
                    onClick={() => setSlot(slot===s.id ? '' : s.id)}
                  >
                    <div className="slot-card__week">{s.week}</div>
                    <div className="slot-card__time">{s.day} · {s.time}</div>
                  </div>
                ))}
              </div>

              <div className="payment-block">
                <div className="payment-block__info">
                  <strong style={{color:"var(--cream)"}}>Booking Fee — Refundable</strong><br />
                  A €100 deposit is taken to confirm your consultation slot. It&apos;s fully refunded against your build cost, or returned in full if you decide not to proceed.
                </div>
                <div className="payment-block__amount">€100</div>
                <button className="btn btn--primary">Confirm &amp; Pay €100</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
