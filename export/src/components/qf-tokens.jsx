// QForge Design System — Shared tokens & components
// Injects CSS vars, exports: QFButton, QFBadge, QFInput, QFSelect, QFCard,
// QFModal, QFTopBar, QFSidebar, QFEmptyState, QFSpinner, QFProgress, QFAvatar

const QF_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #070a10;
    --bg1:      #0d1119;
    --bg2:      #121826;
    --bg3:      #18202f;
    --border:   #1e2840;
    --border2:  #253049;
    --text:     #dde4ef;
    --text2:    #8896aa;
    --text3:    #4e5e74;
    --cyan:     oklch(0.75 0.19 196);
    --cyan-dim: oklch(0.75 0.19 196 / 0.15);
    --cyan-glow:oklch(0.75 0.19 196 / 0.35);
    --indigo:   oklch(0.62 0.22 265);
    --indigo-dim:oklch(0.62 0.22 265 / 0.15);
    --violet:   oklch(0.65 0.2 290);
    --success:  oklch(0.72 0.16 152);
    --success-dim:oklch(0.72 0.16 152 / 0.12);
    --warn:     oklch(0.78 0.15 70);
    --warn-dim: oklch(0.78 0.15 70 / 0.12);
    --danger:   oklch(0.65 0.2 25);
    --danger-dim:oklch(0.65 0.2 25 / 0.12);
    --ai:       oklch(0.72 0.18 230);
    --ai-dim:   oklch(0.72 0.18 230 / 0.12);
    --radius:   8px;
    --radius-lg:14px;
    --sidebar-w:240px;
    --topbar-h: 56px;
    --font-head:'Space Grotesk', sans-serif;
    --font-body:'Inter', sans-serif;
    --font-mono:'JetBrains Mono', monospace;
  }

  html, body { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-body); font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
  #root { height: 100%; }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--text3); }

  .qf-app { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

  /* Topbar */
  .qf-topbar { height: var(--topbar-h); background: var(--bg1); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 20px; gap: 12px; flex-shrink: 0; z-index: 100; }

  /* Layout */
  .qf-layout { display: flex; flex: 1; overflow: hidden; }
  .qf-sidebar { width: var(--sidebar-w); background: var(--bg1); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; overflow-y: auto; padding: 12px 0; }
  .qf-main { flex: 1; overflow-y: auto; background: var(--bg); }
  .qf-content { padding: 28px 32px; max-width: 1400px; }

  /* Nav items */
  .qf-nav-section { padding: 4px 12px 2px; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: var(--text3); text-transform: uppercase; margin-top: 12px; }
  .qf-nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 14px; margin: 1px 8px; border-radius: var(--radius); cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 500; transition: all 0.15s; user-select: none; }
  .qf-nav-item:hover { background: var(--bg3); color: var(--text); }
  .qf-nav-item.active { background: var(--cyan-dim); color: var(--cyan); }
  .qf-nav-item .nav-icon { width: 18px; height: 18px; opacity: 0.8; flex-shrink: 0; }
  .qf-nav-item.active .nav-icon { opacity: 1; }
  .qf-nav-badge { margin-left: auto; background: var(--cyan-dim); color: var(--cyan); font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 10px; }

  /* Buttons */
  .qf-btn { display: inline-flex; align-items: center; gap: 7px; padding: 7px 16px; border-radius: var(--radius); font-family: var(--font-body); font-size: 13.5px; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; white-space: nowrap; }
  .qf-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .qf-btn-primary { background: var(--cyan); color: #070a10; border-color: var(--cyan); }
  .qf-btn-primary:hover:not(:disabled) { filter: brightness(1.1); box-shadow: 0 0 16px var(--cyan-glow); }
  .qf-btn-secondary { background: var(--bg3); color: var(--text); border-color: var(--border2); }
  .qf-btn-secondary:hover:not(:disabled) { background: var(--bg2); border-color: var(--text3); }
  .qf-btn-ghost { background: transparent; color: var(--text2); border-color: transparent; }
  .qf-btn-ghost:hover:not(:disabled) { background: var(--bg3); color: var(--text); }
  .qf-btn-danger { background: var(--danger-dim); color: var(--danger); border-color: var(--danger); }
  .qf-btn-danger:hover:not(:disabled) { background: var(--danger); color: white; }
  .qf-btn-ai { background: linear-gradient(135deg, oklch(0.62 0.22 265 / 0.2), oklch(0.72 0.18 230 / 0.2)); color: var(--ai); border-color: oklch(0.72 0.18 230 / 0.4); }
  .qf-btn-ai:hover:not(:disabled) { border-color: var(--ai); box-shadow: 0 0 16px oklch(0.72 0.18 230 / 0.25); }
  .qf-btn-sm { padding: 5px 11px; font-size: 12.5px; }
  .qf-btn-lg { padding: 10px 22px; font-size: 15px; }
  .qf-btn-icon { padding: 7px; }

  /* Badges */
  .qf-badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
  .qf-badge-cyan { background: var(--cyan-dim); color: var(--cyan); }
  .qf-badge-indigo { background: var(--indigo-dim); color: var(--indigo); }
  .qf-badge-success { background: var(--success-dim); color: var(--success); }
  .qf-badge-warn { background: var(--warn-dim); color: var(--warn); }
  .qf-badge-danger { background: var(--danger-dim); color: var(--danger); }
  .qf-badge-ai { background: var(--ai-dim); color: var(--ai); }
  .qf-badge-neutral { background: var(--bg3); color: var(--text2); }

  /* Cards */
  .qf-card { background: var(--bg1); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .qf-card-header { padding: 18px 20px 0; }
  .qf-card-body { padding: 18px 20px; }
  .qf-card-footer { padding: 0 20px 16px; border-top: 1px solid var(--border); padding-top: 14px; }
  .qf-card.glow { box-shadow: 0 0 30px oklch(0.75 0.19 196 / 0.06); }

  /* Inputs */
  .qf-field { display: flex; flex-direction: column; gap: 6px; }
  .qf-label { font-size: 12.5px; font-weight: 500; color: var(--text2); }
  .qf-input { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 12px; font-family: var(--font-body); font-size: 13.5px; color: var(--text); outline: none; transition: border-color 0.15s, box-shadow 0.15s; width: 100%; }
  .qf-input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px var(--cyan-dim); }
  .qf-input::placeholder { color: var(--text3); }
  .qf-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238896aa' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; cursor: pointer; }
  .qf-textarea { resize: vertical; min-height: 80px; }

  /* Table */
  .qf-table { width: 100%; border-collapse: collapse; }
  .qf-table th { text-align: left; padding: 10px 14px; font-size: 11.5px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid var(--border); white-space: nowrap; }
  .qf-table td { padding: 12px 14px; font-size: 13.5px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .qf-table tr:last-child td { border-bottom: none; }
  .qf-table tr:hover td { background: var(--bg2); }

  /* Tabs */
  .qf-tabs { display: flex; gap: 2px; background: var(--bg2); border-radius: var(--radius); padding: 3px; }
  .qf-tab { padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; color: var(--text2); transition: all 0.15s; }
  .qf-tab.active { background: var(--bg1); color: var(--text); box-shadow: 0 1px 4px #0004; }
  .qf-tab:hover:not(.active) { color: var(--text); }

  /* Progress */
  .qf-progress-track { height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; }
  .qf-progress-bar { height: 100%; background: var(--cyan); border-radius: 2px; transition: width 0.4s ease; }
  .qf-progress-bar.ai { background: linear-gradient(90deg, var(--indigo), var(--cyan)); }

  /* Spinner */
  @keyframes qf-spin { to { transform: rotate(360deg); } }
  .qf-spinner { width: 18px; height: 18px; border: 2px solid var(--border2); border-top-color: var(--cyan); border-radius: 50%; animation: qf-spin 0.7s linear infinite; }

  /* Modal */
  .qf-modal-overlay { position: fixed; inset: 0; background: #00000088; backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
  .qf-modal { background: var(--bg1); border: 1px solid var(--border2); border-radius: var(--radius-lg); width: 90%; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 64px #00000080; }
  .qf-modal-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .qf-modal-body { padding: 20px 24px; }
  .qf-modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; justify-content: flex-end; }

  /* Avatar */
  .qf-avatar { border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; font-family: var(--font-head); }

  /* Stat card */
  .qf-stat { background: var(--bg1); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; }
  .qf-stat-label { font-size: 12px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  .qf-stat-value { font-family: var(--font-head); font-size: 28px; font-weight: 700; color: var(--text); line-height: 1; }
  .qf-stat-sub { font-size: 12px; color: var(--text3); margin-top: 6px; }

  /* Divider */
  .qf-divider { height: 1px; background: var(--border); margin: 16px 0; }

  /* Glow dot */
  .qf-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  /* Chip */
  .qf-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 20px; font-size: 12px; color: var(--text2); }

  /* AI hint */
  .qf-ai-hint { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background: var(--ai-dim); border: 1px solid oklch(0.72 0.18 230 / 0.25); border-radius: var(--radius); }
  .qf-ai-hint-text { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .qf-ai-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  /* Dropzone */
  .qf-dropzone { border: 2px dashed var(--border2); border-radius: var(--radius-lg); padding: 48px 32px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: all 0.2s; text-align: center; }
  .qf-dropzone:hover, .qf-dropzone.dragover { border-color: var(--cyan); background: var(--cyan-dim); }

  /* Step indicator */
  .qf-steps { display: flex; align-items: center; gap: 0; }
  .qf-step { display: flex; align-items: center; gap: 8px; }
  .qf-step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; border: 2px solid var(--border); color: var(--text3); background: var(--bg2); flex-shrink: 0; transition: all 0.2s; }
  .qf-step-circle.active { border-color: var(--cyan); color: var(--cyan); background: var(--cyan-dim); }
  .qf-step-circle.done { border-color: var(--success); background: var(--success-dim); color: var(--success); }
  .qf-step-label { font-size: 12.5px; font-weight: 500; color: var(--text3); }
  .qf-step-label.active { color: var(--text); }
  .qf-step-connector { width: 40px; height: 2px; background: var(--border); margin: 0 8px; }
  .qf-step-connector.done { background: var(--success); }

  /* Tooltip */
  .qf-tooltip-wrap { position: relative; }
  .qf-tooltip-wrap:hover .qf-tooltip { opacity: 1; pointer-events: auto; }
  .qf-tooltip { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: var(--bg3); border: 1px solid var(--border2); border-radius: 6px; padding: 5px 10px; font-size: 12px; color: var(--text2); white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.15s; z-index: 999; }

  /* Animations */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 var(--cyan-glow); } 50% { box-shadow: 0 0 12px 4px var(--cyan-glow); } }
  @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
  .qf-skeleton { background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: var(--radius); }
  .qf-anim-in { animation: fadeIn 0.25s ease; }

  @keyframes ai-pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
  .qf-ai-working { animation: ai-pulse 1.5s ease infinite; }

  .text-cyan { color: var(--cyan); }
  .text-indigo { color: var(--indigo); }
  .text-muted { color: var(--text2); }
  .text-faint { color: var(--text3); }
  .font-head { font-family: var(--font-head); }
  .font-mono { font-family: var(--font-mono); }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .flex { display: flex; }
  .flex-col { display: flex; flex-direction: column; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-between { justify-content: space-between; }
  .justify-end { justify-content: flex-end; }
  .gap-2 { gap: 8px; }
  .gap-3 { gap: 12px; }
  .gap-4 { gap: 16px; }
  .gap-5 { gap: 20px; }
  .mb-1 { margin-bottom: 4px; }
  .mb-2 { margin-bottom: 8px; }
  .mb-3 { margin-bottom: 12px; }
  .mb-4 { margin-bottom: 16px; }
  .mb-5 { margin-bottom: 20px; }
  .mb-6 { margin-bottom: 24px; }
  .mt-4 { margin-top: 16px; }
  .mt-5 { margin-top: 20px; }
  .w-full { width: 100%; }
`;

function QFStyles() {
  return React.createElement('style', null, QF_STYLE);
}

function QFButton({ variant='primary', size='', icon, children, onClick, disabled, style, className='' }) {
  const cls = ['qf-btn', `qf-btn-${variant}`, size && `qf-btn-${size}`, className].filter(Boolean).join(' ');
  return (
    <button className={cls} onClick={onClick} disabled={disabled} style={style}>
      {icon && <span style={{display:'flex',alignItems:'center'}}>{icon}</span>}
      {children}
    </button>
  );
}

function QFBadge({ variant='neutral', children, dot }) {
  return (
    <span className={`qf-badge qf-badge-${variant}`}>
      {dot && <span className="qf-dot" style={{background:'currentColor'}} />}
      {children}
    </span>
  );
}

function QFInput({ label, placeholder, value, onChange, type='text', className='', style, rows, hint }) {
  const isTA = type === 'textarea';
  return (
    <div className="qf-field" style={style}>
      {label && <label className="qf-label">{label}</label>}
      {isTA
        ? <textarea className="qf-input qf-textarea" placeholder={placeholder} value={value} onChange={onChange} rows={rows||4} />
        : <input className="qf-input" type={type} placeholder={placeholder} value={value} onChange={onChange} />
      }
      {hint && <span style={{fontSize:12,color:'var(--text3)'}}>{hint}</span>}
    </div>
  );
}

function QFSelect({ label, value, onChange, options, style }) {
  return (
    <div className="qf-field" style={style}>
      {label && <label className="qf-label">{label}</label>}
      <select className="qf-input qf-select" value={value} onChange={onChange}>
        {options.map(o => <option key={o.value??o} value={o.value??o}>{o.label??o}</option>)}
      </select>
    </div>
  );
}

function QFCard({ children, style, className='', glow }) {
  return <div className={`qf-card${glow?' glow':''} ${className}`} style={style}>{children}</div>;
}

function QFModal({ open, onClose, title, children, footer, width=520 }) {
  if (!open) return null;
  return (
    <div className="qf-modal-overlay" onClick={e => e.target===e.currentTarget && onClose?.()}>
      <div className="qf-modal qf-anim-in" style={{width}}>
        <div className="qf-modal-header">
          <span style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:16}}>{title}</span>
          <button className="qf-btn qf-btn-ghost qf-btn-icon" onClick={onClose} style={{fontSize:18,lineHeight:1}}>×</button>
        </div>
        <div className="qf-modal-body">{children}</div>
        {footer && <div className="qf-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function QFSpinner({ size=18 }) {
  return <div className="qf-spinner" style={{width:size,height:size}} />;
}

function QFProgress({ value=0, ai, label }) {
  return (
    <div>
      {label && <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
        <span style={{fontSize:12.5,color:'var(--text2)'}}>{label}</span>
        <span style={{fontSize:12,color:'var(--text3)',fontFamily:'var(--font-mono)'}}>{value}%</span>
      </div>}
      <div className="qf-progress-track">
        <div className={`qf-progress-bar${ai?' ai':''}`} style={{width:`${value}%`}} />
      </div>
    </div>
  );
}

function QFAvatar({ name='?', size=32, color='var(--cyan)' }) {
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return (
    <div className="qf-avatar" style={{width:size,height:size,background:`${color}22`,color,fontSize:size*0.38,border:`1.5px solid ${color}44`}}>
      {initials}
    </div>
  );
}

function QFAIHint({ children }) {
  return (
    <div className="qf-ai-hint">
      <span className="qf-ai-icon">✦</span>
      <span className="qf-ai-hint-text">{children}</span>
    </div>
  );
}

function QFEmptyState({ icon, title, desc, action }) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 32px',gap:12,textAlign:'center'}}>
      <div style={{fontSize:40,opacity:0.3}}>{icon||'📄'}</div>
      <div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:600,color:'var(--text2)'}}>{title}</div>
      {desc && <div style={{fontSize:13.5,color:'var(--text3)',maxWidth:360}}>{desc}</div>}
      {action}
    </div>
  );
}

function QFPageHeader({ title, subtitle, actions, back, onBack }) {
  return (
    <div style={{marginBottom:24}}>
      {back && <button className="qf-btn qf-btn-ghost qf-btn-sm" onClick={onBack} style={{marginBottom:10,paddingLeft:0,color:'var(--text3)'}}>
        ← {back}
      </button>}
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:16}}>
        <div>
          <h1 style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,color:'var(--text)',lineHeight:1.2}}>{title}</h1>
          {subtitle && <p style={{color:'var(--text3)',fontSize:13.5,marginTop:4}}>{subtitle}</p>}
        </div>
        {actions && <div style={{display:'flex',gap:8,flexShrink:0}}>{actions}</div>}
      </div>
    </div>
  );
}

function QFSteps({ steps, current }) {
  return (
    <div className="qf-steps">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="qf-step">
            <div className={`qf-step-circle ${i < current ? 'done' : i === current ? 'active' : ''}`}>
              {i < current ? '✓' : i+1}
            </div>
            <span className={`qf-step-label ${i === current ? 'active' : ''}`}>{s}</span>
          </div>
          {i < steps.length-1 && <div className={`qf-step-connector ${i < current ? 'done' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function QFSidebarNav({ items, active, onNav, role }) {
  return (
    <div className="qf-sidebar">
      {/* Logo */}
      <div style={{padding:'8px 20px 16px',borderBottom:'1px solid var(--border)',marginBottom:8}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:28,height:28,background:'linear-gradient(135deg,var(--cyan),var(--indigo))',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#070a10',fontFamily:'var(--font-head)'}}>Q</div>
          <span style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:700,letterSpacing:'-0.02em'}}>QForge</span>
        </div>
        <div style={{marginTop:8}}>
          <QFBadge variant={role==='admin'?'cyan':'indigo'}>{role==='admin'?'Administrator':'Teacher'}</QFBadge>
        </div>
      </div>
      {items.map((group,gi) => (
        <div key={gi}>
          {group.label && <div className="qf-nav-section">{group.label}</div>}
          {group.items.map(item => (
            <div key={item.id} className={`qf-nav-item ${active===item.id?'active':''}`} onClick={()=>onNav(item.id)}>
              <span style={{fontSize:16}}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="qf-nav-badge">{item.badge}</span>}
            </div>
          ))}
        </div>
      ))}
      <div style={{flexGrow:1}} />
      <div style={{padding:'12px 8px',borderTop:'1px solid var(--border)',marginTop:8}}>
        <div className="qf-nav-item" style={{gap:10}}>
          <QFAvatar name="User" size={24} />
          <div style={{minWidth:0}}>
            <div style={{fontSize:13,fontWeight:500,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>Profile & Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  QFStyles, QFButton, QFBadge, QFInput, QFSelect, QFCard, QFModal,
  QFSpinner, QFProgress, QFAvatar, QFAIHint, QFEmptyState, QFPageHeader,
  QFSteps, QFSidebarNav
});
