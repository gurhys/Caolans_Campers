"use client";
import { useState, useMemo } from "react";

const pageStyles = `
  .portal-wrap { min-height: 100vh; background: #f5f7f2; font-family: var(--font-lato), sans-serif; }
  /* Login */
  .login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(160deg, var(--dark) 0%, #1e6b7a 60%, #2a7a6a 100%); padding: 2rem; }
  .login-card { background: white; border-radius: 6px; padding: 3rem 2.5rem; max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  .login-card__logo { font-family: var(--font-cinzel), serif; font-size: 1.1rem; color: var(--dark); margin-bottom: 0.3rem; }
  .login-card__sub { font-size: 0.8rem; color: var(--text-light); margin-bottom: 2rem; }
  .login-card h2 { font-family: var(--font-cinzel), serif; font-size: 1.3rem; color: var(--dark); margin-bottom: 1.5rem; }
  .login-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
  .login-form label { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-light); display: block; margin-bottom: 0.25rem; }
  .login-form input { width: 100%; padding: 0.65rem 0.9rem; border: 1px solid rgba(128,168,116,0.35); border-radius: 2px; font-size: 0.9rem; box-sizing: border-box; }
  .login-divider { text-align: center; font-size: 0.75rem; color: var(--text-light); margin: 1.5rem 0; position: relative; }
  .login-divider::before { content:''; position:absolute; top:50%; left:0; right:0; height:1px; background:rgba(0,0,0,0.1); }
  .login-divider span { background:white; padding: 0 0.75rem; position:relative; }
  .demo-btns { display: flex; gap: 0.75rem; flex-direction: column; }
  /* App shell */
  .app-shell { display: flex; flex-direction: column; min-height: 100vh; }
  .app-header { background: var(--dark); color: var(--cream); padding: 0.9rem 1.5rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
  .app-header__logo { font-family: var(--font-cinzel), serif; font-size: 0.95rem; }
  .app-header__right { display: flex; align-items: center; gap: 1rem; }
  .app-header__user { font-size: 0.8rem; color: rgba(234,243,222,0.65); }
  .app-body { display: flex; flex: 1; }
  /* Sidebar */
  .sidebar { width: 240px; background: white; border-right: 1px solid rgba(128,168,116,0.15); padding: 1.5rem 0; flex-shrink: 0; }
  .sidebar__section-title { font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-light); padding: 0 1.2rem; margin: 1rem 0 0.4rem; }
  .sidebar__item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1.2rem; cursor: pointer; font-size: 0.88rem; color: var(--text-light); border-left: 3px solid transparent; transition: all 0.15s; }
  .sidebar__item:hover { background: rgba(128,168,116,0.06); color: var(--dark); }
  .sidebar__item--active { border-left-color: var(--teal); background: rgba(57,204,204,0.07); color: var(--dark); font-weight: 600; }
  .sidebar__client-item { padding: 0.5rem 1.2rem; cursor: pointer; border-left: 3px solid transparent; transition: all 0.15s; }
  .sidebar__client-item:hover { background: rgba(128,168,116,0.06); }
  .sidebar__client-item--active { border-left-color: var(--teal); background: rgba(57,204,204,0.07); }
  .sidebar__client-avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--sage); display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; color: white; font-weight: 700; flex-shrink: 0; }
  .sidebar__client-info { flex: 1; }
  .sidebar__client-name { font-size: 0.82rem; color: var(--dark); font-weight: 600; }
  .sidebar__client-status { font-size: 0.7rem; color: var(--text-light); }
  /* Main panel area */
  .panel-area { flex: 1; padding: 2rem; overflow-y: auto; }
  .panel { display: none; }
  .panel--active { display: block; }
  /* Stat cards */
  .stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .stat-card { background: white; border-radius: 4px; padding: 1.25rem 1.5rem; border: 1px solid rgba(128,168,116,0.15); }
  .stat-card__label { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-light); margin-bottom: 0.4rem; }
  .stat-card__val { font-family: var(--font-cinzel), serif; font-size: 1.5rem; color: var(--dark); }
  .stat-card__sub { font-size: 0.72rem; color: var(--text-light); margin-top: 0.2rem; }
  /* Progress timeline */
  .timeline { margin: 2rem 0; }
  .timeline__title { font-family: var(--font-cinzel), serif; font-size: 0.9rem; color: var(--dark); margin-bottom: 1rem; }
  .timeline__steps { display: flex; flex-direction: column; gap: 0; }
  .timeline__step { display: flex; gap: 1rem; padding: 0.75rem 0; border-left: 2px solid rgba(128,168,116,0.2); margin-left: 0.9rem; padding-left: 1.2rem; position: relative; }
  .timeline__step::before { content:''; position:absolute; left:-7px; top:1rem; width:12px; height:12px; border-radius:50%; background:rgba(128,168,116,0.3); border:2px solid white; }
  .timeline__step--done { border-left-color: var(--teal); }
  .timeline__step--done::before { background: var(--teal); }
  .timeline__step--active::before { background: var(--mint); border-color: var(--teal); box-shadow: 0 0 0 3px rgba(57,204,204,0.2); }
  .timeline__step-num { font-family: var(--font-cinzel), serif; font-size: 0.7rem; color: var(--text-light); width: 1.5rem; flex-shrink:0; padding-top:0.1rem; }
  .timeline__step-content { flex:1; }
  .timeline__step-title { font-size: 0.88rem; color: var(--dark); font-weight: 600; }
  .timeline__step-desc { font-size: 0.78rem; color: var(--text-light); line-height: 1.5; margin-top:0.15rem; }
  /* Quote breakdown */
  .quote-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  .quote-table th { text-align: left; font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-light); padding: 0.5rem 0.75rem; border-bottom: 2px solid rgba(128,168,116,0.15); }
  .quote-table td { padding: 0.6rem 0.75rem; border-bottom: 1px solid rgba(128,168,116,0.08); color: var(--dark); }
  .quote-table tr:last-child td { border-bottom: none; }
  .quote-total-row { background: var(--dark); }
  .quote-total-row td { color: var(--cream); font-family: var(--font-cinzel), serif; }
  /* Photo grid */
  .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .photo-placeholder { aspect-ratio: 4/3; background: rgba(128,168,116,0.12); border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; color: var(--text-light); border: 2px dashed rgba(128,168,116,0.25); }
  /* Messages */
  .messages-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
  .message-bubble { background: white; border-radius: 4px; padding: 1rem 1.25rem; border: 1px solid rgba(128,168,116,0.15); max-width: 80%; }
  .message-bubble--from-caolan { border-left: 3px solid var(--teal); }
  .message-bubble--from-client { align-self: flex-end; border-right: 3px solid var(--sage); }
  .message-bubble__meta { font-size: 0.68rem; color: var(--text-light); margin-bottom: 0.35rem; }
  .message-bubble__text { font-size: 0.88rem; color: var(--dark); line-height: 1.6; }
  .message-reply { display: flex; gap: 0.75rem; }
  .message-reply textarea { flex:1; padding: 0.65rem 0.9rem; border: 1px solid rgba(128,168,116,0.35); border-radius: 2px; resize: none; font-family: inherit; font-size: 0.88rem; min-height: 70px; }
  /* Panel header */
  .panel-header { margin-bottom: 2rem; }
  .panel-header h1 { font-family: var(--font-cinzel), serif; font-size: 1.5rem; color: var(--dark); margin-bottom: 0.3rem; }
  .panel-header p { font-size: 0.88rem; color: var(--text-light); }
  /* Cards */
  .content-card { background: white; border-radius: 4px; padding: 1.5rem; border: 1px solid rgba(128,168,116,0.15); margin-bottom: 1.5rem; }
  .content-card h2 { font-family: var(--font-cinzel), serif; font-size: 1rem; color: var(--dark); margin-bottom: 1rem; }
  .content-card h3 { font-size: 0.9rem; font-weight: 600; color: var(--dark); margin-bottom: 0.75rem; }
  /* Progress bar */
  .progress-bar-wrap { background: rgba(128,168,116,0.15); border-radius: 10px; height: 8px; margin-bottom: 1.5rem; overflow: hidden; }
  .progress-bar-fill { background: var(--teal); height: 100%; border-radius: 10px; transition: width 0.3s; }
  /* Forms */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.25rem; }
  .form-group label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-light); }
  .form-group input, .form-group textarea, .form-group select { padding: 0.55rem 0.8rem; border: 1px solid rgba(128,168,116,0.3); border-radius: 2px; font-size: 0.85rem; font-family:inherit; }
  .form-group textarea { resize:vertical; min-height:70px; }
  /* Tabs */
  .tab-bar { display: flex; gap: 0; border-bottom: 2px solid rgba(128,168,116,0.15); margin-bottom: 1.5rem; }
  .tab-btn { padding: 0.6rem 1.2rem; font-size: 0.82rem; color: var(--text-light); cursor:pointer; border-bottom: 2px solid transparent; margin-bottom:-2px; transition:all 0.15s; background:none; border-top:none; border-left:none; border-right:none; }
  .tab-btn:hover { color: var(--dark); }
  .tab-btn--active { color: var(--teal); border-bottom-color: var(--teal); font-weight: 600; }
  /* Parts table */
  .parts-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
  .parts-table th { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-light); text-align:left; padding: 0.45rem 0.6rem; border-bottom: 2px solid rgba(128,168,116,0.15); }
  .parts-table td { padding: 0.5rem 0.6rem; border-bottom: 1px solid rgba(128,168,116,0.08); color: var(--dark); }
  /* Finances */
  .fin-summary { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 1rem; margin-bottom: 1.5rem; }
  .fin-card { background:var(--dark); border-radius:4px; padding:1rem 1.25rem; }
  .fin-card__label { font-size:0.65rem; letter-spacing:0.15em; text-transform:uppercase; color:rgba(234,243,222,0.45); margin-bottom:0.3rem; }
  .fin-card__val { font-family:var(--font-cinzel),serif; font-size:1.3rem; color:var(--mint); }
  /* Calendar */
  .cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; }
  .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
  .cal-day-name { text-align:center; font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-light); padding:0.4rem 0; }
  .cal-cell { min-height:70px; background:white; border:1px solid rgba(128,168,116,0.12); border-radius:2px; padding:0.3rem 0.4rem; }
  .cal-cell--other { background:rgba(0,0,0,0.03); }
  .cal-cell--today { border-color:var(--teal); }
  .cal-date { font-size:0.75rem; color:var(--text-light); margin-bottom:0.2rem; }
  .cal-event { font-size:0.65rem; padding:0.15rem 0.35rem; border-radius:2px; margin-bottom:0.15rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .cal-event--work-planned { background:rgba(57,204,204,0.15); color:#2a7a7a; }
  .cal-event--work-done { background:rgba(128,168,116,0.2); color:#3a6a30; }
  .cal-event--meeting { background:rgba(100,100,200,0.15); color:#444490; }
  .cal-event--parts-ordered { background:rgba(200,150,50,0.15); color:#8a6020; }
  .cal-event--parts-arrive { background:rgba(200,150,50,0.2); color:#7a5010; }
  .cal-event--due-date { background:rgba(200,80,80,0.15); color:#902020; }
  /* FAQ list */
  .faq-item { border:1px solid rgba(128,168,116,0.15); border-radius:3px; overflow:hidden; margin-bottom:0.5rem; }
  .faq-item__head { display:flex; align-items:center; justify-content:space-between; padding:0.8rem 1rem; background:rgba(128,168,116,0.04); }
  .faq-item__q { font-size:0.88rem; color:var(--dark); font-weight:600; }
  .faq-item__body { padding:0.75rem 1rem; font-size:0.82rem; color:var(--text-light); line-height:1.6; }
  /* Misc */
  .badge { display:inline-block; padding:0.2rem 0.6rem; border-radius:10px; font-size:0.68rem; font-weight:600; }
  .badge--progress { background:rgba(57,204,204,0.15); color:#2a7a7a; }
  .badge--complete { background:rgba(128,168,116,0.25); color:#3a6a30; }
  .badge--quoted { background:rgba(200,150,50,0.15); color:#8a6020; }
  .btn-sm { padding:0.4rem 0.9rem; font-size:0.78rem; }
  .btn-icon { background:none; border:none; cursor:pointer; color:var(--text-light); font-size:1rem; padding:0.2rem; }
  .btn-icon:hover { color:var(--dark); }
  @media(max-width:900px){ .app-body{flex-direction:column;} .sidebar{width:100%;border-right:none;border-bottom:1px solid rgba(128,168,116,0.15);padding:0.75rem 0;display:flex;overflow-x:auto;} .sidebar__item{white-space:nowrap;border-left:none;border-bottom:3px solid transparent;} .sidebar__item--active{border-bottom-color:var(--teal);border-left:none;} .form-grid{grid-template-columns:1fr;} }
`;

