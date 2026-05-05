import { useState } from "react";

// ─── MONDAY: HYBRID CARDIO + STRENGTH ───────────────────────────────────────

const MON_WARMUP = "3 min easy row or bike · Dynamic arm swings · Hip circles";

const MON_BLOCKS = [
  {
    id: "mon_A",
    label: "Block 1",
    type: "E2MOM",
    duration: "8 min · E2MOM × 4 rounds",
    note: "Every 2 min on the dot — clock keeps you honest",
    accent: "#5bc8fa",
    exercises: [
      { id: "mon_ski", label: "1A", name: "Ski Erg", sets: 4, reps: "12–15 cals", muscles: "Full Body Cardio", tip: "Arms and legs together — don't just arm-pull. Drive with your hips. Pace: hard but sustainable for 4 rounds.", isCardio: true, noWeight: true },
      { id: "mon_devils", label: "1B", name: "DB Devils Press", sets: 4, reps: "6", muscles: "Full Body Power", tip: "Burpee down, DB in hands. Jump feet out, chest to floor, then snatch both DBs overhead in one explosive move. The hardest 6 reps you'll do all week." },
    ],
  },
  {
    id: "mon_B",
    label: "Block 2",
    type: "CARDIO",
    duration: "8 min",
    note: "Run or bike — your call today",
    accent: "#c8f97a",
    exercises: [
      { id: "mon_run", label: "2", name: "Run or Bike for Distance", sets: 1, reps: "8 min", muscles: "Aerobic Base", tip: "Treadmill, self-powered tread, or bike erg. Go by feel — not pace. This is your one steady-state block. Note your distance for future comparison.", isCardio: true, noWeight: true, isSolo: true },
    ],
  },
  {
    id: "mon_C",
    label: "Block 3",
    type: "E2MOM",
    duration: "8 min · E2MOM × 4 rounds",
    note: "Descending cals keeps intensity honest each round",
    accent: "#f9a84d",
    exercises: [
      { id: "mon_bike", label: "3A", name: "Bike Erg", sets: 4, reps: "15/12/10 cals", muscles: "Lower Body Cardio", tip: "Descending cals: 15 round 1, 12 round 2, 10 rounds 3+4. Sprint effort — you should finish with ~30 sec to rest.", isCardio: true, noWeight: true },
      { id: "mon_bent_row", label: "3B", name: "DB Bent-Over Row", sets: 4, reps: "10/side", muscles: "Back + Biceps", tip: "Hinge at hips 45°, elbow drives straight back. Squeeze the shoulder blade at top. Keep core braced — don't let lower back round under fatigue." },
    ],
  },
];

const MON_FINISHER = {
  id: "mon_finisher",
  accent: "#f97a9a",
  duration: "5 min AMRAP",
  circuit: [
    { label: "F1", name: "KB/DB Deadlift to High Pull", reps: "8 reps", tip: "Deadlift up, then drive elbows high to chin. One fluid motion. Go heavier than you think — it should feel like an 8/10 effort on rep 7.", hasWeight: true },
    { label: "F2", name: "Push-Ups", reps: "10 reps", tip: "Full range. Chest touches floor. No worming. Drop to knees before form breaks — protect the pattern." },
    { label: "F3", name: "Row Erg", reps: "10 cals", tip: "Hard pulls. Legs → lean back → arms. Consistent split — don't sprint round 1 and die round 3." },
  ],
};

// ─── WEDNESDAY: UPPER BODY STRENGTH ─────────────────────────────────────────

const WED_WARMUP = "Band pull-aparts ×15 · Arm circles · Cat-cow ×10 · Thoracic rotations ×10/side";

const WED_SUPERSETS = [
  {
    id: "wed_A", label: "Superset A", accent: "#c8f97a",
    rest: "30 sec between moves · 60 sec between rounds",
    exercises: [
      { id: "row_kickback", label: "A1", name: "DB Row to Kickback", sets: 3, reps: "10/side", muscles: "Back + Triceps", tip: "Elbow drives back on row, then extend fully for kickback. Keep torso parallel to floor.", twoForOne: true },
      { id: "push_press", label: "A2", name: "Push Press", sets: 3, reps: "8", muscles: "Shoulders + Triceps + Core", tip: "Slight dip in knees, then drive the weight overhead with leg momentum. Brace your core throughout.", twoForOne: true },
    ],
  },
  {
    id: "wed_B", label: "Superset B", accent: "#f9a84d",
    rest: "30 sec between moves · 60 sec between rounds",
    exercises: [
      { id: "renegade_row", label: "B1", name: "Renegade Row", sets: 3, reps: "8/side", muscles: "Back + Biceps + Core", tip: "Wide feet for stability. Don't rotate your hips. Drive elbow straight up.", twoForOne: true },
      { id: "curl_arnold", label: "B2", name: "Curl to Arnold Press", sets: 3, reps: "10", muscles: "Biceps + Shoulders", tip: "Curl up, then rotate palms away and press overhead. Reverse on the way down.", twoForOne: true },
    ],
  },
  {
    id: "wed_C", label: "Superset C", accent: "#5bc8fa",
    rest: "30 sec between moves · 60 sec between rounds",
    exercises: [
      { id: "incline_row", label: "C1", name: "Incline Row (or Ring Row)", sets: 3, reps: "10", muscles: "Mid Trap + Rear Delt", tip: "Squeeze shoulder blades together at top. The more horizontal your body, the harder it gets." },
      { id: "pallof_press", label: "C2", name: "Pallof Press", sets: 3, reps: "12/side", muscles: "Anti-Rotation Core", tip: "Press out and hold 2 seconds. Resist the band pulling you sideways — that's the whole point.", isCore: true },
    ],
  },
];

const WED_SOLO = { id: "dead_bug", label: "★", name: "Dead Bug", sets: 2, reps: "10", muscles: "Deep Core", tip: "Lower back stays flat on floor. Opposite arm + leg extend slowly. Exhale as you extend.", isCore: true, noWeight: true };

// ─── FRIDAY: LOWER BODY + CORE ───────────────────────────────────────────────

const FRI_HIP_PREP = [
  { id: "h1", name: "90/90 Hip Stretch", duration: "60 sec/side", tip: "The single best impingement opener. Sit tall, keep both glutes on floor, breathe into the stretch." },
  { id: "h2", name: "Banded Clamshells", duration: "15/side", tip: "Band just above knees. Keep hips stacked, don't rock backward. Slow and controlled." },
  { id: "h3", name: "Glute Bridge Hold", duration: "12 reps, 2 sec hold", tip: "Drive through heels, squeeze glutes hard at top. Activates before you load." },
  { id: "h4", name: "World's Greatest Stretch", duration: "5/side", tip: "Lunge + thoracic rotation. Move slowly. Opens hip flexors and thoracic spine together." },
  { id: "h5", name: "Lateral Band Walk", duration: "10 steps each way", tip: "Band above knees, slight squat position. Keep tension the whole time." },
];

