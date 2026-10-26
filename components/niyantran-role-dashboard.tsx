'use client'
import { useState } from 'react'
import { ArrowRight, CalendarClock, CheckCircle2, Clock3, FileCheck2, FileText, MapPin, ShieldAlert, TrendingUp, Users, AlertTriangle, ClipboardList } from 'lucide-react'
import { demoCases } from './niyantran-demo-screens'

export const roleNavigation: Record<string,string[]> = {
 'Regional Office Officer':['Overview','Aaj Ka Kaam','Applications','Approval Workflow','Compliance','EVC & Visits','Documents','Alerts & Escalations','Analytics','Audit Trail'],
 'AICTE Leadership':['Overview','Analytics','Applications','Approval Workflow','Compliance','Alerts & Escalations','Approval Cycles','Audit Trail'],
 'Scrutiny / Committee Member':['Overview','Aaj Ka Kaam','Applications','Approval Workflow','Committees & Hearings','Documents','APH Rulebook','Audit Trail'],
 'Institution Representative':['Overview','Applications','Compliance','Documents','Alerts & Escalations','Approval Cycles'],
 'EVC / Field Officer':['Overview','EVC & Visits','Aaj Ka Kaam','Applications','Documents','Alerts & Escalations'],
}
type Tile={label:string,value:string,help:string}
type Action={title:string,description:string,screen:string,tag?:string}
type RoleData={kicker:string,title:string,subtitle:string,tiles:Tile[],actions:Action[],spotlight:string,spotlightText:string,spotlightScreen:string}
const roleData:Record<string,RoleData>={
 'Regional Office Officer':{
 kicker:'REGIONAL OPERATIONS · DEMO',title:'Your regional command center',subtitle:'Clear ownership, ageing, and the cases that need an officer today.',
 tiles:[{label:'Regional applications',value:'184',help:'Western RO · illustrative'},{label:'Action queue',value:'18',help:'6 require same-day review'},{label:'Deadline risks',value:'07',help:'2 are high priority'},{label:'Visits to coordinate',value:'04',help:'Next two weeks'}],
 actions:[{title:'Review resubmitted documents',description:'K. J. Somaiya Institute · Re-Scrutiny · APH 4.2.1',screen:'Aaj Ka Kaam',tag:'Due today'},{title:'Resolve deposit escalation',description:'Central Institute of Technology · Clause 2.25(f)',screen:'Compliance',tag:'High risk'},{title:'Check EVC coordination',description:'Visit evidence and upcoming assignments',screen:'EVC & Visits',tag:'4 visits'}],
 spotlight:'Region × stage visibility',spotlightText:'Jump into the regional workload, sort urgent cases and act before the cut-off.',spotlightScreen:'Applications'
 },
 'AICTE Leadership':{
 kicker:'NATIONAL OVERSIGHT · DEMO',title:'A national view of approvals',subtitle:'Monitor regional bottlenecks, cut-off exposure and programme performance.',
 tiles:[{label:'Regions monitored',value:'10',help:'Proposed nationwide scope'},{label:'Portfolio applications',value:'1,284',help:'Illustrative total'},{label:'Cut-off exposure',value:'42',help:'Mock at-risk cases'},{label:'Escalations',value:'09',help:'Require regional attention'}],
 actions:[{title:'Compare regional pendency',description:'Review stage distribution and national bottlenecks',screen:'Analytics',tag:'Priority'},{title:'Review cut-off risk',description:'Identify milestones with insufficient processing time',screen:'Approval Cycles',tag:'Upcoming'},{title:'Inspect escalated cases',description:'Trace accountability and intervening actions',screen:'Alerts & Escalations',tag:'9 flagged'}],
 spotlight:'Policy-level transparency',spotlightText:'Read aggregated analytics and trace decisions without altering committee authority.',spotlightScreen:'Analytics'
 },
 'Scrutiny / Committee Member':{
 kicker:'COMMITTEE WORKSPACE · DEMO',title:'Prepared for every decision',subtitle:'Case files, observations, agenda preparation and clause-linked evidence.',
 tiles:[{label:'Assigned case files',value:'12',help:'Committee demo docket'},{label:'To scrutinize',value:'05',help:'Documents awaiting review'},{label:'Hearings scheduled',value:'03',help:'Upcoming sittings'},{label:'Draft observations',value:'04',help:'Require human sign-off'}],
 actions:[{title:'Review committee docket',description:'Hearings, agendas and case summaries',screen:'Committees & Hearings',tag:'Next sitting'},{title:'Inspect documents',description:'Evidence required for scrutiny',screen:'Documents',tag:'5 pending'},{title:'Check applicable clauses',description:'APH rulebook and handbook explanations',screen:'APH Rulebook',tag:'Rule-backed'}],
 spotlight:'The decision is yours',spotlightText:'Niyantran prepares the record; authorized committee members make and record statutory decisions.',spotlightScreen:'Committees & Hearings'
 },
 'Institution Representative':{
 kicker:'INSTITUTION PORTAL · DEMO',title:'Your approvals, clearly explained',subtitle:'See the status of your application and what your institution needs to submit next.',
 tiles:[{label:'Your applications',value:'02',help:'Illustrative institution records'},{label:'Pending responses',value:'01',help:'Deficiency clarification'},{label:'Compliance items',value:'03',help:'Lease, deposit and undertaking'},{label:'New notifications',value:'02',help:'Actionable messages'}],
 actions:[{title:'Track an approval application',description:'Current stage, owner and next milestone',screen:'Applications',tag:'In progress'},{title:'Respond to compliance request',description:'Review lease and undertaking obligations',screen:'Compliance',tag:'Action needed'},{title:'Review requested documents',description:'See document verification status',screen:'Documents',tag:'Pending'}],
 spotlight:'No more status guessing',spotlightText:'Understand what is pending with your institution, and which deadlines might affect your application.',spotlightScreen:'Applications'
 },
 'EVC / Field Officer':{
 kicker:'FIELD VERIFICATION · DEMO',title:'Ready for the next visit',subtitle:'Everything the verification team needs, from assignment to evidence handover.',
 tiles:[{label:'Assigned visits',value:'03',help:'Next two weeks'},{label:'Next visit',value:'28 Oct',help:'Illustrative schedule'},{label:'Evidence pending',value:'02',help:'Review or upload required'},{label:'Reports submitted',value:'08',help:'Sample cycle count'}],
 actions:[{title:'Open your visit itinerary',description:'R. V. College of Engineering · Southern region',screen:'EVC & Visits',tag:'28 Oct'},{title:'Complete field checklist',description:'COI verification, location, images and report',screen:'EVC & Visits',tag:'Action needed'},{title:'Review evidence pack',description:'Visit reports and supporting documents',screen:'Documents',tag:'2 pending'}],
 spotlight:'Mobile-first verification',spotlightText:'Keep assigned checks, evidence and report status together during field verification.',spotlightScreen:'EVC & Visits'
 },
}
export default function RoleDashboard({role,onNavigate}:{role:string,onNavigate:(screen:string)=>void}){
 const config=roleData[role]||roleData['Regional Office Officer']
 const [done,setDone]=useState<string[]>([])
 return <div className="role-dashboard">
 <header className="role-hero"><div><div className="role-kicker"><span className="role-indicator"/> {config.kicker}</div><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="role-hero-icon">{role==='AICTE Leadership'?<TrendingUp size={27}/>:role==='Institution Representative'?<FileCheck2 size={27}/>:role==='EVC / Field Officer'?<MapPin size={27}/>:role==='Scrutiny / Committee Member'?<Users size={27}/>:<ClipboardList size={27}/>}</div></header>
 <div className="role-notice"><ShieldAlert size={15}/><span>Role-focused prototype view. All counts, identities and records are illustrative; access controls require server-side enforcement.</span></div>
 <div className="role-tiles">{config.tiles.map((x,i)=><div className="role-tile" key={x.label}><div className="role-tile-top"><span>{x.label}</span>{i===0?<FileText size={16}/>:i===1?<Clock3 size={16}/>:i===2?<AlertTriangle size={16}/>:<CalendarClock size={16}/>}</div><strong>{x.value}</strong><small>{x.help}</small></div>)}</div>
 <div className="role-main-grid"><section className="role-section"><div className="role-section-heading"><div><span className="role-kicker">PRIORITIZED FOR THIS ROLE</span><h2>{role==='AICTE Leadership'?'Decisions needing attention':role==='Institution Representative'?'Your next steps':role==='EVC / Field Officer'?'Field assignments':'Aaj Ka Kaam'}</h2></div><span>{config.actions.length} priorities</span></div>
 {config.actions.map((a,i)=><div key={a.title} className={'role-action '+(done.includes(a.title)?'role-action-done':'')}><div className="role-action-number">{done.includes(a.title)?<CheckCircle2 size={15}/>:String(i+1).padStart(2,'0')}</div><div className="role-action-copy"><strong>{a.title}</strong><p>{a.description}</p><span>{a.tag}</span></div><button type="button" className="role-action-open" onClick={()=>onNavigate(a.screen)}>Open <ArrowRight size={14}/></button><button type="button" className="role-action-check" aria-label={done.includes(a.title)?'Restore reminder':'Mark reminder reviewed'} onClick={()=>setDone(v=>v.includes(a.title)?v.filter(t=>t!==a.title):[...v,a.title])}><CheckCircle2 size={17}/></button></div>)}
 <div className="role-bottom-note">Review markers are session-only UI state. Actions open the corresponding demo module.</div></section>
 <aside className="role-side"><span className="role-kicker">YOUR FOCUS</span><h2>{config.spotlight}</h2><p>{config.spotlightText}</p><button onClick={()=>onNavigate(config.spotlightScreen)}>Explore {config.spotlightScreen}<ArrowRight size={15}/></button><div className="role-side-rule"><span>RULEBOOK</span><span>CLOCK</span><span>NUDGE</span><span>HUMAN DECISION</span><span>AUDIT</span></div></aside></div>
 {role==='AICTE Leadership'&&<section className="role-extra"><div><strong>Illustrative regional exposure</strong><p>Compare sample applications by region; the full Analytics module offers more detailed charts.</p></div><div className="role-region-bars">{[['Western',73],['Southern',60],['Northern',46],['Eastern',38]].map(([label,val])=><div key={label}><span>{label}</span><i><b style={{width:val+'%'}}/></i></div>)}</div></section>}
 {role==='Institution Representative'&&<section className="role-extra"><div><strong>Application milestone preview</strong><p>Your own intake → scrutiny → reply → verification → decision timeline.</p></div><div className="role-milestones">{['Submitted','Scrutiny','Institution reply','Decision'].map((s,i)=><span className={i<2?'passed':''} key={s}>{s}</span>)}</div></section>}
 {role==='EVC / Field Officer'&&<section className="role-extra"><div><strong>Upcoming verification visits</strong><p>Open the EVC module to review itinerary and evidence requirements.</p></div><div className="role-visit-preview">{demoCases.filter(x=>x.stage==='EVC').map(x=><button key={x.id} onClick={()=>onNavigate('EVC & Visits')}><MapPin size={15}/>{x.name}<ArrowRight size={14}/></button>)}</div></section>}
 </div>
}
