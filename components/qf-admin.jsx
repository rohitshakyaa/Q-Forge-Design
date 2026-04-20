// Admin Screens: Dashboard, PDF Upload, Question Extraction, Question Bank, Subjects, Users

function AdminDashboard({ onNav }) {
  const stats = [
    { label:'Total Questions', value:'4,821', sub:'+127 this week', color:'var(--cyan)', icon:'◈' },
    { label:'Documents Processed', value:'63', sub:'12 pending review', color:'var(--indigo)', icon:'⬡' },
    { label:'Active Teachers', value:'18', sub:'3 online now', color:'var(--success)', icon:'◉' },
    { label:'Papers Generated', value:'241', sub:'this semester', color:'var(--warn)', icon:'✦' },
  ];
  const recent = [
    { name:'DataStructures_2024.pdf', subject:'CS301', questions:47, status:'processed', time:'2h ago' },
    { name:'Algorithms_PastPapers.pdf', subject:'CS302', questions:null, status:'processing', time:'20m ago' },
    { name:'NetworkingSyllabus.pdf', subject:'CS401', questions:31, status:'review', time:'1d ago' },
    { name:'DBMS_Finals_2023.pdf', subject:'CS303', questions:55, status:'processed', time:'2d ago' },
  ];
  const activity = [
    { action:'Paper generated', detail:'Advanced Math Final — 28 questions', time:'5m ago', icon:'✦', color:'var(--cyan)' },
    { action:'Questions approved', detail:'42 questions from DBMS Past Papers', time:'1h ago', icon:'◈', color:'var(--success)' },
    { action:'Blueprint created', detail:'"Short Quiz Template" by Dr. Patel', time:'3h ago', icon:'⬡', color:'var(--indigo)' },
    { action:'PDF uploaded', detail:'Algorithms_PastPapers.pdf', time:'4h ago', icon:'⬆', color:'var(--warn)' },
    { action:'User added', detail:'Prof. Maria Chen — Teacher role', time:'1d ago', icon:'◉', color:'var(--text3)' },
  ];

  const statusMap = { processed:{v:'success',l:'Processed'}, processing:{v:'warn',l:'Processing…'}, review:{v:'indigo',l:'Needs Review'} };

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Admin Dashboard" subtitle="System overview and recent activity"
        actions={<><QFButton variant="secondary" icon="⬆" onClick={()=>onNav('admin-upload')}>Upload PDF</QFButton><QFButton variant="primary" onClick={()=>onNav('admin-questions')}>Review Queue</QFButton></>}
      />

      {/* Stats */}
      <div className="grid-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="qf-stat" style={{borderTop:`2px solid ${s.color}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <div className="qf-stat-label">{s.label}</div>
              <div style={{color:s.color,fontSize:20}}>{s.icon}</div>
            </div>
            <div className="qf-stat-value" style={{color:s.color}}>{s.value}</div>
            <div className="qf-stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:20}}>
        {/* Recent documents */}
        <QFCard>
          <div className="qf-card-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:14}}>
            <span style={{fontFamily:'var(--font-head)',fontWeight:600}}>Recent Documents</span>
            <QFButton variant="ghost" size="sm" onClick={()=>onNav('admin-upload')}>View all →</QFButton>
          </div>
          <table className="qf-table">
            <thead><tr><th>File</th><th>Subject</th><th>Questions</th><th>Status</th><th>Uploaded</th></tr></thead>
            <tbody>
              {recent.map(r => {
                const s = statusMap[r.status];
                return (
                  <tr key={r.name} style={{cursor:'pointer'}} onClick={()=>onNav(r.status==='review'?'admin-extraction':'admin-upload')}>
                    <td><div style={{fontWeight:500,fontSize:13}}>{r.name}</div></td>
                    <td><span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--text2)'}}>{r.subject}</span></td>
                    <td>{r.questions ?? <span style={{color:'var(--text3)'}}>—</span>}</td>
                    <td><QFBadge variant={s.v}>{s.l}</QFBadge></td>
                    <td style={{color:'var(--text3)',fontSize:12}}>{r.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </QFCard>

        {/* Activity feed */}
        <QFCard>
          <div className="qf-card-header" style={{paddingBottom:14}}>
            <span style={{fontFamily:'var(--font-head)',fontWeight:600}}>Activity Feed</span>
          </div>
          <div className="qf-card-body" style={{paddingTop:0}}>
            <div style={{display:'flex',flexDirection:'column',gap:0}}>
              {activity.map((a,i) => (
                <div key={i} style={{display:'flex',gap:12,padding:'12px 0',borderBottom:i<activity.length-1?'1px solid var(--border)':'none'}}>
                  <div style={{width:28,height:28,background:`${a.color}18`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:a.color,flexShrink:0,marginTop:1}}>{a.icon}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{a.action}</div>
                    <div style={{fontSize:12,color:'var(--text3)',marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.detail}</div>
                    <div style={{fontSize:11,color:'var(--text3)',marginTop:3}}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </QFCard>
      </div>

      {/* AI insights */}
      <div style={{marginTop:20}}>
        <QFAIHint>
          <strong style={{color:'var(--ai)'}}>AI Insight:</strong> Unit 3 (Graph Algorithms) in CS302 has only 8 questions — below the recommended minimum of 15 for adequate blueprint coverage. Consider uploading more past papers for this unit.
        </QFAIHint>
      </div>
    </div>
  );
}

function AdminUpload({ onNav }) {
  const [dragover, setDragover] = React.useState(false);
  const [files, setFiles] = React.useState([
    { name:'DBMS_Finals_2023.pdf', size:'2.4 MB', status:'done', progress:100, questions:55 },
    { name:'Algorithms_PastPapers.pdf', size:'3.8 MB', status:'processing', progress:62, questions:null },
    { name:'NetworkingSyllabus.pdf', size:'1.1 MB', status:'review', progress:100, questions:31 },
  ]);
  const [uploading, setUploading] = React.useState(false);

  const simulateUpload = () => {
    const newFile = { name:'NewPastPaper_2024.pdf', size:'2.1 MB', status:'processing', progress:0, questions:null };
    setFiles(p => [newFile, ...p]);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(iv); setFiles(prev => prev.map((f,i) => i===0 ? {...f, progress:100, status:'review', questions:38} : f)); }
      else setFiles(prev => prev.map((f,i) => i===0 ? {...f, progress:Math.round(p)} : f));
    }, 300);
  };

  const statusConfig = { done:{badge:'success',label:'Processed'}, processing:{badge:'warn',label:'Processing'}, review:{badge:'indigo',label:'Needs Review'} };

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="PDF Upload & Processing" subtitle="Upload syllabus documents and past question papers for AI extraction"
        back="Dashboard" onBack={()=>onNav('admin-dashboard')} />

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:24}}>
        <div>
          {/* Dropzone */}
          <div className={`qf-dropzone${dragover?' dragover':''}`} style={{marginBottom:24}}
            onDragOver={e=>{e.preventDefault();setDragover(true)}}
            onDragLeave={()=>setDragover(false)}
            onDrop={e=>{e.preventDefault();setDragover(false);simulateUpload();}}
            onClick={simulateUpload}>
            <div style={{fontSize:36,opacity:0.5}}>⬆</div>
            <div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:600,color:'var(--text2)'}}>Drop PDFs here or click to upload</div>
            <div style={{fontSize:13,color:'var(--text3)'}}>Supports syllabus documents and past question papers · PDF only · Max 50MB</div>
            <QFButton variant="secondary" size="sm">Browse files</QFButton>
          </div>

          {/* File list */}
          <QFCard>
            <div className="qf-card-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:14}}>
              <span style={{fontFamily:'var(--font-head)',fontWeight:600}}>Uploaded Documents</span>
              <QFBadge variant="neutral">{files.length} files</QFBadge>
            </div>
            <div>
              {files.map((f,i) => {
                const sc = statusConfig[f.status];
                return (
                  <div key={i} style={{padding:'14px 20px',borderBottom:i<files.length-1?'1px solid var(--border)':'none'}}>
                    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:f.status==='processing'?10:0}}>
                      <div style={{width:36,height:36,background:'var(--bg3)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>📄</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:500,fontSize:13.5,marginBottom:2}}>{f.name}</div>
                        <div style={{fontSize:12,color:'var(--text3)',display:'flex',gap:8}}>
                          <span>{f.size}</span>
                          {f.questions && <span>· {f.questions} questions extracted</span>}
                        </div>
                      </div>
                      <QFBadge variant={sc.badge}>{sc.label}</QFBadge>
                      {f.status === 'review' && <QFButton variant="ai" size="sm" onClick={()=>onNav('admin-extraction')}>Review →</QFButton>}
                    </div>
                    {f.status === 'processing' && (
                      <div style={{marginLeft:48}}>
                        <QFProgress value={f.progress} ai label={`Extracting questions… ${f.progress}%`} />
                        <div style={{marginTop:8,display:'flex',gap:16,fontSize:11.5,color:'var(--text3)'}}>
                          {[['OCR',f.progress>15],['Parse Structure',f.progress>35],['Classify Questions',f.progress>60],['Link Units',f.progress>80]].map(([step,done])=>(
                            <span key={step} style={{color:done?'var(--success)':'var(--text3)',display:'flex',alignItems:'center',gap:3}}>
                              {done?'✓':''}{step}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </QFCard>
        </div>

        {/* Side panel */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <QFCard>
            <div className="qf-card-body">
              <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:14}}>Processing Pipeline</div>
              {[
                {step:'PDF Upload',desc:'Files validated and queued',icon:'⬆',done:true},
                {step:'OCR Extraction',desc:'Text extracted from scanned pages',icon:'◈',done:true},
                {step:'Structure Parsing',desc:'Questions, marks, and units identified',icon:'⬡',done:false},
                {step:'Classification',desc:'Q-type, difficulty, unit tagged',icon:'✦',done:false},
                {step:'Review Queue',desc:'Admin approves extracted questions',icon:'◎',done:false},
              ].map((s,i)=>(
                <div key={i} style={{display:'flex',gap:10,marginBottom:14}}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:0}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:s.done?'var(--success-dim)':'var(--bg3)',border:`1.5px solid ${s.done?'var(--success)':'var(--border2)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:s.done?'var(--success)':'var(--text3)',flexShrink:0}}>{s.done?'✓':s.icon}</div>
                    {i<4 && <div style={{width:1,height:20,background:'var(--border)',margin:'2px 0'}} />}
                  </div>
                  <div style={{paddingBottom:14}}>
                    <div style={{fontSize:13,fontWeight:500,color:s.done?'var(--text)':'var(--text2)'}}>{s.step}</div>
                    <div style={{fontSize:11.5,color:'var(--text3)',marginTop:2}}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </QFCard>
          <QFAIHint>AI extracts questions, marks, and unit references automatically. Review helps correct misclassifications before adding to the bank.</QFAIHint>
        </div>
      </div>
    </div>
  );
}

function AdminExtraction({ onNav }) {
  const [questions, setQuestions] = React.useState([
    { id:1, text:'Explain the difference between BFS and DFS with time complexity analysis.', unit:'Unit 3 – Graph Algorithms', marks:10, type:'Long Answer', status:'pending', ai_conf:0.97 },
    { id:2, text:'What is a hash collision? Name two resolution techniques.', unit:'Unit 2 – Hashing', marks:5, type:'Short Answer', status:'approved', ai_conf:0.99 },
    { id:3, text:'Implement Dijkstra\'s algorithm for finding shortest paths.', unit:'Unit 3 – Graph Algorithms', marks:15, type:'Programming', status:'pending', ai_conf:0.88 },
    { id:4, text:'Define a B-tree. What are its properties?', unit:'Unit 4 – Trees', marks:5, type:'Short Answer', status:'rejected', ai_conf:0.91 },
    { id:5, text:'Compare quicksort and mergesort in terms of average and worst-case complexity.', unit:'Unit 1 – Sorting', marks:8, type:'Long Answer', status:'pending', ai_conf:0.95 },
  ]);
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

  const act = (id, status) => setQuestions(q => q.map(x => x.id===id ? {...x, status} : x));
  const filtered = filter==='all' ? questions : questions.filter(q=>q.status===filter);
  const pending = questions.filter(q=>q.status==='pending').length;

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Question Extraction Review" subtitle="NetworkingSyllabus.pdf · 31 questions extracted"
        back="Upload" onBack={()=>onNav('admin-upload')}
        actions={<><QFButton variant="secondary">Reject All</QFButton><QFButton variant="primary">Approve All ({pending})</QFButton></>}
      />
      <QFAIHint style={{marginBottom:20}}>
        <strong style={{color:'var(--ai)'}}>AI extracted 31 questions</strong> with 93% average confidence. 3 questions need manual review — low confidence scores flagged below.
      </QFAIHint>
      <div style={{marginBottom:20}}>
        <div className="qf-tabs" style={{display:'inline-flex'}}>
          {['all','pending','approved','rejected'].map(f=>(
            <div key={f} className={`qf-tab ${filter===f?'active':''}`} onClick={()=>setFilter(f)} style={{textTransform:'capitalize'}}>
              {f} {f==='all'?`(${questions.length})`:f==='pending'?`(${pending})`:''}
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:20}}>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {filtered.map(q => (
            <div key={q.id} onClick={()=>setSelected(q)} style={{background:'var(--bg1)',border:`1px solid ${selected?.id===q.id?'var(--cyan)':'var(--border)'}`,borderRadius:'var(--radius-lg)',padding:'14px 16px',cursor:'pointer',transition:'all 0.15s'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <div style={{flex:1}}>
                  <p style={{fontSize:13.5,lineHeight:1.6,marginBottom:8,color:'var(--text)'}}>{q.text}</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    <QFBadge variant="neutral">{q.unit}</QFBadge>
                    <QFBadge variant="neutral">{q.marks} marks</QFBadge>
                    <QFBadge variant="neutral">{q.type}</QFBadge>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:q.ai_conf>0.9?'var(--success)':'var(--warn)',background:q.ai_conf>0.9?'var(--success-dim)':'var(--warn-dim)',padding:'2px 7px',borderRadius:10}}>AI {Math.round(q.ai_conf*100)}%</span>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6,flexShrink:0}}>
                  {q.status==='pending' ? (
                    <>
                      <QFButton variant="primary" size="sm" onClick={e=>{e.stopPropagation();act(q.id,'approved')}}>✓ Approve</QFButton>
                      <QFButton variant="danger" size="sm" onClick={e=>{e.stopPropagation();act(q.id,'rejected')}}>✕ Reject</QFButton>
                    </>
                  ) : (
                    <QFBadge variant={q.status==='approved'?'success':'danger'} dot>{q.status==='approved'?'Approved':'Rejected'}</QFBadge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div>
          {selected ? (
            <QFCard style={{position:'sticky',top:20}}>
              <div className="qf-card-body">
                <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:14}}>Edit Question</div>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <QFInput label="Question text" type="textarea" value={selected.text} onChange={()=>{}} rows={4} />
                  <QFSelect label="Unit" value={selected.unit} onChange={()=>{}} options={['Unit 1 – Sorting','Unit 2 – Hashing','Unit 3 – Graph Algorithms','Unit 4 – Trees']} />
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    <QFInput label="Marks" value={String(selected.marks)} onChange={()=>{}} type="number" />
                    <QFSelect label="Type" value={selected.type} onChange={()=>{}} options={['Short Answer','Long Answer','MCQ','Programming']} />
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <QFButton variant="primary" onClick={()=>act(selected.id,'approved')} style={{flex:1,justifyContent:'center'}}>✓ Approve</QFButton>
                    <QFButton variant="danger" onClick={()=>act(selected.id,'rejected')} style={{flex:1,justifyContent:'center'}}>✕ Reject</QFButton>
                  </div>
                </div>
              </div>
            </QFCard>
          ) : (
            <QFCard>
              <QFEmptyState icon="◈" title="Select a question" desc="Click any question to review and edit its details before approving." />
            </QFCard>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminQuestionBank({ onNav }) {
  const [search, setSearch] = React.useState('');
  const [subjectFilter, setSubjectFilter] = React.useState('all');
  const questions = [
    { id:1, text:'Explain the difference between BFS and DFS with time complexity.', subject:'CS302', unit:'Unit 3', marks:10, type:'Long Answer', used:3, difficulty:'Medium' },
    { id:2, text:'What is a hash collision? Name two resolution techniques.', subject:'CS302', unit:'Unit 2', marks:5, type:'Short Answer', used:1, difficulty:'Easy' },
    { id:3, text:'Implement Dijkstra\'s algorithm for shortest paths.', subject:'CS302', unit:'Unit 3', marks:15, type:'Programming', used:0, difficulty:'Hard' },
    { id:4, text:'Define a B-tree and list its properties.', subject:'CS303', unit:'Unit 4', marks:5, type:'Short Answer', used:5, difficulty:'Easy' },
    { id:5, text:'Compare quicksort and mergesort in worst-case complexity.', subject:'CS302', unit:'Unit 1', marks:8, type:'Long Answer', used:2, difficulty:'Medium' },
    { id:6, text:'What is database normalization? Explain 3NF with an example.', subject:'CS303', unit:'Unit 2', marks:12, type:'Long Answer', used:4, difficulty:'Medium' },
  ];
  const filtered = questions.filter(q =>
    (subjectFilter==='all' || q.subject===subjectFilter) &&
    (!search || q.text.toLowerCase().includes(search.toLowerCase()))
  );
  const diffColor = { Easy:'var(--success)', Medium:'var(--warn)', Hard:'var(--danger)' };

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Question Bank" subtitle={`${questions.length} approved questions across all subjects`}
        actions={<><QFButton variant="ai" icon="✦">AI Suggest</QFButton><QFButton variant="primary">+ Add Question</QFButton></>}
      />
      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}>
        <QFInput placeholder="Search questions…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:280,margin:0}} />
        <QFSelect value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)} options={[{value:'all',label:'All Subjects'},{value:'CS302',label:'CS302 – Algorithms'},{value:'CS303',label:'CS303 – DBMS'}]} style={{width:200,margin:0}} />
        <QFSelect value="all" onChange={()=>{}} options={['All Types','Short Answer','Long Answer','MCQ','Programming']} style={{width:160,margin:0}} />
        <QFSelect value="all" onChange={()=>{}} options={['All Difficulties','Easy','Medium','Hard']} style={{width:160,margin:0}} />
      </div>
      <QFCard>
        <table className="qf-table">
          <thead><tr><th style={{paddingLeft:20}}>Question</th><th>Subject</th><th>Unit</th><th>Type</th><th>Marks</th><th>Difficulty</th><th>Used</th><th></th></tr></thead>
          <tbody>
            {filtered.map(q => (
              <tr key={q.id}>
                <td style={{paddingLeft:20,maxWidth:320}}>
                  <div style={{fontSize:13,lineHeight:1.5,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{q.text}</div>
                </td>
                <td><span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--cyan)'}}>{q.subject}</span></td>
                <td style={{color:'var(--text2)',fontSize:12.5}}>{q.unit}</td>
                <td><QFBadge variant="neutral">{q.type}</QFBadge></td>
                <td style={{fontFamily:'var(--font-mono)',fontSize:13,fontWeight:600}}>{q.marks}</td>
                <td><span style={{color:diffColor[q.difficulty],fontSize:12.5,fontWeight:600}}>{q.difficulty}</span></td>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:4}}>
                    <div style={{width:32,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                      <div style={{width:`${Math.min(q.used/6*100,100)}%`,height:'100%',background:q.used>4?'var(--warn)':'var(--cyan)'}} />
                    </div>
                    <span style={{fontSize:12,color:'var(--text3)'}}>{q.used}×</span>
                  </div>
                </td>
                <td><QFButton variant="ghost" size="sm">Edit</QFButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </QFCard>
    </div>
  );
}

function AdminSubjects({ onNav }) {
  const subjects = [
    { code:'CS301', name:'Data Structures', units:5, questions:142, teachers:3 },
    { code:'CS302', name:'Algorithms', units:6, questions:198, teachers:4 },
    { code:'CS303', name:'Database Management', units:7, questions:167, teachers:2 },
    { code:'CS401', name:'Computer Networks', units:5, questions:89, teachers:3 },
    { code:'MA201', name:'Discrete Mathematics', units:8, questions:224, teachers:5 },
  ];

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Subjects & Units" subtitle="Manage academic subjects and their unit structure"
        actions={<QFButton variant="primary">+ New Subject</QFButton>} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
        {subjects.map(s => (
          <QFCard key={s.code} style={{cursor:'pointer',transition:'border-color 0.15s'}} className="hover-card">
            <div className="qf-card-body">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--cyan)',background:'var(--cyan-dim)',padding:'3px 8px',borderRadius:6}}>{s.code}</span>
                <QFButton variant="ghost" size="sm">Edit</QFButton>
              </div>
              <div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:700,marginBottom:4}}>{s.name}</div>
              <div style={{display:'flex',gap:16,marginTop:12}}>
                {[[s.units,'Units'],[s.questions,'Questions'],[s.teachers,'Teachers']].map(([val,lbl])=>(
                  <div key={lbl} style={{textAlign:'center'}}>
                    <div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:700,color:'var(--text)'}}>{val}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{lbl}</div>
                  </div>
                ))}
              </div>
              <div className="qf-divider" />
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {Array.from({length:s.units},(_,i)=>(
                  <span key={i} className="qf-chip">Unit {i+1}</span>
                ))}
              </div>
            </div>
          </QFCard>
        ))}
        <div style={{background:'var(--bg1)',border:'2px dashed var(--border)',borderRadius:'var(--radius-lg)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,cursor:'pointer',padding:32,transition:'border-color 0.15s',minHeight:160}}
          onMouseEnter={e=>e.currentTarget.style.borderColor='var(--cyan)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
          <div style={{fontSize:32,color:'var(--text3)'}}>+</div>
          <div style={{color:'var(--text3)',fontSize:13}}>Add new subject</div>
        </div>
      </div>
    </div>
  );
}

function AdminUsers({ onNav }) {
  const users = [
    { name:'Dr. Sarah Johnson', email:'s.johnson@inst.edu', role:'Teacher', subjects:['CS301','CS302'], status:'active', lastSeen:'2m ago' },
    { name:'Prof. Alex Chen', email:'a.chen@inst.edu', role:'Teacher', subjects:['CS303','CS401'], status:'active', lastSeen:'1h ago' },
    { name:'Dr. Priya Patel', email:'p.patel@inst.edu', role:'Teacher', subjects:['MA201'], status:'active', lastSeen:'3h ago' },
    { name:'Robert Kim', email:'r.kim@inst.edu', role:'Admin', subjects:[], status:'active', lastSeen:'5m ago' },
    { name:'Maria Santos', email:'m.santos@inst.edu', role:'Teacher', subjects:['CS302'], status:'inactive', lastSeen:'2d ago' },
  ];
  const colors = ['var(--cyan)','var(--indigo)','var(--violet)','var(--success)','var(--warn)'];
  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Users & Roles" subtitle="Manage teacher and administrator accounts"
        actions={<QFButton variant="primary">+ Invite User</QFButton>} />
      <QFCard>
        <table className="qf-table">
          <thead><tr><th style={{paddingLeft:20}}>User</th><th>Role</th><th>Subjects</th><th>Status</th><th>Last Active</th><th></th></tr></thead>
          <tbody>
            {users.map((u,i) => (
              <tr key={u.email}>
                <td style={{paddingLeft:20}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <QFAvatar name={u.name} size={32} color={colors[i%colors.length]} />
                    <div>
                      <div style={{fontWeight:500,fontSize:13.5}}>{u.name}</div>
                      <div style={{fontSize:12,color:'var(--text3)'}}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><QFBadge variant={u.role==='Admin'?'cyan':'indigo'}>{u.role}</QFBadge></td>
                <td><div style={{display:'flex',gap:4,flexWrap:'wrap'}}>{u.subjects.length?u.subjects.map(s=><span key={s} className="qf-chip" style={{fontSize:11}}>{s}</span>):<span style={{color:'var(--text3)',fontSize:12}}>All subjects</span>}</div></td>
                <td><QFBadge variant={u.status==='active'?'success':'neutral'} dot>{u.status==='active'?'Active':'Inactive'}</QFBadge></td>
                <td style={{color:'var(--text3)',fontSize:12}}>{u.lastSeen}</td>
                <td><QFButton variant="ghost" size="sm">Manage</QFButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </QFCard>
    </div>
  );
}

Object.assign(window, { AdminDashboard, AdminUpload, AdminExtraction, AdminQuestionBank, AdminSubjects, AdminUsers });