const FRI_SUPERSETS = [
  {
    id: "fri_A", label: "Superset A", accent: "#e8c46a",
    rest: "60 sec between moves · 90 sec between rounds",
    note: "Primary posterior chain — your pregnancy armor",
    exercises: [
      { id: "rdl", label: "A1", name: "Barbell Romanian Deadlift", sets: 3, reps: "8", muscles: "Hamstrings + Glutes + Spinal Erectors", tip: "Soft bend in knees, push hips back not down. Bar stays close to legs. Stop before lower back rounds.", isBB: true },
      { id: "dead_bug_reach", label: "A2", name: "Dead Bug with DB Reach", sets: 3, reps: "10", muscles: "TVA + Deep Core", tip: "Lower back pressed flat — no gap. Hold a light DB overhead as opposite arm + leg extend. Exhale on extension.", isCore: true },
    ],
  },
  {
    id: "fri_B", label: "Superset B", accent: "#c8f97a",
    rest: "60 sec between moves · 90 sec between rounds",
    note: "Single-leg stability — critical for pelvic health",
    exercises: [
      { id: "bss", label: "B1", name: "Bulgarian Split Squat", sets: 3, reps: "8/side", muscles: "Quads + Glutes + Hip Stability", tip: "Rear foot elevated on bench. Front knee tracks over 2nd toe — never caves in. Start light. This will humble you." },
      { id: "copenhagen", label: "B2", name: "Copenhagen Plank", sets: 3, reps: "20–30 sec/side", muscles: "Adductors + Lateral Core", tip: "Side plank with top foot on bench. The most underrated pre-pregnancy move. Supports the pelvis directly.", isCore: true, isTimed: true, noWeight: true },
    ],
  },
  {
    id: "fri_C", label: "Superset C", accent: "#f97a9a",
    rest: "60 sec between moves · 90 sec between rounds",
    note: "Glute max + anti-rotation core",
    exercises: [
      { id: "hip_thrust", label: "C1", name: "Barbell Hip Thrust", sets: 3, reps: "10", muscles: "Glutes (max activation)", tip: "Upper back on bench, bar across hip crease (pad it). Drive through heels, full squeeze at top for 1 sec.", isBB: true },
      { id: "pallof_kneeling", label: "C2", name: "Pallof Press (Tall Kneeling)", sets: 3, reps: "12/side", muscles: "Anti-Rotation Core + Glutes", tip: "Both knees on floor. Press out, hold 2 sec, return. Squeeze glutes the entire time.", isCore: true },
    ],
  },
];

const FRI_FINISHERS = [
  { id: "bear_plank", label: "★1", name: "Bear Plank Hold", sets: 3, reps: "20 sec", muscles: "TVA + Deep Core", tip: "Hands under shoulders, knees 1 inch off floor. Back flat like a table. Brutally effective.", isCore: true, isTimed: true, noWeight: true },
  { id: "suitcase_carry", label: "★2", name: "Suitcase Carry", sets: 2, reps: "30 steps/side", muscles: "Lateral Core + Glutes", tip: "Heavy KB or DB in one hand, walk tall. Don't lean away — resist it. Trains what your body needs for a growing belly.", isCore: true },
];

// ─── SHARED UTILITIES ────────────────────────────────────────────────────────

const formatDate = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const getAllExercises = (day) => {
  if (day === "MON") return [...MON_BLOCKS.flatMap(b => b.exercises), { id: "mon_finisher_amrap" }];
  if (day === "WED") return [...WED_SUPERSETS.flatMap(s => s.exercises), WED_SOLO];
  if (day === "FRI") return [...FRI_SUPERSETS.flatMap(s => s.exercises), ...FRI_FINISHERS];
  return [];
};

