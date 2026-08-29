import { useEffect, useState } from "react";
import "./concierge.css";

export type ConciergeData = {
  firstName:string; email:string; countryCode:string; phone:string; destination:string;
  travelWhen:string; timingNotes:string; partySize:string; partyNotes:string;
  experience:string; budget:string; planningStage:string;
};

const empty:ConciergeData={firstName:"",email:"",countryCode:"+1",phone:"",destination:"",travelWhen:"",timingNotes:"",partySize:"",partyNotes:"",experience:"",budget:"",planningStage:""};
const steps=["Basics","Destination","Timing","Travelers","Experience","Budget","Planning stage"];

export function ConciergeFlow({endpoint,bookDirectUrl="/book-direct",consultationUrl="https://calendly.com/book-swankguide"}:{endpoint:string;bookDirectUrl?:string;consultationUrl?:string}) {
  const [view,setView]=useState<"how"|"form"|"confirmation">("how");
  const [step,setStep]=useState(1);
  const [data,setData]=useState<ConciergeData>(()=>{try{return JSON.parse(sessionStorage.getItem("swank-concierge-react-draft")||"null")||empty}catch{return empty}});
  const [sending,setSending]=useState(false);
  const [error,setError]=useState("");
  useEffect(()=>{sessionStorage.setItem("swank-concierge-react-draft",JSON.stringify(data))},[data]);
  const patch=(p:Partial<ConciergeData>)=>setData(d=>({...d,...p}));
  const choices=(key:keyof ConciergeData,items:string[])=><div className="sg-options">{items.map(x=><button type="button" key={x} className={"sg-option "+(data[key]===x?"is-selected":"")} onClick={()=>patch({[key]:x})}><span>{x}</span><span>{data[key]===x?"✓":""}</span></button>)}</div>;
  async function submit(){if(!/^\S+@\S+\.\S+$/.test(data.email)){setStep(1);setError("Please enter a valid email address.");return}setSending(true);setError("");const payload={source:"Swank Website — Concierge",lane:"Concierge",firstName:data.firstName,email:data.email,phone:data.phone?`${data.countryCode} ${data.phone}`:"",destination:data.destination,travelWhen:[data.travelWhen,data.timingNotes].filter(Boolean).join(" — "),partySize:[data.partySize,data.partyNotes].filter(Boolean).join(" — "),experience:data.experience,budget:data.budget,planningStage:data.planningStage};try{const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});if(!r.ok)throw new Error(String(r.status));sessionStorage.removeItem("swank-concierge-react-draft");setView("confirmation")}catch{setError("We couldn’t send your request. Please try again or contact book@swankguide.com.")}finally{setSending(false)}}
  if(view==="how")return <section className="sg-concierge"><header className="sg-intro"><p className="sg-eyebrow">Concierge</p><h1>How Concierge Works</h1><p>A guided way to book, minus the hours of research.</p><button className="sg-primary" onClick={()=>setView("form")}>Plan my trip</button></header><div className="sg-content"><p className="sg-label">The process</p><ol className="sg-process"><li><b>01</b><span>Tell us the basics of your trip</span></li><li><b>02</b><span>We go deeper until it’s right</span></li><li><b>03</b><span>We handle the details. You enjoy.</span></li></ol></div></section>;
  if(view==="confirmation")return <section className="sg-concierge"><header className="sg-intro sg-intro-small"><h1>Your request is in!</h1></header><div className="sg-content sg-confirm"><p>Your personalized proposal will be ready within 1–3 business days, depending on the complexity of your trip.</p><article><h2>Want to talk it through?</h2><a className="sg-primary" href={consultationUrl}>Book a Consultation</a></article><button className="sg-text-link" onClick={()=>setView("how")}>Back to start</button></div></section>;
  return <section className="sg-concierge"><header className="sg-intro sg-intro-small"><p className="sg-eyebrow">Concierge</p><h1>Tell us about your trip.</h1><button className="sg-text-link" onClick={()=>setView("how")}>How Concierge Works</button></header><div className="sg-form"><div className="sg-progress"><span>Step {step} of 7 — {steps[step-1]}</span><span>{Math.round(step/7*100)}%</span><div><i style={{width:`${step/7*100}%`}}/></div></div><div className="sg-step">
  {step===1&&<><h2>First, the basics.</h2><Field label="First name or nickname" value={data.firstName} onChange={v=>patch({firstName:v})}/><Field type="email" label="Email address" value={data.email} onChange={v=>patch({email:v})}/><Field type="tel" label="Phone number" value={data.phone} onChange={v=>patch({phone:v})}/></>}
  {step===2&&<><h2>Where are you going?</h2><Field label="Destination" value={data.destination} onChange={v=>patch({destination:v})}/></>}
  {step===3&&<><h2>When are you traveling?</h2>{choices("travelWhen",["I have exact dates","I’m flexible, I have a rough timeframe","I’m very early, just exploring"])}<Field label="Timing notes" value={data.timingNotes} onChange={v=>patch({timingNotes:v})}/></>}
  {step===4&&<><h2>How many people are traveling?</h2>{choices("partySize",["Just me","2 travelers","3 or more, family or group trip"])}<Field label="Group details" value={data.partyNotes} onChange={v=>patch({partyNotes:v})}/></>}
  {step===5&&<><h2>What kind of experience are you looking for?</h2><label className="sg-field"><span>Experience</span><textarea value={data.experience} onChange={e=>patch({experience:e.target.value})}/></label></>}
  {step===6&&<><h2>Approximate nightly hotel budget?</h2>{choices("budget",["Under $200 / night","$200 – $400 / night","$400 – $700 / night","$700+ / night","Flexible, show me the best options"])}</>}
  {step===7&&<><h2>Where are you in the planning process?</h2>{choices("planningStage",["Just starting to explore ideas","I have a rough plan, need help filling it in","My flights are booked, I need hotels and logistics","I know exactly what I want, just need someone to book it"])}</>}
  {error&&<p className="sg-error">{error}</p>}</div><div className="sg-actions">{step>1?<button className="sg-secondary" onClick={()=>setStep(s=>s-1)}>Back</button>:<span/>}<button disabled={sending} className="sg-primary" onClick={()=>step===7?submit():setStep(s=>s+1)}>{sending?"Sending…":step===7?"Submit":"Next"}</button></div></div><div className="sg-switch">Prefer to book it yourself now? <a href={bookDirectUrl}>Switch to Book Direct</a></div></section>
}
function Field({label,value,onChange,type="text"}:{label:string;value:string;onChange:(v:string)=>void;type?:string}){return <label className="sg-field"><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)}/></label>}
