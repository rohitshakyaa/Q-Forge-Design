// Main App — routing, sidebar, tweaks panel

const ADMIN_NAV = [
  { label: null, items: [
    { id:'admin-dashboard', icon:'⬡', label:'Dashboard' },
  ]},
  { label: 'Content', items: [
    { id:'admin-upload', icon:'⬆', label:'PDF Upload', badge:'2' },
    { id:'admin-extraction', icon:'◈', label:'Review Queue', badge:'3' },
    { id:'admin-question-bank', icon:'◉', label:'Question Bank' },
  ]},
  { label: 'Management', items: [
    { id:'admin-subjects', icon:'⊞', label:'Subjects & Units' },
    { id:'admin-users', icon:'◎', label:'Users & Roles' },
  ]},
];

const TEACHER_NAV = [
  { label: null, items: [
    { id:'teacher-dashboard', icon:'⬡', label:'Dashboard' },
  ]},
  { label: 'Papers', items: [
    { id:'teacher-blueprint', icon:'⬢', label:'Blueprint Builder' },
    { id:'teacher-generate', icon:'✦', label:'Generate Paper' },
  ]},
  { label: 'Records', items: [
    { id:'teacher-history', icon:'◎', label:'History & Analytics' },
  ]},
];

function TweaksPanel({ tweaks, setTweaks }) {
  return (
    <div style={{position:'fixed',bottom:24,right:24,width:260,background:'var(--bg1)',border:'1px solid var(--border2)',borderRadius:'var(--radius-lg)',padding:'16px',zIndex:500,boxShadow:'0 8px 32px #00000060',fontFamily:'var(--font-body)'}}>
      <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:13,marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        Tweaks
        <QFBadge variant="ai">Live</QFBadge>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <div className="qf-field">
          <label className="qf-label">Accent Color</label>
          <div style={{display:'flex',gap:8,marginTop:2}}>
            {[['cyan','oklch(0.75 0.19 196)'],['violet','oklch(0.65 0.2 290)'],['emerald','oklch(0.72 0.16 152)'],['amber','oklch(0.78 0.15 70)']].map(([name,val])=>(
              <div key={name} onClick={()=>setTweaks(t=>({...t,accent:name}))} title={name}
                style={{width:24,height:24,borderRadius:'50%',background:val,cursor:'pointer',border:`2px solid ${tweaks.accent===name?'white':'transparent'}`,transition:'transform 0.15s',transform:tweaks.accent===name?'scale(1.2)':'scale(1)'}} />
            ))}
          </div>
        </div>
        <div className="qf-field">
          <label className="qf-label">Sidebar Width</label>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="range" min={200} max={280} value={tweaks.sidebarWidth} onChange={e=>setTweaks(t=>({...t,sidebarWidth:+e.target.value}))} style={{flex:1,accentColor:'var(--cyan)'}} />
            <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--cyan)',minWidth:32}}>{tweaks.sidebarWidth}</span>
          </div>
        </div>
        <div className="qf-field">
          <label className="qf-label">Density</label>
          <div style={{display:'flex',gap:6}}>
            {['compact','default','relaxed'].map(d=>(
              <button key={d} onClick={()=>setTweaks(t=>({...t,density:d}))} style={{flex:1,padding:'5px 0',fontSize:11.5,fontFamily:'var(--font-body)',border:`1px solid ${tweaks.density===d?'var(--cyan)':'var(--border)'}`,borderRadius:6,background:tweaks.density===d?'var(--cyan-dim)':'var(--bg2)',color:tweaks.density===d?'var(--cyan)':'var(--text3)',cursor:'pointer',textTransform:'capitalize',transition:'all 0.15s'}}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <label style={{fontSize:12.5,color:'var(--text2)',cursor:'pointer'}} htmlFor="tw-glow">Glow effects</label>
          <div onClick={()=>setTweaks(t=>({...t,glow:!t.glow}))} id="tw-glow" style={{width:36,height:20,background:tweaks.glow?'var(--cyan)':'var(--bg3)',borderRadius:10,cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
            <div style={{position:'absolute',top:2,left:tweaks.glow?16:2,width:16,height:16,background:'white',borderRadius:'50%',transition:'left 0.2s'}} />
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <label style={{fontSize:12.5,color:'var(--text2)',cursor:'pointer'}} htmlFor="tw-mono">Monospace numbers</label>
          <div onClick={()=>setTweaks(t=>({...t,monoNums:!t.monoNums}))} id="tw-mono" style={{width:36,height:20,background:tweaks.monoNums?'var(--cyan)':'var(--bg3)',borderRadius:10,cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
            <div style={{position:'absolute',top:2,left:tweaks.monoNums?16:2,width:16,height:16,background:'white',borderRadius:'50%',transition:'left 0.2s'}} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ screen, role, onLogout, onNav }) {
  const screenLabels = {
    'admin-dashboard':'Dashboard','admin-upload':'PDF Upload','admin-extraction':'Review Queue',
    'admin-question-bank':'Question Bank','admin-subjects':'Subjects & Units','admin-users':'Users & Roles',
    'teacher-dashboard':'Dashboard','teacher-blueprint':'Blueprint Builder','teacher-generate':'Generate Paper',
    'teacher-paper-view':'Paper View','teacher-export':'Export','teacher-history':'History',
  };
  const label = screenLabels[screen] || screen;

  return (
    <div className="qf-topbar">
      <div style={{display:'flex',alignItems:'center',gap:6,flex:1}}>
        <span style={{color:'var(--text3)',fontSize:12.5}}>{role==='admin'?'Admin':'Teacher'}</span>
        <span style={{color:'var(--text3)'}}>›</span>
        <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{label}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:6,padding:'5px 12px',background:'var(--ai-dim)',border:'1px solid oklch(0.72 0.18 230/0.25)',borderRadius:20}}>
          <span style={{color:'var(--ai)',fontSize:12}} className="qf-ai-working">✦</span>
          <span style={{color:'var(--ai)',fontSize:12,fontWeight:500}}>AI Active</span>
        </div>
        <QFButton variant="ghost" size="sm" onClick={onLogout}>Sign out</QFButton>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = React.useState(() => localStorage.getItem('qf_screen') || 'landing');
  const [role, setRole] = React.useState(() => localStorage.getItem('qf_role') || null);
  const [showTweaks, setShowTweaks] = React.useState(false);
  const [tweaks, setTweaks] = React.useState({
    accent: 'cyan', sidebarWidth: 240, density: 'default', glow: true, monoNums: true
  });

  const nav = (s) => {
    setScreen(s);
    localStorage.setItem('qf_screen', s);
  };

  const handleAuth = (r) => {
    setRole(r);
    localStorage.setItem('qf_role', r);
    nav(r === 'admin' ? 'admin-dashboard' : 'teacher-dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('qf_role');
    localStorage.removeItem('qf_screen');
    nav('landing');
  };

  // Apply tweaks to CSS vars
  React.useEffect(() => {
    const accentMap = {
      cyan:    ['oklch(0.75 0.19 196)', 'oklch(0.75 0.19 196 / 0.15)', 'oklch(0.75 0.19 196 / 0.35)'],
      violet:  ['oklch(0.65 0.2 290)',  'oklch(0.65 0.2 290 / 0.15)',  'oklch(0.65 0.2 290 / 0.35)'],
      emerald: ['oklch(0.72 0.16 152)', 'oklch(0.72 0.16 152 / 0.15)', 'oklch(0.72 0.16 152 / 0.35)'],
      amber:   ['oklch(0.78 0.15 70)',  'oklch(0.78 0.15 70 / 0.15)',  'oklch(0.78 0.15 70 / 0.35)'],
    };
    const [c, cd, cg] = accentMap[tweaks.accent] || accentMap.cyan;
    document.documentElement.style.setProperty('--cyan', c);
    document.documentElement.style.setProperty('--cyan-dim', cd);
    document.documentElement.style.setProperty('--cyan-glow', cg);
    document.documentElement.style.setProperty('--sidebar-w', tweaks.sidebarWidth + 'px');
    const pad = tweaks.density === 'compact' ? '18px 22px' : tweaks.density === 'relaxed' ? '36px 40px' : '28px 32px';
    document.querySelectorAll('.qf-content').forEach(el => el.style.padding = pad);
  }, [tweaks]);

  // Tweaks toggle listener
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Full-screen pages (no shell)
  if (screen === 'landing') return <><QFStyles /><LandingPage onEnter={nav} /></>;
  if (screen === 'auth-login' || screen === 'auth') return <><QFStyles /><AuthPage onAuth={handleAuth} /></>;

  const navItems = role === 'admin' ? ADMIN_NAV : TEACHER_NAV;

  const renderScreen = () => {
    const props = { onNav: nav };
    switch (screen) {
      // Admin
      case 'admin-dashboard':     return <AdminDashboard {...props} />;
      case 'admin-upload':        return <AdminUpload {...props} />;
      case 'admin-extraction':    return <AdminExtraction {...props} />;
      case 'admin-question-bank': return <AdminQuestionBank {...props} />;
      case 'admin-subjects':      return <AdminSubjects {...props} />;
      case 'admin-users':         return <AdminUsers {...props} />;
      // Teacher
      case 'teacher-dashboard':   return <TeacherDashboard {...props} />;
      case 'teacher-blueprint':   return <BlueprintBuilder {...props} />;
      case 'teacher-generate':    return <TeacherGenerate {...props} />;
      case 'teacher-paper-view':  return <PaperView {...props} />;
      case 'teacher-export':      return <TeacherExport {...props} />;
      case 'teacher-history':     return <TeacherHistory {...props} />;
      default: return <AdminDashboard {...props} />;
    }
  };

  return (
    <>
      <QFStyles />
      <div className="qf-app">
        <TopBar screen={screen} role={role} onLogout={handleLogout} onNav={nav} />
        <div className="qf-layout">
          <QFSidebarNav items={navItems} active={screen} onNav={nav} role={role} />
          <div className="qf-main">
            {renderScreen()}
          </div>
        </div>
      </div>
      {showTweaks && <TweaksPanel tweaks={tweaks} setTweaks={(fn) => {
        setTweaks(prev => {
          const next = typeof fn === 'function' ? fn(prev) : fn;
          window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
          return next;
        });
      }} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