const DAYS = [
  { id: "MON", label: "Monday", short: "MON", subtitle: "Hybrid Cardio + Strength", color: "#5bc8fa", emoji: "⚡" },
  { id: "WED", label: "Wednesday", short: "WED", subtitle: "Upper Body Strength", color: "#c8f97a", emoji: "💪" },
  { id: "FRI", label: "Friday", short: "FRI", subtitle: "Lower Body + Core", color: "#e8c46a", emoji: "🏋️" },
  { id: "SAT", label: "Saturday", short: "SAT", subtitle: "Optional Cardio", color: "#f97a9a", emoji: "🏃", isOptional: true },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function SetRow({ setNum, data, onChange, accent, isTimed, noWeight, isAmrap }) {
  return (
    <div className="set-row">
      <span className="set-label">{isAmrap ? `Rd ${setNum}` : `Set ${setNum}`}</span>
      <div className="set-inputs">
        {!noWeight && (
          <div className="input-group">
            <label>lbs</label>
            <input type="number" placeholder="—" value={data.weight || ""} onChange={(e) => onChange({ ...data, weight: e.target.value })} style={{ "--fc": accent }} />
          </div>
        )}
        <div className="input-group">
          <label>{isTimed ? "secs" : isAmrap ? "rounds" : "reps"}</label>
          <input type="number" placeholder="—" value={data.reps || ""} onChange={(e) => onChange({ ...data, reps: e.target.value })} style={{ "--fc": accent }} />
        </div>
        <button className={`done-btn ${data.done ? "done" : ""}`} style={data.done ? { background: accent, borderColor: accent } : {}} onClick={() => onChange({ ...data, done: !data.done })}>
          {data.done ? "✓" : "○"}
        </button>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, sessionData, onUpdate, accent, isAmrap }) {
  const [expanded, setExpanded] = useState(false);
  const numSets = isAmrap ? 3 : exercise.sets;
  const setsData = sessionData || Array(numSets).fill({});
  const doneCount = setsData.filter((s) => s.done).length;

  const updateSet = (i, val) => {
    const updated = [...setsData];
    updated[i] = val;
    onUpdate(updated);
  };

  return (
    <div className={`exercise-card ${exercise.isCore ? "core-card" : ""} ${exercise.isBB ? "bb-card" : ""} ${doneCount > 0 && doneCount >= numSets ? "completed" : ""}`}>
      <div className="card-header" onClick={() => setExpanded(!expanded)}>
        <div className="card-title-row">
          <span className="exercise-label" style={{ background: accent, color: "#111" }}>{exercise.label}</span>
          <div className="card-name-block">
            <span className="exercise-name">{exercise.name}</span>
            <span className="muscles-tag">{exercise.muscles}</span>
          </div>
          <div className="card-badges">
            {exercise.twoForOne && <span className="badge badge-green">2-for-1</span>}
            {exercise.isCardio && <span className="badge badge-blue">CARDIO</span>}
            {exercise.isBB && <span className="badge badge-gold">BARBELL</span>}
            {exercise.isCore && <span className="badge badge-blue">CORE</span>}
            <span className="sets-reps-meta">{isAmrap ? "AMRAP" : `${exercise.sets}×`}{exercise.reps}</span>
            <span className="progress-dot" style={{ color: accent }}>{doneCount}/{numSets}</span>
            <span className="expand-icon">{expanded ? "▲" : "▼"}</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="card-body">
          <p className="tip-text">💡 {exercise.tip}</p>
          <div className="sets-list">
            {setsData.map((s, i) => (
              <SetRow key={i} setNum={i + 1} data={s} accent={accent} isTimed={exercise.isTimed} noWeight={exercise.noWeight} isAmrap={isAmrap} onChange={(v) => updateSet(i, v)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AmrapFinisher({ finisher, sessionData, onUpdate }) {
  const [expanded, setExpanded] = useState(true);
  const data = sessionData[finisher.id] || { rounds: "", weight: "", notes: "", done: false };
  const update = (patch) => onUpdate(finisher.id, { ...data, ...patch });

  return (
    <div className="superset-block" style={{ borderTopColor: finisher.accent }}>
      <div className="superset-header">
        <div className="superset-title-row">
          <span className="superset-pill" style={{ background: finisher.accent }}>Finisher</span>
          <div>
            <div className="superset-rest">{finisher.duration}</div>
            <div className="superset-note">Log total rounds completed + weight used</div>
          </div>
        </div>
        <button
          className={`done-btn ${data.done ? "done" : ""}`}
          style={data.done ? { background: finisher.accent, borderColor: finisher.accent } : {}}
          onClick={() => update({ done: !data.done })}
        >{data.done ? "✓" : "○"}</button>
      </div>

      {/* Circuit preview — always visible */}
      <div style={{ padding: "10px 13px 0" }}>
        {finisher.circuit.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: 1, color: finisher.accent, background: finisher.accent + "22", padding: "1px 6px", borderRadius: 3, flexShrink: 0 }}>{item.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#d0ccc8" }}>{item.name}</span>
            <span style={{ fontSize: 11, color: "#444", marginLeft: "auto", flexShrink: 0 }}>{item.reps}</span>
          </div>
        ))}
      </div>

      {/* Log inputs */}
      <div style={{ padding: "12px 13px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <div className="input-group" style={{ flex: 1.2 }}>
            <label>Total Rounds</label>
            <input type="number" placeholder="e.g. 3" value={data.rounds || ""} onChange={e => update({ rounds: e.target.value })} style={{ "--fc": finisher.accent }} />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>High Pull lbs</label>
            <input type="number" placeholder="e.g. 35" value={data.weight || ""} onChange={e => update({ weight: e.target.value })} style={{ "--fc": finisher.accent }} />
          </div>
        </div>
        <div className="input-group" style={{ alignItems: "stretch" }}>
          <label style={{ textAlign: "left", marginBottom: 4 }}>Notes (partial rounds, how it felt)</label>
          <textarea
            placeholder="e.g. 3 rounds + F1 + F2, ran out of time on row"
            value={data.notes || ""}
            onChange={e => update({ notes: e.target.value })}
            rows={2}
            style={{ width: "100%", background: "#0f0f0f", border: "1px solid #222", borderRadius: 4, padding: "7px 8px", color: "#f0ede8", fontFamily: "'DM Sans', sans-serif", fontSize: 12, outline: "none", resize: "none", lineHeight: 1.5 }}
          />
        </div>
      </div>

      {/* Tips — collapsible */}
      <div style={{ borderTop: "1px solid #1a1a1a" }}>
        <div onClick={() => setExpanded(!expanded)} style={{ padding: "8px 13px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#333", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Exercise Tips</span>
          <span className="expand-icon">{expanded ? "▲" : "▼"}</span>
        </div>
        {expanded && (
          <div style={{ padding: "0 13px 13px" }}>
            {finisher.circuit.map((item, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: finisher.accent }}>{item.label} {item.name}: </span>
                <span style={{ fontSize: 11, color: "#3a3a3a", fontStyle: "italic" }}>{item.tip}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlockCard({ block, sessionData, onUpdate, isAmrap }) {
  const totalDone = block.exercises.reduce((acc, ex) => acc + (sessionData[ex.id] || []).filter(s => s.done).length, 0);
  const totalSets = isAmrap ? block.exercises.length * 3 : block.exercises.reduce((a, e) => a + e.sets, 0);

  return (
    <div className="superset-block" style={{ borderTopColor: block.accent }}>
      <div className="superset-header">
        <div className="superset-title-row">
          <span className="superset-pill" style={{ background: block.accent }}>{block.label}</span>
          <div>
            <div className="superset-rest">{block.duration}</div>
            {block.note && <div className="superset-note">{block.note}</div>}
          </div>
        </div>
        <span className="superset-progress" style={{ color: block.accent }}>{totalDone}/{totalSets}</span>
      </div>
      <div className="superset-body">
        {block.exercises.map((ex, i) => (
          <div key={ex.id}>
            <ExerciseCard exercise={ex} sessionData={sessionData[ex.id]} onUpdate={(v) => onUpdate(ex.id, v)} accent={block.accent} isAmrap={isAmrap} />
            {i < block.exercises.length - 1 && !ex.isSolo && (
              <div className="connector">
                <div className="connector-line" style={{ borderColor: block.accent }} />
                <span className="connector-tag" style={{ color: block.accent, borderColor: block.accent }}>then</span>
                <div className="connector-line" style={{ borderColor: block.accent }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function HipPrepChecklist({ done, setDone }) {
  const [expanded, setExpanded] = useState(false);
  const doneCount = Object.values(done).filter(Boolean).length;
  return (
    <div className="hip-prep-card">
      <div className="hip-prep-header" onClick={() => setExpanded(!expanded)}>
        <div className="hip-prep-title-row">
          <div>
            <div className="hip-prep-title">🦋 Hip Prep · 7 min</div>
            <div className="hip-prep-sub">Non-negotiable with your hip impingement</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="hip-prep-progress">{doneCount}/{FRI_HIP_PREP.length}</span>
            <span className="expand-icon">{expanded ? "▲" : "▼"}</span>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="hip-prep-body">
          {FRI_HIP_PREP.map(item => (
            <div key={item.id} className={`hip-item ${done[item.id] ? "hip-done" : ""}`}>
              <div className="hip-item-main">
                <button className={`hip-check ${done[item.id] ? "checked" : ""}`} style={done[item.id] ? { background: "#e8c46a", borderColor: "#e8c46a" } : {}} onClick={() => setDone(p => ({ ...p, [item.id]: !p[item.id] }))}>
                  {done[item.id] ? "✓" : "○"}
                </button>
                <div className="hip-item-text">
                  <span className="hip-item-name">{item.name}</span>
                  <span className="hip-item-duration">{item.duration}</span>
                </div>
              </div>
              <p className="hip-item-tip">💡 {item.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DAY WORKOUTS ────────────────────────────────────────────────────────────

function MondayWorkout({ sessionData, onUpdate }) {
  return (
    <div>
      <div className="warmup-card" style={{ borderLeftColor: "#5bc8fa" }}>
        <div className="warmup-title" style={{ color: "#5bc8fa" }}>🔥 Warm-Up · 3 min</div>
        <div className="warmup-text">{MON_WARMUP}</div>
      </div>
      <div className="section-header">Blocks</div>
      {MON_BLOCKS.map(block => (
        <BlockCard key={block.id} block={block} sessionData={sessionData} onUpdate={onUpdate} isAmrap={false} />
      ))}
      <div className="section-header">Finisher</div>
      <AmrapFinisher finisher={MON_FINISHER} sessionData={sessionData} onUpdate={onUpdate} />
    </div>
  );
}

function WednesdayWorkout({ sessionData, onUpdate }) {
  return (
    <div>
      <div className="warmup-card" style={{ borderLeftColor: "#c8f97a" }}>
        <div className="warmup-title" style={{ color: "#c8f97a" }}>🔥 Warm-Up · 5 min</div>
        <div className="warmup-text">{WED_WARMUP}</div>
      </div>
      <div className="section-header">Supersets</div>
      {WED_SUPERSETS.map(ss => (
        <BlockCard key={ss.id} block={ss} sessionData={sessionData} onUpdate={onUpdate} isAmrap={false} />
      ))}
      <div className="section-header">Core Finisher</div>
      <ExerciseCard exercise={WED_SOLO} sessionData={sessionData[WED_SOLO.id]} onUpdate={(v) => onUpdate(WED_SOLO.id, v)} accent="#5bc8fa" />
    </div>
  );
}

function FridayWorkout({ sessionData, onUpdate }) {
  const [hipDone, setHipDone] = useState({});
  return (
    <div>
      <div className="ivf-notice">
        <div className="ivf-notice-title">⚠️ IVF Timing Note</div>
        <div className="ivf-notice-text">During stimulation and the two-week wait, dial back intensity and avoid heavy loading. Train hard now — rest when your RE says so.</div>
      </div>
      <HipPrepChecklist done={hipDone} setDone={setHipDone} />
      <div className="section-header">Supersets</div>
      {FRI_SUPERSETS.map(ss => (
        <BlockCard key={ss.id} block={ss} sessionData={sessionData} onUpdate={onUpdate} isAmrap={false} />
      ))}
      <div className="section-header">Core Finisher</div>
      {FRI_FINISHERS.map(ex => (
        <ExerciseCard key={ex.id} exercise={ex} sessionData={sessionData[ex.id]} onUpdate={(v) => onUpdate(ex.id, v)} accent="#5bc8fa" />
      ))}
    </div>
  );
}

function SaturdayWorkout() {
  const options = [
    { emoji: "🏃", title: "Lake Union Run", desc: "20–25 min easy/conversational pace. No tracking — just run." },
    { emoji: "🚣", title: "Tri-Erg Circuit", desc: "5 rounds: Row 250m → Bike 20 cals → Ski 15 cals. Rest 90 sec between rounds." },
    { emoji: "🧘", title: "Active Recovery", desc: "30 min yoga, long walk with Miles, or mobility flow. Your call." },
  ];
  return (
    <div>
      <div className="warmup-card" style={{ borderLeftColor: "#f97a9a" }}>
        <div className="warmup-title" style={{ color: "#f97a9a" }}>🌸 Optional Day</div>
        <div className="warmup-text">No pressure. Skip without guilt on heavy Miles weeks. If you go, pick one of these and keep it fun.</div>
      </div>
      <div className="section-header">Pick Your Vibe</div>
      {options.map((o, i) => (
        <div key={i} className="sat-option-card">
          <span className="sat-emoji">{o.emoji}</span>
          <div>
            <div className="sat-title">{o.title}</div>
            <div className="sat-desc">{o.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── COPY TEXT GENERATOR ─────────────────────────────────────────────────────

function generateCopyText(day, session) {
  const dayLabels = { MON: "MONDAY HYBRID", WED: "WEDNESDAY UPPER BODY", FRI: "FRIDAY LOWER BODY + CORE" };
  const lines = [`${dayLabels[day]} — ${formatDate(session.date)}`, ""];

  if (day === "MON") {
    MON_BLOCKS.forEach(b => {
      lines.push(`── ${b.label}: ${b.duration} ──`);
      b.exercises.forEach(ex => {
        lines.push(`${ex.label} ${ex.name}`);
        (session.data[ex.id] || []).forEach((s, i) => {
          if (s.weight || s.reps) lines.push(`  Set ${i+1}: ${s.weight ? s.weight+"lbs × " : ""}${s.reps || "?"}${s.done ? " ✓" : ""}`);
        });
      });
      lines.push("");
    });
    const fd = session.data[MON_FINISHER.id] || {};
    lines.push("── Finisher: 5 min AMRAP ──");
    lines.push(`Circuit: ${MON_FINISHER.circuit.map(c => `${c.label} ${c.name} ×${c.reps}`).join(" → ")}`);
    if (fd.rounds) lines.push(`Total rounds completed: ${fd.rounds}`);
    if (fd.weight) lines.push(`High Pull weight: ${fd.weight}lbs`);
    if (fd.notes) lines.push(`Notes: ${fd.notes}`);
  }

  if (day === "WED") {
    WED_SUPERSETS.forEach(ss => {
      lines.push(`── ${ss.label} ──`);
      ss.exercises.forEach(ex => {
        lines.push(`${ex.label} ${ex.name} (${ex.muscles})`);
        (session.data[ex.id] || []).forEach((s, i) => {
          if (s.weight || s.reps) lines.push(`  Set ${i+1}: ${s.weight ? s.weight+"lbs × " : ""}${s.reps || "?"} reps${s.done ? " ✓" : ""}`);
        });
      });
      lines.push("");
    });
    lines.push("── Core Finisher ──");
    lines.push(WED_SOLO.name);
    (session.data[WED_SOLO.id] || []).forEach((s, i) => {
      if (s.reps) lines.push(`  Set ${i+1}: ${s.reps} reps${s.done ? " ✓" : ""}`);
    });
  }

  if (day === "FRI") {
    FRI_SUPERSETS.forEach(ss => {
      lines.push(`── ${ss.label} ──`);
      ss.exercises.forEach(ex => {
        lines.push(`${ex.label} ${ex.name} (${ex.muscles})`);
        (session.data[ex.id] || []).forEach((s, i) => {
          if (s.weight || s.reps) lines.push(`  Set ${i+1}: ${s.weight ? s.weight+"lbs × " : ""}${s.reps || "?"}${ex.isTimed ? " secs" : " reps"}${s.done ? " ✓" : ""}`);
        });
      });
      lines.push("");
    });
    lines.push("── Core Finisher ──");
    FRI_FINISHERS.forEach(ex => {
      lines.push(`${ex.name}`);
      (session.data[ex.id] || []).forEach((s, i) => {
        if (s.reps) lines.push(`  Set ${i+1}: ${s.reps}${ex.isTimed ? " secs" : " reps"}${s.done ? " ✓" : ""}`);
      });
    });
  }

  lines.push("", "---", "Share with Claude for weight recommendations.");
  return lines.join("\n");
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "crystals_weekly_tracker_v1";
const SESSION_KEY = "crystals_active_session_v1";

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Rehydrate Date objects (JSON serializes them as strings)
    if (key === STORAGE_KEY) {
      Object.keys(parsed).forEach(day => {
        parsed[day] = parsed[day].map(s => ({ ...s, date: new Date(s.date) }));
      });
    }
    if (key === SESSION_KEY && parsed) {
      parsed.date = new Date(parsed.date);
    }
    return parsed;
  } catch { return fallback; }
}

export default function WeeklyPlanner() {
  const [activeDay, setActiveDay] = useState("MON");
  const [mainTab, setMainTab] = useState("week");
  const [sessions, setSessions] = useState(() => loadFromStorage(STORAGE_KEY, { MON: [], WED: [], FRI: [] }));
  const [currentSession, setCurrentSession] = useState(() => loadFromStorage(SESSION_KEY, null));
  const [copyMsg, setCopyMsg] = useState("");
  const [saveFlash, setSaveFlash] = useState(false);

  // Persist sessions to localStorage whenever they change
  const persistSessions = (newSessions) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions)); } catch {}
    setSessions(newSessions);
  };

  // Persist active session continuously (autosave mid-workout)
  const persistCurrentSession = (session) => {
    try {
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(SESSION_KEY);
    } catch {}
    setCurrentSession(session);
  };

  const startSession = (day) => {
    const s = { day, id: Date.now(), date: new Date(), data: {} };
    persistCurrentSession(s);
    setActiveDay(day);
    setMainTab("workout");
  };

  const updateExercise = (exId, setsData) => {
    setCurrentSession(prev => {
      const updated = { ...prev, data: { ...prev.data, [exId]: setsData } };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const saveSession = () => {
    if (!currentSession) return;
    const { day } = currentSession;
    setSessions(prev => {
      const list = prev[day] || [];
      const idx = list.findIndex(s => s.id === currentSession.id);
      let updated;
      if (idx >= 0) { const u = [...list]; u[idx] = currentSession; updated = { ...prev, [day]: u }; }
      else updated = { ...prev, [day]: [currentSession, ...list] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
    persistCurrentSession(null);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
    setMainTab("week");
  };

  const copyToClipboard = (day, session) => {
    navigator.clipboard.writeText(generateCopyText(day, session)).then(() => {
      setCopyMsg(session.id); setTimeout(() => setCopyMsg(""), 2000);
    });
  };

  const clearAllData = () => {
    if (window.confirm("Delete all saved workout history? This cannot be undone.")) {
      try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SESSION_KEY); } catch {}
      setSessions({ MON: [], WED: [], FRI: [] });
      persistCurrentSession(null);
    }
  };

  // Progress calcs
  const totalDoneForDay = (day) => {
    if (!currentSession || currentSession.day !== day) return 0;
    const blocksDone = MON_BLOCKS.flatMap(b => b.exercises).reduce((acc, ex) => acc + (currentSession.data[ex.id] || []).filter(s => s.done).length, 0);
    if (day === "MON") {
      const finDone = currentSession.data[MON_FINISHER.id]?.done ? 1 : 0;
      return blocksDone + finDone;
    }
    return getAllExercises(day).reduce((acc, ex) => acc + (currentSession.data[ex.id] || []).filter(s => s.done).length, 0);
  };
  const totalSetsForDay = (day) => {
    if (day === "MON") return MON_BLOCKS.reduce((a, b) => a + b.exercises.reduce((x, e) => x + e.sets, 0), 0) + 1;
    if (day === "WED") return WED_SUPERSETS.flatMap(s => s.exercises).reduce((a, e) => a + e.sets, 0) + WED_SOLO.sets;
    if (day === "FRI") return FRI_SUPERSETS.flatMap(s => s.exercises).reduce((a, e) => a + e.sets, 0) + FRI_FINISHERS.reduce((a, e) => a + e.sets, 0);
    return 0;
  };

  const weekSessionCount = Object.values(sessions).reduce((a, list) => a + list.length, 0);

  const dayColor = DAYS.find(d => d.id === activeDay)?.color || "#c8f97a";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; color: #f0ede8; font-family: 'DM Sans', sans-serif; }
        .app { max-width: 480px; margin: 0 auto; min-height: 100vh; background: #0f0f0f; }

        /* ── App Header ── */
        .app-header { padding: 24px 20px 0; background: #0f0f0f; border-bottom: 1px solid #1a1a1a; }
        .app-header-top { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 16px; }
        .app-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 3px; line-height: 1; }
        .app-title span { color: #c8f97a; }
        .week-badge { font-size: 11px; color: #444; background: #1a1a1a; padding: 4px 10px; border-radius: 20px; }
        .week-badge strong { color: #c8f97a; }

        /* ── Main Tabs ── */
        .main-tabs { display: flex; border-bottom: 1px solid #1a1a1a; }
        .main-tab { flex: 1; padding: 12px 0; background: none; border: none; color: #444; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; border-bottom: 2px solid transparent; transition: color 0.2s; }
        .main-tab.active { color: #c8f97a; border-bottom-color: #c8f97a; }

        /* ── Content ── */
        .content { padding: 16px 16px 90px; }

        /* ── Week View ── */
        .week-grid { display: flex; flex-direction: column; gap: 10px; }
        .day-card { border-radius: 12px; overflow: hidden; border: 1px solid #1e1e1e; }
        .day-card-header { padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
        .day-card-left { display: flex; align-items: center; gap: 12px; }
        .day-emoji { font-size: 22px; }
        .day-label { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; line-height: 1; }
        .day-subtitle { font-size: 11px; color: #555; margin-top: 2px; }
        .day-optional { font-size: 10px; font-style: italic; color: #3a3a3a; margin-top: 1px; }
        .day-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .day-session-count { font-size: 10px; color: #3a3a3a; }
        .btn-start { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer; transition: transform 0.1s; }
        .btn-start:hover { transform: translateY(-1px); }
        .btn-start-sat { background: #1e1e1e; color: #f97a9a; border: 1px solid #2a1a1e; }

        /* active day progress in week view */
        .day-progress-bar { height: 3px; background: #1a1a1a; }
        .day-progress-fill { height: 100%; transition: width 0.4s ease; }

        /* ── Workout View ── */
        .workout-day-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .workout-day-tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px; margin-bottom: 16px; }
        .workout-day-tab { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 2px; padding: 7px 14px; border-radius: 6px; border: 1.5px solid #1e1e1e; background: none; color: #444; cursor: pointer; white-space: nowrap; transition: all 0.15s; flex-shrink: 0; }
        .workout-day-tab.active { color: #111; border-color: transparent; }

        .session-active-bar { background: #161616; border: 1px solid #222; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
        .session-active-info { font-size: 12px; color: #666; }
        .session-active-info strong { color: #f0ede8; display: block; font-size: 13px; margin-bottom: 2px; }
        .session-progress-inline { display: flex; align-items: center; gap: 8px; }
        .session-progress-bar-sm { width: 80px; height: 4px; background: #222; border-radius: 2px; overflow: hidden; }
        .session-progress-fill-sm { height: 100%; border-radius: 2px; transition: width 0.3s; }
        .session-progress-pct { font-size: 11px; font-weight: 700; }

        /* ── History View ── */
        .history-day-filter { display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto; }
        .filter-btn { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 6px 12px; border-radius: 20px; border: 1px solid #1e1e1e; background: none; color: #444; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .filter-btn.active { background: #1e1e1e; color: #f0ede8; border-color: #333; }

        .session-card { background: #161616; border: 1px solid #1e1e1e; border-radius: 10px; padding: 16px; margin-bottom: 10px; }
        .session-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .session-day-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 2px 8px; border-radius: 3px; }
        .session-date { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; margin-top: 2px; }
        .session-exercise-list { margin-bottom: 12px; }
        .session-ex-row { display: flex; justify-content: space-between; font-size: 12px; color: #555; padding: 3px 0; border-bottom: 1px solid #1a1a1a; }
        .session-ex-row:last-child { border-bottom: none; }
        .session-ex-name { color: #888; }
        .copy-section { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .copy-hint { font-size: 11px; color: #3a3a3a; flex-basis: 100%; margin-top: 4px; line-height: 1.5; }
        .copy-confirm { font-size: 12px; font-weight: 600; color: #c8f97a; }
        .history-empty { text-align: center; padding: 50px 20px; color: #333; font-size: 14px; line-height: 1.8; }

        /* ── Shared card styles ── */
        .warmup-card { border: 1px solid #1e1e1e; border-left-width: 3px; border-radius: 10px; padding: 13px 15px; margin-bottom: 16px; background: #131313; }
        .warmup-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .warmup-text { font-size: 12px; color: #555; line-height: 1.6; }
        .section-header { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 3px; color: #333; margin: 18px 0 9px; text-transform: uppercase; }

        .superset-block { margin-bottom: 14px; background: #141414; border: 1px solid #1e1e1e; border-top: 2.5px solid; border-radius: 12px; overflow: hidden; }
        .superset-header { display: flex; align-items: center; justify-content: space-between; padding: 9px 13px; border-bottom: 1px solid #1a1a1a; background: #111; }
        .superset-title-row { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .superset-pill { font-family: 'Bebas Neue', sans-serif; font-size: 11px; letter-spacing: 2px; padding: 3px 9px; border-radius: 4px; color: #111; flex-shrink: 0; }
        .superset-rest { font-size: 11px; color: #3a3a3a; }
        .superset-note { font-size: 10px; color: #2a2a2a; font-style: italic; margin-top: 1px; }
        .superset-progress { font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .superset-body { padding: 9px 9px 7px; }

        .connector { display: flex; align-items: center; gap: 8px; padding: 3px 5px; }
        .connector-line { flex: 1; border-top: 1.5px dashed; opacity: 0.25; }
        .connector-tag { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 2px 7px; border: 1px solid; border-radius: 20px; opacity: 0.7; white-space: nowrap; }

        .exercise-card { background: #191919; border: 1px solid #222; border-radius: 8px; overflow: hidden; margin-bottom: 1px; }
        .exercise-card.completed { background: #141a0e; border-color: #243014; }
        .exercise-card.bb-card { border-left: 2px solid rgba(232,196,106,0.2); }
        .card-header { padding: 11px 12px; cursor: pointer; user-select: none; }
        .card-title-row { display: flex; align-items: center; gap: 7px; }
        .exercise-label { font-family: 'Bebas Neue', sans-serif; font-size: 12px; letter-spacing: 1px; padding: 2px 6px; border-radius: 3px; flex-shrink: 0; color: #111; }
        .card-name-block { flex: 1; min-width: 0; }
        .exercise-name { display: block; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .muscles-tag { display: block; font-size: 10px; color: #484848; margin-top: 1px; }
        .card-badges { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .badge { font-size: 8px; font-weight: 700; letter-spacing: 0.5px; padding: 2px 4px; border-radius: 3px; text-transform: uppercase; }
        .badge-green { background: #1e2e0a; color: #c8f97a; }
        .badge-blue { background: #081820; color: #5bc8fa; }
        .badge-gold { background: #1e1800; color: #e8c46a; }
        .sets-reps-meta { font-size: 10px; color: #383838; font-weight: 500; }
        .progress-dot { font-size: 11px; font-weight: 700; min-width: 22px; text-align: right; }
        .expand-icon { font-size: 9px; color: #303030; }
        .card-body { padding: 0 12px 12px; border-top: 1px solid #1a1a1a; }
        .tip-text { font-size: 11px; color: #3a3a3a; margin: 10px 0 12px; line-height: 1.5; font-style: italic; }

        .set-row { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; }
        .set-label { font-size: 10px; color: #383838; width: 36px; text-transform: uppercase; letter-spacing: 0.5px; }
        .set-inputs { display: flex; align-items: center; gap: 8px; flex: 1; }
        .input-group { display: flex; flex-direction: column; align-items: center; gap: 2px; flex: 1; }
        .input-group label { font-size: 8px; color: #303030; text-transform: uppercase; letter-spacing: 1px; }
        .input-group input { width: 100%; background: #0f0f0f; border: 1px solid #222; border-radius: 4px; padding: 6px 6px; color: #f0ede8; font-family: 'DM Sans', sans-serif; font-size: 13px; text-align: center; outline: none; transition: border-color 0.15s; }
        .input-group input:focus { border-color: var(--fc, #c8f97a); }
        .input-group input::placeholder { color: #222; }
        .done-btn { background: none; border: 1.5px solid #2a2a2a; border-radius: 50%; width: 28px; height: 28px; color: #444; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
        .done-btn.done { color: #111; }

        /* Hip prep */
        .hip-prep-card { background: #131008; border: 1px solid #2a2010; border-left: 3px solid #e8c46a; border-radius: 10px; overflow: hidden; margin-bottom: 14px; }
        .hip-prep-header { padding: 13px 15px; cursor: pointer; user-select: none; }
        .hip-prep-title-row { display: flex; align-items: center; justify-content: space-between; }
        .hip-prep-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #e8c46a; }
        .hip-prep-sub { font-size: 10px; color: #4a3a18; margin-top: 2px; font-style: italic; }
        .hip-prep-progress { font-size: 12px; font-weight: 700; color: #e8c46a; }
        .hip-prep-body { padding: 0 15px 10px; border-top: 1px solid #2a2010; }
        .hip-item { padding: 9px 0; border-bottom: 1px solid #1a1508; }
        .hip-item:last-child { border-bottom: none; }
        .hip-item.hip-done .hip-item-name { color: #383828; text-decoration: line-through; }
        .hip-item-main { display: flex; align-items: center; gap: 9px; margin-bottom: 3px; }
        .hip-check { background: none; border: 1.5px solid #2a2010; border-radius: 50%; width: 24px; height: 24px; color: #444; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
        .hip-item-text { flex: 1; }
        .hip-item-name { display: block; font-size: 13px; font-weight: 600; color: #d0c898; }
        .hip-item-duration { display: block; font-size: 10px; color: #4a4828; margin-top: 1px; }
        .hip-item-tip { font-size: 11px; color: #2e2c18; line-height: 1.5; font-style: italic; padding-left: 33px; }

        /* IVF notice */
        .ivf-notice { background: #130810; border: 1px solid #2a1020; border-left: 3px solid #f97a9a; border-radius: 10px; padding: 11px 14px; margin-bottom: 14px; }
        .ivf-notice-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #f97a9a; margin-bottom: 3px; }
        .ivf-notice-text { font-size: 11px; color: #503040; line-height: 1.5; }

        /* Saturday */
        .sat-option-card { background: #141414; border: 1px solid #1e1e1e; border-radius: 10px; padding: 14px; margin-bottom: 8px; display: flex; align-items: flex-start; gap: 12px; }
        .sat-emoji { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
        .sat-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .sat-desc { font-size: 12px; color: #555; line-height: 1.5; }

        /* Save bar */
        .save-bar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 480px; background: rgba(10,10,10,0.97); backdrop-filter: blur(12px); border-top: 1px solid #1a1a1a; padding: 12px 16px; display: flex; gap: 8px; z-index: 20; }
        .save-bar .btn-primary { flex: 1; padding: 12px; font-size: 11px; }
        .save-bar .btn-secondary { flex: 1; padding: 12px; font-size: 11px; text-align: center; }

        /* Buttons */
        .btn-primary { background: #c8f97a; color: #111; border: none; padding: 12px 28px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 6px; cursor: pointer; display: inline-block; transition: transform 0.15s, background 0.15s; }
        .btn-primary:hover { background: #b8e86a; transform: translateY(-1px); }
        .btn-secondary { background: #161616; color: #c8f97a; border: 1px solid #252525; padding: 10px 18px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 6px; cursor: pointer; }
        .btn-secondary:hover { background: #1e1e1e; }
        .btn-copy { background: #161616; color: #888; border: 1px solid #222; padding: 8px 14px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-radius: 6px; cursor: pointer; }
        .btn-copy:hover { background: #1e1e1e; }
      `}</style>

      <div className="app">
        {/* ── Header ── */}
        <div className="app-header">
          <div className="app-header-top">
            <div>
              <div className="app-title">Crystal's <span>Weekly</span> Plan</div>
              <div style={{ fontSize: 11, color: "#444", marginTop: 3 }}>Sprinter Build · Pre-IVF Foundation</div>
            </div>
            <div className="week-badge">
              {saveFlash
                ? <span style={{ color: "#c8f97a" }}>✓ Saved</span>
                : <><strong>{weekSessionCount}</strong> sessions logged</>
              }
            </div>
          </div>
          <div className="main-tabs">
            <button className={`main-tab ${mainTab === "week" ? "active" : ""}`} onClick={() => setMainTab("week")}>This Week</button>
            <button className={`main-tab ${mainTab === "workout" ? "active" : ""}`} onClick={() => setMainTab("workout")}>Workout</button>
            <button className={`main-tab ${mainTab === "history" ? "active" : ""}`} onClick={() => setMainTab("history")}>History</button>
          </div>
        </div>

        <div className="content">

          {/* ── WEEK VIEW ── */}
          {mainTab === "week" && (
            <div className="week-grid">
              {DAYS.map(day => {
                const sessionList = sessions[day.id] || [];
                const isActive = currentSession?.day === day.id;
                const done = isActive ? totalDoneForDay(day.id) : 0;
                const total = isActive ? totalSetsForDay(day.id) : 0;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={day.id} className="day-card" style={{ background: isActive ? "#111" : "#0f0f0f" }}>
                    <div className="day-card-header" style={{ background: `linear-gradient(135deg, ${day.color}0a 0%, transparent 60%)` }}>
                      <div className="day-card-left">
                        <span className="day-emoji">{day.emoji}</span>
                        <div>
                          <div className="day-label" style={{ color: day.color }}>{day.label}</div>
                          <div className="day-subtitle">{day.subtitle}</div>
                          {day.isOptional && <div className="day-optional">optional · skip without guilt</div>}
                        </div>
                      </div>
                      <div className="day-card-right">
                        <div className="day-session-count">{sessionList.length} session{sessionList.length !== 1 ? "s" : ""} logged</div>
                        {isActive ? (
                          <div className="session-progress-inline">
                            <div className="session-progress-bar-sm">
                              <div className="session-progress-fill-sm" style={{ width: `${pct}%`, background: day.color }} />
                            </div>
                            <span className="session-progress-pct" style={{ color: day.color }}>{pct}%</span>
                          </div>
                        ) : (
                          <button
                            className="btn-start"
                            style={day.isOptional ? {} : { background: day.color, color: "#111" }}
                            onClick={() => startSession(day.id)}
                          >
                            {day.isOptional ? "View" : "Start"}
                          </button>
                        )}
                        {isActive && (
                          <button className="btn-start" style={{ background: day.color, color: "#111" }} onClick={() => setMainTab("workout")}>
                            Continue →
                          </button>
                        )}
                      </div>
                    </div>
                    {isActive && (
                      <div className="day-progress-bar">
                        <div className="day-progress-fill" style={{ width: `${pct}%`, background: day.color }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── WORKOUT VIEW ── */}
          {mainTab === "workout" && (
            <>
              <div className="workout-day-tabs">
                {DAYS.map(day => (
                  <button
                    key={day.id}
                    className={`workout-day-tab ${activeDay === day.id ? "active" : ""}`}
                    style={activeDay === day.id ? { background: day.color } : {}}
                    onClick={() => setActiveDay(day.id)}
                  >
                    {day.short}
                  </button>
                ))}
              </div>

              {currentSession?.day === activeDay ? (
                <>
                  <div className="session-active-bar">
                    <div className="session-active-info">
                      <strong>Session in progress</strong>
                      {formatDate(currentSession.date)}
                    </div>
                    <div>
                      <div className="session-progress-inline">
                        <div className="session-progress-bar-sm">
                          <div className="session-progress-fill-sm" style={{ width: `${Math.round((totalDoneForDay(activeDay) / totalSetsForDay(activeDay)) * 100)}%`, background: dayColor }} />
                        </div>
                        <span className="session-progress-pct" style={{ color: dayColor }}>{totalDoneForDay(activeDay)}/{totalSetsForDay(activeDay)}</span>
                      </div>
                    </div>
                  </div>
                  {activeDay === "MON" && <MondayWorkout sessionData={currentSession.data} onUpdate={updateExercise} />}
                  {activeDay === "WED" && <WednesdayWorkout sessionData={currentSession.data} onUpdate={updateExercise} />}
                  {activeDay === "FRI" && <FridayWorkout sessionData={currentSession.data} onUpdate={updateExercise} />}
                  {activeDay === "SAT" && <SaturdayWorkout />}
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "50px 20px" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{DAYS.find(d => d.id === activeDay)?.emoji}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, marginBottom: 8 }}>
                    {DAYS.find(d => d.id === activeDay)?.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>
                    {DAYS.find(d => d.id === activeDay)?.subtitle}
                  </div>
                  <button className="btn-primary" style={{ background: dayColor }} onClick={() => startSession(activeDay)}>
                    Start Session
                  </button>
                </div>
              )}
              <div style={{ height: 80 }} />
            </>
          )}

          {/* ── HISTORY VIEW ── */}
          {mainTab === "history" && (
            <>
              <div className="history-day-filter">
                <HistoryView sessions={sessions} days={DAYS} onCopy={copyToClipboard} copyMsg={copyMsg} onClear={clearAllData} />
              </div>
            </>
          )}

        </div>

        {/* ── Save Bar ── */}
        {currentSession && mainTab === "workout" && activeDay === currentSession.day && activeDay !== "SAT" && (
          <div className="save-bar">
            <button className="btn-secondary" onClick={() => { persistCurrentSession(null); setMainTab("week"); }}>Discard</button>
            <button className="btn-primary" style={{ background: dayColor }} onClick={saveSession}>Save Session ✓</button>
          </div>
        )}
      </div>
    </>
  );
}

// Separate component to use its own state for filter
function HistoryView({ sessions, days, onCopy, copyMsg, onClear }) {
  const [filter, setFilter] = useState("ALL");
  const allSessions = Object.entries(sessions)
    .flatMap(([day, list]) => list.map(s => ({ ...s, day })))
    .filter(s => filter === "ALL" || s.day === filter)
    .sort((a, b) => b.date - a.date);

  const dayMeta = (id) => days.find(d => d.id === id) || {};

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflow: "auto" }}>
        {["ALL", "MON", "WED", "FRI"].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f === "ALL" ? "All Days" : f}</button>
        ))}
      </div>
      {allSessions.length === 0 ? (
        <div className="history-empty">No sessions logged yet.<br />Start a workout to build your history.</div>
      ) : (
        allSessions.map(s => {
          const meta = dayMeta(s.day);
          const allEx = getAllExercises(s.day);
          const filled = allEx.filter(ex => (s.data[ex.id] || []).some(set => set.weight || set.reps));
          return (
            <div key={s.id} className="session-card">
              <div className="session-card-header">
                <div>
                  <span className="session-day-tag" style={{ background: meta.color + "20", color: meta.color }}>{meta.label}</span>
                  <div className="session-date">{formatDate(s.date)}</div>
                </div>
                <div style={{ fontSize: 11, color: "#333" }}>{filled.length}/{allEx.length} exercises</div>
              </div>
              <div className="session-exercise-list">
                {allEx.map(ex => {
                  const sets = (s.data[ex.id] || []).filter(set => set.weight || set.reps);
                  if (!sets.length) return null;
                  const best = sets.reduce((max, cur) => (parseInt(cur.weight) > parseInt(max.weight || 0) ? cur : max), {});
                  return (
                    <div key={ex.id} className="session-ex-row">
                      <span className="session-ex-name">{ex.label} {ex.name}</span>
                      <span>{best.weight ? `${best.weight}lbs` : ""}{best.reps ? ` × ${best.reps}` : ""}</span>
                    </div>
                  );
                })}
              </div>
              <div className="copy-section">
                <button className="btn-copy" onClick={() => onCopy(s.day, s)}>📋 Copy for Claude</button>
                {copyMsg === s.id && <span className="copy-confirm">Copied!</span>}
                <p className="copy-hint">Paste into Claude: <em>"Review my {meta.label} log and recommend weight adjustments."</em></p>
              </div>
            </div>
          );
        })
      )}
      {allSessions.length > 0 && (
        <div style={{ textAlign: "center", padding: "24px 0 8px", borderTop: "1px solid #1a1a1a", marginTop: 8 }}>
          <div style={{ fontSize: 11, color: "#2a2a2a", marginBottom: 12, lineHeight: 1.6 }}>
            💾 Data saved to this browser · same device = history always here
          </div>
          <button onClick={onClear} style={{ background: "none", border: "1px solid #2a2a2a", color: "#3a3a3a", fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "6px 14px", borderRadius: 6, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>
            Clear All Data
          </button>
        </div>
      )}
    </div>
  );
}
