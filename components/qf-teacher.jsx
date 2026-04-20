// Teacher Screens: Dashboard, Blueprint Builder, Paper Generation, Paper View, History

function TeacherDashboard({ onNav }) {
  const recentPapers = [
    { name:'Algorithms Midterm 2024', subject:'CS302', marks:50, questions:18, date:'Apr 18', status:'exported' },
    { name:'Data Structures Quiz 3', subject:'CS301', marks:20, questions:10, date:'Apr 15', status:'saved' },
    { name:'DBMS Final Exam', subject:'CS303', marks:100, questions:32, date:'Apr 10', status:'draft' },
  ];
  const blueprints = [
    { name:'Standard Midterm', questions:20, marks:50, units:3 },
    { name:'Quick Quiz', questions:10, marks:20, units:2 },
    { name:'Comprehensive Final', questions:35, marks:100, units:'All' },
  ];
  const statusMap = { exported:{v:'success',l:'Exported'}, saved:{v:'indigo',l:'Saved'}, draft:{v:'neutral',l:'Draft'} };

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Teacher Dashboard" subtitle="Good morning, Dr. Johnson — ready to generate today's paper?" />

      {/* Quick actions */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:24}}>
        {[
          { icon:'⬡', label:'New Blueprint', desc:'Define paper structure and rules', color:'var(--cyan)', action:()=>onNav('teacher-blueprint') },
          { icon:'✦', label:'Generate Paper', desc:'From an existing blueprint', color:'var(--indigo)', action:()=>onNav('teacher-generate') },
          { icon:'◉', label:'Paper History', desc:'View and re-export past papers', color:'var(--violet)', action:()=>onNav('teacher-history') },
        ].map(q => (
          <div key={q.label} onClick={q.action} style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'18px 20px',cursor:'pointer',transition:'all 0.15s',display:'flex',alignItems:'center',gap:14}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=q.color;e.currentTarget.style.boxShadow=`0 0 20px ${q.color}15`}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='none'}}>
            <div style={{width:44,height:44,background:`${q.color}18`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:q.color,flexShrink:0}}>{q.icon}</div>
            <div>
              <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:14,marginBottom:3}}>{q.label}</div>
              <div style={{fontSize:12,color:'var(--text3)'}}>{q.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:20}}>
        {/* Recent papers */}
        <div>
          <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,marginBottom:14}}>Recent Papers</div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {recentPapers.map(p => {
              const sc = statusMap[p.status];
              return (
                <div key={p.name} onClick={()=>onNav('teacher-paper-view')} style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'14px 18px',cursor:'pointer',transition:'border-color 0.15s'}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border2)'}
                  onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>{p.name}</div>
                      <div style={{display:'flex',gap:8,fontSize:12.5,color:'var(--text3)'}}>
                        <span style={{color:'var(--cyan)',fontFamily:'var(--font-mono)'}}>{p.subject}</span>
                        <span>·</span><span>{p.questions} questions</span>
                        <span>·</span><span>{p.marks} marks</span>
                        <span>·</span><span>{p.date}</span>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <QFBadge variant={sc.v}>{sc.l}</QFBadge>
                      <QFButton variant="ghost" size="sm" onClick={e=>{e.stopPropagation();onNav('teacher-paper-view')}}>View →</QFButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Saved blueprints */}
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15}}>My Blueprints</div>
            <QFButton variant="ghost" size="sm" onClick={()=>onNav('teacher-blueprint')}>+ New</QFButton>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {blueprints.map(b => (
              <div key={b.name} style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'12px 16px',cursor:'pointer'}}
                onClick={()=>onNav('teacher-generate')}>
                <div style={{fontWeight:600,fontSize:13.5,marginBottom:6}}>{b.name}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  <span className="qf-chip">{b.questions}Q</span>
                  <span className="qf-chip">{b.marks} marks</span>
                  <span className="qf-chip">{b.units} units</span>
                </div>
              </div>
            ))}
            <div onClick={()=>onNav('teacher-blueprint')} style={{border:'2px dashed var(--border)',borderRadius:'var(--radius-lg)',padding:'14px',display:'flex',alignItems:'center',justifyContent:'center',gap:8,cursor:'pointer',color:'var(--text3)',fontSize:13,transition:'all 0.15s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)';e.currentTarget.style.color='var(--cyan)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text3)'}}>
              + Create Blueprint
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlueprintBuilder({ onNav }) {
  const [step, setStep] = React.useState(0);
  const [bp, setBp] = React.useState({
    name:'', subject:'CS302', totalMarks:50, duration:90,
    sections:[
      { id:1, name:'Section A — Short Answer', type:'Short Answer', count:5, marksEach:4, units:[], mandatory:true },
      { id:2, name:'Section B — Long Answer', type:'Long Answer', count:3, marksEach:10, units:[], mandatory:false },
    ],
    unitRules:{ 'Unit 1':true,'Unit 2':true,'Unit 3':true,'Unit 4':false,'Unit 5':false },
    exclusionRules:{ lastNPapers:2, reuseThreshold:3 },
    aiAssist:true
  });

  const totalAssigned = bp.sections.reduce((s,sec) => s + sec.count * sec.marksEach, 0);
  const deficit = bp.totalMarks - totalAssigned;
  const steps = ['Basics','Sections','Unit Rules','Constraints','Review'];

  const updateSection = (id, key, val) => setBp(p => ({...p, sections: p.sections.map(s => s.id===id ? {...s, [key]:val} : s)}));
  const addSection = () => setBp(p => ({...p, sections:[...p.sections, {id:Date.now(), name:'New Section', type:'Short Answer', count:2, marksEach:5, units:[], mandatory:false}]}));
  const removeSection = (id) => setBp(p => ({...p, sections: p.sections.filter(s => s.id!==id)}));
  const toggleUnit = (u) => setBp(p => ({...p, unitRules:{...p.unitRules, [u]:!p.unitRules[u]}}));

  return (
    <div className="qf-content qf-anim-in" style={{maxWidth:900}}>
      <QFPageHeader title="Blueprint Builder" subtitle="Define the structure, rules, and constraints for your question paper"
        back="Dashboard" onBack={()=>onNav('teacher-dashboard')} />

      <div style={{marginBottom:28}}>
        <QFSteps steps={steps} current={step} />
      </div>

      {/* Step 0: Basics */}
      {step===0 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:16,marginBottom:20}}>Paper Basics</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <QFInput label="Blueprint name *" placeholder='e.g. "Midterm Paper Template"' value={bp.name} onChange={e=>setBp(p=>({...p,name:e.target.value}))} />
              <QFSelect label="Subject *" value={bp.subject} onChange={e=>setBp(p=>({...p,subject:e.target.value}))} options={[{value:'CS301',label:'CS301 – Data Structures'},{value:'CS302',label:'CS302 – Algorithms'},{value:'CS303',label:'CS303 – DBMS'},{value:'MA201',label:'MA201 – Discrete Math'}]} />
              <QFInput label="Total marks *" value={String(bp.totalMarks)} onChange={e=>setBp(p=>({...p,totalMarks:+e.target.value}))} type="number" hint="Paper's maximum marks" />
              <QFInput label="Duration (minutes)" value={String(bp.duration)} onChange={e=>setBp(p=>({...p,duration:+e.target.value}))} type="number" />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
              <input type="checkbox" id="aiAssist" checked={bp.aiAssist} onChange={e=>setBp(p=>({...p,aiAssist:e.target.checked}))} style={{width:16,height:16,accentColor:'var(--cyan)'}} />
              <label htmlFor="aiAssist" style={{cursor:'pointer'}}>
                <span style={{fontWeight:500,fontSize:13.5}}>Enable AI assistance</span>
                <span style={{color:'var(--text3)',fontSize:12.5,marginLeft:8}}>AI fills gaps when rule-based selection can't fully satisfy constraints</span>
              </label>
              <QFBadge variant="ai" style={{marginLeft:'auto'}}>✦ Recommended</QFBadge>
            </div>
          </div>
        </QFCard>
      )}

      {/* Step 1: Sections */}
      {step===1 && (
        <div className="qf-anim-in">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div>
              <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:16}}>Paper Sections</div>
              <div style={{fontSize:13,color:'var(--text3)',marginTop:2}}>Define groups of questions with their types and marks</div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div style={{fontSize:13,padding:'6px 14px',background:deficit===0?'var(--success-dim)':deficit>0?'var(--warn-dim)':'var(--danger-dim)',color:deficit===0?'var(--success)':deficit>0?'var(--warn)':'var(--danger)',borderRadius:'var(--radius)',fontFamily:'var(--font-mono)',fontWeight:600}}>
                {totalAssigned}/{bp.totalMarks} marks
              </div>
              <QFButton variant="secondary" size="sm" onClick={addSection}>+ Add Section</QFButton>
            </div>
          </div>
          {deficit!==0 && <QFAIHint style={{marginBottom:16}}>{deficit>0?`${deficit} marks unallocated. Add more questions or adjust marks per question.`:`Over-allocated by ${-deficit} marks. Reduce questions or marks per section.`}</QFAIHint>}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {bp.sections.map((sec,si) => (
              <QFCard key={sec.id}>
                <div className="qf-card-body">
                  <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                    <div style={{width:28,height:28,background:'var(--cyan-dim)',border:'1px solid var(--cyan)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--cyan)',fontWeight:700,fontSize:13,flexShrink:0,marginTop:2}}>{String.fromCharCode(65+si)}</div>
                    <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1fr 100px 100px',gap:12,alignItems:'end'}}>
                      <QFInput label="Section name" value={sec.name} onChange={e=>updateSection(sec.id,'name',e.target.value)} />
                      <QFSelect label="Question type" value={sec.type} onChange={e=>updateSection(sec.id,'type',e.target.value)} options={['Short Answer','Long Answer','MCQ','Programming','Case Study']} />
                      <QFInput label="No. of questions" value={String(sec.count)} onChange={e=>updateSection(sec.id,'count',+e.target.value)} type="number" />
                      <QFInput label="Marks each" value={String(sec.marksEach)} onChange={e=>updateSection(sec.id,'marksEach',+e.target.value)} type="number" />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:6,flexShrink:0}}>
                      <div style={{fontSize:12,color:'var(--text3)',textAlign:'right'}}>Subtotal</div>
                      <div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:700,color:'var(--cyan)',textAlign:'right'}}>{sec.count*sec.marksEach}</div>
                    </div>
                    {!sec.mandatory && <button onClick={()=>removeSection(sec.id)} style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:18,padding:4,flexShrink:0,marginTop:16}}>×</button>}
                  </div>
                </div>
              </QFCard>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Unit Rules */}
      {step===2 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:16,marginBottom:4}}>Unit Coverage Rules</div>
            <div style={{color:'var(--text3)',fontSize:13,marginBottom:20}}>Select which units must be covered in the generated paper</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
              {Object.entries(bp.unitRules).map(([unit,active]) => (
                <div key={unit} onClick={()=>toggleUnit(unit)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:active?'var(--cyan-dim)':'var(--bg2)',border:`1.5px solid ${active?'var(--cyan)':'var(--border)'}`,borderRadius:'var(--radius)',cursor:'pointer',transition:'all 0.15s'}}>
                  <div style={{width:20,height:20,borderRadius:4,background:active?'var(--cyan)':'var(--bg3)',border:`1.5px solid ${active?'var(--cyan)':'var(--border2)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'#070a10',flexShrink:0,transition:'all 0.15s'}}>{active?'✓':''}</div>
                  <span style={{fontSize:13.5,fontWeight:500,color:active?'var(--text)':'var(--text2)'}}>{unit}</span>
                  {active && <QFBadge variant="cyan" style={{marginLeft:'auto',fontSize:11}}>Required</QFBadge>}
                </div>
              ))}
            </div>
            <QFAIHint>
              <strong style={{color:'var(--ai)'}}>Coverage tip:</strong> Including all 5 units is recommended for final exams. For quizzes, select 2–3 focused units for better question density.
            </QFAIHint>
          </div>
        </QFCard>
      )}

      {/* Step 3: Constraints */}
      {step===3 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:16,marginBottom:20}}>Exclusion & Repetition Rules</div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div style={{padding:'16px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <div style={{fontWeight:600,marginBottom:4}}>Last N Papers Exclusion</div>
                <div style={{color:'var(--text3)',fontSize:13,marginBottom:12}}>Avoid questions used in the most recent papers</div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <input type="range" min={0} max={10} value={bp.exclusionRules.lastNPapers} onChange={e=>setBp(p=>({...p,exclusionRules:{...p.exclusionRules,lastNPapers:+e.target.value}}))} style={{flex:1,accentColor:'var(--cyan)'}} />
                  <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--cyan)',minWidth:30,textAlign:'right'}}>{bp.exclusionRules.lastNPapers}</div>
                  <span style={{color:'var(--text3)',fontSize:13}}>papers</span>
                </div>
              </div>
              <div style={{padding:'16px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <div style={{fontWeight:600,marginBottom:4}}>Usage Frequency Limit</div>
                <div style={{color:'var(--text3)',fontSize:13,marginBottom:12}}>Deprioritize questions used more than N times</div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <input type="range" min={1} max={10} value={bp.exclusionRules.reuseThreshold} onChange={e=>setBp(p=>({...p,exclusionRules:{...p.exclusionRules,reuseThreshold:+e.target.value}}))} style={{flex:1,accentColor:'var(--indigo)'}} />
                  <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:'var(--indigo)',minWidth:30,textAlign:'right'}}>{bp.exclusionRules.reuseThreshold}</div>
                  <span style={{color:'var(--text3)',fontSize:13}}>times</span>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <input type="checkbox" id="balanceDiff" defaultChecked style={{width:16,height:16,accentColor:'var(--cyan)'}} />
                <label htmlFor="balanceDiff" style={{cursor:'pointer',fontSize:13.5,fontWeight:500}}>Balance difficulty distribution (Easy / Medium / Hard)</label>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                <input type="checkbox" id="strictUnits" defaultChecked style={{width:16,height:16,accentColor:'var(--cyan)'}} />
                <label htmlFor="strictUnits" style={{cursor:'pointer',fontSize:13.5,fontWeight:500}}>Strict unit proportionality (equal coverage across required units)</label>
              </div>
            </div>
          </div>
        </QFCard>
      )}

      {/* Step 4: Review */}
      {step===4 && (
        <div className="qf-anim-in" style={{display:'flex',flexDirection:'column',gap:16}}>
          <QFCard glow>
            <div className="qf-card-body">
              <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:18,marginBottom:4}}>{bp.name||'Untitled Blueprint'}</div>
              <div style={{color:'var(--text3)',fontSize:13,marginBottom:20}}>{bp.subject} · {bp.totalMarks} marks · {bp.duration} min</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20}}>
                {[
                  ['Total Questions', bp.sections.reduce((s,x)=>s+x.count,0),'◈','var(--cyan)'],
                  ['Total Marks', totalAssigned,'⬡', deficit===0?'var(--success)':'var(--warn)'],
                  ['Units Required', Object.values(bp.unitRules).filter(Boolean).length,'✦','var(--indigo)'],
                ].map(([l,v,i,c])=>(
                  <div key={l} style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:'14px',textAlign:'center'}}>
                    <div style={{fontSize:20,color:c,marginBottom:6}}>{i}</div>
                    <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,color:c}}>{v}</div>
                    <div style={{fontSize:12,color:'var(--text3)',marginTop:4}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {bp.sections.map((s,i)=>(
                  <div key={s.id} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',background:'var(--bg2)',borderRadius:'var(--radius)'}}>
                    <div style={{display:'flex',gap:10,alignItems:'center'}}>
                      <span style={{color:'var(--cyan)',fontWeight:700,fontSize:13}}>{String.fromCharCode(65+i)}</span>
                      <span style={{fontSize:13.5}}>{s.name}</span>
                      <QFBadge variant="neutral">{s.type}</QFBadge>
                    </div>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--text2)'}}>{s.count} × {s.marksEach} = {s.count*s.marksEach} marks</span>
                  </div>
                ))}
              </div>
              {deficit !== 0 && <div style={{marginTop:12}}><QFAIHint>{deficit>0?`⚠ Blueprint is under-allocated by ${deficit} marks. Adjust sections before generating.`:`⚠ Over-allocated by ${-deficit} marks.`}</QFAIHint></div>}
            </div>
          </QFCard>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{display:'flex',justifyContent:'space-between',marginTop:24}}>
        <QFButton variant="secondary" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}>← Back</QFButton>
        <div style={{display:'flex',gap:8}}>
          <QFButton variant="ghost">Save Draft</QFButton>
          {step < steps.length-1
            ? <QFButton variant="primary" onClick={()=>setStep(s=>Math.min(steps.length-1,s+1))}>Continue →</QFButton>
            : <QFButton variant="primary" onClick={()=>onNav('teacher-generate')}>✦ Generate Paper</QFButton>
          }
        </div>
      </div>
    </div>
  );
}

function TeacherGenerate({ onNav }) {
  const [phase, setPhase] = React.useState('idle'); // idle | generating | done
  const [progress, setProgress] = React.useState(0);
  const [logLines, setLogLines] = React.useState([]);
  const [constraints, setConstraints] = React.useState([]);

  const logs = [
    'Loading blueprint: Algorithms Midterm…',
    'Querying question bank (CS302)…',
    'Applying exclusion rules (last 2 papers)…',
    'Selecting Section A questions — Unit coverage check…',
    'Found 5 Short Answer questions matching constraints.',
    'Selecting Section B questions — difficulty balance…',
    'AI assisting: Unit 3 has limited eligible questions.',
    'AI suggestion: 1 generated question for Unit 3 (pending review).',
    'All constraints satisfied ✓',
    'Paper assembled successfully — 18 questions, 50 marks.',
  ];

  const constraintResults = [
    { label:'Total marks', expected:50, got:50, pass:true },
    { label:'Unit coverage', expected:'3 units', got:'3 units', pass:true },
    { label:'Section A (Short)', expected:'5 questions', got:'5 questions', pass:true },
    { label:'Section B (Long)', expected:'3 questions', got:'3 questions', pass:true },
    { label:'No repeated questions', expected:'Last 2 papers excluded', got:'0 repeats', pass:true },
    { label:'Difficulty balance', expected:'Easy/Med/Hard', got:'2/3/3', pass:true },
    { label:'AI assistance used', expected:'Optional', got:'1 question', pass:null },
  ];

  const startGeneration = () => {
    setPhase('generating');
    setProgress(0);
    setLogLines([]);
    setConstraints([]);
    let p = 0, li = 0;
    const iv = setInterval(() => {
      p += Math.random() * 12;
      if (p >= 100) { p = 100; clearInterval(iv); setPhase('done'); setConstraints(constraintResults); }
      setProgress(Math.round(p));
      const logIdx = Math.floor(p / 10);
      if (logIdx > li && li < logs.length) { setLogLines(prev => [...prev, logs[li]]); li++; }
    }, 250);
  };

  return (
    <div className="qf-content qf-anim-in" style={{maxWidth:800}}>
      <QFPageHeader title="Generate Question Paper" subtitle="Using blueprint: Algorithms Midterm · CS302 · 50 marks"
        back="Dashboard" onBack={()=>onNav('teacher-dashboard')} />

      {phase === 'idle' && (
        <QFCard glow className="qf-anim-in">
          <div className="qf-card-body" style={{textAlign:'center',padding:'48px 32px'}}>
            <div style={{fontSize:48,marginBottom:20,color:'var(--cyan)'}}>✦</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,marginBottom:10}}>Ready to generate</div>
            <p style={{color:'var(--text2)',fontSize:14,marginBottom:28,maxWidth:440,margin:'0 auto 28px',lineHeight:1.7}}>The blueprint engine will select questions from the bank, apply all constraint rules, and fill any gaps with AI assistance if enabled.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',marginBottom:24,flexWrap:'wrap'}}>
              {[['18','Questions'],['50','Total Marks'],['3','Units'],['2','Papers Excluded']].map(([v,l])=>(
                <div key={l} style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:'12px 20px',textAlign:'center',minWidth:90}}>
                  <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,color:'var(--cyan)'}}>{v}</div>
                  <div style={{fontSize:11.5,color:'var(--text3)',marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            <QFButton variant="primary" size="lg" onClick={startGeneration} icon={<span>✦</span>} style={{padding:'12px 32px',fontSize:15}}>Generate Paper</QFButton>
          </div>
        </QFCard>
      )}

      {phase === 'generating' && (
        <div className="qf-anim-in" style={{display:'flex',flexDirection:'column',gap:16}}>
          <QFCard>
            <div className="qf-card-body">
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div className="qf-spinner" />
                <span className="qf-ai-working" style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,color:'var(--ai)'}}>AI generating your paper…</span>
                <span style={{marginLeft:'auto',fontFamily:'var(--font-mono)',color:'var(--cyan)',fontWeight:700}}>{progress}%</span>
              </div>
              <QFProgress value={progress} ai />
            </div>
          </QFCard>
          <QFCard>
            <div className="qf-card-body">
              <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text2)',display:'flex',flexDirection:'column',gap:6,maxHeight:200,overflowY:'auto'}}>
                {logLines.map((l,i) => (
                  <div key={i} style={{display:'flex',gap:10,alignItems:'center',color:l.includes('AI')? 'var(--ai)':l.includes('✓')?'var(--success)':'var(--text2)'}}>
                    <span style={{color:'var(--text3)',flexShrink:0}}>{String(i+1).padStart(2,'0')}</span>
                    <span>{l}</span>
                  </div>
                ))}
                {logLines.length<logs.length && <div style={{display:'flex',gap:8,alignItems:'center',color:'var(--text3)'}}><div className="qf-spinner" style={{width:12,height:12}} /><span>Processing…</span></div>}
              </div>
            </div>
          </QFCard>
        </div>
      )}

      {phase === 'done' && (
        <div className="qf-anim-in" style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{background:'var(--success-dim)',border:'1px solid var(--success)',borderRadius:'var(--radius-lg)',padding:'16px 20px',display:'flex',gap:12,alignItems:'center'}}>
            <span style={{fontSize:24}}>✓</span>
            <div>
              <div style={{fontWeight:600,color:'var(--success)',marginBottom:2}}>Paper generated successfully</div>
              <div style={{fontSize:13,color:'var(--text2)'}}>All 6 constraints satisfied · 1 AI-assisted question pending review</div>
            </div>
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              <QFButton variant="secondary" onClick={()=>onNav('teacher-paper-view')}>Preview Paper</QFButton>
              <QFButton variant="primary" onClick={()=>onNav('teacher-paper-view')}>View & Export →</QFButton>
            </div>
          </div>
          <QFCard>
            <div className="qf-card-header" style={{paddingBottom:14}}>
              <span style={{fontFamily:'var(--font-head)',fontWeight:600}}>Constraint Report</span>
            </div>
            <table className="qf-table">
              <thead><tr><th style={{paddingLeft:20}}>Constraint</th><th>Expected</th><th>Result</th><th>Status</th></tr></thead>
              <tbody>
                {constraints.map((c,i) => (
                  <tr key={i}>
                    <td style={{paddingLeft:20,fontWeight:500}}>{c.label}</td>
                    <td style={{color:'var(--text3)',fontSize:13}}>{c.expected}</td>
                    <td style={{fontFamily:'var(--font-mono)',fontSize:13}}>{c.got}</td>
                    <td>
                      {c.pass===true && <QFBadge variant="success">✓ Pass</QFBadge>}
                      {c.pass===false && <QFBadge variant="danger">✕ Fail</QFBadge>}
                      {c.pass===null && <QFBadge variant="ai">✦ AI Assisted</QFBadge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </QFCard>
        </div>
      )}
    </div>
  );
}

function PaperView({ onNav }) {
  const [editMode, setEditMode] = React.useState(false);
  const [showReplace, setShowReplace] = React.useState(null);
  const sections = [
    { label:'Section A — Short Answer', note:'Answer all questions. Each question carries 4 marks.', questions:[
      { no:1, text:'What is the time complexity of binary search? Justify your answer.', marks:4, unit:'Unit 1', ai:false },
      { no:2, text:'Define a stable sorting algorithm. Give one example.', marks:4, unit:'Unit 1', ai:false },
      { no:3, text:'What is a hash collision? State two resolution strategies.', marks:4, unit:'Unit 2', ai:false },
      { no:4, text:'Explain the concept of amortized time complexity with an example.', marks:4, unit:'Unit 2', ai:false },
      { no:5, text:'What is a minimum spanning tree? State Kruskal\'s algorithm steps.', marks:4, unit:'Unit 3', ai:true },
    ]},
    { label:'Section B — Long Answer', note:'Attempt any 3 questions. Each question carries 10 marks.', questions:[
      { no:6, text:'Explain BFS and DFS algorithms. Compare their time and space complexities with suitable examples.', marks:10, unit:'Unit 3', ai:false },
      { no:7, text:'Describe the merge sort algorithm. Derive its time complexity using the recurrence relation.', marks:10, unit:'Unit 1', ai:false },
      { no:8, text:'What is dynamic programming? Solve the 0/1 Knapsack problem using DP with a worked example.', marks:10, unit:'Unit 4', ai:false },
    ]},
  ];

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Algorithms Midterm 2024" subtitle="CS302 · 50 marks · 90 minutes · Generated Apr 20, 2024"
        back="Generate" onBack={()=>onNav('teacher-generate')}
        actions={
          <div style={{display:'flex',gap:8}}>
            <QFButton variant="ghost" size="sm" onClick={()=>setEditMode(e=>!e)}>{editMode?'Done Editing':'✏ Edit'}</QFButton>
            <QFButton variant="secondary" size="sm">Save</QFButton>
            <QFButton variant="primary" size="sm" onClick={()=>onNav('teacher-export')}>Export →</QFButton>
          </div>
        } />

      {editMode && <QFAIHint style={{marginBottom:16}}>Edit mode active — click any question to replace it, or drag to reorder. AI can suggest alternatives below.</QFAIHint>}

      {/* Paper */}
      <div style={{maxWidth:740,margin:'0 auto'}}>
        {/* Header */}
        <div style={{background:'var(--bg1)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'28px 32px',marginBottom:20,textAlign:'center'}}>
          <div style={{fontFamily:'var(--font-head)',fontSize:13,fontWeight:600,letterSpacing:'0.1em',color:'var(--text3)',textTransform:'uppercase',marginBottom:8}}>Institute of Technology</div>
          <div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800,marginBottom:4}}>Algorithms (CS302)</div>
          <div style={{fontFamily:'var(--font-head)',fontSize:15,fontWeight:500,marginBottom:12}}>Mid-Semester Examination — April 2024</div>
          <div style={{display:'flex',justifyContent:'center',gap:32,fontSize:13,color:'var(--text2)'}}>
            <span>Duration: 90 minutes</span><span>Maximum Marks: 50</span>
          </div>
          <div style={{marginTop:16,paddingTop:14,borderTop:'1px solid var(--border)',fontSize:12.5,color:'var(--text3)',textAlign:'left'}}>
            <strong>Instructions:</strong> Answer all questions in Section A. Attempt any 3 from Section B. Write clearly. Show all workings.
          </div>
        </div>

        {sections.map((sec, si) => (
          <div key={si} style={{marginBottom:24}}>
            <div style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:'10px 16px',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:14}}>{sec.label}</span>
              <span style={{fontSize:12.5,color:'var(--text3)',fontStyle:'italic'}}>{sec.note}</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {sec.questions.map((q,qi) => (
                <div key={q.no} style={{background:'var(--bg1)',border:`1px solid ${editMode?'var(--border2)':'var(--border)'}`,borderRadius:'var(--radius-lg)',padding:'14px 18px',transition:'all 0.15s',cursor:editMode?'pointer':'default',position:'relative'}}
                  onMouseEnter={e=>editMode&&(e.currentTarget.style.borderColor='var(--cyan)')}
                  onMouseLeave={e=>editMode&&(e.currentTarget.style.borderColor='var(--border2)')}>
                  <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--cyan)',flexShrink:0,marginTop:2}}>{q.no}.</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:14,lineHeight:1.7,color:'var(--text)'}}>{q.text}</p>
                      <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                        <span className="qf-chip">{q.unit}</span>
                        {q.ai && <QFBadge variant="ai">✦ AI Generated</QFBadge>}
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6,flexShrink:0}}>
                      <span style={{fontFamily:'var(--font-mono)',fontSize:13,fontWeight:700,color:'var(--text2)'}}>[{q.marks}M]</span>
                      {editMode && <QFButton variant="secondary" size="sm" onClick={()=>setShowReplace(q)}>Replace</QFButton>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Replace modal */}
      <QFModal open={!!showReplace} onClose={()=>setShowReplace(null)} title="Replace Question" width={580}
        footer={<><QFButton variant="ghost" onClick={()=>setShowReplace(null)}>Cancel</QFButton><QFButton variant="primary">Replace Question</QFButton></>}>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:'var(--text3)',marginBottom:6}}>Current question</div>
          <div style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:'10px 14px',fontSize:13,color:'var(--text2)',lineHeight:1.6}}>{showReplace?.text}</div>
        </div>
        <QFAIHint style={{marginBottom:14}}>AI found 3 alternatives matching the same unit, marks, and type.</QFAIHint>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {['Explain Prim\'s algorithm for minimum spanning tree with a worked example.','What is the significance of a spanning tree in a graph? Derive the number of possible spanning trees.','Compare Prim\'s and Kruskal\'s algorithms for finding MST. When would you prefer each?'].map((alt,i) => (
            <div key={i} style={{padding:'12px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)',cursor:'pointer',fontSize:13,lineHeight:1.6,color:'var(--text)'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--cyan)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              {alt}
            </div>
          ))}
        </div>
      </QFModal>
    </div>
  );
}

function TeacherExport({ onNav }) {
  const [exported, setExported] = React.useState(false);
  const formats = [
    { id:'docx', icon:'📄', label:'Word Document', desc:'.docx — Fully editable', popular:true },
    { id:'pdf', icon:'🖨', label:'PDF', desc:'.pdf — Print-ready' },
    { id:'txt', icon:'📝', label:'Plain Text', desc:'.txt — Simple export' },
  ];
  const [selected, setSelected] = React.useState('docx');

  return (
    <div className="qf-content qf-anim-in" style={{maxWidth:640}}>
      <QFPageHeader title="Export Paper" subtitle="Algorithms Midterm 2024 — CS302"
        back="Paper View" onBack={()=>onNav('teacher-paper-view')} />
      <QFCard style={{marginBottom:20}}>
        <div className="qf-card-body">
          <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:16}}>Export Format</div>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
            {formats.map(f => (
              <div key={f.id} onClick={()=>setSelected(f.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:selected===f.id?'var(--cyan-dim)':'var(--bg2)',border:`1.5px solid ${selected===f.id?'var(--cyan)':'var(--border)'}`,borderRadius:'var(--radius)',cursor:'pointer',transition:'all 0.15s'}}>
                <span style={{fontSize:20}}>{f.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:13.5}}>{f.label}</div>
                  <div style={{fontSize:12,color:'var(--text3)'}}>{f.desc}</div>
                </div>
                {f.popular && <QFBadge variant="cyan">Popular</QFBadge>}
                {selected===f.id && <span style={{color:'var(--cyan)',fontSize:16}}>✓</span>}
              </div>
            ))}
          </div>
          {!exported
            ? <QFButton variant="primary" onClick={()=>setExported(true)} style={{width:'100%',justifyContent:'center',padding:'11px',fontSize:15}}>Download .{selected}</QFButton>
            : <div style={{background:'var(--success-dim)',border:'1px solid var(--success)',borderRadius:'var(--radius)',padding:'12px 16px',display:'flex',gap:10,alignItems:'center'}}>
                <span style={{color:'var(--success)',fontSize:18}}>✓</span>
                <span style={{color:'var(--success)',fontWeight:600}}>AlgorithmsMidterm2024.{selected} downloaded</span>
              </div>
          }
        </div>
      </QFCard>
    </div>
  );
}

function TeacherHistory({ onNav }) {
  const papers = [
    { name:'Algorithms Midterm 2024', date:'Apr 18, 2024', marks:50, questions:18, exports:2 },
    { name:'Data Structures Quiz 3', date:'Apr 15, 2024', marks:20, questions:10, exports:1 },
    { name:'DBMS Final Exam', date:'Apr 10, 2024', marks:100, questions:32, exports:3 },
    { name:'Algorithms Quiz 2', date:'Mar 28, 2024', marks:20, questions:10, exports:1 },
    { name:'Data Structures Midterm', date:'Mar 15, 2024', marks:50, questions:18, exports:2 },
  ];

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Paper History" subtitle="All generated papers and export records" />
      <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:20}}>
        <QFCard>
          <table className="qf-table">
            <thead><tr><th style={{paddingLeft:20}}>Paper</th><th>Date</th><th>Marks</th><th>Questions</th><th>Exports</th><th></th></tr></thead>
            <tbody>
              {papers.map((p,i) => (
                <tr key={i} style={{cursor:'pointer'}} onClick={()=>onNav('teacher-paper-view')}>
                  <td style={{paddingLeft:20,fontWeight:500}}>{p.name}</td>
                  <td style={{color:'var(--text3)',fontSize:12.5}}>{p.date}</td>
                  <td style={{fontFamily:'var(--font-mono)',fontSize:13}}>{p.marks}</td>
                  <td>{p.questions}</td>
                  <td><QFBadge variant="neutral">{p.exports}×</QFBadge></td>
                  <td><QFButton variant="ghost" size="sm">View</QFButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </QFCard>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <QFCard>
            <div className="qf-card-body">
              <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:14}}>Usage Analytics</div>
              {[['Papers generated','5'],['Questions used','88'],['Unique questions','72'],['Avg. reuse rate','1.2×']].map(([l,v])=>(
                <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:13,color:'var(--text2)'}}>{l}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:700,color:'var(--cyan)'}}>{v}</span>
                </div>
              ))}
            </div>
          </QFCard>
          <QFAIHint>Unit 3 questions are used 2.1× more often than other units. Consider uploading more Unit 3 papers to expand coverage.</QFAIHint>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TeacherDashboard, BlueprintBuilder, TeacherGenerate, PaperView, TeacherExport, TeacherHistory });
