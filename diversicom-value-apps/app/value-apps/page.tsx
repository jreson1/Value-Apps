'use client';
// @ts-nocheck

import React, { useEffect, useMemo, useRef, useState, createContext, useContext } from "react";

export default function Page() { return <DemoSuite /> }

// --- Brand
const BRAND = { navy: "#0E2C5A", red: "#7A0E17", grayBg: "#f7f9fc" };

function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Diversicom">
      <polygon points="12,65 48,35 45,75" fill={BRAND.red} />
      <polygon points="52,25 88,12 68,78 40,88" fill={BRAND.navy} />
    </svg>
  );
}

function Card({ children, className = "", onClick, style }: any) {
  return (
    <div onClick={onClick} style={style} className={"rounded-2xl border bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] " + className}>
      {children}
    </div>
  );
}
function Badge({ children }: any) {
  return <span className="inline-block rounded-full border px-3 py-1 text-xs" style={{ borderColor: "#e5e7eb" }}>{children}</span>
}
function Stat({ label, value, sub }: any) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {sub && <div className="text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

// Context for guided flow + templates
const INDUSTRIES = ["Healthcare","Finance","Legal","Manufacturing","Nonprofit","Professional Services"];
const PERSONAS = ["CFO","COO","CIO","Compliance"];
const TEMPLATES: any = {
  Healthcare: { frameworks: ["HIPAA"], perUser: 120, perServer: 280, includeVCISO: true, notes: ["Protect ePHI", "BAA management", "RapidRestore for clinical ops"] },
  Finance: { frameworks: ["FINRA","PCI-DSS"], perUser: 120, perServer: 280, includeVCISO: true, notes: ["Email retention", "Audit trails", "RapidRestore before markets open"] },
  Legal: { frameworks: ["eDiscovery"], perUser: 110, perServer: 180, includeVCISO: false, notes: ["Matter holds", "Chain-of-custody", "Desktop restore"] },
  Manufacturing: { frameworks: ["CIS"], perUser: 110, perServer: 200, includeVCISO: false, notes: ["OT/SCADA isolation", "Shift-based RTO", "Ransomware containment"] },
  Nonprofit: { frameworks: ["CIS"], perUser: 100, perServer: 160, includeVCISO: false, notes: ["Donor data", "Grant reporting", "Predictable budgeting"] },
  "Professional Services": { frameworks: ["CIS"], perUser: 115, perServer: 180, includeVCISO: false, notes: ["Client data", "SLA-driven support", "Remote productivity"] },
};
const AppCtx: any = createContext({ industry: null, persona: null, setIndustry: (_: any)=>{}, setPersona: (_: any)=>{} });
function useApp(){ return useContext(AppCtx) }

// Views
function DemoSuite(){
  const [view,setView]=useState("home");
  const [industry,setIndustry]=useState<any>(null);
  const [persona,setPersona]=useState<any>(null);
  return (
    <AppCtx.Provider value={{ industry, persona, setIndustry, setPersona }}>
      <div className="min-h-screen" style={{ background: BRAND.grayBg }}>
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3"><LogoMark size={28}/><div className="font-semibold" style={{color:BRAND.navy}}>Diversicom <span className="font-normal text-gray-500">Value Apps</span></div></div>
            <nav className="hidden md:flex gap-3 text-sm">
              {[["home","Home"],["guided","Guided"],["quote","Quote"],["tco","Azure TCO"],["security","Security"],["compliance","Compliance"],["bdr","RPO/RTO"],["ai","AI"]].map(([id,label]: any)=> (
                <button key={id} onClick={()=>setView(id)} className="px-3 py-1 rounded-lg border" style={{background:view===id?BRAND.navy:'white',color:view===id?'white':'inherit',borderColor:view===id?BRAND.navy:'#e5e7eb'}}>{label}</button>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4 md:p-6">
          {view==='home' && <Home onStart={()=>setView('guided')} />}
          {view==='guided' && <GuidedFlow onDone={()=>setView('quote')} />}
          {view==='quote' && <QuoteBuilder />}
          {view==='tco' && <AzureTco />}
          {view==='security' && <SecurityCheck />}
          {view==='compliance' && <Compliance />}
          {view==='bdr' && <BdrSimulator />}
          {view==='ai' && <AiReadiness />}
        </main>
        <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 text-xs text-gray-500">© {new Date().getFullYear()} Diversicom Corp. — Technology Management</footer>
      </div>
    </AppCtx.Provider>
  )
}

function Home({ onStart }: any){
  const { industry, persona, setIndustry, setPersona } = useApp();
  const [ind,setInd]=useState(industry||"");
  const [per,setPer]=useState(persona||"");
  const tiles=[{id:'quote',title:'Quote Builder',desc:'Build a clear, branded estimate in minutes.',icon:'📄'},{id:'tco',title:'Azure TCO Comparator',desc:'See cost differences vs Diversicom Ascend.',icon:'☁️'},{id:'security',title:'Security Quick‑Check',desc:'Check email security & exposure — no agent.',icon:'🛡️'},{id:'compliance',title:'Compliance Readiness',desc:'HIPAA/FINRA/PCI gap snapshots.',icon:'📋'},{id:'bdr',title:'RPO/RTO Simulator',desc:'Quantify downtime vs recovery tier.',icon:'⏱️'},{id:'ai',title:'AI Readiness Finder',desc:'Identify automation wins & time savings.',icon:'✨'}]
  return (
    <div>
      <Card className="p-6 md:p-10 mb-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 flex items-center gap-4"><LogoMark size={64}/><div><h1 className="text-2xl md:text-3xl font-semibold">See the business value — fast.</h1><p className="text-gray-600">Tailored to your industry and role. Board-ready in minutes.</p></div></div>
          <div className="space-y-2">
            <label className="text-sm font-medium">What industry are you in?</label>
            <select className="w-full border rounded px-3 py-2" value={ind} onChange={e=>setInd(e.target.value)}>
              <option value="">Select industry…</option>
              {INDUSTRIES.map(i=> <option key={i} value={i}>{i}</option>)}
            </select>
            <label className="text-sm font-medium">Your role</label>
            <select className="w-full border rounded px-3 py-2" value={per} onChange={e=>setPer(e.target.value)}>
              <option value="">Select role…</option>
              {PERSONAS.map(p=> <option key={p} value={p}>{p}</option>)}
            </select>
            <button className="w-full px-3 py-2 rounded-lg border text-white" style={{background:BRAND.navy,borderColor:BRAND.navy}} onClick={()=>{ if(!ind||!per) return alert('Please pick industry and role'); setIndustry(ind); setPersona(per); onStart(); }}>Start guided setup</button>
            <div className="text-xs text-gray-500">We’ll tailor questions, defaults, and language to match.</div>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((c:any)=> (<Card key={c.id} className="p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-xl" aria-hidden>{c.icon}</span><div className="font-semibold">{c.title}</div></div><span className="text-gray-400">→</span></div><p className="mt-2 text-sm text-gray-600">{c.desc}</p></Card>))}
      </div>
    </div>
  )
}

// Guided flow v2
function GuidedFlow({ onDone }: any){
  const { industry, persona } = useApp();
  const tpl = industry ? TEMPLATES[industry] : null;
  const [step,setStep]=useState(0);
  const [size,setSize]=useState({users:25,servers:3});
  const [frameworks,setFrameworks]=useState(tpl? tpl.frameworks:[]);
  const [downtime,setDowntime]=useState({costPerHour:5000, preferRapid:true});
  const [priority,setPriority]=useState(["Security"]);
  const [contact,setContact]=useState({name:"",email:"",phone:""});

  const plan = useMemo(()=>{
    const perUser = tpl? tpl.perUser : 120;
    const vCISO = tpl?.includeVCISO ? (industry==='Finance'||industry==='Healthcare'?1200:900) : 0;
    const perServer = downtime.preferRapid ? Math.max(250, tpl?.perServer||250) : 180;
    const monthly = size.users*perUser + size.servers*perServer + vCISO;
    const baseline = Math.round(monthly*1.34);
    const savingsPct = Math.round(((baseline-monthly)/baseline)*100);
    const bundles = ["Managed IT","Cyber+"].concat(tpl?.includeVCISO?["vCISO"]:[]).concat([downtime.preferRapid?"SafeGuard RapidRestore":"SafeGuard ArchiveVault"]);
    return { monthly, baseline, savingsPct, bundles };
  },[size, downtime, tpl, industry]);

  const steps=[
    { title:"Company size", body: (<div className="space-y-3"><div className="text-sm text-gray-600">We’ll size the quote and recovery plan.</div><label className="block text-sm">Users<input type="number" className="w-full border rounded px-2 py-1" value={size.users} onChange={e=>setSize({...size,users:parseInt(e.target.value||'0')})}/></label><label className="block text-sm">Servers / critical systems<input type="number" className="w-full border rounded px-2 py-1" value={size.servers} onChange={e=>setSize({...size,servers:parseInt(e.target.value||'0')})}/></label></div>) },
    { title:"Compliance focus", body:(<div className="space-y-2"><div className="text-sm text-gray-600">Pick any that apply.</div>{["HIPAA","FINRA","PCI-DSS","CIS","None"].map(f=> (<label key={f} className="flex items-center gap-2"><input type="checkbox" checked={frameworks.includes(f)} onChange={e=>{const on=e.target.checked; setFrameworks((prev:any)=> on? [...prev.filter((x:any)=>x!=='None'), f] : prev.filter((x:any)=>x!==f)); }}/> {f}</label>))}</div>) },
    { title:"Downtime impact", body:(<div className="space-y-2"><div className="text-xs text-gray-500">This is what one hour offline costs you.</div><label className="block text-sm">Cost per hour (USD)<input type="number" className="w-full border rounded px-2 py-1" value={downtime.costPerHour} onChange={e=>setDowntime({...downtime,costPerHour:parseInt(e.target.value||'0')})}/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={downtime.preferRapid} onChange={e=>setDowntime({...downtime, preferRapid:e.target.checked})}/> Prefer faster recovery (RapidRestore)</label></div>) },
    { title:"Top priorities", body:(<div className="space-y-2 text-sm">{["Security","Compliance","Cost control","Automation / AI"].map(p=> (<label key={p} className="flex items-center gap-2"><input type="checkbox" checked={priority.includes(p)} onChange={e=>{const on=e.target.checked; setPriority((prev:any)=> on? [...prev,p] : prev.filter((x:any)=>x!==p))}}/> {p}</label>))}</div>) },
    { title:"Where should we send the plan?", body:(<div className="grid gap-2"><input placeholder="Name" className="border rounded px-3 py-2" value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})}/><input placeholder="Work email" className="border rounded px-3 py-2" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})}/><input placeholder="Phone" className="border rounded px-3 py-2" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})}/><div className="text-xs text-gray-500">We’ll email a board-ready PDF and a 90‑day rollout plan.</div></div>) }
  ];

  const isLast = step===steps.length-1;

  return (
    <Card className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3"><div><div className="text-xs text-gray-500">Step {step+1} of {steps.length}</div><h2 className="text-xl font-semibold">{steps[step].title}</h2></div>{industry && <div className="text-xs rounded-full border px-3 py-1" style={{borderColor:BRAND.navy}}>Industry: {industry} • {persona}</div>}</div>
          {steps[step].body}
          <div className="mt-4 flex items-center justify-between"><button className="px-4 py-2 rounded-lg border" onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>Back</button><div className="flex items-center gap-2">{step>0 && <span className="text-sm text-gray-500">Savings: <b>{plan.savingsPct}%</b></span>}<button className="px-4 py-2 rounded-lg border text-white" style={{background:BRAND.navy,borderColor:BRAND.navy}} onClick={()=>{ if(!isLast){ setStep(step+1); return; } alert(`Demo submit\nRole: ${persona}\nIndustry: ${industry}\nPlan: ${plan.bundles.join(' + ')}\nMonthly: ~$${Math.round(plan.monthly).toLocaleString()} (save ${plan.savingsPct}%)`); onDone(); }}> {isLast?'Send & view quote (demo)':'Next'}</button></div></div>
        </div>
        <div>
          <Card className="p-4 sticky top-24">
            <div className="font-semibold mb-1">Summary</div>
            <Stat label="Estimated monthly" value={`$${Math.round(plan.monthly).toLocaleString()}`} />
            <div className="mt-2 text-sm"><Badge>Save ~{plan.savingsPct}% vs DIY</Badge></div>
            <div className="mt-3 text-sm">
              <div className="font-medium mb-1">Recommended</div>
              <ul className="list-disc pl-5 text-gray-700">
                {plan.bundles.map((b:any)=> <li key={b}>{b}</li>)}
              </ul>
            </div>
            <div className="mt-3 text-xs text-gray-500">Why it matters: fewer surprises, faster recovery, evidence-ready controls.</div>
          </Card>
        </div>
      </div>
    </Card>
  )
}

// Quote Builder already defined above

// ---- AI Readiness defined later ----

// Create simple root page redirect
