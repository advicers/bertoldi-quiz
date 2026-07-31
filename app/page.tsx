"use client";

import { useState, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface FormData {
  nombre: string; ciudad: string; whatsapp: string;
  instagram: string; tiktok: string; youtube: string;
  comoLlegaste: string; tipoContenido: string[];
  vozEnOff: string; editaVideos: string; subtitulos: string;
  trabajoMarcas: string; marcasPrevias: string; linksVideos: string;
  ideaVideo: string; estiloVisual: string[];
  espacioGrabacion: string; modalidadTrabajo: string;
  tiempoEntrega: string; porQueQuieres: string; honeypot: string;
}

const INITIAL: FormData = {
  nombre: "", ciudad: "", whatsapp: "", instagram: "", tiktok: "", youtube: "",
  comoLlegaste: "", tipoContenido: [], vozEnOff: "", editaVideos: "",
  subtitulos: "", trabajoMarcas: "", marcasPrevias: "", linksVideos: "",
  ideaVideo: "", estiloVisual: [], espacioGrabacion: "",
  modalidadTrabajo: "", tiempoEntrega: "", porQueQuieres: "", honeypot: "",
};

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`pill${selected ? " selected" : ""}`}>
      <span className="pill-dot" />
      {label}
    </button>
  );
}

function RadioCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`radio-card${selected ? " selected" : ""}`}>
      <span className="radio-circle"><span className="radio-inner" /></span>
      {label}
    </button>
  );
}

function YN({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <span className="field-label">{label}</span>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button type="button" className={`yn-btn${value === "Sí" ? " active" : ""}`} onClick={() => onChange("Sí")}>Sí</button>
        <button type="button" className={`yn-btn${value === "No" ? " active" : ""}`} onClick={() => onChange("No")}>No</button>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, required, placeholder, type = "text" }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="field-label">{label}{required && <span style={{ color: "var(--pink)", marginLeft: 2 }}>*</span>}</label>
      <input
        type={type} name={name} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required} className="field-input"
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange, required, placeholder, rows = 4 }: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="field-label">{label}{required && <span style={{ color: "var(--pink)", marginLeft: 2 }}>*</span>}</label>
      <textarea
        name={name} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required} rows={rows} className="field-input"
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="field-label" style={{ display: "block", marginBottom: 12 }}>{children}</span>;
}

