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

const INIT_SUBJECTS = [
  { code:'CS301', name:'Data Structures', teachers:3, description:'Fundamental data structures including arrays, linked lists, trees, and graphs.',
    syllabus:'## CS301 – Data Structures\n\n**Course Overview:** This course covers fundamental data structures and their applications.\n\n### Unit 1: Arrays & Linked Lists\n- Static and dynamic arrays\n- Singly, doubly, and circular linked lists\n- Stack and Queue implementations\n\n### Unit 2: Trees\n- Binary trees and BST\n- AVL trees, Red-Black trees\n- Heap and Priority Queue\n\n### Unit 3: Graphs\n- Representation (adjacency matrix/list)\n- BFS, DFS traversal\n- Shortest path algorithms\n\n### Unit 4: Hashing\n- Hash functions\n- Collision resolution\n- Applications\n\n### Unit 5: Advanced Structures\n- Tries, Segment Trees\n- Disjoint Sets',
    units:[
      {id:1,name:'Arrays & Linked Lists',questions:[{id:1,text:'What is the time complexity of inserting at the beginning of a linked list?',marks:4,type:'Short Answer'},{id:2,text:'Compare arrays and linked lists in terms of memory and access time.',marks:6,type:'Long Answer'}]},
      {id:2,name:'Trees',questions:[{id:3,text:'Define AVL tree and explain rotation operations.',marks:8,type:'Long Answer'},{id:4,text:'What is the height of a balanced BST with n nodes?',marks:4,type:'Short Answer'}]},
      {id:3,name:'Graphs',questions:[{id:5,text:'Explain BFS and DFS with examples.',marks:10,type:'Long Answer'}]},
      {id:4,name:'Hashing',questions:[{id:6,text:'Describe open addressing for collision resolution.',marks:5,type:'Short Answer'}]},
      {id:5,name:'Advanced Structures',questions:[]},
    ]},
  { code:'CS302', name:'Algorithms', teachers:4, description:'Algorithm design, analysis, and complexity theory.',
    syllabus:'## CS302 – Algorithms\n\n**Course Overview:** Design and analysis of algorithms.\n\n### Unit 1: Sorting & Searching\n- QuickSort, MergeSort, HeapSort\n- Binary Search\n\n### Unit 2: Hashing\n- Hash tables and applications\n\n### Unit 3: Graph Algorithms\n- Dijkstra, Bellman-Ford\n- MST: Prim, Kruskal\n\n### Unit 4: Dynamic Programming\n- Knapsack, LCS, Matrix Chain\n\n### Unit 5: Greedy Algorithms\n- Activity Selection, Huffman Coding\n\n### Unit 6: NP-Completeness\n- P vs NP, Reductions',
    units:[
      {id:1,name:'Sorting & Searching',questions:[{id:10,text:'Derive the time complexity of MergeSort.',marks:8,type:'Long Answer'},{id:11,text:'What is a stable sort? Give an example.',marks:4,type:'Short Answer'}]},
      {id:2,name:'Hashing',questions:[{id:12,text:'What is a hash collision? Name two resolution techniques.',marks:5,type:'Short Answer'}]},
      {id:3,name:'Graph Algorithms',questions:[{id:13,text:'Explain Dijkstra\'s algorithm with a worked example.',marks:12,type:'Long Answer'}]},
      {id:4,name:'Dynamic Programming',questions:[{id:14,text:'Solve the 0/1 Knapsack problem using DP.',marks:10,type:'Long Answer'}]},
      {id:5,name:'Greedy Algorithms',questions:[]},
      {id:6,name:'NP-Completeness',questions:[]},
    ]},
  { code:'CS303', name:'Database Management', teachers:2, description:'Relational databases, SQL, normalization, and transactions.',
    syllabus:'## CS303 – Database Management\n\n**Course Overview:** Principles of database systems.\n\n### Unit 1: Introduction\n- DBMS concepts and architecture\n- Data models\n\n### Unit 2: Relational Model & SQL\n- ER diagrams\n- SQL: DDL, DML, DCL\n\n### Unit 3: Normalization\n- 1NF, 2NF, 3NF, BCNF\n- Functional dependencies\n\n### Unit 4: Transactions\n- ACID properties\n- Concurrency control\n\n### Unit 5: Indexing\n- B+ trees, Hashing\n- Query optimization',
    units:[
      {id:1,name:'Introduction',questions:[{id:20,text:'What is a DBMS? List its advantages over file systems.',marks:5,type:'Short Answer'}]},
      {id:2,name:'Relational Model & SQL',questions:[{id:21,text:'Write SQL to find the second highest salary from an Employee table.',marks:6,type:'Short Answer'},{id:22,text:'Explain ER diagrams with a university example.',marks:10,type:'Long Answer'}]},
      {id:3,name:'Normalization',questions:[{id:23,text:'Define BCNF and explain with an example.',marks:8,type:'Long Answer'}]},
      {id:4,name:'Transactions',questions:[]},
      {id:5,name:'Indexing',questions:[]},
    ]},
];

