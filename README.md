# VetCare - Prototipo app veterinaria (iOS 2026)

Prototipo web mobile responsive, con estilo iPhone / iOS 2026 ("Liquid Glass"), de una app de veterinaria para **dueños de mascotas**. Pensado para presentar y vender el producto, con foco en la **obra social de mascotas** como diferencial.

## Cómo verlo

Necesita servirse por HTTP (no abras `index.html` como `file://`).

```bash
# Opción 1: con Node (incluido en este repo)
node server.js
# luego abrí http://localhost:8777

# Opción 2: cualquier servidor estático
npx serve .
```

En el navegador podés usar el panel lateral para alternar **modo oscuro**. En el móvil ocupa toda la pantalla.

## Las 6 pantallas

1. **Inicio** - carrusel de mascotas, score de salud (anillo), widgets (cita, vacuna, peso, alerta) y mini credencial del plan.
2. **Alertas** - timeline con estados por color (vencida / próxima / al día) y acciones Reservar / Posponer. Se abre desde la campana en Inicio.
3. **Salud** - historia clínica: carnet de vacunas + QR, gráfico de peso, alergias, medicación y estudios (con marca de cobertura).
4. **Turnos** - motivo, profesional, calendario y slots, con aviso de cobertura/copago y ticket tipo wallet al confirmar.
5. **Mi Plan (obra social)** - credencial digital, anillos de cobertura, autorización/reintegro, red de prestadores, seguimiento de trámites y cuotas. Incluye estado "sin plan" con comparador y calculadora. Toca el botón 🔄 arriba a la derecha para alternar entre "con plan" y "sin plan".
6. **Chat** - mensajería con la clínica, adjuntos, botón de urgencia (guardia 24 h) y triage guiado.

Navegación: tab bar inferior (Inicio, Salud, Turnos, Mi Plan, Chat). Los widgets y botones navegan entre pantallas.

## Estructura

- `index.html` - marcado de las 6 pantallas + marco del iPhone.
- `styles.css` - sistema de diseño (tokens) + componentes. Modo claro y oscuro.
- `app.js` - navegación e interacciones (tabs, toasts, segmented, calendario, estado del plan).
- `server.js` - servidor estático mínimo para previsualizar.
- `docs/BRIEF.md` - brief de diseño de cada pantalla (handoff).

## Handoff a Figma

No hay un conector de Figma en este entorno, así que el archivo de Figma no se puede generar automáticamente. Para pasarlo a Figma:

1. **Tokens -> estilos de Figma.** Recreá las variables de `:root` en `styles.css` como Variables/Styles:
   - Color: `--accent` (#0ea692), semánticos (`--ok`, `--warn`, `--urgent`, `--info`), superficies glass.
   - Texto: SF Pro / `-apple-system`, tamaños 30/23/19/16/14/12.
   - Radios: 26-32 (tarjetas), 18 (chips), 999 (cápsula).
   - Efecto glass: fill blanco al 72% + Background blur 24 + borde de luz.
2. **Un frame por pantalla** (390 x 844). Componetizá: TabBar, StatusBar, Card glass, Widget, AlertItem, Ring, Credential, Chip/Pill, Slot, CoverageRing.
3. **Referencia visual:** usá las capturas del prototipo (claro y oscuro) o un plugin `html-to-figma` sobre `http://localhost:8777`.
4. Si más adelante conectás un **MCP de Figma**, se pueden crear los frames directamente a partir de estos tokens y componentes.

## Nota

Es un prototipo de UI (datos de ejemplo, sin backend). El objetivo es demostrar el valor y el flujo para la venta.