function PillGroup({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(o => <Pill key={o} label={o} selected={selected.includes(o)} onClick={() => onToggle(o)} />)}
    </div>
  );
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
function ProgressHeader({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step - 1) / total) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Logo placeholder */}
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--pink)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 14, fontWeight: 900, color: "white"
          }}>B</div>
          <span style={{ fontWeight: 800, fontSize: 15, color: "var(--black)" }}>bertoldi</span>
        </div>
        <span style={{ fontSize: 13, color: "#999", fontWeight: 500 }}>
          {step} / {total}
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── STEP SHELL ───────────────────────────────────────────────────────────────
function StepShell({
  step, total, title, subtitle, eyebrow, children, onNext, onBack, canNext, nextLabel = "Continuar →",
}: {
  step: number; total: number; title: string; subtitle?: string; eyebrow?: string;
  children: React.ReactNode; onNext: () => void; onBack: () => void;
  canNext: boolean; nextLabel?: string;
}) {
  const [key, setKey] = useState(0);
  useEffect(() => { setKey(k => k + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  return (
    <div key={key} style={{ padding: "24px 16px", minHeight: "100vh", background: "var(--gray)" }}>
      <div className="step-card animate-scaleIn">
        <ProgressHeader step={step} total={total} />

        {/* Eyebrow */}
        {eyebrow && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--pink-pale)", borderRadius: 99,
            padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--pink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{eyebrow}</span>
          </div>
        )}

        {/* Title */}
        <h2 style={{ fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 900, lineHeight: 1.1, color: "var(--black)", marginBottom: subtitle ? 8 : 24 }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 15, color: "#888", marginBottom: 28, lineHeight: 1.5 }}>{subtitle}</p>
        )}

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {children}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--gray-mid)" }}>
          <button className="btn-back" onClick={onBack}>
            ← Volver
          </button>
          <button className="btn-cta" onClick={onNext} disabled={!canNext}>
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onStart }: { onStart: () => void }) {
  const [in_, setIn] = useState(false);
  useEffect(() => { setTimeout(() => setIn(true), 60); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "var(--gray)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px",
    }}>
      <div className="step-card" style={{ textAlign: "center", maxWidth: 520 }}>
        {/* Logo */}
        <div className={`animate-fadeUp`} style={{ marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "var(--pink)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22, fontWeight: 900,
            color: "white", margin: "0 auto 12px",
          }}>B</div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#bbb", letterSpacing: "0.12em", textTransform: "uppercase" }}>Bertoldi</span>
        </div>

        {/* Headline */}
        <div className={`animate-fadeUp delay-1`}>
          <h1 style={{ fontSize: "clamp(36px, 8vw, 54px)", fontWeight: 900, lineHeight: 1.0, color: "var(--black)", marginBottom: 8 }}>
            Creators<br />
            <span style={{ color: "var(--pink)" }}>Club</span>
          </h1>
        </div>

        {/* Description */}
        <div className={`animate-fadeUp delay-2`}>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.6, margin: "20px 0 8px" }}>
            ¿Sos de las que muestran su rutina de cabello y la gente pregunta qué usás? Entonces queremos conocerte.
          </p>
          <p style={{ fontSize: 14, color: "#999", lineHeight: 1.5, marginBottom: 28 }}>
            Estamos armando una red de creadores UGC para campañas de producto en el mundo del cuidado capilar profesional. No buscamos miles de seguidores — buscamos autenticidad.
          </p>
        </div>

        {/* Badges */}
        <div className={`animate-fadeUp delay-3`} style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {["~4 minutos", "5 pasos", "Solo 3 campos obligatorios"].map(b => (
            <span key={b} style={{
              background: "var(--gray)", border: "1.5px solid var(--gray-mid)",
              borderRadius: 99, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#666",
            }}>{b}</span>
          ))}
        </div>

        {/* CTA */}
        <div className={`animate-fadeUp delay-4`}>
          <button className="btn-cta" style={{ width: "100%", fontSize: 16, padding: "18px 32px" }} onClick={onStart}>
            Quiero postularme →
          </button>
          <p style={{ marginTop: 14, fontSize: 12, color: "#bbb" }}>
            Revisamos todas las postulaciones. Si hay match con una campaña, te contactamos.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS ──────────────────────────────────────────────────────────────────
function Success() {
  return (
    <div style={{
      minHeight: "100vh", background: "var(--gray)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px",
    }}>
      <div className="step-card animate-scaleIn" style={{ textAlign: "center" }}>
        {/* Check icon */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "var(--pink-pale)", display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          animation: "checkBounce 0.6s cubic-bezier(.4,0,.2,1) both 0.2s",
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M7 16.5L13 22.5L25 10" stroke="var(--pink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="animate-fadeUp" style={{ animationDelay: "0.3s" }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "var(--black)", marginBottom: 8 }}>
            ¡Gracias por<br />postularte!
          </h2>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.6, margin: "16px 0 28px" }}>
            Revisamos todas las postulaciones personalmente. Si hay match con alguna campaña activa, te contactamos por WhatsApp con una propuesta concreta.
          </p>
        </div>

        <div className="animate-fadeUp delay-2" style={{
          background: "var(--pink-pale)", borderRadius: 16, padding: "20px 24px",
        }}>
          <p style={{ fontSize: 13, color: "var(--pink-dark)", fontWeight: 600, marginBottom: 6 }}>Mientras tanto</p>
          <p style={{ fontSize: 14, color: "#666" }}>
            Seguinos en{" "}
            <a href="https://instagram.com/bertoldi.ok" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--pink)", fontWeight: 700 }}>@bertoldi.ok</a>
            {" "}para estar al tanto de lanzamientos y campañas.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const TOTAL = 5;

