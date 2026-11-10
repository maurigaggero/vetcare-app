/* VetCare - prototipo web mobile (vanilla JS, sin dependencias) */
(() => {
  "use strict";

  /* ================= Datos de ejemplo ================= */
  const PETS = [
    {
      name: "Luna", emoji: "🐶", species: "Perro", breed: "Labrador", age: "3 años", score: 92,
      grad: "linear-gradient(135deg,#f59e0b,#fb7185)", weightNow: "28,4 kg", trend: "+0,3 kg",
      weights: [26.1, 26.8, 27.2, 27.9, 28.1, 28.4],
      plan: { name: "Premium", id: "VC-48213-01", until: "31/12/2026", price: 18900 },
      cover: [
        { k: "Consultas", used: 2, max: 6, color: "#0fb5a0", icon: "🩺" },
        { k: "Vacunas", used: 1, max: 3, color: "#3b82f6", icon: "💉" },
        { k: "Estudios", used: 2, max: 4, color: "#a855f7", icon: "🔬" },
        { k: "Cirugías", used: 0, max: 1, color: "#f5a524", icon: "🏥" },
        { k: "Urgencias", used: 1, max: 3, color: "#ff453a", icon: "🚑" },
      ],
      vaccines: [
        { n: "Quíntuple (DHPPi+L)", d: "12/03/2026", next: "12/03/2027", st: "ok" },
        { n: "Antirrábica", d: "20/11/2025", next: "20/11/2026", st: "warn" },
        { n: "Tos de las perreras", d: "02/05/2025", next: "Vencida", st: "danger" },
      ],
      allergies: ["Pollo", "Polen"],
      meds: [{ n: "Apoquel 5,4 mg", d: "1 comp. cada 12 h · hasta 20/11" }],
      diag: [{ n: "Dermatitis alérgica leve", d: "Dra. Ríos · 14/09/2026" }],
      studies: [
        { n: "Hemograma completo", d: "14/09/2026", c: "ok", t: "Cubierto" },
        { n: "Radiografía de cadera", d: "02/10/2026", c: "warn", t: "Copago 30%" },
        { n: "Test de alergias", d: "14/09/2026", c: "danger", t: "No cubierto" },
      ],
    },
    {
      name: "Simón", emoji: "🐱", species: "Gato", breed: "Siamés", age: "5 años", score: 74,
      grad: "linear-gradient(135deg,#6366f1,#22d3ee)", weightNow: "4,2 kg", trend: "-0,2 kg",
      weights: [4.6, 4.5, 4.5, 4.4, 4.3, 4.2],
      plan: { name: "Plus", id: "VC-48213-02", until: "31/12/2026", price: 12400 },
      cover: [
        { k: "Consultas", used: 4, max: 5, color: "#0fb5a0", icon: "🩺" },
        { k: "Vacunas", used: 1, max: 2, color: "#3b82f6", icon: "💉" },
        { k: "Estudios", used: 1, max: 2, color: "#a855f7", icon: "🔬" },
        { k: "Cirugías", used: 0, max: 1, color: "#f5a524", icon: "🏥" },
        { k: "Urgencias", used: 0, max: 2, color: "#ff453a", icon: "🚑" },
      ],
      vaccines: [
        { n: "Triple felina", d: "08/04/2026", next: "08/04/2027", st: "ok" },
        { n: "Leucemia felina", d: "08/04/2026", next: "08/04/2027", st: "ok" },
        { n: "Antirrábica", d: "15/11/2025", next: "En 5 días", st: "warn" },
      ],
      allergies: ["Ninguna conocida"],
      meds: [{ n: "Dieta renal", d: "Alimento Renal Care · de por vida" }],
      diag: [{ n: "Sobrepeso leve revertido", d: "Dr. Sosa · 03/08/2026" }],
      studies: [
        { n: "Perfil renal", d: "03/08/2026", c: "ok", t: "Cubierto" },
        { n: "Ecografía abdominal", d: "03/08/2026", c: "warn", t: "Copago 20%" },
      ],
    },
  ];

  const ALERTS = [
    { id: 1, type: "Vacunas", group: "Hoy", icon: "💉", tone: "danger", st: "Vencida", pet: 0, title: "Tos de las perreras vencida", desc: "Luna está sin protección desde mayo. Cubierta por tu plan." },
    { id: 2, type: "Plan", group: "Hoy", icon: "✅", tone: "ok", st: "Aprobada", pet: 0, title: "Autorización aprobada", desc: "Radiografía de cadera: aprobada con copago del 30%.", noActions: true },
    { id: 3, type: "Medicación", group: "Hoy", icon: "💊", tone: "warn", st: "Próxima", pet: 0, title: "Apoquel: dosis de las 20:00", desc: "1 comprimido con comida. Quedan 9 días de tratamiento.", actions: ["Posponer"] },
    { id: 4, type: "Vacunas", group: "Esta semana", icon: "💉", tone: "warn", st: "Próxima", pet: 1, title: "Antirrábica de Simón en 5 días", desc: "Reservá ahora y evitá multas y viajes frustrados." },
    { id: 5, type: "Plan", group: "Esta semana", icon: "💳", tone: "warn", st: "Próxima", pet: 0, title: "Cuota vence el 15/11", desc: "Débito automático activo. Monto: $18.900.", actions: ["Posponer"] },
    { id: 6, type: "Plan", group: "Esta semana", icon: "📉", tone: "warn", st: "Atención", pet: 1, title: "Cupo casi agotado: consultas", desc: "A Simón le queda 1 consulta del plan este año.", actions: ["Reservar"] },
    { id: 7, type: "Controles", group: "Próximas", icon: "🩺", tone: "ok", st: "Al día", pet: 0, title: "Control anual de Luna", desc: "Sugerido para el 10/12. Peso y chequeo general." },
    { id: 8, type: "Controles", group: "Próximas", icon: "🎂", tone: "ok", st: "Al día", pet: 1, title: "¡Cumple de Simón el 28/11!", desc: "Cumple 6 años. Tenés 10% off en alimento premium.", actions: [] },
    { id: 9, type: "Plan", group: "Próximas", icon: "🔄", tone: "ok", st: "Al día", pet: 0, title: "Renovación del plan en 51 días", desc: "Se renueva el 31/12 con tu descuento familiar.", actions: [] },
  ];

  const MOTIVES = [
    { id: "consulta", icon: "🩺", n: "Consulta", cover: 100, price: 14000 },
    { id: "vacuna", icon: "💉", n: "Vacuna", cover: 100, price: 9000 },
    { id: "control", icon: "📋", n: "Control", cover: 100, price: 11000 },
    { id: "cirugia", icon: "🏥", n: "Cirugía", cover: 70, price: 180000 },
    { id: "bano", icon: "🛁", n: "Baño y corte", cover: 0, price: 8500 },
  ];
  const VETS = [
    { id: "rios", n: "Dra. Paula Ríos", r: "Clínica general", e: "👩‍⚕️" },
    { id: "sosa", n: "Dr. Martín Sosa", r: "Cirugía y traumatología", e: "👨‍⚕️" },
    { id: "vera", n: "Dra. Lucía Vera", r: "Dermatología", e: "👩‍⚕️" },
  ];
  const SLOTS = ["09:00", "09:30", "10:30", "11:00", "12:00", "15:00", "15:30", "16:30", "17:00"];

  const PROVIDERS = [
    { n: "VetCare Centro", t: "Guardia 24 h", f: "guardia", d: "0,8 km", x: 30, y: 60 },
    { n: "Hospital Veterinario Norte", t: "Guardia 24 h", f: "guardia", d: "2,4 km", x: 70, y: 35 },
    { n: "Dra. Vera · Dermatología", t: "Especialista", f: "especialista", d: "1,2 km", x: 50, y: 78 },
    { n: "Dr. Sosa · Traumatología", t: "Especialista", f: "especialista", d: "1,9 km", x: 82, y: 70 },
    { n: "Farmavet Plus", t: "Farmacia · 20% off", f: "farmacia", d: "0,5 km", x: 18, y: 30 },
  ];

  const PLANS = [
    { id: "Básico", base: 8900, feat: ["Consultas y vacunas anuales", "Urgencias con copago", "Descuento en farmacia"] },
    { id: "Plus", base: 12400, feat: ["Todo Básico + estudios", "Cirugías con 50% de cobertura", "Telemedicina ilimitada"] },
    { id: "Premium", base: 18900, feat: ["Todo Plus + cirugías al 70%", "Urgencias 24 h sin copago", "Alimento y medicación con beneficios"] },
  ];

  /* ================= Estado ================= */
  const S = {
    tab: "home", pet: 0, hasPlan: true, view: "ok",
    filter: "Todas", snoozed: new Set(),
    book: { step: 1, motive: null, vet: null, day: 0, slot: null, done: false },
    chat: [
      { me: false, t: "¡Hola Mauri! Soy Paula de VetCare. ¿En qué te puedo ayudar con Luna?", time: "10:02" },
      { me: true, t: "Hola Paula, desde ayer se rasca mucho la oreja", time: "10:04" },
      { me: false, t: "Entiendo. ¿Podés mandarnos una foto de la oreja?", time: "10:05" },
      { me: true, photo: "🐶", t: "", time: "10:07" },
    ],
    triage: new Set(),
    net: "todos", planSel: "Plus", calc: { species: "Perro", breed: "Mestizo", age: "Adulto (2-7)" },
    tramites: [
      { n: "Reintegro · Radiografía de cadera", amount: "$32.000", stage: 1 },
      { n: "Autorización · Test de alergias", amount: "", stage: 3 },
    ],
    attached: false,
  };
  const pet = () => PETS[S.pet];
  const $ = (s) => document.querySelector(s);
  const money = (n) => "$" + n.toLocaleString("es-AR");

  /* ================= Helpers de UI ================= */
  const ring = (pct, color, size = 64, stroke = 8, inner = "") => {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return `<div style="position:relative;width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" style="transform:rotate(-90deg)">
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--separator)" stroke-width="${stroke}"/>
        <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
          stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"/>
      </svg>
      <div style="position:absolute;inset:0;display:grid;place-items:center;font-weight:700;font-size:${size > 60 ? 18 : 13}px">${inner}</div></div>`;
  };

  const qr = (seed, size = 96) => {
    const n = 21; let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => ((h = (h * 1664525 + 1013904223) >>> 0) / 4294967296);
    const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
    let rects = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      let on;
      if (finder(x, y)) {
        const lx = x >= n - 7 ? x - (n - 7) : x, ly = y >= n - 7 ? y - (n - 7) : y;
        on = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
      } else on = rnd() > 0.5;
      if (on) rects += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" fill="#111">${rects}</svg>`;
  };

  const weightChart = (data) => {
    const w = 310, h = 110, p = 10, min = Math.min(...data) - 0.5, max = Math.max(...data) + 0.5;
    const pts = data.map((v, i) => [p + (i * (w - 2 * p)) / (data.length - 1), h - p - ((v - min) / (max - min)) * (h - 2 * p)]);
    const line = pts.map((q) => q.join(",")).join(" ");
    const area = `${p},${h - p} ${line} ${w - p},${h - p}`;
    const months = ["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"];
    return `<svg viewBox="0 0 ${w} ${h + 18}" width="100%">
      <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
      <polygon points="${area}" fill="url(#wg)"/>
      <polyline points="${line}" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.map((q, i) => `<circle cx="${q[0]}" cy="${q[1]}" r="${i === pts.length - 1 ? 6 : 3.5}" fill="${i === pts.length - 1 ? "var(--accent)" : "var(--bg)"}" stroke="var(--accent)" stroke-width="2"/>`).join("")}
      ${pts.map((q, i) => `<text x="${q[0]}" y="${h + 14}" font-size="10" text-anchor="middle" fill="var(--text-2)">${months[i]}</text>`).join("")}
    </svg>`;
  };

  const chipFor = (tone, t) => `<span class="chip ${tone}">${t}</span>`;
  const toneColors = { danger: "var(--danger-soft)", warn: "var(--warn-soft)", ok: "var(--ok-soft)", info: "var(--info-soft)", accent: "var(--accent-soft)" };

  /* ================= Estados globales (cargando / error) ================= */
  const loadingView = () => `<div class="title">Cargando…</div><div class="stack" style="margin-top:22px">
    <div class="skeleton" style="height:230px"></div>
    <div class="grid2"><div class="skeleton" style="height:118px"></div><div class="skeleton" style="height:118px"></div></div>
    <div class="skeleton" style="height:90px"></div></div>`;
  const errorView = () => `<div class="empty" style="margin-top:80px"><div class="em">📡</div>
    <div class="h2" style="color:var(--text)">No pudimos cargar</div>
    <p class="sub" style="margin:6px 0 18px">Revisá tu conexión e intentá de nuevo.</p>
    <button class="btn primary" data-act="retry">Reintentar</button></div>`;

  /* ================= Pantallas ================= */
  const V = {};

  /* 1. Inicio */
  V.home = () => {
    const p = pet();
    const nextVac = p.vaccines.find((v) => v.st !== "ok") || p.vaccines[0];
    const cards = PETS.map((q, i) => `
      <div class="pet-card" style="background:${q.grad}" data-i="${i}">
        <div class="pet-emoji">${q.emoji}</div>
        <div class="pet-ring glass">${ring(q.score, q.score > 80 ? "var(--ok)" : "var(--warn)", 46, 6, q.score)}
          <div><div style="font-weight:700;font-size:14px">Score de salud</div><div class="cap">${q.score > 80 ? "Todo al día" : "Revisar vacunas"}</div></div></div>
        <div class="pname">${q.name}</div><div class="pinfo">${q.breed} · ${q.age}</div>
      </div>`).join("");
    const used = p.cover.reduce((a, c) => a + c.used, 0), max = p.cover.reduce((a, c) => a + c.max, 0);
    const avail = Math.round(((max - used) / max) * 100);
    return `
      <div class="topbar">
        <div class="row"><div class="avatar">M</div><div><div class="cap">Buen día</div><div class="h2">Hola, Mauri</div></div></div>
        <button class="icon-btn glass" data-act="go" data-arg="alerts" aria-label="Alertas">🔔<span class="badge">4</span></button>
      </div>
      <div class="pets" id="pets">${cards}</div>
      <div class="dots">${PETS.map((_, i) => `<i class="${i === S.pet ? "on" : ""}"></i>`).join("")}</div>

      <div class="section"><div class="h2">Hoy en la salud de ${p.name}</div>
        <div class="grid2">
          <button class="widget glass" data-act="go" data-arg="book"><div class="wi" style="background:var(--accent-soft)">📅</div><span class="cap">Próxima cita</span><span class="big">Jue 12 · 10:30</span><span class="cap">Dra. Ríos · Control</span></button>
          <button class="widget glass" data-act="go" data-arg="health"><div class="wi" style="background:var(--info-soft)">💉</div><span class="cap">Próxima vacuna</span><span class="big" style="font-size:18px">${nextVac.n.split(" (")[0]}</span><span>${chipFor(nextVac.st, nextVac.st === "danger" ? "Vencida" : nextVac.st === "warn" ? "En 5 días" : "Al día")}</span></button>
          <button class="widget glass" data-act="go" data-arg="health"><div class="wi" style="background:var(--ok-soft)">⚖️</div><span class="cap">Peso actual</span><span class="big">${p.weightNow}</span><span class="cap" style="color:var(--ok)">${p.trend} este mes</span></button>
          <button class="widget glass" data-act="go" data-arg="alerts"><div class="wi" style="background:var(--warn-soft)">⚠️</div><span class="cap">Alerta del día</span><span style="font-weight:600;font-size:15px;line-height:1.25">${p.name === "Luna" ? "Falta la vacuna tos de las perreras" : "Antirrábica vence en 5 días"}</span></button>
        </div></div>

      <div class="section"><button class="mini-plan" style="width:100%" data-act="go" data-arg="plan">
        <div style="font-size:34px">🛡️</div>
        <div class="grow"><div style="font-size:13px;opacity:.85">Plan ${p.plan.name} · ${S.hasPlan ? "Activo" : "Sin plan"}</div>
          <div style="font-size:19px;font-weight:700">${S.hasPlan ? `${avail}% de cobertura disponible` : "Afiliá a " + p.name}</div>
          <div class="bar"><i style="width:${S.hasPlan ? avail : 0}%"></i></div></div>
        <div style="font-size:22px">›</div></button></div>`;
  };

  /* 2. Alertas */
  V.alerts = () => {
    const filters = ["Todas", "Vacunas", "Medicación", "Controles", "Plan"];
    const list = ALERTS.filter((a) => S.filter === "Todas" || a.type === S.filter);
    const groups = ["Hoy", "Esta semana", "Próximas"];
    const body = groups.map((g) => {
      const items = list.filter((a) => a.group === g);
      if (!items.length) return "";
      return `<div class="group-title">${g}</div>` + items.map((a) => {
        const snoozed = S.snoozed.has(a.id);
        const acts = a.actions !== undefined ? a.actions : a.noActions ? [] : ["Reservar", "Posponer"];
        return `<div class="alert-item glass" id="al-${a.id}">
          <div class="ai-icon" style="background:${toneColors[a.tone]}">${a.icon}</div>
          <div class="grow"><b style="font-size:16px">${a.title}</b>
            <p class="sub" style="margin:2px 0 6px">${a.desc}</p>
            <div class="row" style="gap:6px">${chipFor(snoozed ? "info" : a.tone, snoozed ? "Pospuesta 24 h" : a.st)}<span class="cap">${PETS[a.pet].emoji} ${PETS[a.pet].name}</span></div>
            ${acts.length && !snoozed ? `<div class="alert-actions">
              ${acts.includes("Reservar") ? `<button class="btn primary sm" data-act="reserve" data-arg="${a.id}">Reservar</button>` : ""}
              ${acts.includes("Posponer") ? `<button class="btn soft sm" data-act="snooze" data-arg="${a.id}">Posponer</button>` : ""}</div>` : ""}
          </div></div>`;
      }).join("");
    }).join("");
    return `<button class="back" data-act="go" data-arg="home">‹ Inicio</button>
      <div class="title">Alertas</div><p class="sub" style="margin-top:4px">Recordatorios inteligentes de tus mascotas</p>
      <div class="filters">${filters.map((f) => `<button class="filter ${S.filter === f ? "on" : ""}" data-act="filter" data-arg="${f}">${f}</button>`).join("")}</div>
      ${body || `<div class="empty"><div class="em">🎉</div><div class="h2" style="color:var(--text)">Sin alertas, todo en orden</div><p class="sub">Te avisamos cuando haya algo nuevo.</p></div>`}`;
  };

  /* 3. Salud */
  V.health = () => {
    const p = pet();
    const stTxt = { ok: "Al día", warn: "Próxima", danger: "Vencida" };
    return `
      <div class="topbar"><div class="title">Salud</div>
        <button class="btn soft sm" data-act="share">↗ Compartir</button></div>
      <div class="seg">${PETS.map((q, i) => `<button class="${i === S.pet ? "on" : ""}" data-act="pet" data-arg="${i}">${q.emoji} ${q.name}</button>`).join("")}</div>

      <div class="section"><div class="h2">Carnet de vacunas <span class="cap">${p.vaccines.length} registradas</span></div>
        <div class="card glass">${p.vaccines.map((v) => `<div class="list-row">
          <div class="ai-icon" style="background:${toneColors[v.st]}">💉</div>
          <div class="grow"><b>${v.n}</b><div class="cap">Aplicada ${v.d} · Próx.: ${v.next}</div></div>${chipFor(v.st, stTxt[v.st])}</div>`).join("")}</div></div>

      <div class="section"><div class="h2">Evolución de peso <span class="cap">${p.weightNow}</span></div>
        <div class="card glass">${weightChart(p.weights)}</div></div>

      <div class="section"><div class="h2">Alergias</div><div class="row" style="flex-wrap:wrap;gap:8px">${p.allergies.map((a) => `<span class="tag">${a}</span>`).join("")}</div></div>

      <div class="section"><div class="h2">Medicación actual</div><div class="card glass">${p.meds.map((m) => `<div class="list-row"><div class="ai-icon" style="background:var(--info-soft)">💊</div><div class="grow"><b>${m.n}</b><div class="cap">${m.d}</div></div></div>`).join("")}</div></div>

      <div class="section"><div class="h2">Diagnósticos</div><div class="card glass">${p.diag.map((m) => `<div class="list-row"><div class="ai-icon" style="background:var(--accent-soft)">📝</div><div class="grow"><b>${m.n}</b><div class="cap">${m.d}</div></div></div>`).join("")}</div></div>

      <div class="section"><div class="h2">Estudios y archivos</div><div class="card glass">${p.studies.map((s, i) => `<div class="list-row">
        <div class="ai-icon" style="background:var(--separator)">📄</div>
        <div class="grow"><b>${s.n}</b><div class="cap">${s.d}</div><div style="margin-top:4px">${chipFor(s.c, "Plan: " + s.t)}</div></div>
        <button class="icon-btn" data-act="download" data-arg="${i}" aria-label="Descargar">⬇️</button></div>`).join("")}</div></div>

      <div class="section"><button class="btn primary block" data-act="share">📲 Compartir con otro veterinario</button></div>`;
  };

  /* 4. Turnos */
  V.book = () => {
    const b = S.book;
    if (b.done) return bookingDone();
    const titles = ["", "¿Para quién es el turno?", "¿Cuál es el motivo?", "Elegí profesional", "Elegí fecha y hora"];
    let content = "";
    if (b.step === 1) content = PETS.map((q, i) => `<button class="choice glass ${S.pet === i ? "on" : ""}" style="width:100%" data-act="pet" data-arg="${i}">
      <div class="ai-icon" style="background:${q.grad};font-size:26px;width:52px;height:52px">${q.emoji}</div>
      <div class="grow"><b style="font-size:18px">${q.name}</b><div class="cap">${q.breed} · ${q.age}</div></div>${S.pet === i ? "✓" : ""}</button>`).join("");
    if (b.step === 2) content = MOTIVES.map((m) => `<button class="choice glass ${b.motive === m.id ? "on" : ""}" style="width:100%" data-act="motive" data-arg="${m.id}">
      <div class="ai-icon" style="background:var(--accent-soft);font-size:22px">${m.icon}</div>
      <div class="grow"><b>${m.n}</b><div class="cap">${S.hasPlan ? (m.cover === 100 ? "Cubierto por tu plan" : m.cover > 0 ? `Cubre ${m.cover}% · copago ${100 - m.cover}%` : "No cubierto") : "Desde " + money(m.price)}</div></div>${b.motive === m.id ? "✓" : ""}</button>`).join("");
    if (b.step === 3) content = VETS.map((v) => `<button class="choice glass ${b.vet === v.id ? "on" : ""}" style="width:100%" data-act="vet" data-arg="${v.id}">
      <div class="ai-icon" style="background:var(--info-soft);font-size:26px;width:52px;height:52px">${v.e}</div>
      <div class="grow"><b>${v.n}</b><div class="cap">${v.r} · ⭐ 4.9</div></div>${b.vet === v.id ? "✓" : ""}</button>`).join("");
    if (b.step === 4) {
      const d0 = new Date(2026, 10, 10);
      const days = Array.from({ length: 10 }, (_, i) => { const d = new Date(d0); d.setDate(d0.getDate() + i + 1); return d; });
      const wd = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
      const m = MOTIVES.find((x) => x.id === b.motive);
      const pay = coverage(m);
      content = `<div class="days">${days.map((d, i) => `<button class="day ${b.day === i ? "on" : ""}" data-act="day" data-arg="${i}"><small>${wd[d.getDay()]}</small><b>${d.getDate()}</b></button>`).join("")}</div>
        <div class="slots">${SLOTS.map((s, i) => `<button class="slot ${b.slot === s ? "on" : ""} ${(i * 7 + b.day * 3) % 5 === 0 ? "off" : ""}" data-act="slot" data-arg="${s}">${s}</button>`).join("")}</div>
        <div class="coverage" style="background:${S.hasPlan ? (m.cover === 0 ? "var(--danger-soft)" : "var(--ok-soft)") : "var(--warn-soft)"}">
          <div style="font-size:26px">${S.hasPlan ? (m.cover === 0 ? "ℹ️" : "🛡️") : "💡"}</div>
          <div><b>${pay.title}</b><div class="cap">${pay.desc}</div></div></div>`;
    }
    const canNext = (b.step === 1) || (b.step === 2 && b.motive) || (b.step === 3 && b.vet) || (b.step === 4 && b.slot);
    return `<div class="title">Turnos</div>
      <p class="sub" style="margin-top:4px">Reservá en menos de un minuto</p>
      <div class="stepper">${[1, 2, 3, 4].map((i) => `<i class="${i <= b.step ? "on" : ""}"></i>`).join("")}</div>
      <div class="h2" style="margin-bottom:12px">${titles[b.step]}</div>
      ${content}
      <div class="row" style="margin-top:18px">
        ${b.step > 1 ? `<button class="btn soft" data-act="bookback">Atrás</button>` : ""}
        <button class="btn primary grow" ${canNext ? "" : "disabled"} data-act="booknext">${b.step === 4 ? "Confirmar turno" : "Continuar"}</button></div>
      ${b.step === 1 ? `<div class="section"><div class="h2">Tus próximos turnos</div><div class="card glass"><div class="list-row"><div class="ai-icon" style="background:var(--accent-soft)">📅</div><div class="grow"><b>Control · ${PETS[0].name}</b><div class="cap">Jue 12/11 · 10:30 · Dra. Ríos</div></div>${chipFor("ok", "Confirmado")}</div></div></div>` : ""}`;
  };
  function coverage(m) {
    if (!S.hasPlan) return { title: `Costo: ${money(m.price)}`, desc: "Con un plan de VetCare podrías ahorrar hasta 70%. Mirá Mi Plan." };
    if (m.cover === 100) return { title: "Cubierto por tu plan · Copago $0", desc: `Plan ${pet().plan.name}. No pagás nada en el mostrador.` };
    if (m.cover === 0) return { title: `No cubierto · ${money(m.price)}`, desc: "Este servicio no está incluido en el plan." };
    return { title: `Copago estimado ${money(Math.round(m.price * (1 - m.cover / 100)))}`, desc: `El plan cubre ${m.cover}% (${money(Math.round(m.price * m.cover / 100))}).` };
  }
  function bookingDone() {
    const b = S.book, m = MOTIVES.find((x) => x.id === b.motive), v = VETS.find((x) => x.id === b.vet), p = pet();
    const d = new Date(2026, 10, 10 + b.day + 1);
    const txt = d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
    const pay = coverage(m);
    return `<div style="text-align:center"><div class="check">✓</div><div class="title" style="font-size:28px">¡Turno confirmado!</div>
      <p class="sub" style="margin:6px 0 20px">Te vamos a recordar 24 h y 2 h antes.</p></div>
      <div class="wallet"><div class="row" style="justify-content:space-between"><b style="letter-spacing:.08em;font-size:13px">VETCARE · TURNO</b><span style="font-size:30px">${p.emoji}</span></div>
        <div style="font-size:26px;font-weight:700;margin:14px 0 2px">${m.n} · ${p.name}</div>
        <div style="opacity:.9;text-transform:capitalize">${txt} · ${b.slot} h</div>
        <div class="notch"></div>
        <div class="row" style="margin-top:52px;justify-content:space-between;align-items:flex-end">
          <div><div style="font-size:12px;opacity:.8">Profesional</div><b>${v.n}</b><div style="font-size:12px;opacity:.8;margin-top:8px">Pago</div><b>${pay.title.split(" · ")[0]}</b></div>
          <div class="qr">${qr("turno" + b.slot + b.day, 72)}</div></div></div>
      <div class="stack" style="margin-top:20px">
        <button class="btn soft block" data-act="toast" data-arg="Agregado a tu calendario 📅">Agregar al calendario</button>
        <button class="btn primary block" data-act="bookreset">Listo</button></div>`;
  }

  /* 5. Chat */
  V.chat = () => {
    const triageOpts = ["¿Come?", "¿Vomita?", "¿Decaído?", "¿Respira raro?"];
    const lvl = S.triage.size;
    const tone = lvl >= 3 ? ["danger", "Urgencia alta", "Andá a guardia ahora. Te esperamos."] : lvl === 2 ? ["warn", "Prioridad media", "Conviene verla hoy. Reservá un turno rápido."] : ["ok", "Urgencia baja", "Podés esperar. Seguí monitoreando y avisanos."];
    return `<div class="topbar"><div class="row"><div class="avatar" style="background:var(--info)">V</div><div><div class="h2">VetCare</div><div class="cap" style="color:var(--ok)">● En línea · responde en minutos</div></div></div>
        <button class="icon-btn glass" data-act="toast" data-arg="Teleconsulta: próximo turno de video 15:00 📹">📹</button></div>
      <button class="sos" data-act="sos"><span style="font-size:26px">🚨</span><span style="text-align:left"><div style="font-size:17px">Urgencia</div><div style="font-size:12px;font-weight:500;opacity:.9">Llamá a la guardia 24 h de tu red</div></span><span style="margin-left:auto;font-size:22px">📞</span></button>
      <div class="section" style="margin-top:16px"><div class="cap" style="margin-bottom:6px">Triage rápido de ${pet().name}</div>
        <div class="quick">${triageOpts.map((t) => `<button class="${S.triage.has(t) ? "on" : ""}" data-act="triage" data-arg="${t}">${t}</button>`).join("")}</div>
        ${lvl ? `<div class="card glass" style="margin-top:10px;padding:12px"><div class="row">${chipFor(tone[0], tone[1])}<span class="sub grow">${tone[2]}</span></div>
          <div class="row" style="margin-top:10px">${lvl >= 3 ? `<button class="btn danger sm grow" data-act="sos">Llamar a guardia</button>` : `<button class="btn primary sm grow" data-act="go" data-arg="book">Reservar turno</button>`}</div></div>` : ""}</div>
      <div class="quick" style="margin-top:10px"><button data-act="coverage">🛡️ Consultar cobertura</button><button data-act="go" data-arg="book">📅 Pedir turno</button></div>
      <div class="chat-wrap" id="chatlist">${S.chat.map(bubble).join("")}</div>
      <div class="composer"><button class="icon-btn glass" data-act="attach" aria-label="Adjuntar">📎</button>
        <input id="msg" placeholder="Escribí un mensaje…" autocomplete="off" /><button class="icon-btn" style="background:var(--accent);color:#fff" data-act="send" aria-label="Enviar">↑</button></div>`;
  };
  const bubble = (m) => `<div class="bubble ${m.me ? "out" : "in"}">${m.photo ? `<div class="photo-ph">${m.photo}</div>` : ""}${m.t}<span class="meta">${m.time}${m.me ? " ✓✓" : ""}</span></div>`;

  /* 6. Mi Plan */
  V.plan = () => (S.hasPlan ? planActive() : planEmpty());
  function planActive() {
    const p = pet(), pl = p.plan;
    const tr = S.tramites;
    const stages = ["Enviado", "En revisión", "Aprobado", "Pagado"];
    const first = tr[0];
    return `
      <div class="topbar"><div class="title">Mi Plan</div><span class="chip ok">● Activo</span></div>
      <div class="seg" style="margin-bottom:14px">${PETS.map((q, i) => `<button class="${i === S.pet ? "on" : ""}" data-act="pet" data-arg="${i}">${q.emoji} ${q.name}</button>`).join("")}</div>

      <div class="credential">
        <div class="row" style="justify-content:space-between"><b style="letter-spacing:.1em;font-size:12px">VETCARE · OBRA SOCIAL MASCOTAS</b><span class="chip" style="background:rgba(255,255,255,.22);color:#fff">Activo</span></div>
        <div class="row" style="margin-top:16px"><div class="cred-pet">${p.emoji}</div>
          <div><div style="font-size:26px;font-weight:700;letter-spacing:-.02em">${p.name}</div><div style="opacity:.85;font-size:14px">${p.breed} · ${p.age}</div></div></div>
        <div class="row" style="margin-top:16px;align-items:flex-end;justify-content:space-between">
          <div><div style="font-size:12px;opacity:.75">Plan</div><div style="font-size:22px;font-weight:700">${pl.name}</div>
            <div style="font-size:12px;opacity:.75;margin-top:8px">N° de afiliado</div><div style="font-weight:600;letter-spacing:.04em">${pl.id}</div>
            <div style="font-size:12px;opacity:.75;margin-top:8px">Vigencia</div><div style="font-weight:600">hasta ${pl.until}</div></div>
          <div class="qr">${qr(pl.id, 92)}</div></div></div>
      <button class="btn dark block" style="margin-top:12px" data-act="wallet">👛 Agregar a Apple Wallet</button>

      <div class="section"><div class="h2">Cobertura de ${p.name}<span class="cap">usado / cupo</span></div>
        <div class="rings">${p.cover.map((c) => `<div class="ring-item glass">${ring(Math.round((c.used / c.max) * 100), c.color, 62, 7, c.icon)}<b>${c.k}</b><span>${c.used} de ${c.max}</span></div>`).join("")}
          <div class="ring-item glass" style="justify-content:center"><b style="font-size:13px;margin:0">Copagos</b><span>Consulta $0<br>Estudios 30%<br>Cirugía 30%</span></div></div></div>

      <div class="section"><div class="h2">Acciones rápidas</div>
        <div class="actions3">
          <button class="action glass" data-act="sheet" data-arg="auth"><div class="ai">📋</div>Pedir autorización</button>
          <button class="action glass" data-act="sheet" data-arg="refund"><div class="ai">🧾</div>Solicitar reintegro</button>
          <button class="action glass" data-act="sheet" data-arg="network"><div class="ai">📍</div>Red de prestadores</button></div></div>

      <div class="section"><div class="h2">Seguimiento de trámites</div>
        <div class="card glass"><b>${first.n}</b> ${first.amount ? `<span class="cap">· ${first.amount}</span>` : ""}
          <div class="tl" style="margin-top:14px">${stages.map((s, i) => `<div class="tl-step ${i < first.stage ? "done" : i === first.stage ? "now" : ""}"><b>${s}</b><div class="cap">${i < first.stage ? "Completado" : i === first.stage ? "En curso · te avisamos por push" : "Pendiente"}</div></div>`).join("")}</div>
          ${tr.slice(1).map((t) => `<div class="sep"></div><div class="row"><div class="grow"><b style="font-size:15px">${t.n}</b></div>${chipFor(t.stage >= 3 ? "ok" : "warn", stages[t.stage])}</div>`).join("")}</div></div>

      <div class="section"><div class="h2">Cuotas y pagos</div>
        <div class="card glass"><div class="row"><div class="grow"><div class="cap">Próxima cuota · 15/11/2026</div><div style="font-size:26px;font-weight:700;letter-spacing:-.02em">${money(pl.price)}</div></div>${chipFor("accent", "Débito automático")}</div>
          <div class="sep"></div>
          ${[["15/10/2026", pl.price], ["15/09/2026", pl.price], ["15/08/2026", pl.price]].map((h) => `<div class="list-row" style="padding:8px 0"><span class="grow">${h[0]}</span><span>${money(h[1])}</span>${chipFor("ok", "Pagada")}</div>`).join("")}
          <div class="row" style="margin-top:14px"><button class="btn soft sm grow" data-act="sheet" data-arg="change">Cambiar plan</button><button class="btn primary sm grow" data-act="sheet" data-arg="addpet">+ Otra mascota −15%</button></div></div></div>

      <div class="section"><button class="btn soft block" data-act="toggleplan">Ver estado sin plan (demo)</button></div>`;
  }
  function calcPrice(base) {
    let f = 1;
    if (S.calc.species === "Gato") f -= 0.1;
    if (S.calc.breed === "Raza grande") f += 0.12;
    if (S.calc.breed === "Raza pura") f += 0.06;
    if (S.calc.age.startsWith("Cachorro")) f -= 0.05;
    if (S.calc.age.startsWith("Senior")) f += 0.25;
    return Math.round((base * f) / 100) * 100;
  }
  function planEmpty() {
    const sel = PLANS.find((x) => x.id === S.planSel);
    const opt = (arr, v) => arr.map((o) => `<option ${o === v ? "selected" : ""}>${o}</option>`).join("");
    return `<div class="title">Mi Plan</div>
      <p class="sub" style="margin:4px 0 16px">La obra social para tu mascota. Sin sorpresas en la veterinaria.</p>
      <div class="mini-plan" style="flex-direction:column;align-items:flex-start;gap:6px"><div style="font-size:34px">🛡️</div><div style="font-size:22px;font-weight:700">Hasta 70% de cobertura</div><div style="opacity:.9">Consultas, vacunas, estudios, cirugías y urgencias 24 h.</div></div>
      <div class="section"><div class="h2">Compará planes</div><div class="plan-cmp">
        ${PLANS.map((x) => `<button class="plan-opt glass ${S.planSel === x.id ? "on" : ""}" data-act="selplan" data-arg="${x.id}">
          <div class="row"><b style="font-size:18px" class="grow">${x.id}</b>${x.id === "Plus" ? chipFor("accent", "Más elegido") : ""}</div>
          <div class="price">${money(calcPrice(x.base))}<span class="cap"> /mes</span></div>
          <ul>${x.feat.map((f) => `<li>${f}</li>`).join("")}</ul></button>`).join("")}</div></div>
      <div class="section"><div class="h2">Calculá tu precio</div><div class="card glass"><div class="form">
        <label class="field">Especie<select data-calc="species">${opt(["Perro", "Gato"], S.calc.species)}</select></label>
        <label class="field">Raza<select data-calc="breed">${opt(["Mestizo", "Raza pura", "Raza grande"], S.calc.breed)}</select></label>
        <label class="field" style="grid-column:span 2">Edad<select data-calc="age">${opt(["Cachorro (0-1)", "Adulto (2-7)", "Senior (8+)"], S.calc.age)}</select></label></div>
        <div class="sep"></div><div class="row"><div class="grow cap">Plan ${sel.id} para tu ${S.calc.species.toLowerCase()}</div><div style="font-size:24px;font-weight:700">${money(calcPrice(sel.base))}<span class="cap">/mes</span></div></div></div></div>
      <div class="section"><button class="btn primary block" data-act="afiliar">Afiliar a mi mascota</button>
        <p class="cap" style="text-align:center;margin-top:10px">Sin permanencia · Carencia de 15 días solo en cirugías</p>
        <button class="btn soft block" style="margin-top:14px" data-act="toggleplan">Volver a estado con plan (demo)</button></div>`;
  }

  /* ================= Sheets ================= */
  const SH = {
    share: () => `<div class="grab"></div><div class="h2" style="text-align:center">Compartir historia de ${pet().name}</div>
      <p class="sub" style="text-align:center;margin:6px 0 16px">Otro veterinario escanea el código y accede por 24 h a vacunas, peso y estudios.</p>
      <div style="display:grid;place-items:center"><div class="qr" style="padding:14px;box-shadow:var(--shadow-card)">${qr("hc" + pet().name, 180)}</div></div>
      <div class="stack" style="margin-top:18px"><button class="btn primary block" data-act="toast" data-arg="Enlace copiado 🔗">Copiar enlace seguro</button><button class="btn soft block" data-act="close">Cerrar</button></div>`,
    sos: () => `<div class="grab"></div><div style="text-align:center;font-size:44px">🚨</div><div class="h2" style="text-align:center">Guardia 24 h más cercana</div>
      <div class="card glass" style="margin:16px 0"><div class="row"><div class="ai-icon" style="background:var(--danger-soft)">🏥</div><div class="grow"><b>VetCare Centro</b><div class="cap">Av. Libertador 1450 · 0,8 km · ~4 min</div></div>${chipFor("ok", "En tu red")}</div></div>
      <div class="stack"><button class="btn danger block" data-act="toast" data-arg="Llamando a la guardia… 📞">📞 Llamar al 0800-VETCARE</button>
      <button class="btn soft block" data-act="toast" data-arg="Abriendo ruta en Mapas 🗺️">Cómo llegar</button>
      <button class="btn soft block" data-act="close">Cerrar</button></div>`,
    auth: () => `<div class="grab"></div><div class="h2">Pedir autorización</div><p class="sub" style="margin:4px 0 14px">Para cirugías o estudios de alto costo. Respondemos en 24 h.</p>
      <div class="form" style="grid-template-columns:1fr"><label class="field">Prestación<select><option>Cirugía</option><option>Estudio</option></select></label></div>
      <button class="action glass" style="width:100%;margin:12px 0;flex-direction:row;justify-content:center" data-act="attach2">${S.attached ? "✅ Orden adjunta" : "📷 Sacar foto a la orden médica"}</button>
      <button class="btn primary block" ${S.attached ? "" : "disabled"} data-act="submit" data-arg="Autorización · Cirugía">Enviar solicitud</button>`,
    refund: () => `<div class="grab"></div><div class="h2">Solicitar reintegro</div><p class="sub" style="margin:4px 0 14px">Fotografiá la factura y listo. Reintegro en 5 a 7 días hábiles.</p>
      <div class="form" style="grid-template-columns:1fr"><label class="field">Monto abonado<input value="$32.000" /></label></div>
      <button class="action glass" style="width:100%;margin:12px 0;flex-direction:row;justify-content:center" data-act="attach2">${S.attached ? "✅ Factura adjunta" : "📷 Escanear factura con la cámara"}</button>
      <button class="btn primary block" ${S.attached ? "" : "disabled"} data-act="submit" data-arg="Reintegro · Factura nueva">Enviar reintegro</button>`,
    network: () => {
      const f = S.net;
      const list = PROVIDERS.filter((x) => f === "todos" || x.f === f);
      return `<div class="grab"></div><div class="h2" style="margin-bottom:10px">Red de prestadores</div>
        <div class="quick" style="margin:0 -20px 10px">${[["todos", "Todos"], ["guardia", "🚨 Guardia 24 h"], ["especialista", "🎓 Especialistas"], ["farmacia", "💊 Farmacia"]].map((o) => `<button class="${f === o[0] ? "on" : ""}" data-act="net" data-arg="${o[0]}">${o[1]}</button>`).join("")}</div>
        <div class="map">${list.map((x) => `<span class="pin" style="left:${x.x}%;top:${x.y}%">${x.f === "farmacia" ? "💊" : x.f === "guardia" ? "🚨" : "🎓"}</span>`).join("")}</div>
        <div class="card glass" style="margin-top:12px;padding:6px 14px">${list.map((x) => `<div class="list-row"><div class="grow"><b>${x.n}</b><div class="cap">${x.t} · ${x.d}</div></div><button class="btn soft sm" data-act="closego" data-arg="book">Turno</button></div>`).join("")}</div>`;
    },
    change: () => `<div class="grab"></div><div class="h2">Cambiar plan de ${pet().name}</div><div class="plan-cmp" style="margin-top:12px">${PLANS.map((x) => `<button class="plan-opt glass ${pet().plan.name === x.id ? "on" : ""}" data-act="chgplan" data-arg="${x.id}"><div class="row"><b class="grow">${x.id}</b><b>${money(x.base)}/mes</b></div></button>`).join("")}</div>`,
    addpet: () => `<div class="grab"></div><div style="text-align:center;font-size:44px">🐾👨‍👩‍👧</div><div class="h2" style="text-align:center">Descuento familiar</div>
      <p class="sub" style="text-align:center;margin:6px 0 16px">Sumá otra mascota a tu plan y ahorrá 15% en cada cuota, para siempre.</p>
      <div class="stack"><button class="btn primary block" data-act="toast" data-arg="Te contactamos para completar el alta 🐾">Agregar mascota</button><button class="btn soft block" data-act="close">Ahora no</button></div>`,
  };
  let sheetKey = null;
  function openSheet(key) { sheetKey = key; $("#sheet").innerHTML = SH[key](); $("#sheet").classList.add("on"); $("#scrim").classList.add("on"); }
  function closeSheet() { sheetKey = null; $("#sheet").classList.remove("on"); $("#scrim").classList.remove("on"); S.attached = false; }
  let toastT;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2200); }

  /* ================= Render ================= */
  const TABS = [
    ["home", "🏠", "Inicio"], ["health", "🩺", "Salud"], ["book", "📅", "Turnos"], ["plan", "🛡️", "Mi Plan"], ["chat", "💬", "Chat"],
  ];
  function render(keep) {
    const el = $("#screen"), top = el.scrollTop;
    el.style.animation = keep ? "none" : "";
    el.innerHTML = S.view === "loading" ? loadingView() : S.view === "error" ? errorView() : V[S.tab]();
    el.scrollTop = keep ? top : 0;
    $("#tabbar").innerHTML = TABS.map(([k, ic, n]) => `<button class="tab ${S.tab === k || (S.tab === "alerts" && k === "home") ? "on" : ""} ${k === "plan" ? "star" : ""}" data-act="go" data-arg="${k}"><span class="ic">${ic}</span>${n}</button>`).join("");
    renderDemo();
    bindCarousel();
  }
  function bindCarousel() {
    const c = $("#pets"); if (!c) return;
    c.scrollLeft = S.pet * 332;
    let t;
    c.addEventListener("scroll", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(c.scrollLeft / 332);
        if (i !== S.pet && PETS[i]) { S.pet = i; render(true); }
      }, 120);
    });
  }

  const SCREENS = [["home", "Inicio / Mi mascota"], ["alerts", "Alertas"], ["health", "Historia clínica"], ["book", "Turnos"], ["chat", "Chat y urgencias"], ["plan", "Mi Plan ⭐"]];
  function renderDemo() {
    $("#demo").innerHTML = `<h1>Vet<span>Care</span></h1>
      <p>Prototipo de las 6 pantallas clave. Tocá dentro del teléfono o saltá directo:</p>
      <div class="demo-list">${SCREENS.map(([k, n], i) => `<button class="${S.tab === k ? "active" : ""}" data-act="go" data-arg="${k}"><b>${i + 1}</b>${n}</button>`).join("")}</div>
      <div class="cap">Estado de la pantalla</div>
      <div class="demo-toggles">${[["ok", "Normal"], ["loading", "Cargando"], ["error", "Error"]].map(([k, n]) => `<button class="${S.view === k ? "on" : ""}" data-act="view" data-arg="${k}">${n}</button>`).join("")}</div>
      <div class="demo-toggles"><button class="${S.hasPlan ? "on" : ""}" data-act="toggleplan">${S.hasPlan ? "Con plan" : "Sin plan"}</button>
        <button data-act="theme">${document.documentElement.dataset.theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}</button></div>`;
  }

  /* ================= Eventos ================= */
  function go(tab) { S.tab = tab; S.view = "ok"; render(); }

  function act(a, arg) {
    switch (a) {
      case "go": go(arg); break;
      case "closego": closeSheet(); go(arg); break;
      case "pet": S.pet = +arg; render(true); break;
      case "filter": S.filter = arg; render(true); break;
      case "snooze": S.snoozed.add(+arg); toast("Te lo recordamos mañana ⏰"); render(true); break;
      case "reserve": { const al = ALERTS.find((x) => x.id === +arg); S.pet = al.pet; S.book = { step: 2, motive: al.type === "Vacunas" ? "vacuna" : "consulta", vet: null, day: 0, slot: null, done: false }; go("book"); break; }
      case "motive": S.book.motive = arg; render(true); break;
      case "vet": S.book.vet = arg; render(true); break;
      case "day": S.book.day = +arg; S.book.slot = null; render(true); break;
      case "slot": S.book.slot = arg; render(true); break;
      case "booknext": if (S.book.step === 4) S.book.done = true; else S.book.step++; render(); break;
      case "bookback": S.book.step--; render(); break;
      case "bookreset": S.book = { step: 1, motive: null, vet: null, day: 0, slot: null, done: false }; go("home"); break;
      case "share": openSheet("share"); break;
      case "download": toast("Descargando " + pet().studies[+arg].n + " 📥"); break;
      case "sos": openSheet("sos"); break;
      case "triage": if (S.triage.has(arg)) S.triage.delete(arg); else S.triage.add(arg); render(true); break;
      case "coverage": addMsg({ me: true, t: "¿Qué cubre mi plan para una consulta por alergia?" }, "Con tu plan " + pet().plan.name + " la consulta dermatológica está cubierta al 100%. Los test de alergias no están incluidos."); break;
      case "attach": addMsg({ me: true, photo: "🐾", t: "" }, "Recibimos la foto. Un veterinario la está revisando 👀"); break;
      case "send": sendMsg(); break;
      case "wallet": toast("Agregado a Apple Wallet ✅"); break;
      case "sheet": openSheet(arg); break;
      case "close": closeSheet(); break;
      case "attach2": S.attached = true; openSheet(sheetKey); break;
      case "submit": S.tramites.unshift({ n: arg, amount: "", stage: 0 }); closeSheet(); toast("Solicitud enviada. Te avisamos por push 🔔"); render(true); break;
      case "net": S.net = arg; openSheet("network"); break;
      case "chgplan": pet().plan.name = arg; pet().plan.price = PLANS.find((x) => x.id === arg).base; closeSheet(); toast("Plan cambiado a " + arg); render(true); break;
      case "selplan": S.planSel = arg; render(true); break;
      case "afiliar": S.hasPlan = true; toast("¡" + pet().name + " ya está afiliada! 🎉"); render(); break;
      case "toggleplan": S.hasPlan = !S.hasPlan; render(); break;
      case "toast": closeSheet(); toast(arg); break;
      case "view": S.view = arg; render(true); break;
      case "retry": S.view = "loading"; render(true); setTimeout(() => { S.view = "ok"; render(true); }, 900); break;
      case "theme": { const d = document.documentElement; d.dataset.theme = d.dataset.theme === "dark" ? "light" : "dark"; renderDemo(); break; }
    }
  }

  function addMsg(m, reply) {
    const time = new Date(2026, 10, 10, 12, 10).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    m.time = time; S.chat.push(m);
    const list = $("#chatlist"); if (!list) return;
    list.insertAdjacentHTML("beforeend", bubble(m));
    const typing = document.createElement("div"); typing.className = "bubble in typing"; typing.innerHTML = "<i></i><i></i><i></i>";
    list.appendChild(typing); $("#screen").scrollTop = $("#screen").scrollHeight;
    setTimeout(() => {
      typing.remove();
      const r = { me: false, t: reply, time };
      S.chat.push(r);
      const l2 = $("#chatlist"); if (l2) { l2.insertAdjacentHTML("beforeend", bubble(r)); $("#screen").scrollTop = $("#screen").scrollHeight; }
    }, 1500);
  }
  function sendMsg() {
    const i = $("#msg"); if (!i) return;
    const v = i.value.trim(); if (!v) return;
    i.value = "";
    addMsg({ me: true, t: v.replace(/</g, "&lt;") }, "Gracias Mauri, ya lo registramos. Un profesional te responde en unos minutos.");
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "scrim") return closeSheet();
    const el = e.target.closest("[data-act]");
    if (el) act(el.dataset.act, el.dataset.arg);
  });
  document.addEventListener("change", (e) => {
    const k = e.target.dataset && e.target.dataset.calc;
    if (k) { S.calc[k] = e.target.value; render(true); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "msg") sendMsg(); });

  /* Escalado del teléfono para que entre en pantallas bajas */
  function fit() {
    const st = $("#stage");
    if (innerWidth <= 760) { st.style.transform = ""; return; }
    st.style.transform = `scale(${Math.min(1, (innerHeight - 24) / 870)})`;
  }
  addEventListener("resize", fit);

  render();
  fit();
})();