// ─── Data ───────────────────────────────────────────────────────────────────

type ClientStatus = 'In Progress' | 'Complete' | 'Quoted';

interface Client {
  id: number; initials: string; name: string; van: string;
  status: ClientStatus; progress: number; value: number; step: number;
  parts: { name:string; qty:number; supplier:string; job:string; price:number; ordered:boolean }[];
}

const INITIAL_CLIENTS: Client[] = [
  {
    id:0, initials:'SG', name:'Shauna Gurhy', van:'Ford Transit LWB 2021',
    status:'In Progress', progress:62, value:18350, step:4,
    parts:[
      {name:'Solar Panels (200W x2)',  qty:2, supplier:'Bimble Solar',    job:'elec-solar',        price:420,  ordered:true},
      {name:'Victron MPPT 100/30',     qty:1, supplier:'Victron Energy',  job:'elec-solar',        price:185,  ordered:true},
      {name:'LiFePO4 200Ah Battery',   qty:1, supplier:'Fogstar',         job:'elec-full',         price:620,  ordered:true},
      {name:'Victron MultiPlus 12/800',qty:1, supplier:'Victron Energy',  job:'elec-full',         price:480,  ordered:true},
      {name:'Webasto Air Top 2000 STC',qty:1, supplier:'Webasto',         job:'heat-webasto-air',  price:750,  ordered:true},
      {name:'Webasto Thermo Top Evo',  qty:1, supplier:'Webasto',         job:'heat-webasto-combo',price:920,  ordered:false},
      {name:'MaxxAir Fan 00-07000K',   qty:1, supplier:'MaxxAir',         job:'vent-maxxair',      price:310,  ordered:true},
      {name:'Fiamma Roof Skylight',    qty:1, supplier:'Fiamma',          job:'vent-skylight',     price:280,  ordered:false},
      {name:'Fresh Water Tank 60L',    qty:1, supplier:'Heatrae Sadia',   job:'water-full',        price:95,   ordered:true},
      {name:'Shurflo 2088 Water Pump', qty:1, supplier:'Shurflo',         job:'water-full',        price:75,   ordered:true},
      {name:'Celotex GA4000 50mm',     qty:8, supplier:'Insulation4Less', job:'heat-insulation',   price:38,   ordered:true},
      {name:'Birch Ply 18mm',          qty:4, supplier:'Machined Timber', job:'layout-bed',        price:65,   ordered:true},
      {name:'Oak Cladding (pack)',      qty:2, supplier:'Machined Timber', job:'clad-full',         price:148,  ordered:false},
      {name:'Oak Worktop 2m',          qty:1, supplier:'Worktop Express', job:'layout-kitchen',    price:220,  ordered:false},
    ],
  },
  {
    id:1, initials:'CD', name:'Ciarán Doyle', van:'VW Crafter 2019',
    status:'Complete', progress:100, value:7400, step:8,
    parts:[
      {name:'Renogy 100W Panel',       qty:2, supplier:'Renogy',          job:'elec-solar',        price:195,  ordered:true},
      {name:'Renogy Wanderer 30A',     qty:1, supplier:'Renogy',          job:'elec-solar',        price:55,   ordered:true},
      {name:'AGM 110Ah Battery',       qty:1, supplier:'Bimble Solar',    job:'elec-basic',        price:220,  ordered:true},
      {name:'MaxxAir Fan',             qty:1, supplier:'MaxxAir',         job:'vent-maxxair',      price:310,  ordered:true},
      {name:'Celotex GA4000 50mm',     qty:6, supplier:'Insulation4Less', job:'heat-insulation',   price:38,   ordered:true},
    ],
  },
  {
    id:2, initials:'SK', name:'Siobhán Kelly', van:'Mercedes Sprinter 2022',
    status:'In Progress', progress:25, value:11200, step:2,
    parts:[
      {name:'Celotex GA4000 50mm',     qty:10,supplier:'Insulation4Less', job:'heat-insulation',   price:38,   ordered:true},
      {name:'Spray Foam Kit',          qty:2, supplier:'Foam It Green',   job:'heat-insulation',   price:145,  ordered:true},
      {name:'MaxxAir Fan',             qty:1, supplier:'MaxxAir',         job:'vent-maxxair',      price:310,  ordered:false},
      {name:'LiFePO4 200Ah Battery',   qty:1, supplier:'Fogstar',         job:'elec-full',         price:620,  ordered:false},
    ],
  },
  {
    id:3, initials:'PW', name:'Padraig Walsh', van:'Ford Transit 2020',
    status:'Quoted', progress:0, value:9800, step:0,
    parts:[],
  },
];

