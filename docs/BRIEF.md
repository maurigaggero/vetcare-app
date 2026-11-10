# VetCare - Brief de diseño (6 pantallas, iOS 2026)

App web mobile para **dueños de mascotas** de una veterinaria. Objetivo: vender el producto mostrando valor inmediato y abrir ingresos recurrentes con la obra social de mascotas.

Este documento define estructura, componentes, copy de ejemplo y estados de cada pantalla. El prototipo HTML/CSS (`index.html`) implementa todo esto de forma clickeable.

---

## Marco del dispositivo

- Simulación de iPhone: Dynamic Island, barra de estado (hora, señal, batería), home indicator.
- Tab bar flotante tipo cápsula (glass) con 5 ítems: Inicio, Salud, Turnos, Mi Plan, Chat.
- Ancho de contenido base: 390 px (iPhone 15/16). Responsive para 360-430 px.

## Sistema de diseño (ver `tokens.css`)

- Tipografía: SF Pro / `-apple-system`. Títulos grandes (34/28), cuerpo 17, secundario 15, caption 13.
- Radios: tarjetas 24-28 px, chips 16-20 px, botones 14-99 px (cápsula).
- Superficies "Liquid Glass": fondo translúcido + blur + borde fino de luz + sombra suave.
- Acento principal: teal/menta. Semánticos: verde (ok), ámbar (atención), rojo (urgente).
- Modo claro y oscuro.

---

## 1. Inicio / Mi mascota (dashboard)

**Objetivo:** el "wow" inmediato; todo en un lugar.

Componentes:
- Header con saludo ("Hola, Mauri"), avatar del dueño y campana de alertas con badge.
- Carrusel de mascotas (foto grande, nombre, raza/edad). Punto activo abajo.
- Anillo "Score de salud" (0-100) tipo Activity ring, con subtítulo ("Todo al día").
- Grilla de widgets:
  - Próxima cita (fecha, hora, profesional) -> abre Turnos.
  - Próxima vacuna (nombre, días restantes) -> abre Salud.
  - Peso actual (valor + tendencia) -> abre Salud.
  - Alerta del día (texto corto, color semántico) -> abre Alertas.
- Mini credencial del plan: nombre del plan, estado Activo, cobertura disponible -> abre Mi Plan.

Estados: vacío (sin mascotas -> CTA "Agregar mascota"), cargando (skeletons), error (reintentar).

## 2. Alertas y recordatorios

**Objetivo:** retención e ingresos (menos olvidos).

Componentes:
- Filtros por tipo (Todas, Vacunas, Medicación, Controles, Plan).
- Línea de tiempo agrupada por fecha (Hoy, Esta semana, Próximas).
- Ítem de alerta: icono por tipo, título, descripción, chip de estado (Vencida / Próxima / Al día), acciones "Reservar" y "Posponer".
- Incluye alertas del plan: cuota por vencer, autorización aprobada, cupo casi agotado.

Estados: vacío ("Sin alertas, todo en orden"), cargando, error.

## 3. Historia clínica y salud

**Objetivo:** reemplazar el carnet de papel; confianza.

Componentes:
- Selector de mascota.
- Carnet de vacunas (lista con fecha, próxima dosis, estado).
- Gráfico de evolución de peso (línea).
- Secciones: Alergias, Medicación actual, Diagnósticos, Estudios/archivos (descargables).
- Marca de cobertura del plan en estudios/cirugías (Cubierto / Copago / No cubierto).
- Botón "Compartir con veterinario" + QR para viajes.

Estados: vacío por sección, cargando, error.

## 4. Turnos y reservas

**Objetivo:** reducir llamadas y ausencias (ROI claro).

Componentes:
- Paso 1: mascota. Paso 2: motivo (Consulta, Vacuna, Baño, Cirugía, Control). Paso 3: profesional. Paso 4: fecha/hora (calendario + slots).
- Aviso de cobertura del plan y copago antes de confirmar.
- Tarjeta de confirmación tipo "wallet" + recordatorio automático.

Estados: sin turnos, cargando, error, confirmado.

## 5. Chat y teleconsulta / urgencias

**Objetivo:** diferencial de servicio y fidelización.

Componentes:
- Lista de mensajes con la clínica (burbujas), adjuntar foto/video del síntoma.
- Botón rojo "Urgencia" fijo: teléfono y veterinaria de guardia (de la red del plan).
- Triage guiado (chips: ¿Come? ¿Vomita? ¿Decaído?) que sugiere nivel de urgencia.
- Acceso rápido "Consultar cobertura".

Estados: vacío, escribiendo, error de envío.

## 6. Mi Plan - obra social de mascotas (pantalla estrella)

**Objetivo:** ingreso recurrente mensual; mayor diferencial.

Componentes (con plan activo):
- Credencial digital tipo Wallet: foto mascota, nombre del plan (Básico/Plus/Premium), N° de afiliado, QR de validación, estado Activo, vigencia. Botón "Agregar a Apple Wallet".
- Anillos de cobertura: Consultas, Vacunas, Estudios, Cirugías, Urgencias (usado vs. disponible, copago).
- Acciones rápidas: Pedir autorización (foto de la orden), Solicitar reintegro (foto de la factura), Red de prestadores (mapa + filtros: guardia 24 h, especialistas, farmacia).
- Seguimiento de trámites: línea de tiempo (Enviado, En revisión, Aprobado, Pagado) + push.
- Cuotas y pagos: próxima cuota, historial, cambiar plan, alta de otra mascota con descuento familiar.

Estado vacío (sin plan):
- Comparador de planes (Básico/Plus/Premium) con beneficios.
- Calculadora de precio según especie, raza y edad.
- CTA "Afiliar a mi mascota".

---

## Flujo

Inicio -> (Alertas, Salud, Mi Plan). Alertas -> Turnos. Salud -> Chat. Chat -> Turnos. Turnos -> Mi Plan. Mi Plan -> (Autorización/Reintegro, Red de prestadores -> Turnos).

## Argumentos de venta a la clínica

- Menos ausencias y más recurrencia (recordatorios automáticos).
- Ingreso recurrente con la obra social (cuotas mensuales) y beneficios.
- Menos fricción de cobro: cobertura y copago visibles antes de atender; trámites sin papeles.
- Venta cruzada: planes por mascota, descuento familiar, upgrade desde la app.
- Imagen moderna y una sola fuente de verdad de la historia clínica.