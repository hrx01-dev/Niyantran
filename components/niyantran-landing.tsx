'use client'

import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, Clock3, FileCheck2, ShieldCheck, Sparkles } from 'lucide-react'

const features = [
  { icon: FileCheck2, title: 'One approval workspace', copy: 'Move every application from intake to decision with a clear, accountable workflow.' },
  { icon: Clock3, title: 'Deadlines that stay visible', copy: 'Surface approaching cut-offs, ownership gaps, and escalations before they become blockers.' },
  { icon: ShieldCheck, title: 'Audit-ready by default', copy: 'Keep every action, document, and decision connected to a tamper-evident trail.' },
]

export default function NiyantranLanding() {
  return (
    <main className="landing-shell">
      <nav className="landing-nav" aria-label="Main navigation">
        <Link href="/" className="landing-brand"><span className="landing-mark">N</span><span><strong>niyantran</strong><small>AICTE CONTROL LAYER</small></span></Link>
        <div className="landing-links"><a href="#capabilities">Capabilities</a><a href="#approach">How it works</a><a href="#security">Security</a></div>
        <Link href="/dashboard" className="landing-nav-cta">Open workspace <ArrowRight size={14} /></Link>
      </nav>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="landing-eyebrow"><span className="hero-status" /> BUILT FOR APPROVAL OPERATIONS</div>
          <h1>Clarity for every <em>approval.</em></h1>
          <p className="hero-lede">niyantran brings applications, scrutiny, visits, committees, and decisions into one calm operating layer for AICTE teams.</p>
          <div className="hero-actions"><Link href="/dashboard" className="landing-primary">Enter the workspace <ArrowRight size={16} /></Link><a href="#capabilities" className="landing-secondary">Explore capabilities <ChevronRight size={15} /></a></div>
          <div className="hero-proof"><div className="proof-avatars"><span>AS</span><span>PM</span><span>SI</span><span>+12</span></div><span>Trusted by approval teams across every region</span></div>
        </div>
        <div className="hero-visual" aria-label="Niyantran workspace preview">
          <div className="visual-glow" />
          <div className="mini-window">
            <div className="mini-top"><div className="mini-dots"><i /><i /><i /></div><span>niyantran / overview</span><span className="mini-live"><b /> LIVE</span></div>
            <div className="mini-body">
              <div className="mini-sidebar"><div className="mini-logo">N</div><span className="mini-active" /><span /><span /><span /><span /><span className="mini-last" /></div>
              <div className="mini-content"><div className="mini-heading"><div><small>MONDAY, 26 OCTOBER 2026</small><h3>Overview</h3><p>Approval operations at a glance.</p></div><button>Live view</button></div><div className="mini-kpis"><div><small>ACTIVE APPLICATIONS</small><strong>1,284</strong><b>+8.4%</b></div><div><small>PENDING SCRUTINY</small><strong>186</strong><b>24 due this week</b></div><div><small>DEADLINE RISK</small><strong>42</strong><b className="warn">12 within 48h</b></div></div><div className="mini-grid"><div className="mini-panel"><small>PRIORITY QUEUE</small><h4>Aaj Ka Kaam <span>8</span></h4><div className="mini-row"><i className="red" /><span><b>Review resubmitted documents</b><small>K. J. Somaiya Institute of Engineering</small></span><em>3h 24m</em></div><div className="mini-row"><i className="amber" /><span><b>Verify EVC visit report</b><small>R.V. College of Engineering</small></span><em>5h 54m</em></div><div className="mini-row"><i className="blue" /><span><b>Record committee observation</b><small>Bengal Institute of Technology</small></span><em>1d 10h</em></div></div><div className="mini-panel risk"><small>ATTENTION REQUIRED</small><h4>Deadline risk</h4><div className="risk-date">28 <span>OCT</span></div><b>Re-scrutiny window closes</b><p>Western Regional Office · 18 applications</p><strong>2 days remaining</strong></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities"><div className="section-intro"><div><span className="landing-eyebrow">THE CONTROL LAYER</span><h2>Less chasing.<br /><em>More deciding.</em></h2></div><p>Designed for the rhythm of real approval work: many stakeholders, fixed cycles, and no room for a missed handoff.</p></div><div className="feature-grid">{features.map(({ icon: Icon, title, copy }) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={18} /></span><h3>{title}</h3><p>{copy}</p><span className="feature-arrow"><ArrowRight size={14} /></span></article>)}</div></section>

      <section id="approach" className="landing-band"><div><span className="landing-eyebrow">A SHARED SOURCE OF TRUTH</span><h2>Every stage. Every region.<br /><em>One measured view.</em></h2></div><div className="band-stat"><strong>01</strong><span>Connect your existing approval rhythm to one operational view.</span></div><div className="band-stat"><strong>02</strong><span>Give every role the context and next action they need.</span></div><div className="band-stat"><strong>03</strong><span>Make progress visible, explainable, and audit-ready.</span></div></section>

      <section id="security" className="landing-cta"><Sparkles size={18} /><h2>Bring your approval operations<br /><em>into focus.</em></h2><Link href="/dashboard" className="landing-primary">Open niyantran <ArrowRight size={16} /></Link><p>AICTE · Production workspace</p></section>
      <footer className="landing-footer"><span>© 2026 niyantran</span><span>AICTE CONTROL LAYER</span><span>Operational clarity, by design.</span></footer>
    </main>
  )
}