const BUILD_STEPS = [
  { title:'Quote & Design',        desc:'Initial consultation, design, and quote agreed.' },
  { title:'Deposit Received',      desc:'50% deposit paid — build scheduled.' },
  { title:'Strip & Prep',          desc:'Van stripped back to bare metal, rust treated, prep work done.' },
  { title:'Insulation',            desc:'Spray foam and rigid board insulation fitted throughout.' },
  { title:'Electrics First Fix',   desc:'Cable runs, consumer unit, and battery housing in place.' },
  { title:'Cladding & Flooring',   desc:'Walls clad, ceiling lined, floor laid.' },
  { title:'Furniture & Plumbing',  desc:'All units built and fitted, plumbing installed.' },
  { title:'Electrics Second Fix',  desc:'Sockets, lights, solar, and all electrical connections finalised.' },
  { title:'Handover',              desc:'Final inspection, walkthrough, and keys handed over.' },
];

const ORD_TEMPLATES = [
  { id:'elec-full',          label:'Power & Electrics — Full System',    parts:['Leisure battery','BMS','Isolator','Cable & fusing kit','Consumer unit','12V sockets x4','USB outlets x4','LED strip 5m x2'] },
  { id:'elec-basic',         label:'Power & Electrics — Basic',          parts:['AGM battery','Split-charge relay','Cable kit','12V sockets x2','LED strip 5m x1'] },
  { id:'elec-solar',         label:'Power & Electrics — Solar Add-on',   parts:['Solar panels x2','MPPT controller','Roof glands x2','PV cable 10m'] },
  { id:'heat-webasto-combo', label:'Heating — Webasto Combo (Air+Water)', parts:['Webasto Air Top 2000 STC','Webasto Thermo Top Evo','Fuel pickup kit','Exhaust kit','Water pump','Heat exchanger'] },
  { id:'heat-webasto-air',   label:'Heating — Webasto Air Only',         parts:['Webasto Air Top 2000 STC','Fuel pickup','Exhaust kit','Ducting x3'] },
  { id:'heat-insulation',    label:'Heating — Insulation Pack',           parts:['Celotex GA4000 50mm x8','Spray foam 2-part kit','Acoustic mat 5m²','Vapour barrier tape'] },
  { id:'vent-maxxair',       label:'Ventilation — MaxxAir Fan',           parts:['MaxxAir Fan 00-07000K','Roof flashing kit','Wiring loom'] },
  { id:'vent-skylight',      label:'Ventilation — Roof Skylight',         parts:['Fiamma 40x40 skylight','Flashing kit','Interior trim kit'] },
  { id:'water-full',         label:'Water System — Full',                 parts:['Fresh tank 60L','Grey tank 25L','Shurflo pump 2088','12mm hose 5m','Check valve','Accumulator tank','Hot water boiler','Mixer tap'] },
  { id:'water-basic',        label:'Water System — Basic Sink',           parts:['Fresh tank 30L','Grey tank 15L','Shurflo pump','12mm hose 3m','Single cold tap'] },
  { id:'layout-bed',         label:'Layout — Bed Frame',                  parts:['Birch ply 18mm x4','Pocket screws','Drawer runners x2','Gas struts x2'] },
  { id:'layout-kitchen',     label:'Layout — Kitchen Unit',               parts:['Birch ply 18mm x6','Oak worktop 2m','Hinges x6','Drawer runners x4','Handles x6'] },
  { id:'layout-lockers',     label:'Layout — Overhead Lockers',           parts:['Birch ply 12mm x4','Piano hinge 1m','Soft-close lid stays x4','Handles x4'] },
  { id:'clad-full',          label:'Cladding & Flooring — Full',          parts:['T&G cladding pack x2','Vapour barrier 10m²','Battens 25x50 3m x10','Flooring vinyl 4m²','Adhesive'] },
  { id:'clad-floor',         label:'Cladding & Flooring — Floor Only',    parts:['Flooring vinyl 4m²','Floor adhesive','Edge trim'] },
];

const FIN_JOBS = [
  { id:'j1', client:'Ciarán Doyle',  desc:'VW Crafter — basic electrics + insulation', date:'2025-03-18', amount:4800 },
  { id:'j2', client:'Aoife Brennan', desc:'Ford Transit — full build',                 date:'2025-07-22', amount:14500 },
  { id:'j3', client:'Liam Murphy',   desc:'Sprinter — electrics + heating',            date:'2025-11-05', amount:6200 },
  { id:'j4', client:'Shauna Gurhy',  desc:'Ford Transit — full build (50% deposit)',   date:'2026-02-10', amount:9175 },
  { id:'j5', client:'Siobhán Kelly', desc:'Sprinter — insulation + electrics (dep)',   date:'2026-03-14', amount:5600 },
  { id:'j6', client:'Ciarán Doyle',  desc:'VW Crafter — final payment',               date:'2026-01-08', amount:2600 },
  { id:'j7', client:'Padraig Walsh', desc:'Ford Transit — quote deposit',              date:'2026-04-20', amount:100  },
  { id:'j8', client:'Aoife Brennan', desc:'Ford Transit — warranty fix (no charge)',   date:'2026-02-28', amount:0   },
];

