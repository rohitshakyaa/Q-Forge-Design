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

const INITIAL_BLUEPRINTS = [
  { id:1, name:'Standard Midterm', subject:'CS302', totalMarks:50, duration:90, questions:20, units:3, sections:[{id:1,name:'Section A — Short Answer',type:'Short Answer',count:5,marksEach:4,mandatory:true},{id:2,name:'Section B — Long Answer',type:'Long Answer',count:3,marksEach:10,mandatory:false}], unitRules:{'Unit 1':true,'Unit 2':true,'Unit 3':true,'Unit 4':false,'Unit 5':false}, exclusionRules:{lastNPapers:2,reuseThreshold:3}, aiAssist:true, lastUsed:'Apr 10, 2024' },
  { id:2, name:'Quick Quiz', subject:'CS301', totalMarks:20, duration:30, questions:10, units:2, sections:[{id:1,name:'Section A — MCQ',type:'MCQ',count:5,marksEach:1,mandatory:true},{id:2,name:'Section B — Short Answer',type:'Short Answer',count:5,marksEach:3,mandatory:false}], unitRules:{'Unit 1':true,'Unit 2':true,'Unit 3':false,'Unit 4':false,'Unit 5':false}, exclusionRules:{lastNPapers:1,reuseThreshold:2}, aiAssist:true, lastUsed:'Apr 15, 2024' },
  { id:3, name:'Comprehensive Final', subject:'CS303', totalMarks:100, duration:180, questions:35, units:6, sections:[{id:1,name:'Section A — MCQ',type:'MCQ',count:10,marksEach:2,mandatory:true},{id:2,name:'Section B — Short Answer',type:'Short Answer',count:8,marksEach:5,mandatory:true},{id:3,name:'Section C — Long Answer',type:'Long Answer',count:4,marksEach:10,mandatory:false}], unitRules:{'Unit 1':true,'Unit 2':true,'Unit 3':true,'Unit 4':true,'Unit 5':true,'Unit 6':true}, exclusionRules:{lastNPapers:3,reuseThreshold:4}, aiAssist:true, lastUsed:'Mar 20, 2024' },
  { id:4, name:'Algorithms Midterm', subject:'CS302', totalMarks:50, duration:90, questions:18, units:3, sections:[{id:1,name:'Section A — Short Answer',type:'Short Answer',count:5,marksEach:4,mandatory:true},{id:2,name:'Section B — Long Answer',type:'Long Answer',count:3,marksEach:10,mandatory:false}], unitRules:{'Unit 1':true,'Unit 2':true,'Unit 3':true,'Unit 4':false,'Unit 5':false}, exclusionRules:{lastNPapers:2,reuseThreshold:3}, aiAssist:false, lastUsed:'Apr 18, 2024' },
];

