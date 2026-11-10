# VetCare - Prototipo app veterinaria (iOS 2026)

Prototipo web mobile responsive, con estilo iPhone / iOS 2026 ("Liquid Glass"), de una app de veterinaria para **dueños de mascotas**. Pensado para presentar y vender el producto, con foco en la **obra social de mascotas** como diferencial.

## Cómo verlo

```bash
node server.js
# luego abrí http://localhost:8777
```

En escritorio se ve dentro de un marco de iPhone con un panel lateral (saltar entre pantallas, estados normal/cargando/error, con plan/sin plan, modo oscuro). En el móvil ocupa toda la pantalla.

## Las 6 pantallas

1. **Inicio** - carrusel de mascotas, score de salud (anillo), widgets (cita, vacuna, peso, alerta) y mini credencial del plan.
2. **Alertas** - timeline con filtros, estados por color y acciones Reservar / Posponer. Se abre desde la campana.
3. **Salud** - carnet de vacunas, gráfico de peso, alergias, medicación, diagnósticos, estudios con cobertura y QR para compartir.
4. **Turnos** - mascota, motivo, profesional, fecha y hora, con aviso de cobertura/copago y tarjeta tipo wallet al confirmar.
5. **Chat** - mensajería con la clínica, adjuntos, triage guiado y botón de urgencia (guardia 24 h).
6. **Mi Plan** - credencial con QR, anillos de cobertura, autorización/reintegro, red de prestadores, trámites y cuotas. Estado sin plan con comparador y calculadora.

Navegación: tab bar flotante (Inicio, Salud, Turnos, Mi Plan, Chat).

## Estructura

- `tokens.css` - sistema de diseño (colores, tipografía, radios, glass, modo oscuro).
- `styles.css` - componentes y pantallas.
- `app.js` - datos de ejemplo, render de pantallas e interacciones (sin dependencias).
- `index.html` - marco del iPhone y contenedores.
- `server.js` - servidor estático mínimo.
- `docs/BRIEF.md` - brief detallado de cada pantalla.

Es un prototipo de UI (datos de ejemplo, sin backend).