const FIN_EXPENSES = [
  { id:'e1',  desc:'Victron MPPT 100/30',         date:'2026-01-12', amount:185,  category:'materials' },
  { id:'e2',  desc:'LiFePO4 200Ah Battery x2',    date:'2026-01-12', amount:1240, category:'materials' },
  { id:'e3',  desc:'Webasto Air Top 2000 STC',    date:'2026-01-20', amount:750,  category:'materials' },
  { id:'e4',  desc:'Celotex GA4000 50mm x18',     date:'2026-01-20', amount:684,  category:'materials' },
  { id:'e5',  desc:'Birch Ply 18mm x8',           date:'2026-02-05', amount:520,  category:'materials' },
  { id:'e6',  desc:'MaxxAir Fan x2',              qty:2, date:'2026-02-05', amount:620, category:'materials' },
  { id:'e7',  desc:'Shurflo Pump x2',             date:'2026-02-08', amount:150,  category:'materials' },
  { id:'e8',  desc:'Victron MultiPlus 12/800',    date:'2026-02-15', amount:480,  category:'materials' },
  { id:'e9',  desc:'Oak Worktop 2m x2',           date:'2026-02-20', amount:440,  category:'materials' },
  { id:'e10', desc:'Van insurance (annual)',       date:'2026-01-01', amount:980,  category:'operating' },
  { id:'e11', desc:'Tool kit refresh',            date:'2026-01-15', amount:320,  category:'tools'     },
  { id:'e12', desc:'Workbench upgrade',           date:'2026-02-10', amount:450,  category:'equipment' },
  { id:'e13', desc:'Accountant (annual)',         date:'2026-04-01', amount:600,  category:'operating' },
  { id:'e14', desc:'Website hosting (annual)',    date:'2026-01-05', amount:120,  category:'operating' },
  { id:'e15', desc:'Solar Panels 200W x4',        date:'2026-03-02', amount:840,  category:'materials' },
  { id:'e16', desc:'Webasto Thermo Top Evo',      date:'2026-03-05', amount:920,  category:'materials' },
  { id:'e17', desc:'Fiamma Skylight x2',          date:'2026-03-10', amount:560,  category:'materials' },
  { id:'e18', desc:'Oak cladding packs x4',       date:'2026-03-15', amount:592,  category:'materials' },
  { id:'e19', desc:'Phone (Samsung S24)',          date:'2025-06-01', amount:850,  category:'equipment' },
  { id:'e20', desc:'Professional indemnity ins',  date:'2025-01-01', amount:420,  category:'operating' },
  { id:'e21', desc:'Spray foam kit x4',           date:'2025-03-10', amount:580,  category:'materials' },
  { id:'e22', desc:'Celotex x30 (Aoife job)',     date:'2025-06-20', amount:1140, category:'materials' },
  { id:'e23', desc:'Victron kit (Aoife job)',     date:'2025-06-22', amount:1850, category:'materials' },
  { id:'e24', desc:'Webasto full kit (Aoife)',    date:'2025-07-01', amount:1680, category:'materials' },
  { id:'e25', desc:'Accountant 2024',             date:'2025-04-01', amount:550,  category:'operating' },
];

const CAL_EVENTS = [
  { date:'2026-05-04', type:'meeting',       label:'Call — Siobhán Kelly' },
  { date:'2026-05-06', type:'parts-ordered', label:'Parts ordered — Siobhán' },
  { date:'2026-05-11', type:'work-planned',  label:'Strip & prep — Siobhán' },
  { date:'2026-05-12', type:'work-planned',  label:'Insulation — Siobhán' },
  { date:'2026-05-13', type:'work-done',     label:'Strip done — Siobhán' },
  { date:'2026-05-18', type:'work-done',     label:'Insulation done — Siobhán' },
  { date:'2026-05-20', type:'meeting',       label:'Site visit — Padraig Walsh' },
  { date:'2026-05-27', type:'parts-arrive',  label:'Parts arrive — Shauna' },
  { date:'2026-06-02', type:'work-planned',  label:'First fix elec — Shauna' },
  { date:'2026-06-03', type:'work-planned',  label:'Cladding start — Shauna' },
  { date:'2026-06-04', type:'work-done',     label:'First fix done — Shauna' },
  { date:'2026-06-09', type:'work-done',     label:'Cladding done — Shauna' },
  { date:'2026-06-10', type:'parts-ordered', label:'Remaining parts — Shauna' },
  { date:'2026-06-16', type:'meeting',       label:'Progress call — Shauna' },
  { date:'2026-06-23', type:'work-planned',  label:'Furniture build — Shauna' },
  { date:'2026-06-24', type:'work-planned',  label:'Plumbing — Shauna' },
  { date:'2026-06-25', type:'work-done',     label:'Furniture done — Shauna' },
  { date:'2026-06-28', type:'parts-arrive',  label:'Final parts arrive — Shauna' },
  { date:'2026-07-02', type:'work-planned',  label:'Second fix elec — Shauna' },
  { date:'2026-07-03', type:'work-planned',  label:'Finishing — Shauna' },
  { date:'2026-07-05', type:'work-done',     label:'Second fix done — Shauna' },
  { date:'2026-07-08', type:'work-planned',  label:'Snagging — Shauna' },
  { date:'2026-07-10', type:'due-date',      label:'Handover target — Shauna' },
  { date:'2026-07-14', type:'meeting',       label:'Handover call — Padraig Walsh' },
  { date:'2026-07-20', type:'work-planned',  label:'Build start — Padraig Walsh' },
  { date:'2026-07-28', type:'meeting',       label:'Quarterly review' },
];

