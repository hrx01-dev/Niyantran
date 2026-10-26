'use client'

import { useMemo, useState } from 'react'
import DemoScreens from './niyantran-demo-screens'
import {
  AlertCircle,
  Bell,
  BookOpen,
  CalendarClock,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  FileText,
  Filter,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-react'

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Aaj Ka Kaam', icon: ClipboardCheck, badge: '8' },
  { label: 'Applications', icon: FileText },
  { label: 'Approval Workflow', icon: SlidersHorizontal },
  { label: 'Compliance', icon: ShieldCheck },
  { label: 'EVC & Visits', icon: CalendarClock },
  { label: 'Committees & Hearings', icon: Users },
  { label: 'Documents', icon: BookOpen },
  { label: 'Alerts & Escalations', icon: AlertCircle, badge: '3', critical: true },
  { label: 'Analytics', icon: SlidersHorizontal },
]

const adminNav = [
  { label: 'APH Rulebook', icon: BookOpen },
  { label: 'Approval Cycles', icon: Clock3 },
  { label: 'Audit Trail', icon: ShieldCheck },
]

const tasks = [
  { id: 'AICTE/2025/WR/004821', institution: 'K. J. Somaiya Institute of Engineering', action: 'Review resubmitted documents', owner: 'A. Sharma', priority: 'High', due: 'Today, 4:00 PM', time: '3h 24m', stage: 'Re-Scrutiny', clause: 'APH 4.2.1' },
  { id: 'AICTE/2025/SR/001992', institution: 'R.V. College of Engineering', action: 'Verify EVC visit report', owner: 'P. Mehta', priority: 'Medium', due: 'Today, 6:30 PM', time: '5h 54m', stage: 'EVC', clause: 'APH 7.1.4' },
  { id: 'AICTE/2025/ER/003107', institution: 'Bengal Institute of Technology', action: 'Record committee observation', owner: 'You', priority: 'High', due: 'Tomorrow, 11:00 AM', time: '1d 10h', stage: 'Committee', clause: 'APH 8.3.2' },
  { id: 'AICTE/2025/NR/006540', institution: 'Maharaja Agrasen University', action: 'Send deficiency reminder', owner: 'S. Iyer', priority: 'Low', due: 'Tomorrow, 2:00 PM', time: '1d 13h', stage: 'Institution Response', clause: 'APH 5.4.6' },
]

const regions = ['NRO', 'WRO', 'SRO', 'ERO', 'WRO', 'NRO', 'SRO', 'ERO', 'NRO', 'SRO']
const regionNames = ['Northern Regional Office', 'Western Regional Office', 'Southern Regional Office', 'Eastern Regional Office']
const matrix = [[31, 18, 12, 8, 6, 14], [42, 25, 19, 11, 9, 21], [28, 16, 23, 7, 4, 12], [19, 11, 9, 14, 8, 17]]

function StatusPill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'high' | 'medium' | 'low' | 'neutral' }) {
  return <span className={`status-pill ${tone}`}>{children}</span>
}