const TIPO_CONTENIDO = ["Rutinas de cabello", "Tutoriales de peinado", "Reviews de productos", "Transformaciones / antes y después", "Lifestyle / cotidiano", "Moda y belleza", "Maternidad / familia", "Humor", "Otro"];
const COMO_LLEGO = ["Me lo recomendaron", "Vi un anuncio", "Buscando productos profesionales", "Vi a otro creador/a", "Vi una influencer", "Ya conocía Bertoldi", "Compré y me gustó", "Otro"];
const ESTILO = ["Minimalista", "Cálido / hogareño", "Moderno", "Descontracturado", "Estético / aspiracional", "Real y cotidiano", "Ultra pulido", "Otro"];
const MODALIDAD = ["Solo canje", "Solo pago fijo", "Canje + pago"];
const TIEMPO = ["3 a 5 días", "5 a 7 días", "7 a 10 días", "Más de 10 días"];

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [done, setDone] = useState(false);

  const set = (f: keyof FormData) => (v: string) => setForm(p => ({ ...p, [f]: v }));
  const toggle = (f: "tipoContenido" | "estiloVisual", v: string) =>
    setForm(p => ({ ...p, [f]: p[f].includes(v) ? p[f].filter(x => x !== v) : [...p[f], v] }));

  const next = () => { if (step < TOTAL) setStep(s => s + 1); else submit(); };
  const back = () => { if (step > 0) setStep(s => s - 1); };

  const submit = async () => {
    if (form.honeypot) return;
    // → Conectar a Formspree / API acá
    console.log("Submit:", form);
    setDone(true);
  };

  const can: Record<number, boolean> = {
    1: !!(form.nombre && form.ciudad && form.whatsapp),
    2: true,
    3: true,
    4: !!(form.modalidadTrabajo && form.tiempoEntrega),
    5: !!form.porQueQuieres,
  };

  if (done) return <Success />;
  if (step === 0) return <Landing onStart={() => setStep(1)} />;

  if (step === 1) return (
    <StepShell step={1} total={TOTAL} eyebrow="Datos básicos"
      title="Contanos quién sos" subtitle="Solo para poder contactarte si hay match."
      onNext={next} onBack={back} canNext={can[1]}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="Nombre y apellido" name="nombre" value={form.nombre} onChange={set("nombre")} required placeholder="Tu nombre completo" />
        </div>
        <Field label="Ciudad" name="ciudad" value={form.ciudad} onChange={set("ciudad")} required placeholder="Córdoba..." />
        <Field label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={set("whatsapp")} required placeholder="+54 9 351..." type="tel" />
        <Field label="Instagram" name="instagram" value={form.instagram} onChange={set("instagram")} placeholder="@usuario" />
        <Field label="TikTok" name="tiktok" value={form.tiktok} onChange={set("tiktok")} placeholder="@usuario" />
        <div style={{ gridColumn: "1/-1" }}>
          <Field label="YouTube (opcional)" name="youtube" value={form.youtube} onChange={set("youtube")} placeholder="link a tu canal" />
        </div>
      </div>

      <div>
        <SectionLabel>¿Cómo llegaste a Bertoldi?</SectionLabel>
        <PillGroup options={COMO_LLEGO} selected={form.comoLlegaste ? [form.comoLlegaste] : []}
          onToggle={v => set("comoLlegaste")(v === form.comoLlegaste ? "" : v)} />
      </div>

      <input type="text" name="_trap" value={form.honeypot} onChange={e => set("honeypot")(e.target.value)}
        style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
    </StepShell>
  );

  if (step === 2) return (
    <StepShell step={2} total={TOTAL} eyebrow="Tu mundo como creador/a"
      title="Contanos cómo creás" subtitle="No buscamos perfectos, buscamos auténticos."
      onNext={next} onBack={back} canNext={can[2]}>

      <div>
        <SectionLabel>¿Qué tipo de contenido hacés? <span style={{ fontWeight: 400, textTransform: "none", color: "#aaa" }}>Podés elegir más de una</span></SectionLabel>
        <PillGroup options={TIPO_CONTENIDO} selected={form.tipoContenido} onToggle={v => toggle("tipoContenido", v)} />
      </div>

      <YN label="¿Podés grabar voz en off?" value={form.vozEnOff} onChange={set("vozEnOff")} />
      <YN label="¿Editás tus propios videos?" value={form.editaVideos} onChange={set("editaVideos")} />
      <YN label="¿Podés entregar videos con subtítulos?" value={form.subtitulos} onChange={set("subtitulos")} />
      <YN label="¿Ya trabajaste creando contenido para marcas?" value={form.trabajoMarcas} onChange={set("trabajoMarcas")} />

      {form.trabajoMarcas === "Sí" && (
        <Field label="¿Para qué marcas?" name="marcasPrevias" value={form.marcasPrevias} onChange={set("marcasPrevias")} placeholder="L'Oréal, Dove, marca local..." />
      )}

      <TextArea label="Links a 2 o 3 videos tuyos" name="linksVideos" value={form.linksVideos} onChange={set("linksVideos")}
        placeholder="Pegá los links acá (Instagram, TikTok, YouTube...) — que sientas que te representan." rows={3} />
    </StepShell>
  );

  if (step === 3) return (
    <StepShell step={3} total={TOTAL} eyebrow="La parte importante"
      title="Ahora viene lo bueno" subtitle="Acá es donde se nota si esto es para vos."
      onNext={next} onBack={back} canNext={can[3]}>

      <TextArea label="Si tuvieras un producto Bertoldi en tus manos, ¿qué video harías?"
        name="ideaVideo" value={form.ideaVideo} onChange={set("ideaVideo")}
        placeholder="Pensalo como si ya lo tuvieras. ¿Qué mostrarías? ¿Cómo lo contarías? ¿Qué haría que alguien diga: 'necesito esto para mi cabello'?"
        rows={5} required />

      <div>
        <SectionLabel>¿Cómo describirías tu estilo visual? <span style={{ fontWeight: 400, textTransform: "none", color: "#aaa" }}>Podés elegir más de una</span></SectionLabel>
        <PillGroup options={ESTILO} selected={form.estiloVisual} onToggle={v => toggle("estiloVisual", v)} />
      </div>

      <YN label="¿Tenés un espacio con buena luz donde grabar?" value={form.espacioGrabacion} onChange={set("espacioGrabacion")} />
    </StepShell>
  );

  if (step === 4) return (
    <StepShell step={4} total={TOTAL} eyebrow="Condiciones"
      title="¿Cómo trabajamos juntos?"
      onNext={next} onBack={back} canNext={can[4]}>

      <div>
        <SectionLabel>¿Trabajás por canje, pago fijo o ambas? <span style={{ color: "var(--pink)" }}>*</span></SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MODALIDAD.map(o => <RadioCard key={o} label={o} selected={form.modalidadTrabajo === o} onClick={() => set("modalidadTrabajo")(o)} />)}
        </div>
      </div>

      <div>
        <SectionLabel>¿Cuánto tiempo necesitás desde que recibís el producto? <span style={{ color: "var(--pink)" }}>*</span></SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TIEMPO.map(o => <RadioCard key={o} label={o} selected={form.tiempoEntrega === o} onClick={() => set("tiempoEntrega")(o)} />)}
        </div>
      </div>
    </StepShell>
  );

  if (step === 5) return (
    <StepShell step={5} total={TOTAL} eyebrow="Última pregunta"
      title="¿Por qué Bertoldi?"
      subtitle="Esta es la que más leemos. Contanos qué te conecta con la marca o con el mundo del cuidado capilar."
      onNext={next} onBack={back} canNext={can[5]} nextLabel="Enviar postulación →">

      <TextArea label="Tu respuesta" name="porQueQuieres" value={form.porQueQuieres} onChange={set("porQueQuieres")}
        placeholder="No hay respuesta correcta — queremos leer tu voz." rows={6} required />

      <div style={{
        background: "var(--pink-pale)", borderRadius: 14, padding: "16px 18px",
        display: "flex", gap: 12, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>💌</span>
        <p style={{ fontSize: 13, color: "var(--pink-dark)", lineHeight: 1.5 }}>
          Si hay match con alguna campaña activa, te contactamos directamente por WhatsApp con una propuesta concreta.
        </p>
      </div>
    </StepShell>
  );

  return null;
}