const INITIAL_FAQS = [
  { q:'How long does a full van build take?', a:'A full build typically takes 6–10 weeks from strip-out to handover, depending on spec complexity and parts availability.' },
  { q:'Do you work on any type of van?',      a:'Most long-wheelbase panel vans — Ford Transit, Mercedes Sprinter, VW Crafter, Renault Master. Get in touch if you\'re unsure about yours.' },
  { q:'Is the €100 consultation fee refundable?', a:'Yes. It\'s fully applied against your build cost if you go ahead, or refunded in full if you decide not to proceed.' },
  { q:'Do you offer a warranty?',             a:'Yes — all builds come with a 12-month workmanship warranty. Manufacturer warranties on parts apply separately.' },
  { q:'Can I supply my own parts?',           a:'Yes. We\'re happy to work with parts you\'ve sourced, though we can\'t warranty those specific components.' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) { return '€' + Math.round(n).toLocaleString('en-IE'); }

function statusBadge(s: ClientStatus) {
  const cls = s === 'Complete' ? 'badge--complete' : s === 'Quoted' ? 'badge--quoted' : 'badge--progress';
  return <span className={`badge ${cls}`}>{s}</span>;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ClientPage() {
  const [loggedIn,        setLoggedIn]        = useState(false);
  const [role,            setRole]            = useState<'client'|'admin'>('client');
  const [clientPanel,     setClientPanel]     = useState<'overview'|'quote'|'progress'|'photos'|'messages'>('overview');
  const [adminPanel,      setAdminPanel]      = useState<'client'|'orders'|'clients'|'finances'|'calendar'|'faqs'>('client');
  const [selectedClient,  setSelectedClient]  = useState(0);
  const [clients,         setClients]         = useState<Client[]>(INITIAL_CLIENTS);
  const [messageText,     setMessageText]     = useState('');
  const [calYear,         setCalYear]         = useState(2026);
  const [calMonth,        setCalMonth]        = useState(5); // 0-indexed, 5 = June
  const [orderTab,        setOrderTab]        = useState<'edit'|'byjob'|'bysupplier'>('edit');
  const [selectedTpl,     setSelectedTpl]     = useState('');
  const [newPart,         setNewPart]         = useState({ name:'', supplier:'', job:'', price:'', qty:'1' });
  const [addClientForm,   setAddClientForm]   = useState({ name:'', van:'', email:'', phone:'' });
  const [faqs,            setFaqs]            = useState(INITIAL_FAQS);
  const [newFaq,          setNewFaq]          = useState({ q:'', a:'' });
  const [progressUpdate,  setProgressUpdate]  = useState({ step:'', note:'' });
  const [loginEmail,      setLoginEmail]      = useState('');
  const [loginPass,       setLoginPass]       = useState('');

  const client = clients[selectedClient];
  const demoClient = clients[0];

  // Finance calculations
  const finData = useMemo(() => {
    const year = 2026;
    const revenue = FIN_JOBS.filter(j => j.date.startsWith(String(year)) && j.amount > 0).reduce((s,j) => s+j.amount, 0);
    const expenses = FIN_EXPENSES.filter(e => e.date.startsWith(String(year))).reduce((s,e) => s+e.amount, 0);
    const profit = revenue - expenses;
    // Irish sole trader tax (simplified):
    // - Personal allowance €5,000 (rough), USC bands, PRSI 4%
    const personalAllowance = 5000;
    const taxable = Math.max(0, profit - personalAllowance);
    const itLow  = Math.min(taxable, 42000) * 0.20;
    const itHigh = Math.max(0, taxable - 42000) * 0.40;
    const incomeTax = itLow + itHigh;
    const usc = taxable <= 12012 ? taxable * 0.005
              : taxable <= 21295 ? 12012*0.005 + (taxable-12012)*0.02
              : taxable <= 70044 ? 12012*0.005 + (21295-12012)*0.02 + (taxable-21295)*0.045
              : 12012*0.005 + (21295-12012)*0.02 + (70044-21295)*0.045 + (taxable-70044)*0.08;
    const prsi = profit * 0.04;
    const totalTax = incomeTax + usc + prsi;
    const takeHome = profit - totalTax;
    return { revenue, expenses, profit, incomeTax, usc, prsi, totalTax, takeHome };
  }, []);

  // Calendar grid
  const calDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
    const daysInPrev  = new Date(calYear, calMonth, 0).getDate();
    const cells = [];
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon-first
    for (let i = startOffset-1; i >= 0; i--) cells.push({ day: daysInPrev-i, month:'prev' as const });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day:d, month:'cur' as const });
    while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - startOffset + 1, month:'next' as const });
    return cells;
  }, [calYear, calMonth]);

  function calEventsFor(day: number) {
    const mm = String(calMonth+1).padStart(2,'0');
    const dd = String(day).padStart(2,'0');
    const dateStr = `${calYear}-${mm}-${dd}`;
    return CAL_EVENTS.filter(e => e.date === dateStr);
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); }
    else setCalMonth(m => m-1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); }
    else setCalMonth(m => m+1);
  }

  function addPart() {
    if (!newPart.name) return;
    setClients(prev => prev.map((c,i) => i !== selectedClient ? c : {
      ...c,
      parts: [...c.parts, { name:newPart.name, qty:parseInt(newPart.qty)||1, supplier:newPart.supplier, job:newPart.job, price:parseFloat(newPart.price)||0, ordered:false }],
    }));
    setNewPart({ name:'', supplier:'', job:'', price:'', qty:'1' });
  }

  function addClientSubmit() {
    if (!addClientForm.name) return;
    const initials = addClientForm.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    setClients(prev => [...prev, {
      id: prev.length, initials, name:addClientForm.name, van:addClientForm.van,
      status:'Quoted', progress:0, value:0, step:0, parts:[],
    }]);
    setAddClientForm({ name:'', van:'', email:'', phone:'' });
  }

  function addFaq() {
    if (!newFaq.q || !newFaq.a) return;
    setFaqs(prev => [...prev, newFaq]);
    setNewFaq({ q:'', a:'' });
  }

  function removeFaq(i: number) {
    setFaqs(prev => prev.filter((_,idx) => idx !== i));
  }

  if (!loggedIn) {
    return (
      <>
        <style>{pageStyles}</style>
        <div className="login-screen">
          <div className="login-card">
            <div className="login-card__logo">Caolán&apos;s Campers</div>
            <div className="login-card__sub">Client Portal</div>
            <h2>Sign In</h2>
            <div className="login-form">
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="pass">Password</label>
                <input id="pass" type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} placeholder="••••••••" />
              </div>
              <button className="btn btn--primary" onClick={()=>{ setRole('client'); setLoggedIn(true); }}>Sign In</button>
            </div>
            <div className="login-divider"><span>or try a demo</span></div>
            <div className="demo-btns">
              <button className="btn btn--outline" onClick={()=>{ setRole('client'); setLoggedIn(true); }}>Demo — Client View (Shauna)</button>
              <button className="btn btn--primary" onClick={()=>{ setRole('admin'); setLoggedIn(true); }}>Demo — Caolán&apos;s View</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── App Shell ──────────────────────────────────────────────────────────────

  const userName = role === 'admin' ? "Caolán" : demoClient.name;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="portal-wrap">
        <div className="app-shell">
          <header className="app-header">
            <div className="app-header__logo">Caolán&apos;s Campers — {role === 'admin' ? 'Admin' : 'Client Portal'}</div>
            <div className="app-header__right">
              <span className="app-header__user">{userName}</span>
              <button className="btn btn--outline btn-sm" onClick={()=>setLoggedIn(false)}>Log Out</button>
            </div>
          </header>

          <div className="app-body">
            {/* ── Sidebars ── */}
            {role === 'client' ? (
              <nav className="sidebar">
                {(['overview','quote','progress','photos','messages'] as const).map(p => (
                  <div key={p} className={`sidebar__item${clientPanel===p ? ' sidebar__item--active':''}`} onClick={()=>setClientPanel(p)}>
                    {p.charAt(0).toUpperCase()+p.slice(1)}
                  </div>
                ))}
              </nav>
            ) : (
              <nav className="sidebar">
                <div className="sidebar__section-title">Clients</div>
                {clients.map((c,i) => (
                  <div key={c.id} className={`sidebar__client-item${selectedClient===i && adminPanel==='client' ? ' sidebar__client-item--active':''}`}
                       style={{display:'flex',alignItems:'center',gap:'0.5rem'}}
                       onClick={()=>{ setSelectedClient(i); setAdminPanel('client'); }}>
                    <span className="sidebar__client-avatar">{c.initials}</span>
                    <span className="sidebar__client-info">
                      <span className="sidebar__client-name">{c.name}</span>
                      <span className="sidebar__client-status">{c.status}</span>
                    </span>
                  </div>
                ))}
                <div className="sidebar__section-title">Admin</div>
                {([
                  ['orders','Orders'],['clients','Manage Clients'],
                  ['finances','Finances'],['calendar','Calendar'],['faqs','Website FAQs'],
                ] as const).map(([p,label]) => (
                  <div key={p} className={`sidebar__item${adminPanel===p ? ' sidebar__item--active':''}`} onClick={()=>setAdminPanel(p)}>
                    {label}
                  </div>
                ))}
              </nav>
            )}

            {/* ── Panel Area ── */}
            <main className="panel-area">

              {/* ═══ CLIENT PANELS ═══ */}
              {role === 'client' && (
                <>
                  {/* Overview */}
                  {clientPanel === 'overview' && (
                    <div>
                      <div className="panel-header">
                        <h1>Welcome back, {demoClient.name.split(' ')[0]}</h1>
                        <p>{demoClient.van} — {statusBadge(demoClient.status)}</p>
                      </div>
                      <div className="stat-cards">
                        <div className="stat-card"><div className="stat-card__label">Build Value</div><div className="stat-card__val">{fmt(demoClient.value)}</div></div>
                        <div className="stat-card"><div className="stat-card__label">Progress</div><div className="stat-card__val">{demoClient.progress}%</div><div className="stat-card__sub">Step {demoClient.step} of 8</div></div>
                        <div className="stat-card"><div className="stat-card__label">Parts Ordered</div><div className="stat-card__val">{demoClient.parts.filter(p=>p.ordered).length} / {demoClient.parts.length}</div></div>
                        <div className="stat-card"><div className="stat-card__label">Est. Handover</div><div className="stat-card__val">10 Jul</div><div className="stat-card__sub">2026</div></div>
                      </div>
                      <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width:`${demoClient.progress}%`}} /></div>
                      <div className="timeline">
                        <div className="timeline__title">Build Progress</div>
                        <div className="timeline__steps">
                          {BUILD_STEPS.map((s,i) => (
                            <div key={i} className={`timeline__step${i < demoClient.step ? ' timeline__step--done' : i === demoClient.step ? ' timeline__step--active' : ''}`}>
                              <span className="timeline__step-num">0{i+1}</span>
                              <div className="timeline__step-content">
                                <div className="timeline__step-title">{s.title}</div>
                                <div className="timeline__step-desc">{s.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  {clientPanel === 'quote' && (
                    <div>
                      <div className="panel-header"><h1>Your Quote</h1><p>Agreed spec and cost breakdown for your build.</p></div>
                      <div className="content-card">
                        <h2>Cost Breakdown</h2>
                        <table className="quote-table">
                          <thead>
                            <tr><th>Item</th><th>Details</th><th style={{textAlign:'right'}}>Cost</th></tr>
                          </thead>
                          <tbody>
                            <tr><td>Full Insulation</td><td>Spray foam + Celotex throughout</td><td style={{textAlign:'right'}}>€1,800</td></tr>
                            <tr><td>Diesel Heater</td><td>Webasto Air Top 2000 STC</td><td style={{textAlign:'right'}}>€1,400</td></tr>
                            <tr><td>Hot Water System</td><td>Webasto Thermo Top Evo</td><td style={{textAlign:'right'}}>€1,200</td></tr>
                            <tr><td>Full Electrics</td><td>200Ah LiFePO4, 400W solar, Victron inverter</td><td style={{textAlign:'right'}}>€3,800</td></tr>
                            <tr><td>Roof Fan</td><td>MaxxAir Fan 00-07000K</td><td style={{textAlign:'right'}}>€450</td></tr>
                            <tr><td>Skylight</td><td>Fiamma 40×40 rooflight</td><td style={{textAlign:'right'}}>€380</td></tr>
                            <tr><td>Full Water System</td><td>60L fresh, pump, hot water, shower, wet room</td><td style={{textAlign:'right'}}>€2,200</td></tr>
                            <tr><td>Fixed Double Bed</td><td>With garage storage below</td><td style={{textAlign:'right'}}>€1,400</td></tr>
                            <tr><td>Kitchen Unit</td><td>Oak worktop, sink, storage</td><td style={{textAlign:'right'}}>€2,100</td></tr>
                            <tr><td>Cladding & Flooring</td><td>T&G oak cladding + vinyl floor</td><td style={{textAlign:'right'}}>€1,800</td></tr>
                            <tr><td>Labour</td><td>Approx 8 weeks</td><td style={{textAlign:'right'}}>€7,820</td></tr>
                          </tbody>
                          <tfoot>
                            <tr className="quote-total-row"><td colSpan={2}><strong>Total</strong></td><td style={{textAlign:'right'}}><strong>€24,350</strong></td></tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className="content-card" style={{background:'var(--dark)',color:'var(--cream)'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem'}}>
                          <div>
                            <div style={{fontSize:'0.7rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(234,243,222,0.5)',marginBottom:'0.3rem'}}>Deposit Paid</div>
                            <div style={{fontFamily:'var(--font-cinzel),serif',fontSize:'1.5rem',color:'var(--mint)'}}>€9,175</div>
                          </div>
                          <div>
                            <div style={{fontSize:'0.7rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(234,243,222,0.5)',marginBottom:'0.3rem'}}>Balance Due at Handover</div>
                            <div style={{fontFamily:'var(--font-cinzel),serif',fontSize:'1.5rem',color:'var(--cream)'}}>€9,175</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress */}
                  {clientPanel === 'progress' && (
                    <div>
                      <div className="panel-header"><h1>Build Progress</h1><p>Current status and step-by-step notes from Caolán.</p></div>
                      <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width:`${demoClient.progress}%`}} /></div>
                      <div className="content-card">
                        <h2>Step Notes</h2>
                        {BUILD_STEPS.map((s,i) => (
                          <div key={i} style={{paddingBottom:'1rem',marginBottom:'1rem',borderBottom: i < BUILD_STEPS.length-1 ? '1px solid rgba(128,168,116,0.1)' : 'none'}}>
                            <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.35rem'}}>
                              <span style={{fontSize:'0.68rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--teal)'}}>Step {i+1}</span>
                              <span style={{fontSize:'0.88rem',fontWeight:600,color:'var(--dark)'}}>{s.title}</span>
                              {i < demoClient.step && <span className="badge badge--complete">Done</span>}
                              {i === demoClient.step && <span className="badge badge--progress">In Progress</span>}
                            </div>
                            <p style={{fontSize:'0.82rem',color:'var(--text-light)',lineHeight:1.6,margin:0}}>{s.desc}</p>
                            {i === 3 && <p style={{fontSize:'0.8rem',color:'var(--dark)',marginTop:'0.4rem',fontStyle:'italic'}}>Caolán: Celotex fitted in walls and ceiling, spray foam in voids. Really solid job — thermal bridge gaps are minimal.</p>}
                            {i === 4 && <p style={{fontSize:'0.8rem',color:'var(--dark)',marginTop:'0.4rem',fontStyle:'italic'}}>Caolán: Cable runs in, consumer unit mounted over the wheel arch. Battery tray built — the Victron kit looks great in there.</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Photos */}
                  {clientPanel === 'photos' && (
                    <div>
                      <div className="panel-header"><h1>Build Photos</h1><p>Progress photos added by Caolán as the build progresses.</p></div>
                      <div className="photo-grid">
                        {['Strip-out complete','Rust treatment','Spray foam','Celotex walls','Cable runs','Consumer unit','Cladding start','Floor laid'].map(label => (
                          <div key={label} className="photo-placeholder">{label}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {clientPanel === 'messages' && (
                    <div>
                      <div className="panel-header"><h1>Messages</h1><p>Direct line to Caolán about your build.</p></div>
                      <div className="messages-list">
                        <div className="message-bubble message-bubble--from-caolan">
                          <div className="message-bubble__meta">Caolán · 3 Jun 2026</div>
                          <div className="message-bubble__text">Hey Shauna — first fix electrics are all in. Cable runs are clean and the consumer unit is mounted. Moving onto cladding tomorrow.</div>
                        </div>
                        <div className="message-bubble message-bubble--from-client">
                          <div className="message-bubble__meta">Shauna · 3 Jun 2026</div>
                          <div className="message-bubble__text">Great news! Can&apos;t wait to see it. Any update on the Webasto parts?</div>
                        </div>
                        <div className="message-bubble message-bubble--from-caolan">
                          <div className="message-bubble__meta">Caolán · 4 Jun 2026</div>
                          <div className="message-bubble__text">The Webasto Thermo Top is due in on the 28th — should be fine for the plumbing phase. No delays expected.</div>
                        </div>
                        <div className="message-bubble message-bubble--from-client">
                          <div className="message-bubble__meta">Shauna · 4 Jun 2026</div>
                          <div className="message-bubble__text">Perfect — thanks for keeping me posted!</div>
                        </div>
                        <div className="message-bubble message-bubble--from-caolan">
                          <div className="message-bubble__meta">Caolán · 10 Jun 2026</div>
                          <div className="message-bubble__text">Cladding is looking lovely — oak really suits the Transit. I&apos;ll get photos up today.</div>
                        </div>
                      </div>
                      <div className="message-reply">
                        <textarea value={messageText} onChange={e=>setMessageText(e.target.value)} placeholder="Write a message to Caolán…" />
                        <button className="btn btn--primary btn-sm" onClick={()=>setMessageText('')}>Send</button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ═══ ADMIN PANELS ═══ */}
              {role === 'admin' && (
                <>
                  {/* Client Detail */}
                  {adminPanel === 'client' && (
                    <div>
                      <div className="panel-header">
                        <h1>{client.name}</h1>
                        <p>{client.van} · {statusBadge(client.status)}</p>
                      </div>
                      <div className="stat-cards">
                        <div className="stat-card"><div className="stat-card__label">Build Value</div><div className="stat-card__val">{fmt(client.value)}</div></div>
                        <div className="stat-card"><div className="stat-card__label">Progress</div><div className="stat-card__val">{client.progress}%</div><div className="stat-card__sub">Step {client.step} of 8</div></div>
                        <div className="stat-card"><div className="stat-card__label">Parts</div><div className="stat-card__val">{client.parts.filter(p=>p.ordered).length} / {client.parts.length}</div><div className="stat-card__sub">ordered</div></div>
                      </div>
                      <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width:`${client.progress}%`}} /></div>

                      <div className="content-card">
                        <h2>Update Progress</h2>
                        <div className="form-grid">
                          <div className="form-group">
                            <label>Current Step (0–8)</label>
                            <select value={progressUpdate.step} onChange={e=>setProgressUpdate(p=>({...p,step:e.target.value}))}>
                              <option value="">— select —</option>
                              {BUILD_STEPS.map((s,i) => <option key={i} value={i}>{i} — {s.title}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Progress %</label>
                            <input type="number" min={0} max={100} placeholder={String(client.progress)} />
                          </div>
                        </div>
                        <div className="form-group" style={{marginBottom:'1rem'}}>
                          <label>Note for client</label>
                          <textarea value={progressUpdate.note} onChange={e=>setProgressUpdate(p=>({...p,note:e.target.value}))} placeholder="Update note visible to client…" />
                        </div>
                        <button className="btn btn--primary btn-sm">Save Update</button>
                      </div>

                      <div className="content-card">
                        <h2>Parts Log</h2>
                        <table className="parts-table">
                          <thead><tr><th>Part</th><th>Job</th><th>Supplier</th><th>Qty</th><th>Price</th><th>Ordered</th></tr></thead>
                          <tbody>
                            {client.parts.map((p,i) => (
                              <tr key={i}>
                                <td>{p.name}</td>
                                <td style={{fontSize:'0.75rem',color:'var(--text-light)'}}>{p.job}</td>
                                <td>{p.supplier}</td>
                                <td>{p.qty}</td>
                                <td>{fmt(p.price * p.qty)}</td>
                                <td>
                                  <button className={`badge ${p.ordered ? 'badge--complete':'badge--quoted'}`}
                                    onClick={()=>setClients(prev => prev.map((c,ci) => ci!==selectedClient ? c : {
                                      ...c, parts: c.parts.map((pp,pi) => pi===i ? {...pp,ordered:!pp.ordered} : pp)
                                    }))}>
                                    {p.ordered ? 'Yes' : 'No'}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div style={{marginTop:'1.25rem',padding:'1rem',background:'rgba(128,168,116,0.06)',borderRadius:3}}>
                          <h3>Add Part</h3>
                          <div className="form-grid">
                            <div className="form-group"><label>Part name</label><input value={newPart.name} onChange={e=>setNewPart(p=>({...p,name:e.target.value}))} /></div>
                            <div className="form-group"><label>Supplier</label><input value={newPart.supplier} onChange={e=>setNewPart(p=>({...p,supplier:e.target.value}))} /></div>
                            <div className="form-group"><label>Job</label><input value={newPart.job} onChange={e=>setNewPart(p=>({...p,job:e.target.value}))} /></div>
                            <div className="form-group"><label>Unit price €</label><input type="number" value={newPart.price} onChange={e=>setNewPart(p=>({...p,price:e.target.value}))} /></div>
                            <div className="form-group"><label>Qty</label><input type="number" min={1} value={newPart.qty} onChange={e=>setNewPart(p=>({...p,qty:e.target.value}))} /></div>
                          </div>
                          <button className="btn btn--primary btn-sm" onClick={addPart}>Add Part</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Orders */}
                  {adminPanel === 'orders' && (
                    <div>
                      <div className="panel-header"><h1>Order Parts</h1><p>Use job templates to build an order list, then review by supplier.</p></div>
                      <div className="tab-bar">
                        {([['edit','Edit List'],['byjob','By Job'],['bysupplier','By Supplier']] as const).map(([t,l]) => (
                          <button key={t} className={`tab-btn${orderTab===t?' tab-btn--active':''}`} onClick={()=>setOrderTab(t)}>{l}</button>
                        ))}
                      </div>
                      {orderTab === 'edit' && (
                        <div>
                          <div className="content-card">
                            <h2>Add from Template</h2>
                            <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',marginBottom:'1rem'}}>
                              <select value={selectedTpl} onChange={e=>setSelectedTpl(e.target.value)} style={{flex:1,padding:'0.55rem 0.8rem',border:'1px solid rgba(128,168,116,0.3)',borderRadius:2,fontSize:'0.85rem'}}>
                                <option value="">— select a job template —</option>
                                {ORD_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                              </select>
                              <button className="btn btn--primary btn-sm">Add to List</button>
                            </div>
                            {selectedTpl && (
                              <div style={{fontSize:'0.82rem',color:'var(--text-light)'}}>
                                <strong style={{color:'var(--dark)'}}>Includes: </strong>
                                {ORD_TEMPLATES.find(t=>t.id===selectedTpl)?.parts.join(', ')}
                              </div>
                            )}
                          </div>
                          <div className="content-card">
                            <h2>All Parts on Order List</h2>
                            <p style={{fontSize:'0.82rem',color:'var(--text-light)'}}>Parts aggregated from all clients&apos; un-ordered items.</p>
                            <table className="parts-table">
                              <thead><tr><th>Part</th><th>Client</th><th>Job</th><th>Qty</th><th>Unit €</th></tr></thead>
                              <tbody>
                                {clients.flatMap(c => c.parts.filter(p=>!p.ordered).map(p => ({...p, clientName:c.name}))).map((p,i) => (
                                  <tr key={i}><td>{p.name}</td><td>{p.clientName}</td><td style={{fontSize:'0.75rem',color:'var(--text-light)'}}>{p.job}</td><td>{p.qty}</td><td>{fmt(p.price)}</td></tr>
                                ))}
                                {clients.flatMap(c => c.parts.filter(p=>!p.ordered)).length === 0 && (
                                  <tr><td colSpan={5} style={{textAlign:'center',color:'var(--text-light)',fontStyle:'italic'}}>All parts ordered — nothing pending.</td></tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {orderTab === 'byjob' && (
                        <div className="content-card">
                          <h2>Pending Parts by Job</h2>
                          {ORD_TEMPLATES.map(tpl => {
                            const parts = clients.flatMap(c => c.parts.filter(p=>!p.ordered && p.job===tpl.id).map(p=>({...p,clientName:c.name})));
                            if (!parts.length) return null;
                            return (
                              <div key={tpl.id} style={{marginBottom:'1.5rem'}}>
                                <h3>{tpl.label}</h3>
                                <table className="parts-table"><thead><tr><th>Part</th><th>Client</th><th>Qty</th><th>€</th></tr></thead>
                                <tbody>{parts.map((p,i) => <tr key={i}><td>{p.name}</td><td>{p.clientName}</td><td>{p.qty}</td><td>{fmt(p.price*p.qty)}</td></tr>)}</tbody></table>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      {orderTab === 'bysupplier' && (
                        <div className="content-card">
                          <h2>Pending Parts by Supplier</h2>
                          {Array.from(new Set(clients.flatMap(c=>c.parts.filter(p=>!p.ordered).map(p=>p.supplier)))).sort().map(sup => {
                            const parts = clients.flatMap(c=>c.parts.filter(p=>!p.ordered && p.supplier===sup).map(p=>({...p,clientName:c.name})));
                            return (
                              <div key={sup} style={{marginBottom:'1.5rem'}}>
                                <h3>{sup || 'Unknown Supplier'}</h3>
                                <table className="parts-table"><thead><tr><th>Part</th><th>Client</th><th>Qty</th><th>€</th></tr></thead>
                                <tbody>{parts.map((p,i) => <tr key={i}><td>{p.name}</td><td>{p.clientName}</td><td>{p.qty}</td><td>{fmt(p.price*p.qty)}</td></tr>)}</tbody></table>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Manage Clients */}
                  {adminPanel === 'clients' && (
                    <div>
                      <div className="panel-header"><h1>Manage Clients</h1><p>All current and past clients.</p></div>
                      <div className="content-card">
                        <h2>Add New Client</h2>
                        <div className="form-grid">
                          <div className="form-group"><label>Full Name</label><input value={addClientForm.name} onChange={e=>setAddClientForm(f=>({...f,name:e.target.value}))} /></div>
                          <div className="form-group"><label>Van</label><input value={addClientForm.van} onChange={e=>setAddClientForm(f=>({...f,van:e.target.value}))} placeholder="e.g. Ford Transit LWB 2021" /></div>
                          <div className="form-group"><label>Email</label><input type="email" value={addClientForm.email} onChange={e=>setAddClientForm(f=>({...f,email:e.target.value}))} /></div>
                          <div className="form-group"><label>Phone</label><input type="tel" value={addClientForm.phone} onChange={e=>setAddClientForm(f=>({...f,phone:e.target.value}))} /></div>
                        </div>
                        <button className="btn btn--primary btn-sm" onClick={addClientSubmit}>Add Client</button>
                      </div>
                      <div className="content-card">
                        <h2>All Clients</h2>
                        <table className="parts-table">
                          <thead><tr><th>Name</th><th>Van</th><th>Status</th><th>Progress</th><th>Value</th></tr></thead>
                          <tbody>
                            {clients.map((c,i) => (
                              <tr key={c.id} style={{cursor:'pointer'}} onClick={()=>{ setSelectedClient(i); setAdminPanel('client'); }}>
                                <td style={{fontWeight:600}}>{c.name}</td>
                                <td style={{fontSize:'0.8rem',color:'var(--text-light)'}}>{c.van}</td>
                                <td>{statusBadge(c.status)}</td>
                                <td>{c.progress}%</td>
                                <td>{fmt(c.value)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Finances */}
                  {adminPanel === 'finances' && (
                    <div>
                      <div className="panel-header"><h1>Finances</h1><p>2026 revenue, expenses, and tax estimate (Irish sole trader).</p></div>
                      <div className="fin-summary">
                        <div className="fin-card"><div className="fin-card__label">Revenue</div><div className="fin-card__val">{fmt(finData.revenue)}</div></div>
                        <div className="fin-card"><div className="fin-card__label">Expenses</div><div className="fin-card__val">{fmt(finData.expenses)}</div></div>
                        <div className="fin-card"><div className="fin-card__label">Net Profit</div><div className="fin-card__val">{fmt(finData.profit)}</div></div>
                        <div className="fin-card"><div className="fin-card__label">Estimated Tax</div><div className="fin-card__val">{fmt(finData.totalTax)}</div></div>
                        <div className="fin-card"><div className="fin-card__label">Take-Home</div><div className="fin-card__val">{fmt(finData.takeHome)}</div></div>
                      </div>
                      <div className="content-card">
                        <h2>Tax Breakdown (Estimated)</h2>
                        <table className="parts-table">
                          <thead><tr><th>Tax</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
                          <tbody>
                            <tr><td>Income Tax (20%/40%)</td><td style={{textAlign:'right'}}>{fmt(finData.incomeTax)}</td></tr>
                            <tr><td>USC</td><td style={{textAlign:'right'}}>{fmt(finData.usc)}</td></tr>
                            <tr><td>PRSI (4%)</td><td style={{textAlign:'right'}}>{fmt(finData.prsi)}</td></tr>
                          </tbody>
                          <tfoot>
                            <tr style={{background:'var(--dark)'}}><td style={{color:'var(--cream)',fontWeight:700}}>Total Tax</td><td style={{textAlign:'right',color:'var(--mint)',fontFamily:'var(--font-cinzel),serif'}}>{fmt(finData.totalTax)}</td></tr>
                          </tfoot>
                        </table>
                        <p style={{fontSize:'0.75rem',color:'var(--text-light)',marginTop:'0.75rem'}}>Estimate only. Consult your accountant for accurate tax planning. Assumes sole trader, no pension contributions or additional credits.</p>
                      </div>
                      <div className="content-card">
                        <h2>Jobs — 2026</h2>
                        <table className="parts-table">
                          <thead><tr><th>Date</th><th>Client</th><th>Description</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
                          <tbody>
                            {FIN_JOBS.filter(j=>j.date.startsWith('2026')).map(j => (
                              <tr key={j.id}><td style={{fontSize:'0.78rem',color:'var(--text-light)'}}>{j.date}</td><td>{j.client}</td><td style={{fontSize:'0.82rem',color:'var(--text-light)'}}>{j.desc}</td><td style={{textAlign:'right'}}>{fmt(j.amount)}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="content-card">
                        <h2>Expenses — 2026</h2>
                        <table className="parts-table">
                          <thead><tr><th>Date</th><th>Description</th><th>Category</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
                          <tbody>
                            {FIN_EXPENSES.filter(e=>e.date.startsWith('2026')).map(e => (
                              <tr key={e.id}><td style={{fontSize:'0.78rem',color:'var(--text-light)'}}>{e.date}</td><td>{e.desc}</td><td style={{fontSize:'0.75rem',color:'var(--text-light)'}}>{e.category}</td><td style={{textAlign:'right'}}>{fmt(e.amount)}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Calendar */}
                  {adminPanel === 'calendar' && (
                    <div>
                      <div className="panel-header"><h1>Calendar</h1><p>Build schedule, meetings, and parts deliveries.</p></div>
                      <div className="content-card">
                        <div className="cal-header">
                          <button className="btn btn--outline btn-sm" onClick={prevMonth}>← Prev</button>
                          <span style={{fontFamily:'var(--font-cinzel),serif',fontSize:'1rem',color:'var(--dark)'}}>{MONTHS[calMonth]} {calYear}</span>
                          <button className="btn btn--outline btn-sm" onClick={nextMonth}>Next →</button>
                        </div>
                        <div className="cal-grid">
                          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d} className="cal-day-name">{d}</div>)}
                          {calDays.map((cell,i) => (
                            <div key={i} className={`cal-cell${cell.month!=='cur'?' cal-cell--other':''}`}>
                              <div className="cal-date" style={{color: cell.month!=='cur'?'rgba(0,0,0,0.2)':undefined}}>{cell.day}</div>
                              {cell.month==='cur' && calEventsFor(cell.day).map((ev,ei) => (
                                <div key={ei} className={`cal-event cal-event--${ev.type}`}>{ev.label}</div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div style={{marginTop:'1rem',display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                          {[['work-planned','Planned'],['work-done','Done'],['meeting','Meeting'],['parts-ordered','Parts Ordered'],['parts-arrive','Parts Arrive'],['due-date','Due Date']].map(([t,l]) => (
                            <span key={t} className={`cal-event cal-event--${t}`} style={{padding:'0.2rem 0.6rem'}}>{l}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Website FAQs */}
                  {adminPanel === 'faqs' && (
                    <div>
                      <div className="panel-header"><h1>Website FAQs</h1><p>Manage the FAQ items shown on the public website.</p></div>
                      <div className="content-card">
                        {faqs.map((faq,i) => (
                          <div className="faq-item" key={i}>
                            <div className="faq-item__head">
                              <span className="faq-item__q">{faq.q}</span>
                              <button className="btn-icon" onClick={()=>removeFaq(i)}>✕</button>
                            </div>
                            <div className="faq-item__body">{faq.a}</div>
                          </div>
                        ))}
                      </div>
                      <div className="content-card">
                        <h2>Add FAQ</h2>
                        <div className="form-group" style={{marginBottom:'0.75rem'}}>
                          <label>Question</label>
                          <input value={newFaq.q} onChange={e=>setNewFaq(f=>({...f,q:e.target.value}))} placeholder="e.g. How long does a build take?" />
                        </div>
                        <div className="form-group" style={{marginBottom:'1rem'}}>
                          <label>Answer</label>
                          <textarea value={newFaq.a} onChange={e=>setNewFaq(f=>({...f,a:e.target.value}))} placeholder="Answer text…" />
                        </div>
                        <button className="btn btn--primary btn-sm" onClick={addFaq}>Add FAQ</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