function SubjectDetail({ subject, onBack, onUpdate }) {
  const [tab, setTab] = React.useState('overview');
  const [subj, setSubj] = React.useState(subject);

  // Unit state
  const [unitModal, setUnitModal] = React.useState(null); // null | {id?,name:''}
  const [deleteUnit, setDeleteUnit] = React.useState(null);
  const [unitFilter, setUnitFilter] = React.useState('all');

  // Question state
  const [addQModal, setAddQModal] = React.useState(null); // null | {unitId, mode:'type'|'upload'}
  const [newQ, setNewQ] = React.useState({text:'',marks:5,type:'Short Answer'});
  const [uploading, setUploading] = React.useState(false);

  // Syllabus state
  const [syllabusMode, setSyllabusMode] = React.useState('view'); // view | edit | upload
  const [syllabusEdit, setSyllabusEdit] = React.useState(subj.syllabus);
  const [syllabusUploading, setSyllabusUploading] = React.useState(false);

  const saveUnit = () => {
    if (!unitModal?.name?.trim()) return;
    if (unitModal.id) {
      setSubj(s=>({...s, units:s.units.map(u=>u.id===unitModal.id?{...u,name:unitModal.name}:u)}));
    } else {
      setSubj(s=>({...s, units:[...s.units,{id:Date.now(),name:unitModal.name,questions:[]}]}));
    }
    setUnitModal(null);
  };

  const saveQuestion = () => {
    if (!newQ.text.trim()) return;
    setSubj(s=>({...s, units:s.units.map(u=>u.id===addQModal.unitId?{...u,questions:[...u.questions,{id:Date.now(),...newQ}]}:u)}));
    setNewQ({text:'',marks:5,type:'Short Answer'});
    setAddQModal(null);
  };

  const simulateUploadQ = () => {
    setUploading(true);
    setTimeout(()=>{
      setSubj(s=>({...s, units:s.units.map(u=>u.id===addQModal.unitId?{...u,questions:[...u.questions,{id:Date.now(),text:'[Extracted] What is the significance of balanced trees in database indexing?',marks:6,type:'Short Answer'}]}:u)}));
      setUploading(false);
      setAddQModal(null);
    }, 2000);
  };

  const simulateSyllabusUpload = () => {
    setSyllabusUploading(true);
    setTimeout(()=>{
      setSubj(s=>({...s, syllabus:'## Updated Syllabus (Uploaded)\n\nThis syllabus was uploaded and replaced the previous one.\n\n### Unit 1\n- Topic A\n- Topic B\n\n### Unit 2\n- Topic C\n- Topic D'}));
      setSyllabusEdit('## Updated Syllabus (Uploaded)\n\nThis syllabus was uploaded and replaced the previous one.\n\n### Unit 1\n- Topic A\n- Topic B\n\n### Unit 2\n- Topic C\n- Topic D');
      setSyllabusUploading(false);
      setSyllabusMode('view');
    }, 2000);
  };

  const allQuestions = subj.units.flatMap(u=>u.questions.map(q=>({...q,unitName:u.name,unitId:u.id})));
  const visibleQuestions = unitFilter==='all' ? allQuestions : allQuestions.filter(q=>q.unitId===+unitFilter);

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title={subj.name} subtitle={`${subj.code} · ${subj.units.length} units · ${allQuestions.length} questions`}
        back="Subjects & Units" onBack={()=>{ onUpdate(subj); onBack(); }}
        actions={<QFButton variant="primary" onClick={()=>setUnitModal({name:''})}>+ Add Unit</QFButton>}
      />

      {/* Tabs */}
      <div className="qf-tabs" style={{display:'inline-flex',marginBottom:24}}>
        {['overview','questions','syllabus'].map(t=>(
          <div key={t} className={`qf-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)} style={{textTransform:'capitalize'}}>{t}</div>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab==='overview' && (
        <div className="qf-anim-in">
          <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
            {/* Units list */}
            <div>
              <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,marginBottom:14}}>Units</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {subj.units.map((u,i)=>(
                  <QFCard key={u.id}>
                    <div className="qf-card-body" style={{padding:'14px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:12}}>
                        <div style={{width:32,height:32,background:'var(--cyan-dim)',border:'1px solid var(--cyan)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--cyan)',fontWeight:700,fontSize:13,flexShrink:0}}>{i+1}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600,fontSize:14}}>{u.name}</div>
                          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{u.questions.length} question{u.questions.length!==1?'s':''}</div>
                        </div>
                        <div style={{display:'flex',gap:6}}>
                          <QFButton variant="ghost" size="sm" onClick={()=>{setTab('questions');setUnitFilter(String(u.id));}}>View Qs</QFButton>
                          <QFButton variant="secondary" size="sm" onClick={()=>setAddQModal({unitId:u.id,mode:'type'})}>+ Add Q</QFButton>
                          <QFButton variant="ghost" size="sm" onClick={()=>setUnitModal({id:u.id,name:u.name})}>✏</QFButton>
                          <QFButton variant="danger" size="sm" onClick={()=>setDeleteUnit(u)}>✕</QFButton>
                        </div>
                      </div>
                    </div>
                  </QFCard>
                ))}
                {subj.units.length===0 && <QFEmptyState icon="⬢" title="No units yet" desc="Add the first unit to this subject." action={<QFButton variant="primary" onClick={()=>setUnitModal({name:''})}>+ Add Unit</QFButton>} />}
              </div>
            </div>
            {/* Subject info */}
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <QFCard>
                <div className="qf-card-body">
                  <div style={{fontFamily:'var(--font-head)',fontWeight:600,marginBottom:14}}>Subject Info</div>
                  {[[subj.units.length,'Units'],[allQuestions.length,'Questions'],[subj.teachers,'Teachers']].map(([v,l])=>(
                    <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                      <span style={{color:'var(--text2)',fontSize:13}}>{l}</span>
                      <span style={{fontFamily:'var(--font-mono)',fontWeight:700,color:'var(--cyan)'}}>{v}</span>
                    </div>
                  ))}
                  <div style={{marginTop:14}}>
                    <div style={{fontSize:12,color:'var(--text3)',marginBottom:6}}>Description</div>
                    <p style={{fontSize:13,color:'var(--text2)',lineHeight:1.6}}>{subj.description}</p>
                  </div>
                </div>
              </QFCard>
              <QFCard>
                <div className="qf-card-body">
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                    <div style={{fontFamily:'var(--font-head)',fontWeight:600}}>Syllabus</div>
                    <QFButton variant="ghost" size="sm" onClick={()=>setTab('syllabus')}>Manage →</QFButton>
                  </div>
                  <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.6,maxHeight:120,overflow:'hidden',position:'relative'}}>
                    {subj.syllabus ? subj.syllabus.split('\n').slice(0,6).join('\n') : 'No syllabus uploaded.'}
                    <div style={{position:'absolute',bottom:0,left:0,right:0,height:40,background:'linear-gradient(transparent,var(--bg1))'}} />
                  </div>
                </div>
              </QFCard>
              <QFButton variant="secondary" onClick={()=>setAddQModal({unitId:subj.units[0]?.id,mode:'type'})} style={{justifyContent:'center'}}>+ Add Question</QFButton>
            </div>
          </div>
        </div>
      )}

      {/* ── QUESTIONS TAB ── */}
      {tab==='questions' && (
        <div className="qf-anim-in">
          <div style={{display:'flex',gap:12,marginBottom:20,alignItems:'center',flexWrap:'wrap'}}>
            <select className="qf-input qf-select" value={unitFilter} onChange={e=>setUnitFilter(e.target.value)} style={{width:220}}>
              <option value="all">All Units ({allQuestions.length} questions)</option>
              {subj.units.map(u=><option key={u.id} value={String(u.id)}>{u.name} ({u.questions.length})</option>)}
            </select>
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              <QFButton variant="secondary" size="sm" onClick={()=>setAddQModal({unitId:subj.units[0]?.id,mode:'upload'})}>⬆ Upload PDF/Image</QFButton>
              <QFButton variant="primary" size="sm" onClick={()=>setAddQModal({unitId:subj.units[0]?.id,mode:'type'})}>+ Add Question</QFButton>
            </div>
          </div>
          {visibleQuestions.length===0
            ? <QFEmptyState icon="◈" title="No questions" desc="This unit has no questions yet. Add them manually or upload a PDF." action={<QFButton variant="primary" onClick={()=>setAddQModal({unitId:+unitFilter||subj.units[0]?.id,mode:'type'})}>+ Add Question</QFButton>} />
            : <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {visibleQuestions.map((q,i)=>(
                  <QFCard key={q.id}>
                    <div className="qf-card-body" style={{padding:'14px 18px'}}>
                      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                        <span style={{fontFamily:'var(--font-mono)',fontSize:12,fontWeight:700,color:'var(--cyan)',flexShrink:0,marginTop:2}}>{i+1}.</span>
                        <div style={{flex:1}}>
                          <p style={{fontSize:13.5,lineHeight:1.6,marginBottom:8}}>{q.text}</p>
                          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                            <QFBadge variant="neutral">{q.unitName}</QFBadge>
                            <QFBadge variant="neutral">{q.type}</QFBadge>
                            <QFBadge variant="neutral">{q.marks} marks</QFBadge>
                          </div>
                        </div>
                        <QFButton variant="ghost" size="sm">Edit</QFButton>
                      </div>
                    </div>
                  </QFCard>
                ))}
              </div>
          }
        </div>
      )}

      {/* ── SYLLABUS TAB ── */}
      {tab==='syllabus' && (
        <div className="qf-anim-in" style={{maxWidth:800}}>
          <div style={{display:'flex',gap:8,marginBottom:20}}>
            {['view','edit','upload'].map(m=>(
              <QFButton key={m} variant={syllabusMode===m?'primary':'secondary'} size="sm" onClick={()=>setSyllabusMode(m)} style={{textTransform:'capitalize'}}>{m==='view'?'👁 View':m==='edit'?'✏ Edit Manually':'⬆ Upload'}</QFButton>
            ))}
          </div>

          {syllabusMode==='view' && (
            <QFCard className="qf-anim-in">
              <div className="qf-card-body">
                {subj.syllabus
                  ? <pre style={{fontFamily:'var(--font-body)',fontSize:13.5,lineHeight:1.8,color:'var(--text2)',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>{subj.syllabus}</pre>
                  : <QFEmptyState icon="📄" title="No syllabus uploaded" desc="Upload a PDF or type the syllabus manually." action={<div style={{display:'flex',gap:8}}><QFButton variant="secondary" size="sm" onClick={()=>setSyllabusMode('edit')}>✏ Edit Manually</QFButton><QFButton variant="primary" size="sm" onClick={()=>setSyllabusMode('upload')}>⬆ Upload</QFButton></div>} />
                }
              </div>
            </QFCard>
          )}

          {syllabusMode==='edit' && (
            <div className="qf-anim-in" style={{display:'flex',flexDirection:'column',gap:12}}>
              <QFAIHint>Editing replaces the current syllabus. Use Markdown for structure — headings (##, ###), bullets (-), bold (**text**).</QFAIHint>
              <textarea className="qf-input qf-textarea" rows={22} value={syllabusEdit} onChange={e=>setSyllabusEdit(e.target.value)} style={{fontFamily:'var(--font-mono)',fontSize:13,lineHeight:1.7}} />
              <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                <QFButton variant="ghost" onClick={()=>{setSyllabusEdit(subj.syllabus);setSyllabusMode('view');}}>Cancel</QFButton>
                <QFButton variant="primary" onClick={()=>{setSubj(s=>({...s,syllabus:syllabusEdit}));setSyllabusMode('view');}}>Save Syllabus</QFButton>
              </div>
            </div>
          )}

          {syllabusMode==='upload' && (
            <div className="qf-anim-in" style={{display:'flex',flexDirection:'column',gap:14}}>
              <div style={{background:'var(--warn-dim)',border:'1px solid var(--warn)',borderRadius:'var(--radius)',padding:'10px 14px',fontSize:13,color:'var(--warn)'}}>
                ⚠ Uploading a new syllabus will <strong>replace</strong> the current one entirely.
              </div>
              {syllabusUploading
                ? <QFCard><div className="qf-card-body" style={{textAlign:'center',padding:'40px'}}><QFSpinner size={32} /><div style={{marginTop:16,color:'var(--text2)'}}>Extracting syllabus from document…</div><QFProgress value={60} ai style={{marginTop:16}} /></div></QFCard>
                : <div className="qf-dropzone" onClick={simulateSyllabusUpload} onDragOver={e=>{e.preventDefault()}} onDrop={e=>{e.preventDefault();simulateSyllabusUpload();}}>
                    <div style={{fontSize:36,opacity:0.5}}>⬆</div>
                    <div style={{fontFamily:'var(--font-head)',fontWeight:600,fontSize:15,color:'var(--text2)'}}>Drop syllabus PDF here or click to upload</div>
                    <div style={{fontSize:13,color:'var(--text3)'}}>PDF, Word document, or image · Max 20MB</div>
                    <div style={{fontSize:12.5,color:'var(--text3)'}}>AI will extract and structure the syllabus automatically</div>
                    <QFButton variant="secondary" size="sm">Browse files</QFButton>
                  </div>
              }
            </div>
          )}
        </div>
      )}

      {/* ── Modals ── */}
      {/* Unit add/edit modal */}
      <QFModal open={!!unitModal} onClose={()=>setUnitModal(null)} title={unitModal?.id?'Edit Unit':'Add Unit'} width={420}
        footer={<><QFButton variant="ghost" onClick={()=>setUnitModal(null)}>Cancel</QFButton><QFButton variant="primary" onClick={saveUnit}>Save Unit</QFButton></>}>
        <QFInput label="Unit name *" placeholder='e.g. "Graph Algorithms"' value={unitModal?.name||''} onChange={e=>setUnitModal(p=>({...p,name:e.target.value}))} />
      </QFModal>

      {/* Delete unit confirm */}
      <QFModal open={!!deleteUnit} onClose={()=>setDeleteUnit(null)} title="Delete Unit" width={420}
        footer={<><QFButton variant="ghost" onClick={()=>setDeleteUnit(null)}>Cancel</QFButton><QFButton variant="danger" onClick={()=>{setSubj(s=>({...s,units:s.units.filter(u=>u.id!==deleteUnit.id)}));setDeleteUnit(null);}}>Delete Unit</QFButton></>}>
        <p style={{fontSize:14,color:'var(--text2)',lineHeight:1.6}}>Delete <strong style={{color:'var(--text)'}}>{deleteUnit?.name}</strong>? All {deleteUnit?.questions?.length||0} questions in this unit will also be removed.</p>
      </QFModal>

      {/* Add Question modal */}
      <QFModal open={!!addQModal} onClose={()=>{setAddQModal(null);setUploading(false);}} title="Add Question" width={560}
        footer={addQModal?.mode==='type'?<><QFButton variant="ghost" onClick={()=>setAddQModal(null)}>Cancel</QFButton><QFButton variant="primary" onClick={saveQuestion}>Add Question</QFButton></>:null}>
        {addQModal && (
          <div>
            {/* Unit selector */}
            <QFSelect label="Add to unit" value={String(addQModal.unitId)} onChange={e=>setAddQModal(p=>({...p,unitId:+e.target.value}))} options={subj.units.map(u=>({value:String(u.id),label:u.name}))} style={{marginBottom:16}} />
            {/* Mode tabs */}
            <div className="qf-tabs" style={{display:'inline-flex',marginBottom:16}}>
              {[['type','✏ Type Manually'],['upload','⬆ Upload PDF / Image']].map(([m,l])=>(
                <div key={m} className={`qf-tab ${addQModal.mode===m?'active':''}`} onClick={()=>setAddQModal(p=>({...p,mode:m}))}>{l}</div>
              ))}
            </div>
            {addQModal.mode==='type' && (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <QFInput label="Question text *" type="textarea" rows={3} value={newQ.text} onChange={e=>setNewQ(p=>({...p,text:e.target.value}))} placeholder="Enter the full question here…" />
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <QFInput label="Marks" type="number" value={String(newQ.marks)} onChange={e=>setNewQ(p=>({...p,marks:+e.target.value}))} />
                  <QFSelect label="Question type" value={newQ.type} onChange={e=>setNewQ(p=>({...p,type:e.target.value}))} options={['Short Answer','Long Answer','MCQ','Programming','Case Study']} />
                </div>
              </div>
            )}
            {addQModal.mode==='upload' && (
              <div>
                {uploading
                  ? <div style={{textAlign:'center',padding:'32px 0'}}><QFSpinner size={28} /><div style={{marginTop:12,color:'var(--text2)',fontSize:13}}>Extracting questions from document…</div><div style={{marginTop:12}}><QFProgress value={55} ai /></div></div>
                  : <div className="qf-dropzone" onClick={simulateUploadQ} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();simulateUploadQ();}}>
                      <div style={{fontSize:36,opacity:0.5}}>⬆</div>
                      <div style={{fontFamily:'var(--font-head)',fontWeight:600,color:'var(--text2)'}}>Drop file here or click to upload</div>
                      <div style={{fontSize:12.5,color:'var(--text3)'}}>PDF, JPG, PNG · AI extracts questions automatically</div>
                      <QFButton variant="secondary" size="sm">Browse files</QFButton>
                    </div>
                }
                <QFAIHint style={{marginTop:12}}>Extracted questions will be added directly to the selected unit after AI processing.</QFAIHint>
              </div>
            )}
          </div>
        )}
      </QFModal>
    </div>
  );
}

function AdminSubjects({ onNav }) {
  const [subjects, setSubjects] = React.useState(INIT_SUBJECTS);
  const [selected, setSelected] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newSubj, setNewSubj] = React.useState({code:'',name:'',description:''});
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  if (selected) {
    return <SubjectDetail subject={selected} onBack={()=>setSelected(null)} onUpdate={updated=>setSubjects(ss=>ss.map(s=>s.code===updated.code?updated:s))} />;
  }

  const addSubject = () => {
    if (!newSubj.code || !newSubj.name) return;
    setSubjects(ss=>[...ss,{...newSubj,teachers:0,syllabus:'',units:[]}]);
    setNewSubj({code:'',name:'',description:''});
    setShowAdd(false);
  };

  return (
    <div className="qf-content qf-anim-in">
      <QFPageHeader title="Subjects & Units" subtitle="Manage academic subjects, units, questions, and syllabi"
        actions={<QFButton variant="primary" onClick={()=>setShowAdd(true)}>+ New Subject</QFButton>} />
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
        {subjects.map(s => {
          const totalQ = s.units.flatMap(u=>u.questions).length;
          return (
            <QFCard key={s.code} style={{transition:'all 0.15s'}}>
              <div className="qf-card-body">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--cyan)',background:'var(--cyan-dim)',padding:'3px 8px',borderRadius:6}}>{s.code}</span>
                  <div style={{display:'flex',gap:4}}>
                    <QFButton variant="ghost" size="sm" onClick={()=>setDeleteConfirm(s)}>✕</QFButton>
                  </div>
                </div>
                <div style={{fontFamily:'var(--font-head)',fontSize:16,fontWeight:700,marginBottom:4}}>{s.name}</div>
                <p style={{fontSize:12.5,color:'var(--text3)',marginBottom:14,lineHeight:1.5}}>{s.description||'No description.'}</p>
                <div style={{display:'flex',gap:12,marginBottom:14}}>
                  {[[s.units.length,'Units'],[totalQ,'Questions'],[s.teachers,'Teachers']].map(([v,l])=>(
                    <div key={l} style={{textAlign:'center',flex:1,background:'var(--bg2)',borderRadius:6,padding:'8px 0'}}>
                      <div style={{fontFamily:'var(--font-head)',fontWeight:700,fontSize:18,color:'var(--text)'}}>{v}</div>
                      <div style={{fontSize:10.5,color:'var(--text3)',marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
                  {s.units.map((u,i)=><span key={u.id} className="qf-chip" style={{fontSize:11}}>{u.name||`Unit ${i+1}`}</span>)}
                </div>
                <div style={{borderTop:'1px solid var(--border)',paddingTop:12,display:'flex',gap:8}}>
                  <QFButton variant="primary" size="sm" style={{flex:1,justifyContent:'center'}} onClick={()=>setSelected(s)}>Manage →</QFButton>
                </div>
              </div>
            </QFCard>
          );
        })}
        <div onClick={()=>setShowAdd(true)} style={{background:'var(--bg1)',border:'2px dashed var(--border)',borderRadius:'var(--radius-lg)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,cursor:'pointer',padding:32,minHeight:200,transition:'all 0.15s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--cyan)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)'}}>
          <div style={{fontSize:32,color:'var(--text3)'}}>+</div>
          <div style={{color:'var(--text3)',fontSize:13}}>Add new subject</div>
        </div>
      </div>

      {/* Add Subject modal */}
      <QFModal open={showAdd} onClose={()=>setShowAdd(false)} title="New Subject" width={460}
        footer={<><QFButton variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</QFButton><QFButton variant="primary" onClick={addSubject}>Create Subject</QFButton></>}>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <QFInput label="Subject code *" placeholder="e.g. CS304" value={newSubj.code} onChange={e=>setNewSubj(p=>({...p,code:e.target.value}))} />
            <QFInput label="Subject name *" placeholder="e.g. Operating Systems" value={newSubj.name} onChange={e=>setNewSubj(p=>({...p,name:e.target.value}))} />
          </div>
          <QFInput label="Description" type="textarea" rows={3} placeholder="Brief description of the subject…" value={newSubj.description} onChange={e=>setNewSubj(p=>({...p,description:e.target.value}))} />
        </div>
      </QFModal>

      {/* Delete confirm */}
      <QFModal open={!!deleteConfirm} onClose={()=>setDeleteConfirm(null)} title="Delete Subject" width={420}
        footer={<><QFButton variant="ghost" onClick={()=>setDeleteConfirm(null)}>Cancel</QFButton><QFButton variant="danger" onClick={()=>{setSubjects(ss=>ss.filter(s=>s.code!==deleteConfirm.code));setDeleteConfirm(null);}}>Delete Subject</QFButton></>}>
        <p style={{fontSize:14,color:'var(--text2)',lineHeight:1.6}}>Delete <strong style={{color:'var(--text)'}}>{deleteConfirm?.name} ({deleteConfirm?.code})</strong>? All units, questions, and the syllabus will be permanently removed.</p>
      </QFModal>
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
