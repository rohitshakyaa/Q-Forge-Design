// Landing Page + Auth screens

function LandingPage({ onEnter }) {
  const [hovered, setHovered] = React.useState(null);

  const features = [
    { icon: '⬡', color: 'var(--cyan)', title: 'PDF Intelligence', desc: 'Upload syllabus and past papers. AI extracts, classifies, and structures every question automatically.' },
    { icon: '◈', color: 'var(--indigo)', title: 'Blueprint Engine', desc: 'Define exact rules — marks distribution, unit coverage, question types — with a visual builder.' },
    { icon: '✦', color: 'var(--ai)', title: 'Hybrid Generation', desc: 'Rule-based constraints + AI fill-in. Every paper satisfies your requirements without repetition.' },
    { icon: '◎', color: 'var(--success)', title: 'Usage Tracking', desc: 'Question history prevents reuse. Full audit trail of every paper generated across all teachers.' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',overflowY:'auto',fontFamily:'var(--font-body)'}}>
      {/* Grid background */}
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,backgroundImage:`linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,backgroundSize:'48px 48px',opacity:0.4}} />
      {/* Glow orb */}
      <div style={{position:'fixed',top:'-10%',left:'30%',width:600,height:600,background:'radial-gradient(circle, oklch(0.75 0.19 196 / 0.07), transparent 70%)',pointerEvents:'none',zIndex:0}} />

      {/* Nav */}
      <nav style={{position:'relative',zIndex:10,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 48px',borderBottom:'1px solid var(--border)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,var(--cyan),var(--indigo))',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#070a10',fontFamily:'var(--font-head)'}}>Q</div>
          <span style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:700,letterSpacing:'-0.03em'}}>QForge</span>
          <QFBadge variant="cyan" style={{marginLeft:4}}>Beta</QFBadge>
        </div>
        <div style={{display:'flex',gap:8}}>
          <QFButton variant="ghost" onClick={() => onEnter('auth-login')}>Sign in</QFButton>
          <QFButton variant="primary" onClick={() => onEnter('auth-login')}>Get started →</QFButton>
        </div>
      </nav>

      {/* Hero */}
      <div style={{position:'relative',zIndex:1,textAlign:'center',padding:'100px 48px 80px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--ai-dim)',border:'1px solid oklch(0.72 0.18 230 / 0.3)',borderRadius:20,padding:'5px 14px',marginBottom:28}}>
          <span style={{color:'var(--ai)',fontSize:12}}>✦</span>
          <span style={{color:'var(--ai)',fontSize:12.5,fontWeight:500}}>AI-Powered Question Paper Generation</span>
        </div>
        <h1 style={{fontFamily:'var(--font-head)',fontSize:58,fontWeight:800,lineHeight:1.08,letterSpacing:'-0.04em',marginBottom:24,maxWidth:820,margin:'0 auto 24px'}}>
          Generate exam papers<br />
          <span style={{background:'linear-gradient(135deg, var(--cyan), var(--indigo))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>without the guesswork</span>
        </h1>
        <p style={{fontSize:18,color:'var(--text2)',maxWidth:520,margin:'0 auto 40px',lineHeight:1.7}}>
          Transform your syllabus and past papers into an intelligent question bank. Build blueprints. Generate perfectly structured exam papers in seconds.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <QFButton variant="primary" size="lg" onClick={() => onEnter('auth-login')} icon={<span>→</span>} style={{fontSize:16,padding:'12px 28px'}}>
            Start for free
          </QFButton>
          <QFButton variant="secondary" size="lg" onClick={() => onEnter('auth-login')} style={{fontSize:16,padding:'12px 28px'}}>
            View demo
          </QFButton>
        </div>
      </div>

      {/* Role cards */}
      <div style={{position:'relative',zIndex:1,display:'flex',gap:20,justifyContent:'center',padding:'0 48px 80px',flexWrap:'wrap'}}>
        {[
          { role:'Administrator', icon:'🛡', color:'var(--cyan)', desc:'Manage question banks, users, and AI processing. Full system control.', action:'Admin portal →' },
          { role:'Teacher', icon:'✏', color:'var(--indigo)', desc:'Build blueprints, generate papers, track usage, export results.', action:'Teacher portal →' }
        ].map(r => (
          <div key={r.role}
            onMouseEnter={() => setHovered(r.role)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onEnter('auth-login')}
            style={{
              background:'var(--bg1)',
              border:`1px solid ${hovered===r.role ? r.color : 'var(--border)'}`,
              borderRadius:'var(--radius-lg)',
              padding:'32px 36px',
              maxWidth:320,
              cursor:'pointer',
              transition:'all 0.2s',
              boxShadow: hovered===r.role ? `0 0 30px ${r.color}20` : 'none'
            }}>
            <div style={{fontSize:36,marginBottom:16}}>{r.icon}</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:700,marginBottom:10,color:'var(--text)'}}>{r.role}</div>
            <p style={{color:'var(--text2)',fontSize:13.5,lineHeight:1.6,marginBottom:20}}>{r.desc}</p>
            <span style={{color:r.color,fontSize:13,fontWeight:600}}>{r.action}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{position:'relative',zIndex:1,padding:'0 48px 80px',maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h2 style={{fontFamily:'var(--font-head)',fontSize:32,fontWeight:700,letterSpacing:'-0.03em',marginBottom:12}}>Everything you need</h2>
          <p style={{color:'var(--text2)',fontSize:15}}>End-to-end question paper management for modern academic institutions</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
          {features.map(f => (
            <div key={f.title} style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'24px'}}>
              <div style={{fontSize:24,marginBottom:14,color:f.color}}>{f.icon}</div>
              <div style={{fontFamily:'var(--font-head)',fontSize:15,fontWeight:600,marginBottom:8}}>{f.title}</div>
              <p style={{color:'var(--text2)',fontSize:13,lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{position:'relative',zIndex:1,borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',background:'var(--bg1)',padding:'32px 48px',display:'flex',justifyContent:'center',gap:64,flexWrap:'wrap'}}>
        {[['10,000+','Questions extracted'],['98%','Blueprint satisfaction'],['< 3s','Generation time'],['100%','Constraint accuracy']].map(([val,lbl]) => (
          <div key={lbl} style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-head)',fontSize:28,fontWeight:800,color:'var(--cyan)',letterSpacing:'-0.03em'}}>{val}</div>
            <div style={{color:'var(--text3)',fontSize:12.5,marginTop:4}}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthPage({ onAuth }) {
  const [mode, setMode] = React.useState('login'); // login | signup
  const [role, setRole] = React.useState('teacher');
  const [step, setStep] = React.useState(1); // 1: credentials, 2: role select (signup)
  const [form, setForm] = React.useState({ email:'', password:'', name:'' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError('Please fill in all required fields.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth(role);
    }, 1200);
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',background:'var(--bg)'}}>
      {/* Left panel */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:40,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,backgroundSize:'40px 40px',opacity:0.3}} />
        <div style={{position:'absolute',top:'20%',left:'10%',width:400,height:400,background:'radial-gradient(circle, oklch(0.75 0.19 196 / 0.1), transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:400}}>
          <div style={{marginBottom:40}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:20}}>
              <div style={{width:40,height:40,background:'linear-gradient(135deg,var(--cyan),var(--indigo))',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:800,color:'#070a10',fontFamily:'var(--font-head)'}}>Q</div>
              <span style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700}}>QForge</span>
            </div>
            <h2 style={{fontFamily:'var(--font-head)',fontSize:28,fontWeight:700,marginBottom:12,letterSpacing:'-0.03em'}}>
              {mode==='login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{color:'var(--text2)',fontSize:14}}>Smart question paper generation for educators</p>
          </div>

          {/* Role select */}
          <div style={{display:'flex',gap:8,marginBottom:24,background:'var(--bg2)',padding:4,borderRadius:'var(--radius)'}}>
            {['teacher','admin'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{flex:1,padding:'8px',border:'none',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:600,transition:'all 0.15s',background:role===r?'var(--bg1)':'transparent',color:role===r?'var(--text)':'var(--text3)',boxShadow:role===r?'0 1px 4px #0004':'none',fontFamily:'var(--font-body)'}}>
                {r==='teacher'?'Teacher':'Administrator'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:20}}>
            {mode==='signup' && (
              <QFInput label="Full name" placeholder="Dr. Sarah Johnson" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
            )}
            <QFInput label="Email address" placeholder="you@institution.edu" type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
            <QFInput label="Password" placeholder="••••••••" type="password" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} />
          </div>

          {error && <div style={{background:'var(--danger-dim)',border:'1px solid var(--danger)',borderRadius:'var(--radius)',padding:'10px 14px',color:'var(--danger)',fontSize:13,marginBottom:16,textAlign:'left'}}>{error}</div>}

          <QFButton variant="primary" onClick={handleSubmit} disabled={loading} style={{width:'100%',justifyContent:'center',padding:'11px',fontSize:15}}>
            {loading ? <><QFSpinner size={16}/> Authenticating…</> : mode==='login' ? `Sign in as ${role==='admin'?'Administrator':'Teacher'}` : 'Create account'}
          </QFButton>

          <div style={{marginTop:20,color:'var(--text3)',fontSize:13}}>
            {mode==='login' ? "Don't have an account? " : 'Already have an account? '}
            <span style={{color:'var(--cyan)',cursor:'pointer',fontWeight:500}} onClick={()=>setMode(mode==='login'?'signup':'login')}>
              {mode==='login' ? 'Sign up' : 'Sign in'}
            </span>
          </div>
        </div>
      </div>

      {/* Right panel - visual */}
      <div style={{width:420,background:'var(--bg1)',borderLeft:'1px solid var(--border)',display:'flex',flexDirection:'column',justifyContent:'center',padding:48,gap:20}}>
        <div style={{marginBottom:8}}>
          <div style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>System activity</div>
          {[
            {label:'Questions processed today',val:'1,247',color:'var(--cyan)',icon:'◈'},
            {label:'Papers generated',val:'38',color:'var(--indigo)',icon:'◉'},
            {label:'AI suggestions accepted',val:'94%',color:'var(--success)',icon:'✦'},
            {label:'Active blueprints',val:'12',color:'var(--warn)',icon:'⬡'},
          ].map(s => (
            <div key={s.label} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:32,height:32,background:`${s.color}18`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:s.color,fontSize:14,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:'var(--text3)'}}>{s.label}</div>
                <div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:700,color:s.color}}>{s.val}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:16,border:'1px solid var(--border)'}}>
          <div style={{fontSize:11,color:'var(--text3)',marginBottom:10,textTransform:'uppercase',letterSpacing:'0.08em',fontWeight:600}}>Latest generation</div>
          <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:4}}>Advanced Mathematics — Final Exam</div>
          <div style={{color:'var(--text3)',fontSize:12.5,marginBottom:10}}>28 questions · 100 marks · 3 units covered</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            <QFBadge variant="success">All constraints met</QFBadge>
            <QFBadge variant="ai">✦ AI assisted</QFBadge>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LandingPage, AuthPage });