function BlueprintEditor({ blueprint, onSave, onCancel }) {
  const isNew = !blueprint.id;
  const [bp, setBp] = React.useState(blueprint);
  const [step, setStep] = React.useState(0);
  const steps = ['Basics','Sections','Unit Rules','Constraints','Review'];

  const totalAssigned = bp.sections.reduce((s,sec) => s + sec.count * sec.marksEach, 0);
  const deficit = bp.totalMarks - totalAssigned;

  const updateSection = (id, key, val) => setBp(p => ({...p, sections: p.sections.map(s => s.id===id ? {...s,[key]:val} : s)}));
  const addSection = () => setBp(p => ({...p, sections:[...p.sections,{id:Date.now(),name:'New Section',type:'Short Answer',count:2,marksEach:5,mandatory:false}]}));
  const removeSection = (id) => setBp(p => ({...p, sections: p.sections.filter(s=>s.id!==id)}));
  const toggleUnit = (u) => setBp(p => ({...p, unitRules:{...p.unitRules,[u]:!p.unitRules[u]}}));

  return (
    <div className="qf-anim-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:18}}>{isNew?'New Blueprint':`Editing: ${blueprint.name}`}</div>
        <QFButton variant="ghost" size="sm" onClick={onCancel}>← Back to list</QFButton>
      </div>
      <div style={{marginBottom:24}}><QFSteps steps={steps} current={step} /></div>

      {step===0 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,marginBottom:18}}>Paper Basics</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <QFInput label="Blueprint name *" placeholder='"Midterm Paper Template"' value={bp.name} onChange={e=>setBp(p=>({...p,name:e.target.value}))} />
              <QFSelect label="Subject *" value={bp.subject} onChange={e=>setBp(p=>({...p,subject:e.target.value}))} options={[{value:'CS301',label:'CS301 – Data Structures'},{value:'CS302',label:'CS302 – Algorithms'},{value:'CS303',label:'CS303 – DBMS'},{value:'MA201',label:'MA201 – Discrete Math'}]} />
              <QFInput label="Total marks *" value={String(bp.totalMarks)} onChange={e=>setBp(p=>({...p,totalMarks:+e.target.value}))} type="number" hint="Paper's maximum marks" />
              <QFInput label="Duration (minutes)" value={String(bp.duration)} onChange={e=>setBp(p=>({...p,duration:+e.target.value}))} type="number" />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
              <input type="checkbox" id="aiAssistEdit" checked={bp.aiAssist} onChange={e=>setBp(p=>({...p,aiAssist:e.target.checked}))} style={{width:16,height:16,accentColor:'var(--cyan)'}} />
              <label htmlFor="aiAssistEdit" style={{cursor:'pointer'}}>
                <span style={{fontWeight:500,fontSize:13.5}}>Enable AI assistance</span>
                <span style={{color:'var(--text3)',fontSize:12.5,marginLeft:8}}>AI fills gaps when constraints can't be fully satisfied</span>
              </label>
              <QFBadge variant="ai" style={{marginLeft:'auto'}}>✦ Recommended</QFBadge>
            </div>
          </div>
        </QFCard>
      )}

      {step===1 && (
        <div className="qf-anim-in">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15}}>Paper Sections</div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div style={{fontSize:13,padding:'6px 14px',background:deficit===0?'var(--success-dim)':deficit>0?'var(--warn-dim)':'var(--danger-dim)',color:deficit===0?'var(--success)':deficit>0?'var(--warn)':'var(--danger)',borderRadius:'var(--radius)',fontFamily:'var(--font-mono)',fontWeight:600}}>{totalAssigned}/{bp.totalMarks} marks</div>
              <QFButton variant="secondary" size="sm" onClick={addSection}>+ Add Section</QFButton>
            </div>
          </div>
          {deficit!==0 && <div style={{marginBottom:12}}><QFAIHint>{deficit>0?`${deficit} marks unallocated.`:`Over-allocated by ${-deficit} marks.`}</QFAIHint></div>}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {bp.sections.map((sec,si) => (
              <QFCard key={sec.id}>
                <div className="qf-card-body">
                  <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                    <div style={{width:28,height:28,background:'var(--cyan-dim)',border:'1px solid var(--cyan)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--cyan)',fontWeight:700,fontSize:13,flexShrink:0,marginTop:2}}>{String.fromCharCode(65+si)}</div>
                    <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 1fr 100px 100px',gap:12,alignItems:'end'}}>
                      <QFInput label="Section name" value={sec.name} onChange={e=>updateSection(sec.id,'name',e.target.value)} />
                      <QFSelect label="Question type" value={sec.type} onChange={e=>updateSection(sec.id,'type',e.target.value)} options={['Short Answer','Long Answer','MCQ','Programming','Case Study']} />
                      <QFInput label="No. of Qs" value={String(sec.count)} onChange={e=>updateSection(sec.id,'count',+e.target.value)} type="number" />
                      <QFInput label="Marks each" value={String(sec.marksEach)} onChange={e=>updateSection(sec.id,'marksEach',+e.target.value)} type="number" />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:4,flexShrink:0,alignItems:'flex-end'}}>
                      <div style={{fontSize:11,color:'var(--text3)'}}>Subtotal</div>
                      <div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:700,color:'var(--cyan)'}}>{sec.count*sec.marksEach}</div>
                    </div>
                    {!sec.mandatory && <button onClick={()=>removeSection(sec.id)} style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:20,padding:'4px 8px',flexShrink:0,marginTop:14}}>×</button>}
                  </div>
                </div>
              </QFCard>
            ))}
          </div>
        </div>
      )}

      {step===2 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,marginBottom:4}}>Unit Coverage Rules</div>
            <div style={{color:'var(--text3)',fontSize:13,marginBottom:18}}>Select which units must be covered in the generated paper</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
              {Object.entries(bp.unitRules).map(([unit,active]) => (
                <div key={unit} onClick={()=>toggleUnit(unit)} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',background:active?'var(--cyan-dim)':'var(--bg2)',border:`1.5px solid ${active?'var(--cyan)':'var(--border)'}`,borderRadius:'var(--radius)',cursor:'pointer',transition:'all 0.15s'}}>
                  <div style={{width:20,height:20,borderRadius:4,background:active?'var(--cyan)':'var(--bg3)',border:`1.5px solid ${active?'var(--cyan)':'var(--border2)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'#070a10',flexShrink:0}}>{active?'✓':''}</div>
                  <span style={{fontSize:13.5,fontWeight:500,color:active?'var(--text)':'var(--text2)'}}>{unit}</span>
                  {active && <QFBadge variant="cyan" style={{marginLeft:'auto',fontSize:11}}>Required</QFBadge>}
                </div>
              ))}
            </div>
            <QFAIHint><strong style={{color:'var(--ai)'}}>Tip:</strong> Including all units is recommended for final exams. For quizzes, select 2–3 focused units.</QFAIHint>
          </div>
        </QFCard>
      )}

      {step===3 && (
        <QFCard className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,marginBottom:18}}>Exclusion & Repetition Rules</div>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              {[
                {label:'Last N Papers Exclusion',desc:'Avoid questions used in the most recent N papers',val:bp.exclusionRules.lastNPapers,min:0,max:10,unit:'papers',color:'var(--cyan)',key:'lastNPapers'},
                {label:'Usage Frequency Limit',desc:'Deprioritize questions used more than N times',val:bp.exclusionRules.reuseThreshold,min:1,max:10,unit:'times',color:'var(--indigo)',key:'reuseThreshold'},
              ].map(r => (
                <div key={r.key} style={{padding:16,background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                  <div style={{fontWeight:600,marginBottom:3}}>{r.label}</div>
                  <div style={{color:'var(--text3)',fontSize:13,marginBottom:12}}>{r.desc}</div>
                  <div style={{display:'flex',alignItems:'center',gap:12}}>
                    <input type="range" min={r.min} max={r.max} value={r.val} onChange={e=>setBp(p=>({...p,exclusionRules:{...p.exclusionRules,[r.key]:+e.target.value}}))} style={{flex:1,accentColor:r.color}} />
                    <div style={{fontFamily:'var(--font-mono)',fontSize:16,fontWeight:700,color:r.color,minWidth:24,textAlign:'right'}}>{r.val}</div>
                    <span style={{color:'var(--text3)',fontSize:13}}>{r.unit}</span>
                  </div>
                </div>
              ))}
              {[['balanceDiff2','Balance difficulty distribution (Easy / Medium / Hard)'],['strictUnits2','Strict unit proportionality across required units']].map(([id,lbl])=>(
                <div key={id} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',border:'1px solid var(--border)'}}>
                  <input type="checkbox" id={id} defaultChecked style={{width:16,height:16,accentColor:'var(--cyan)'}} />
                  <label htmlFor={id} style={{cursor:'pointer',fontSize:13.5,fontWeight:500}}>{lbl}</label>
                </div>
              ))}
            </div>
          </div>
        </QFCard>
      )}

      {step===4 && (
        <QFCard glow className="qf-anim-in">
          <div className="qf-card-body">
            <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:18,marginBottom:4}}>{bp.name||'Untitled Blueprint'}</div>
            <div style={{color:'var(--text3)',fontSize:13,marginBottom:18}}>{bp.subject} · {bp.totalMarks} marks · {bp.duration} min</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:18}}>
              {[['Total Qs',bp.sections.reduce((s,x)=>s+x.count,0),'◈','var(--cyan)'],['Total Marks',totalAssigned,'⬡',deficit===0?'var(--success)':'var(--warn)'],['Units Required',Object.values(bp.unitRules).filter(Boolean).length,'✦','var(--indigo)']].map(([l,v,i,c])=>(
                <div key={l} style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:14,textAlign:'center'}}>
                  <div style={{fontSize:18,color:c,marginBottom:5}}>{i}</div>
                  <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,color:c}}>{v}</div>
                  <div style={{fontSize:12,color:'var(--text3)',marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
            {bp.sections.map((s,i)=>(
              <div key={s.id} style={{display:'flex',justifyContent:'space-between',padding:'10px 14px',background:'var(--bg2)',borderRadius:'var(--radius)',marginBottom:6}}>
                <div style={{display:'flex',gap:10,alignItems:'center'}}>
                  <span style={{color:'var(--cyan)',fontWeight:700,fontSize:13}}>{String.fromCharCode(65+i)}</span>
                  <span style={{fontSize:13.5}}>{s.name}</span>
                  <QFBadge variant="neutral">{s.type}</QFBadge>
                </div>
                <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--text2)'}}>{s.count} × {s.marksEach} = {s.count*s.marksEach}M</span>
              </div>
            ))}
            {deficit!==0 && <div style={{marginTop:12}}><QFAIHint>⚠ {deficit>0?`Under-allocated by ${deficit} marks.`:`Over-allocated by ${-deficit} marks.`}</QFAIHint></div>}
          </div>
        </QFCard>
      )}

      <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
        <QFButton variant="secondary" onClick={()=>step===0?onCancel():setStep(s=>s-1)}>{step===0?'← Cancel':'← Back'}</QFButton>
        <div style={{display:'flex',gap:8}}>
          <QFButton variant="ghost" onClick={()=>onCancel()}>Discard</QFButton>
          {step<steps.length-1
            ? <QFButton variant="primary" onClick={()=>setStep(s=>s+1)}>Continue →</QFButton>
            : <QFButton variant="primary" onClick={()=>onSave({...bp,id:bp.id||Date.now(),questions:bp.sections.reduce((s,x)=>s+x.count,0),units:Object.values(bp.unitRules).filter(Boolean).length,lastUsed:'Today'})}>Save Blueprint</QFButton>
          }
        </div>
      </div>
    </div>
  );
}

function BlueprintBuilder({ onNav }) {
  const [bps, setBps] = React.useState(INITIAL_BLUEPRINTS);
  const [search, setSearch] = React.useState('');
  const [editing, setEditing] = React.useState(null); // null = list, object = editor
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  const filtered = bps.filter(b =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (bp) => {
    setBps(prev => prev.find(b=>b.id===bp.id) ? prev.map(b=>b.id===bp.id?bp:b) : [...prev,bp]);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setBps(prev => prev.filter(b=>b.id!==id));
    setDeleteConfirm(null);
  };

  const blankBp = { name:'', subject:'CS302', totalMarks:50, duration:90, sections:[{id:1,name:'Section A — Short Answer',type:'Short Answer',count:5,marksEach:4,mandatory:true},{id:2,name:'Section B — Long Answer',type:'Long Answer',count:3,marksEach:10,mandatory:false}], unitRules:{'Unit 1':true,'Unit 2':true,'Unit 3':true,'Unit 4':false,'Unit 5':false}, exclusionRules:{lastNPapers:2,reuseThreshold:3}, aiAssist:true };

  if (editing !== null) {
    return (
      <div className="qf-content qf-anim-in" style={{maxWidth:900}}>
        <BlueprintEditor blueprint={editing} onSave={handleSave} onCancel={()=>setEditing(null)} />
      </div>
    );
  }

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Blueprint Builder" subtitle="Create and manage your paper structure templates"
        actions={<QFButton variant="primary" onClick={()=>setEditing(blankBp)}>+ New Blueprint</QFButton>}
      />

      {/* Search */}
      <div style={{display:'flex',gap:12,marginBottom:20,alignItems:'center'}}>
        <div style={{position:'relative',flex:1,maxWidth:380}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontSize:14,pointerEvents:'none'}}>⌕</span>
          <input className="qf-input" placeholder="Search blueprints by name or subject…" value={search} onChange={e=>setSearch(e.target.value)} style={{paddingLeft:34}} />
        </div>
        {search && <QFButton variant="ghost" size="sm" onClick={()=>setSearch('')}>Clear</QFButton>}
        <div style={{marginLeft:'auto',color:'var(--text3)',fontSize:13}}>{filtered.length} blueprint{filtered.length!==1?'s':''}</div>
      </div>

      {filtered.length === 0 ? (
        <QFEmptyState icon="⬢" title="No blueprints found" desc={search?`No blueprints match "${search}".`:'You have no blueprints yet. Create one to get started.'}
          action={<QFButton variant="primary" onClick={()=>setEditing(blankBp)}>+ Create Blueprint</QFButton>} />
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
          {filtered.map(bp => (
            <QFCard key={bp.id} style={{transition:'border-color 0.15s,box-shadow 0.15s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border2)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div className="qf-card-body">
                {/* Header */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div>
                    <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:15,marginBottom:5}}>{bp.name}</div>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:11.5,color:'var(--cyan)',background:'var(--cyan-dim)',padding:'2px 8px',borderRadius:6}}>{bp.subject}</span>
                  </div>
                  {bp.aiAssist && <QFBadge variant="ai">✦ AI</QFBadge>}
                </div>

                {/* Stats */}
                <div style={{display:'flex',gap:10,marginBottom:12,flexWrap:'wrap'}}>
                  {[[bp.questions,'Qs'],[bp.totalMarks,'Marks'],[bp.units,'Units'],[`${bp.duration}m`,'Duration']].map(([v,l])=>(
                    <div key={l} style={{textAlign:'center',background:'var(--bg2)',borderRadius:6,padding:'6px 10px',flex:1,minWidth:60}}>
                      <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:16,color:'var(--text)'}}>{v}</div>
                      <div style={{fontSize:10.5,color:'var(--text3)',marginTop:1}}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* Sections */}
                <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:12}}>
                  {bp.sections.map((s,i)=>(
                    <div key={s.id} style={{fontSize:12.5,color:'var(--text2)',display:'flex',alignItems:'center',gap:6}}>
                      <span style={{color:'var(--cyan)',fontWeight:700,fontFamily:'var(--font-mono)',fontSize:11}}>{String.fromCharCode(65+i)}</span>
                      <span>{s.name}</span>
                      <span style={{marginLeft:'auto',fontFamily:'var(--font-mono)',color:'var(--text3)',fontSize:11}}>{s.count}×{s.marksEach}M</span>
                    </div>
                  ))}
                </div>

                <div style={{fontSize:11.5,color:'var(--text3)',marginBottom:14}}>Last used: {bp.lastUsed} · Excludes last {bp.exclusionRules.lastNPapers} papers</div>

                {/* Actions */}
                <div style={{display:'flex',gap:8,borderTop:'1px solid var(--border)',paddingTop:12}}>
                  <QFButton variant="secondary" size="sm" style={{flex:1,justifyContent:'center'}} onClick={()=>setEditing(bp)}>✏ Edit</QFButton>
                  <QFButton variant="primary" size="sm" style={{flex:1,justifyContent:'center'}} onClick={()=>onNav('teacher-generate')}>✦ Generate</QFButton>
                  <QFButton variant="danger" size="sm" onClick={()=>setDeleteConfirm(bp)}>✕</QFButton>
                </div>
              </div>
            </QFCard>
          ))}

          {/* Add new card */}
          <div onClick={()=>setEditing(blankBp)} style={{background:'var(--bg1)',border:'2px dashed var(--border)',borderRadius:'var(--radius-lg)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,cursor:'pointer',padding:32,minHeight:200,transition:'all 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)';e.currentTarget.style.color='var(--cyan)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text3)'}}>
            <div style={{fontSize:32,color:'inherit'}}>+</div>
            <div style={{fontSize:13,color:'inherit',fontWeight:500}}>New Blueprint</div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      <QFModal open={!!deleteConfirm} onClose={()=>setDeleteConfirm(null)} title="Delete Blueprint" width={440}
        footer={<><QFButton variant="ghost" onClick={()=>setDeleteConfirm(null)}>Cancel</QFButton><QFButton variant="danger" onClick={()=>handleDelete(deleteConfirm.id)}>Delete Blueprint</QFButton></>}>
        <p style={{fontSize:14,color:'var(--text2)',lineHeight:1.6}}>Are you sure you want to delete <strong style={{color:'var(--text)'}}>{deleteConfirm?.name}</strong>? This cannot be undone.</p>
      </QFModal>
    </div>
  );
}

function TeacherGenerate({ onNav }) {
  const [phase, setPhase] = React.useState('select'); // select | idle | generating | done
  const [selectedBP, setSelectedBP] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [logLines, setLogLines] = React.useState([]);
  const [constraints, setConstraints] = React.useState([]);

  const allBlueprints = [
    { id:1, name:'Standard Midterm', subject:'CS302', marks:50, questions:20, units:3, sections:['5 Short Answer (4M each)','3 Long Answer (10M each)'], lastUsed:'Apr 10, 2024', exclusion:2 },
    { id:2, name:'Quick Quiz', subject:'CS301', marks:20, questions:10, units:2, sections:['5 MCQ (1M each)','5 Short Answer (3M each)'], lastUsed:'Apr 15, 2024', exclusion:1 },
    { id:3, name:'Comprehensive Final', subject:'CS303', marks:100, questions:35, units:6, sections:['10 MCQ (2M each)','8 Short Answer (5M each)','4 Long Answer (10M each)'], lastUsed:'Mar 20, 2024', exclusion:3 },
    { id:4, name:'Algorithms Midterm', subject:'CS302', marks:50, questions:18, units:3, sections:['5 Short Answer (4M each)','3 Long Answer (10M each)'], lastUsed:'Apr 18, 2024', exclusion:2 },
  ];
  const [bpSearch, setBpSearch] = React.useState('');
  const blueprints = allBlueprints.filter(b => !bpSearch || b.name.toLowerCase().includes(bpSearch.toLowerCase()) || b.subject.toLowerCase().includes(bpSearch.toLowerCase()));

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
    <div className="qf-content qf-anim-in" style={{maxWidth:860}}>
      <QFPageHeader
        title="Generate Question Paper"
        subtitle={selectedBP ? `Blueprint: ${selectedBP.name} · ${selectedBP.subject} · ${selectedBP.marks} marks` : 'Select a blueprint to get started'}
        back="Dashboard" onBack={()=>onNav('teacher-dashboard')}
      />

      {/* Step indicator */}
      <div style={{marginBottom:24}}>
        <QFSteps steps={['Select Blueprint','Configure','Generate','Review']} current={phase==='select'?0:phase==='idle'?1:phase==='generating'?2:3} />
      </div>

      {/* Phase: Blueprint selection */}
      {phase === 'select' && (
        <div className="qf-anim-in">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15}}>Your Blueprints</div>
            <QFButton variant="secondary" size="sm" onClick={()=>onNav('teacher-blueprint')}>+ New Blueprint</QFButton>
          </div>

          {/* Search */}
          <div style={{display:'flex',gap:10,marginBottom:16,alignItems:'center'}}>
            <div style={{position:'relative',flex:1,maxWidth:340}}>
              <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontSize:14,pointerEvents:'none'}}>⌕</span>
              <input className="qf-input" placeholder="Search blueprints…" value={bpSearch} onChange={e=>setBpSearch(e.target.value)} style={{paddingLeft:34}} />
            </div>
            {bpSearch && <QFButton variant="ghost" size="sm" onClick={()=>setBpSearch('')}>Clear</QFButton>}
            <span style={{marginLeft:'auto',fontSize:12.5,color:'var(--text3)'}}>{blueprints.length} blueprint{blueprints.length!==1?'s':''}</span>
          </div>
          {blueprints.length === 0 ? (
            <QFEmptyState icon="⬢" title="No blueprints found" desc={`No blueprints match "${bpSearch}". Try a different search or create a new blueprint.`}
              action={<div style={{display:'flex',gap:8}}><QFButton variant="ghost" size="sm" onClick={()=>setBpSearch('')}>Clear search</QFButton><QFButton variant="primary" size="sm" onClick={()=>onNav('teacher-blueprint')}>+ New Blueprint</QFButton></div>}
            />
          ) : (
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
            {blueprints.map(bp => (
              <div key={bp.id}
                onClick={()=>setSelectedBP(bp)}
                style={{
                  background:'var(--bg1)',
                  border:`2px solid ${selectedBP?.id===bp.id?'var(--cyan)':'var(--border)'}`,
                  borderRadius:'var(--radius-lg)',
                  padding:'18px 20px',
                  cursor:'pointer',
                  transition:'all 0.15s',
                  boxShadow: selectedBP?.id===bp.id ? '0 0 20px var(--cyan-glow)' : 'none',
                }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                  <div>
                    <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:15,marginBottom:3}}>{bp.name}</div>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:11.5,color:'var(--cyan)',background:'var(--cyan-dim)',padding:'2px 7px',borderRadius:6}}>{bp.subject}</span>
                  </div>
                  {selectedBP?.id===bp.id && (
                    <div style={{width:22,height:22,background:'var(--cyan)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#070a10',fontSize:12,fontWeight:700,flexShrink:0}}>✓</div>
                  )}
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
                  <span className="qf-chip">{bp.questions} questions</span>
                  <span className="qf-chip">{bp.marks} marks</span>
                  <span className="qf-chip">{bp.units} units</span>
                  <span className="qf-chip">Exclude last {bp.exclusion} papers</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:3,marginBottom:10}}>
                  {bp.sections.map((s,i) => (
                    <div key={i} style={{fontSize:12,color:'var(--text3)',display:'flex',alignItems:'center',gap:6}}>
                      <span style={{color:'var(--cyan)',fontWeight:700,fontFamily:'var(--font-mono)'}}>{String.fromCharCode(65+i)}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11.5,color:'var(--text3)',borderTop:'1px solid var(--border)',paddingTop:8,marginTop:4}}>
                  Last used: {bp.lastUsed}
                </div>
              </div>
            ))}
          </div>
          )}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            {selectedBP
              ? <QFAIHint>Blueprint <strong style={{color:'var(--ai)'}}>{selectedBP.name}</strong> selected — {selectedBP.questions} questions from {selectedBP.subject}, excluding last {selectedBP.exclusion} papers.</QFAIHint>
              : <div style={{color:'var(--text3)',fontSize:13}}>Select a blueprint above to continue</div>
            }
            <QFButton variant="primary" disabled={!selectedBP} onClick={()=>setPhase('idle')} style={{marginLeft:16,flexShrink:0}}>
              Configure →
            </QFButton>
          </div>
        </div>
      )}

      {phase === 'idle' && (
        <QFCard glow className="qf-anim-in">
          <div className="qf-card-body" style={{textAlign:'center',padding:'40px 32px'}}>
            <div style={{fontSize:48,marginBottom:16,color:'var(--cyan)'}}>✦</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,marginBottom:8}}>Ready to generate</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:15,color:'var(--cyan)',marginBottom:10}}>{selectedBP?.name}</div>
            <p style={{color:'var(--text2)',fontSize:14,marginBottom:24,maxWidth:440,margin:'0 auto 24px',lineHeight:1.7}}>The blueprint engine will select questions from the bank, apply all constraint rules, and fill any gaps with AI assistance if enabled.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',marginBottom:24,flexWrap:'wrap'}}>
              {[[selectedBP?.questions||18,'Questions'],[selectedBP?.marks||50,'Total Marks'],[selectedBP?.units||3,'Units'],[selectedBP?.exclusion||2,'Papers Excluded']].map(([v,l])=>(
                <div key={l} style={{background:'var(--bg2)',borderRadius:'var(--radius)',padding:'12px 20px',textAlign:'center',minWidth:90}}>
                  <div style={{fontFamily:'var(--font-head)',fontSize:22,fontWeight:700,color:'var(--cyan)'}}>{v}</div>
                  <div style={{fontSize:11.5,color:'var(--text3)',marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10,justifyContent:'center'}}>
              <QFButton variant="secondary" onClick={()=>setPhase('select')}>← Change Blueprint</QFButton>
              <QFButton variant="primary" size="lg" onClick={startGeneration} icon={<span>✦</span>} style={{padding:'12px 32px',fontSize:15}}>Generate Paper</QFButton>
            </div>
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
