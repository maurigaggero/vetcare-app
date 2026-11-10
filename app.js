// ============================================================
// VetCare - Prototipo. Navegación e interacciones.
// ============================================================
(function () {
  "use strict";

  const tabsForPage = ["inicio", "salud", "turnos", "plan", "chat"];

  // ---- Navegación entre páginas ----
  function goTo(name) {
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    const page = document.getElementById("page-" + name);
    if (page) {
      page.classList.add("active");
      page.scrollTop = 0;
    }
    // Sincronizar tab bar (alertas no tiene tab -> mantiene Inicio)
    const tabName = tabsForPage.includes(name) ? name : "inicio";
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === tabName);
    });
  }

  // Tab bar
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => goTo(tab.dataset.tab));
  });

  // Cualquier elemento con data-go navega
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-go]");
    if (nav) {
      goTo(nav.dataset.go);
    }
  });

  // ---- Toasts ----
  const toast = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-toast]");
    if (t) showToast(t.dataset.toast);
  });

  // ---- Reloj en status bar ----
  function tick() {
    const d = new Date();
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    document.getElementById("clock").textContent = `${h}:${m}`;
  }
  tick();
  setInterval(tick, 10000);

  // ---- Modo oscuro ----
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = document.body.classList.toggle("theme-dark");
      document.body.classList.toggle("theme-light", !dark);
      themeToggle.textContent = dark ? "☀️ Modo claro" : "🌙 Modo oscuro";
    });
  }

  // ---- Carrusel de mascotas: puntos activos ----
  const carousel = document.getElementById("petCarousel");
  const dots = document.querySelectorAll(".dots .dot");
  if (carousel && dots.length) {
    carousel.addEventListener("scroll", () => {
      const i = Math.round(carousel.scrollLeft / (carousel.scrollWidth / dots.length));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === Math.min(i, dots.length - 1)));
    }, { passive: true });
  }

  // ---- Chips de filtro (alertas) ----
  const filters = document.getElementById("alertFilters");
  if (filters) {
    filters.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  }

  // ---- Segmented control (salud) ----
  const seg = document.getElementById("healthSeg");
  if (seg) {
    seg.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      seg.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.seg;
      document.querySelectorAll("#page-salud [data-panel]").forEach((p) => {
        p.hidden = p.dataset.panel !== target;
      });
    });
  }

  // ---- Turnos: selección de motivo + cobertura ----
  const motiveGrid = document.getElementById("motiveGrid");
  const coverageNote = document.getElementById("coverageNote");
  if (motiveGrid) {
    const notes = {
      Consulta: { txt: "✅ Consulta cubierta por tu Plan Plus · sin copago", copay: false },
      Vacuna: { txt: "✅ Vacuna cubierta por tu Plan Plus · sin copago", copay: false },
      Baño: { txt: "⚠️ Baño con copago del 50% · $3.200 estimado", copay: true },
      Cirugía: { txt: "⚠️ Cirugía requiere autorización previa del plan", copay: true },
    };
    motiveGrid.addEventListener("click", (e) => {
      const opt = e.target.closest(".opt");
      if (!opt) return;
      motiveGrid.querySelectorAll(".opt").forEach((o) => o.classList.remove("sel"));
      opt.classList.add("sel");
      const key = opt.querySelector(".o-t").textContent.trim();
      const n = notes[key];
      if (n && coverageNote) {
        coverageNote.textContent = n.txt;
        coverageNote.classList.toggle("copay", n.copay);
      }
    });
  }

  // ---- Turnos: calendario y slots ----
  const calGrid = document.getElementById("calGrid");
  if (calGrid) {
    calGrid.addEventListener("click", (e) => {
      const cd = e.target.closest(".cd");
      if (!cd || cd.classList.contains("dow") || cd.classList.contains("off")) return;
      calGrid.querySelectorAll(".cd").forEach((c) => c.classList.remove("sel"));
      cd.classList.add("sel");
    });
  }
  const slotGrid = document.getElementById("slotGrid");
  if (slotGrid) {
    slotGrid.addEventListener("click", (e) => {
      const s = e.target.closest(".slot");
      if (!s || s.classList.contains("off")) return;
      slotGrid.querySelectorAll(".slot").forEach((x) => x.classList.remove("sel"));
      s.classList.add("sel");
    });
  }

  // ---- Turnos: confirmar -> muestra ticket wallet ----
  const confirmBtn = document.getElementById("confirmTurno");
  const ticket = document.getElementById("walletTicket");
  if (confirmBtn && ticket) {
    confirmBtn.addEventListener("click", () => {
      ticket.hidden = false;
      ticket.scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("Turno confirmado ✅ Recordatorio activado");
    });
  }

  // ---- Mi Plan: alternar estado con/sin plan ----
  const togglePlan = document.getElementById("togglePlanState");
  const planActive = document.getElementById("planActive");
  const planEmpty = document.getElementById("planEmpty");
  function setPlan(active) {
    if (planActive) planActive.hidden = !active;
    if (planEmpty) planEmpty.hidden = active;
  }
  if (togglePlan) {
    togglePlan.addEventListener("click", () => {
      const nowEmpty = !planEmpty.hidden;
      setPlan(nowEmpty); // si estaba vacío, vuelve a activo
      showToast(nowEmpty ? "Vista: con plan activo" : "Vista: sin plan (comparador)");
    });
  }
  // Link "Ver Premium" -> estado vacío comparador
  document.querySelectorAll("[data-go-empty]").forEach((el) => {
    el.addEventListener("click", () => {
      goTo("plan");
      setPlan(false);
      planEmpty.scrollIntoView({ behavior: "smooth" });
    });
  });

})();
