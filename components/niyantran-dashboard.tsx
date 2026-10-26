'use client'

import { useMemo, useState } from 'react'
import DemoScreens from './niyantran-demo-screens'
import RoleDashboard, { roleNavigation } from './niyantran-role-dashboard'
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
  const changeRole = (next: string) => { setRole(next); setActiveScreen('Overview'); setNoticeOpen(false) }
  const allowedScreens = roleNavigation[role] || roleNavigation['Regional Office Officer']
  const [search, setSearch] = useState('')
  const [taskFilter, setTaskFilter] = useState('All tasks')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  const filteredTasks = useMemo(() => tasks.filter((task) => !completed.includes(task.id) && (taskFilter === 'All tasks' || task.priority === taskFilter) && `${task.id} ${task.institution} ${task.action}`.toLowerCase().includes(search.toLowerCase())), [completed, search, taskFilter])

  return (
    <div className="niyantran-shell">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="brand"><div className="brand-mark"><img src="/niyantran-mark.svg" alt="Niyantran" width={28} height={28}/></div>{!collapsed && <div><strong>niyantran</strong><span>AICTE CONTROL LAYER</span></div>}</div>
        <div className="workspace"><span className="workspace-dot" />{!collapsed && <><span>Niyantran · Demo</span><ChevronDown size={14} /></>}</div>
        <nav className="nav-list" aria-label="Primary navigation">
          {!collapsed && <div className="nav-label">WORKSPACE</div>}
          {nav.filter(item => allowedScreens.includes(item.label)).map(({ label, icon: Icon, badge, critical }) => <button key={label} className={`nav-item ${label === activeScreen ? 'active' : ''}`} onClick={() => navigate(label)} title={collapsed ? label : undefined}><Icon size={16} strokeWidth={1.8} />{!collapsed && <><span>{label}</span>{badge && <span className={`nav-badge ${critical ? 'critical' : ''}`}>{badge}</span>}</>}</button>)}
          {!collapsed && <div className="nav-label admin-label">ADMINISTRATION</div>}
          {adminNav.filter(item => allowedScreens.includes(item.label)).map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${label === activeScreen ? 'active' : ''}`} onClick={() => navigate(label)} title={collapsed ? label : undefined}><Icon size={16} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className={`nav-item ${activeScreen === 'Settings' ? 'active' : ''}`} onClick={() => navigate('Settings')}><Settings size={16} />{!collapsed && <span>Settings</span>}</button><button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={16} /> : <><PanelLeftClose size={16} /><span>Collapse sidebar</span></>}</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><button className="mobile-menu" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle navigation"><Menu size={18} /></button><span>Workspace</span><span className="slash">/</span><strong>{activeScreen}</strong></div><div className="top-actions"><label className="role-select global-role-select"><Users size={14}/><select value={role} onChange={e => changeRole(e.target.value)} aria-label="Switch demo role"><option>Regional Office Officer</option><option>AICTE Leadership</option><option>Scrutiny / Committee Member</option><option>Institution Representative</option><option>EVC / Field Officer</option></select></label><label className="search-box"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></label><button className="icon-btn" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Notifications"><Bell size={17} /><i /></button><div className="avatar">AS</div></div>{noticeOpen && <div className="notification-popover"><strong>Notifications</strong><span>3 escalations require attention</span><span>2 new documents received</span></div>}</header>
        {activeScreen === 'Overview' ? <RoleDashboard key={role} role={role} onNavigate={navigate} /> : <DemoScreens key={activeScreen} screen={activeScreen} onNavigate={navigate} />}
      </main>
    </div>
  )
}
