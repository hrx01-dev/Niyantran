'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpenText, CalendarClock, Check, ChevronRight, CircleCheck, ClipboardCheck, FileCheck2, FileClock, Fingerprint, GitBranch, Layers3, LockKeyhole, MapPin, Menu, Radar, Scale, ShieldCheck, Workflow, X } from 'lucide-react'
import { useState } from 'react'

const capabilities = [
  { icon: BookOpenText, number: '01', title: 'APH-as-Code rulebook', copy: 'Turn handbook clauses into versioned, testable routing and compliance rules.', tag: 'Rulebook' },
  { icon: CalendarClock, number: '02', title: 'A fair obligation clock', copy: 'Track every SLA, pause institutional response time, and plan around cycle cut-offs.', tag: 'Clock' },
  { icon: Radar, number: '03', title: 'Nudges, not noise', copy: 'One daily action queue, clause-linked reminders, and three-level escalation.', tag: 'Nudge' },
  { icon: MapPin, number: '04', title: 'Coordinated EVC visits', copy: 'Schedule visits, track field verification, and collect evidence in one place.', tag: 'Verification' },
  { icon: Scale, number: '05', title: 'Decisions stay human', copy: 'Prepare committee context without automating approvals, rejections, or waivers.', tag: 'Governance' },
  { icon: Fingerprint, number: '06', title: 'An accountable trail', copy: 'Connect actions, documents, rules, and decisions in a tamper-evident log.', tag: 'Audit' },
]
const steps = [
  { number: '01', title: 'Read the rulebook', desc: 'Versioned APH clauses establish the route, checks, and obligations.' },
  { number: '02', title: 'Route the application', desc: 'Move from scrutiny and re-scrutiny to visits and committee stages as required.' },
  { number: '03', title: 'Start the clock', desc: 'Every task receives an owner, a fair SLA, and a cycle-aware deadline.' },
  { number: '04', title: 'Nudge the right person', desc: 'Daily priorities, timely alerts, and escalations surface the next action.' },
  { number: '05', title: 'Record the decision', desc: 'Authorized officers decide. Niyantran preserves the evidence and audit history.' },
]
const roles = [
  { name: 'Regional offices', title: 'Know exactly what needs attention.', text: 'Aaj Ka Kaam, region-by-stage pendency, ageing, alerts, and cases needing escalation.' },
  { name: 'Institutions', title: 'No more guessing what comes next.', text: 'Track responses, deficiencies, undertakings, deposit milestones, and lease risks.' },
  { name: 'Committees & EVC', title: 'Arrive prepared for every review.', text: 'Case context, visit schedules, evidence capture, reports, agendas, and hearing records.' },
  { name: 'Leadership', title: 'See bottlenecks across regions.', text: 'Cut-off exposure, stage-wise performance, accountable timelines, and governance reporting.' },
]
const risks = [
  { label: 'Scrutiny nearing SLA', meta: 'RO queue · APH-linked timer', level: 'Due soon' },
  { label: 'Institution response pending', meta: 'Fair clock · institution time', level: 'Paused' },
  { label: 'Lease obligation requires review', meta: 'Compliance · EoA foresight', level: 'Attention' },
]
export default function NiyantranLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const role = roles[roleIndex]
  return <main className="landing-shell landing-v2">
    <nav className="landing-nav" aria-label="Main navigation">
      <Link href="/" className="landing-brand"><img className="landing-logo-image" src="/niyantran-mark.svg" alt="" width={30} height={30} /><span><strong>niyantran</strong><small>AICTE CONTROL LAYER</small></span></Link>
      <div className={'landing-links ' + (menuOpen ? 'is-open' : '')}>
        <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
        <a href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#roles" onClick={() => setMenuOpen(false)}>For teams</a>
        <a href="#governance" onClick={() => setMenuOpen(false)}>Governance</a>
      </div>
      <div className="landing-nav-actions"><Link href="/dashboard" className="landing-nav-cta">View demo <ArrowUpRight size={14}/></Link><button type="button" className="landing-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X size={18}/> : <Menu size={18}/>}</button></div>
    </nav>

    <section className="landing-hero">
      <div className="hero-copy">
        <div className="landing-eyebrow"><span className="hero-status"/> AN INTELLIGENT APPROVAL CONTROL LAYER</div>
        <h1>Every approval.<br/><em>Under control.</em></h1>
        <p className="hero-lede">From handbook rules to the next action. Niyantran brings clarity to AICTE approval workflows, deadlines, compliance, and the decisions that matter.</p>
        <div className="hero-actions"><Link href="/dashboard" className="landing-primary">Explore the demo <ArrowRight size={16}/></Link><a href="#workflow" className="landing-secondary">See how it works <ChevronRight size={15}/></a></div>
        <div className="hero-principle"><ShieldCheck size={15}/><span>Human-led decisions. Rule-backed workflows. Traceable actions.</span></div>
      </div>
      <div className="hero-visual" aria-label="Illustrative Niyantran dashboard preview">
        <div className="visual-glow"/>
        <div className="mini-window">
          <div className="mini-top"><div className="mini-dots"><i/><i/><i/></div><span>niyantran / overview</span><span className="mini-live"><b/> DEMO DATA</span></div>
          <div className="mini-body">
            <div className="mini-sidebar"><div className="mini-logo"><img src="/niyantran-mark.svg" alt="Niyantran" width={20} height={20}/></div><span className="mini-active"/><span/><span/><span/><span/><span className="mini-last"/></div>
            <div className="mini-content">
              <div className="mini-heading"><div><small>APPROVAL OPERATIONS · ILLUSTRATIVE</small><h3>Overview</h3><p>Everything requiring attention, at a glance.</p></div><span className="landing-mini-label">Demo preview</span></div>
              <div className="mini-kpis"><div><small>ACTIVE APPLICATIONS</small><strong>1,284</strong><b>Sample data</b></div><div><small>PENDING SCRUTINY</small><strong>186</strong><b>24 due this week</b></div><div><small>DEADLINE RISK</small><strong>42</strong><b className="warn">12 urgent</b></div></div>
              <div className="mini-grid"><div className="mini-panel"><small>PRIORITY QUEUE</small><h4>Aaj Ka Kaam <span>8</span></h4><div className="mini-row"><i className="red"/><span><b>Review resubmitted documents</b><small>Sample institution · Scrutiny</small></span><em>3h 24m</em></div><div className="mini-row"><i className="amber"/><span><b>Verify EVC visit report</b><small>Sample institution · Verification</small></span><em>5h 54m</em></div><div className="mini-row"><i className="blue"/><span><b>Record committee observation</b><small>Sample institution · Committee</small></span><em>1d 10h</em></div></div><div className="mini-panel risk"><small>ATTENTION REQUIRED</small><h4>Deadline risk</h4><div className="risk-date">28 <span>OCT</span></div><b>Re-scrutiny window</b><p>Illustrative regional queue</p><strong>2 days remaining</strong></div></div>
            </div>
          </div>
        </div>
        <span className="hero-visual-caption">Illustrative product interface · not live AICTE data</span>
      </div>
    </section>

    <section className="landing-value-strip" aria-label="Product principles"><div><BookOpenText size={16}/><span>Rules are versioned</span></div><div><FileClock size={16}/><span>Deadlines are visible</span></div><div><Scale size={16}/><span>Decisions are human</span></div><div><ShieldCheck size={16}/><span>Actions are traceable</span></div></section>

    <section id="capabilities" className="capabilities landing-section">
      <div className="section-intro"><div><span className="landing-eyebrow">THE PLATFORM</span><h2>Less chasing.<br/><em>More deciding.</em></h2></div><p>One calm operating layer for the complex reality of approval cycles. Designed around the work, not around more data entry.</p></div>
      <div className="feature-grid landing-feature-grid">{capabilities.map(({ icon: Icon, number, title, copy, tag }) => <article className="feature-card" key={number}><div className="landing-feature-top"><span className="feature-icon"><Icon size={19}/></span><span className="landing-feature-number">{number} / 06</span></div><span className="landing-feature-tag">{tag}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section id="workflow" className="landing-workflow landing-section">
      <div className="landing-centered-heading"><span className="landing-eyebrow">HOW NIYANTRAN WORKS</span><h2>From rule to resolution.</h2><p>Five connected steps. One accountable process.</p></div>
      <div className="landing-steps">{steps.map((s,i)=><div className="landing-step" key={s.number}><div className="landing-step-index">{s.number}{i<4&&<span className="landing-step-line"/>}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
      <div className="landing-workflow-note"><GitBranch size={18}/><p><strong>Built on the existing intake process.</strong> Applications continue through the AICTE portal or NSWS; Niyantran is designed as a coordination and compliance layer, with import and integration adapters.</p></div>
    </section>

    <section className="landing-spotlight landing-section">
      <div className="landing-spotlight-copy"><span className="landing-eyebrow">THE DAILY OPERATING VIEW</span><h2>Know what is due.<br/><em>Before it is late.</em></h2><p>A prioritized queue tells officers what needs action, why it matters, who owns it, and which APH clause applies.</p><div className="landing-spotlight-points"><span><Check size={15}/> Ranked daily priorities</span><span><Check size={15}/> Institution time separated from AICTE time</span><span><Check size={15}/> Clause-linked escalations</span></div><Link href="/dashboard" className="landing-inline-link">Explore the workspace <ArrowUpRight size={16}/></Link></div>
      <div className="landing-queue-demo"><div className="landing-queue-head"><div><span className="landing-eyebrow">WORKSPACE / DEMO</span><h3>Requires attention</h3></div><span>3 examples</span></div>{risks.map((r,i)=><div className="landing-risk-row" key={r.label}><span className={'landing-risk-icon risk-'+i}>{i===1?<CircleCheck size={16}/>:<Clock3Icon/>}</span><div><strong>{r.label}</strong><small>{r.meta}</small></div><span className={'landing-risk-pill risk-'+i}>{r.level}</span></div>)}<div className="landing-queue-bottom"><LockKeyhole size={13}/> Illustrative, non-production examples</div></div>
    </section>

    <section id="roles" className="landing-roles landing-section"><div className="section-intro"><div><span className="landing-eyebrow">BUILT AROUND PEOPLE</span><h2>One platform.<br/><em>Every perspective.</em></h2></div><p>The right context for each role, without forcing every team into the same dashboard.</p></div>
      <div className="landing-role-layout"><div className="landing-role-tabs" role="tablist" aria-label="Audience">{roles.map((r,i)=><button type="button" role="tab" aria-selected={i===roleIndex} onClick={()=>setRoleIndex(i)} className={i===roleIndex?'selected':''} key={r.name}><span>{r.name}</span><ArrowRight size={16}/></button>)}</div><div className="landing-role-detail" role="tabpanel"><span className="landing-eyebrow">ROLE-SPECIFIC WORKSPACES</span><h3>{role.title}</h3><p>{role.text}</p><div className="landing-role-decoration"><Layers3 size={46}/><span>Focused by role. Scoped by access.</span></div></div></div>
    </section>

    <section id="governance" className="landing-governance"><div className="landing-governance-inner"><div><span className="landing-eyebrow">GOVERNANCE BY DESIGN</span><h2>Automate the process.<br/><em>Not the authority.</em></h2><p>Niyantran routes, times, reminds, and prepares context. Statutory decisions remain with the competent human authority.</p><Link href="/dashboard" className="landing-governance-link">See the demo <ArrowUpRight size={15}/></Link></div><div className="landing-governance-grid"><article><Scale size={22}/><strong>Human-in-the-loop</strong><span>Final approvals, rejections, penalties, and waivers are not automated.</span></article><article><Fingerprint size={22}/><strong>Traceable by default</strong><span>Rule references and tamper-evident event histories support accountability.</span></article><article><LockKeyhole size={22}/><strong>Scoped access</strong><span>Role-aware and region-aware access is part of the architecture.</span></article><article><ClipboardCheck size={22}/><strong>Compliance foresight</strong><span>Track undertakings, deposits, and lease obligations before they block progress.</span></article></div></div></section>

    <section className="landing-faq landing-section"><div className="landing-centered-heading"><span className="landing-eyebrow">QUESTIONS, ANSWERED</span><h2>Built for the real workflow.</h2></div><div className="landing-faq-list">{[
      ['Does Niyantran replace the AICTE portal?', 'No. It is designed as an overlay on existing AICTE and NSWS application intake, using CSV import initially and API adapters where access becomes available.'],
      ['Does it automatically grant or reject approvals?', 'No. Authorized officers and committees retain responsibility for statutory decisions. The platform organizes evidence, tasks, deadlines, and records.'],
      ['What happens when the approval handbook changes?', 'Rules are designed as versioned data. New versions can be reviewed and tested while historical applications retain their applicable rulebook version.'],
      ['Is this a live AICTE production system?', 'No. This is a project prototype and demonstration of the proposed approval and compliance control layer. Dashboard figures are illustrative.']
    ].map(([q,a],i)=><div className="landing-faq-item" key={q}><button type="button" aria-expanded={openFaq===i} onClick={()=>setOpenFaq(openFaq===i?null:i)}>{q}<span>{openFaq===i?'−':'+'}</span></button>{openFaq===i&&<p>{a}</p>}</div>)}</div></section>

    <section className="landing-cta"><span className="landing-eyebrow">EXPLORE NIYANTRAN</span><h2>More clarity.<br/><em>At every step.</em></h2><p>Explore an illustrative workspace for transparent, accountable approval operations.</p><Link href="/dashboard" className="landing-primary">Open the demo workspace <ArrowRight size={16}/></Link></section>
    <footer className="landing-footer"><span>© 2026 Niyantran · SIH26262 prototype</span><span>Rulebook / Clock / Nudge / Human Decision / Audit</span><a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>Back to top ↑</a></footer>
  </main>
}
function Clock3Icon(){return <CalendarClock size={16}/>}