export default function NiyantranDashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeScreen, setActiveScreen] = useState('Overview')
  const navigate = (screen: string) => { setActiveScreen(screen); setNoticeOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const [role, setRole] = useState('Regional Office Officer')
  const [search, setSearch] = useState('')
  const [taskFilter, setTaskFilter] = useState('All tasks')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  const filteredTasks = useMemo(() => tasks.filter((task) => !completed.includes(task.id) && (taskFilter === 'All tasks' || task.priority === taskFilter) && `${task.id} ${task.institution} ${task.action}`.toLowerCase().includes(search.toLowerCase())), [completed, search, taskFilter])

  return (
    <div className="niyantran-shell">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="brand"><div className="brand-mark"><img src="/niyantran-mark.svg" alt="Niyantran" width={28} height={28}/></div>{!collapsed && <div><strong>niyantran</strong><span>AICTE CONTROL LAYER</span></div>}</div>
        <div className="workspace"><span className="workspace-dot" />{!collapsed && <><span>AICTE · Production</span><ChevronDown size={14} /></>}</div>
        <nav className="nav-list" aria-label="Primary navigation">
          {!collapsed && <div className="nav-label">WORKSPACE</div>}
          {nav.map(({ label, icon: Icon, badge, critical }) => <button key={label} className={`nav-item ${label === activeScreen ? 'active' : ''}`} onClick={() => navigate(label)} title={collapsed ? label : undefined}><Icon size={16} strokeWidth={1.8} />{!collapsed && <><span>{label}</span>{badge && <span className={`nav-badge ${critical ? 'critical' : ''}`}>{badge}</span>}</>}</button>)}
          {!collapsed && <div className="nav-label admin-label">ADMINISTRATION</div>}
          {adminNav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${label === activeScreen ? 'active' : ''}`} onClick={() => navigate(label)} title={collapsed ? label : undefined}><Icon size={16} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className={`nav-item ${activeScreen === 'Settings' ? 'active' : ''}`} onClick={() => navigate('Settings')}><Settings size={16} />{!collapsed && <span>Settings</span>}</button><button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={16} /> : <><PanelLeftClose size={16} /><span>Collapse sidebar</span></>}</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><button className="mobile-menu" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle navigation"><Menu size={18} /></button><span>Workspace</span><span className="slash">/</span><strong>{activeScreen}</strong></div><div className="top-actions"><label className="search-box"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label><button className="icon-btn" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Notifications"><Bell size={17} /><i /></button><div className="avatar">AS</div></div>{noticeOpen && <div className="notification-popover"><strong>Notifications</strong><span>3 escalations require attention</span><span>2 new documents received</span></div>}</header>
        {activeScreen === 'Overview' ? <div className="page-wrap">
          <div className="page-heading"><div><p className="eyebrow">MONDAY, 26 OCTOBER 2026</p><h1>Overview</h1><p className="subtitle">Approval operations, deadlines and compliance at a glance.</p></div><div className="heading-actions"><label className="role-select"><Users size={15} /><select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Demo role"><option>Regional Office Officer</option><option>AICTE Leadership</option><option>Scrutiny / Committee Member</option><option>Institution Representative</option><option>EVC / Field Officer</option></select><ChevronDown size={14} /></label><button className="outline-btn"><CalendarClock size={15} /> FY 2025–26 <ChevronDown size={13} /></button><button className="primary-btn"><span className="live-dot" />Live view</button></div></div>
          <div className="role-note"><CircleHelp size={14} /><span>Viewing as <strong>{role}</strong>. Permissions and data are scoped to your role.</span><button aria-label="Dismiss note"><X size={14} /></button></div>
          <section className="kpi-grid" aria-label="Operational metrics">
            {[['Active applications', '1,284', '+8.4%', 'vs. last cycle', 'blue'], ['Pending scrutiny', '186', '24', 'due this week', 'teal'], ['Approaching deadlines', '42', '12', 'within 48 hours', 'amber'], ['Critical escalations', '09', '3', 'unassigned', 'red']].map(([label, value, compare, context, tone]) => <article className="kpi-card" key={label}><div className={`kpi-icon ${tone}`}><FileText size={16} /></div><div className="kpi-content"><span>{label}</span><strong>{value}</strong><small className={tone === 'red' || tone === 'amber' ? 'attention' : ''}>{compare} <em>{context}</em></small></div><MoreHorizontal size={16} className="muted-icon" /></article>)}
          </section>
          <section className="dashboard-grid">
            <div className="panel task-panel"><div className="panel-header"><div><div className="section-kicker"><span className="section-dot blue-dot" />PRIORITY QUEUE</div><h2>Aaj Ka Kaam <span>{filteredTasks.length}</span></h2></div><div className="panel-controls"><div className="filter-select"><Filter size={14} /><select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)} aria-label="Filter tasks"><option>All tasks</option><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown size={13} /></div><button className="text-btn">View all <span>→</span></button></div></div><div className="task-list">{filteredTasks.map((task) => <div className="task-row" key={task.id}><div className={`priority-line ${task.priority.toLowerCase()}`} /><div className="task-main"><div className="task-top"><span className="app-id">{task.id}</span><StatusPill tone={task.priority.toLowerCase() as 'high' | 'medium' | 'low'}>{task.priority}</StatusPill></div><strong>{task.action}</strong><span className="institution">{task.institution}</span><div className="task-meta"><span><Users size={12} />{task.owner}</span><span><Clock3 size={12} />Due {task.due}</span><span className="clause">{task.clause}</span></div></div><div className="task-stage"><span>{task.stage}</span><strong className={task.priority === 'High' ? 'urgent' : ''}>{task.time}</strong></div><button className="complete-btn" onClick={() => setCompleted([...completed, task.id])} aria-label={`Mark ${task.action} complete`}><Check size={15} /></button></div>)}{filteredTasks.length === 0 && <div className="empty-state">No tasks match your current view.</div>}</div></div>
            <div className="panel deadline-panel"><div className="panel-header"><div><div className="section-kicker"><span className="section-dot amber-dot" />ATTENTION REQUIRED</div><h2>Deadline risk</h2></div><button className="icon-btn small"><MoreHorizontal size={16} /></button></div><div className="deadline-list"><div className="deadline-item critical"><div className="deadline-date"><strong>28</strong><span>OCT</span></div><div><strong>Re-scrutiny window closes</strong><span>Western Regional Office · 18 applications</span><small><AlertCircle size={12} /> 2 days remaining</small></div></div><div className="deadline-item"><div className="deadline-date"><strong>31</strong><span>OCT</span></div><div><strong>Committee meeting · Round 2</strong><span>Central Zone · 12 applications queued</span><small><Clock3 size={12} /> 5 days remaining</small></div></div><div className="deadline-item"><div className="deadline-date"><strong>04</strong><span>NOV</span></div><div><strong>Institution response cut-off</strong><span>All regions · 34 open deficiencies</span><small><Clock3 size={12} /> 9 days remaining</small></div></div></div><button className="panel-footer">Open deadline monitor <span>→</span></button></div>
          </section>
          <section className="lower-grid"><div className="panel matrix-panel"><div className="panel-header"><div><div className="section-kicker"><span className="section-dot teal-dot" />LIVE OPERATIONS</div><h2>Regional pendency</h2><p>Open workload by regional office and workflow stage.</p></div><button className="outline-btn compact"><SlidersHorizontal size={14} /> Filter</button></div><div className="matrix-wrap"><table><thead><tr><th>Regional office</th>{['Scrutiny', 'Re-scrutiny', 'EVC', 'Committee', 'Decision', 'Inst. response'].map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{regionNames.map((name, i) => <tr key={name}><td><span className="region-code">{regions[i]}</span>{name}</td>{matrix[i].map((value, j) => <td key={j}><button className={`matrix-cell ${value > 35 ? 'severe' : value > 20 ? 'high' : value > 10 ? 'medium' : 'low'}`}>{value}</button></td>)}</tr>)}</tbody></table></div><div className="matrix-legend"><span><i className="legend low" />Low</span><span><i className="legend medium" />Moderate</span><span><i className="legend high" />High</span><span><i className="legend severe" />Critical</span></div></div><div className="panel health-panel"><div className="panel-header"><div><div className="section-kicker"><span className="section-dot blue-dot" />WORKFLOW HEALTH</div><h2>Stage distribution</h2></div><button className="icon-btn small"><MoreHorizontal size={16} /></button></div><div className="chart"><div className="chart-axis"><span>600</span><span>400</span><span>200</span><span>0</span></div><div className="bars">{[['Intake', 72], ['Scrutiny', 48], ['EVC', 35], ['Committee', 55], ['Decision', 28], ['Issued', 44]].map(([label, height]) => <div className="bar-group" key={label}><div className="bar" style={{ height: `${height}%` }}><span>{Math.round(Number(height) * 8.4)}</span></div><small>{label}</small></div>)}</div></div><div className="health-total"><span>Total in workflow</span><strong>1,284 <small>applications</small></strong></div></div></section>
          <footer className="audit-footer"><span><ShieldCheck size={13} /> All actions are recorded in the <button>tamper-evident audit trail</button></span><span>Last synced 2 minutes ago · <button>Refresh</button></span></footer>
        </div> : <DemoScreens key={activeScreen} screen={activeScreen} onNavigate={navigate} />}
      </main>
    </div>
  )
}
