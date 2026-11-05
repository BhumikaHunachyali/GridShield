---
name: GridShield Command
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#171c25'
  surface-container: '#1b2029'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2f0'
  on-surface-variant: '#c0c7d4'
  inverse-surface: '#dfe2f0'
  inverse-on-surface: '#2c303b'
  outline: '#8a919d'
  outline-variant: '#404752'
  surface-tint: '#9fcaff'
  primary: '#9fcaff'
  on-primary: '#003259'
  primary-container: '#48a5ff'
  on-primary-container: '#003965'
  inverse-primary: '#0061a5'
  secondary: '#43efa9'
  on-secondary: '#003823'
  secondary-container: '#00d28f'
  on-secondary-container: '#005437'
  tertiary: '#ffb3b5'
  on-tertiary: '#680019'
  tertiary-container: '#ff7580'
  on-tertiary-container: '#75001d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#9fcaff'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#00497e'
  secondary-fixed: '#56feb7'
  secondary-fixed-dim: '#2ce19c'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005235'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b5'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920027'
  background: '#0f131d'
  on-background: '#dfe2f0'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  telemetry-data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-code:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.5rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-assurance, tactical defense Head-Up Display (HUD) engineered for critical microgrid defense and real-time digital twin telemetry. The visual language evokes total situational control, absolute precision, and high-stakes operational calm. It rejects generic consumer SaaS softness and cartoonish cyberpunk tropes in favor of an authentic defense-grade operations center atmosphere.

The aesthetic fuses technical minimalism with tactical HUD glassmorphism:
- **Atmospheric Depth:** Deep-space navy baselines layered beneath ultra-low opacity panels produce a functional night-vision posture optimized for 24/7 command center monitoring.
- **Precision Optical Accents:** Micro-fine borders, hairline coordinates, and disciplined photon glows signal system health, active interception vectors, and telemetry variance.
- **Instrumental Pragmatism:** Every pixel, reticle, and line of tabular data exists to accelerate threat identification, payload containment, and power distribution stabilization.

## Colors

The palette is engineered around high-contrast operational telemetry against a light-absorbent, ultra-deep foundation. The functional hierarchy separates contextual spatial geometry from mission-critical threat alerts.

### Surface Architecture
- **Base Void (`#070B14`):** The primary canvas background; consumes ambient glare in mission control rooms.
- **Sub-Surface Tier (`#0D1422`):** Structural gutters, docking rails, and map viewport foundations.
- **Instrument Surface Tier (`#111C2D`):** Tactical panels, telemetry feeds, and command drawers.
- **Active Overlay (`#18263D`):** Interactive hover states, elevated context cards, and floating inspector modules.

### Telemetry & Signal Tokens
- **Command Electric Blue (`#48A5FF`):** Primary action target, healthy telemetry status, selection indicators, active radar sweeps, and focused states.
- **Grid Recovery Green (`#35E6A1`):** Microgrid synchronization, nominal frequency equilibrium, patched vectors, and successful failovers.
- **Compromise Alert Red (`#FF405D`):** Zero-day exploits, breached substation switches, SCADA injection alerts, and terminal overrides.
- **Telemetry Warning Amber (`#F4C95D`):** Voltage flicker, packet jitter, unverified firmware handshakes, and grid node degradation.

### Signal Boundary Rules
- Borders rely on `rgba(72, 165, 255, 0.15)` for structural definition.
- High-priority tactical alerts bypass ambient transparency and command solid 1px borders with localized radial blurs (e.g., `rgba(255, 64, 93, 0.4)`).

## Typography

Typography functions as an analytical instrument. We establish a dual-type architecture:

1. **Space Grotesk (Command & Headers):** Applied to telemetry readouts, status identifiers, node badges, and display anchors. The geometric architecture and mechanical quirks evoke avionics consoles and digital twin node monitors. Uppercase variants (`label-caps`, `label-code`) provide immediate scannability across dense control interfaces.
2. **Inter (Operational Telemetry & Logs):** Serves as the high-legibility workhorse for tabular network data, SIEM incident logs, system parameters, and continuous real-time telemetry. Its tall x-height and neutral grotesque construction eliminate character ambiguity under time-pressured operations.

All numerical tables, voltage counters, and event timestamps must enforce tabular figure alignment (`font-variant-numeric: tabular-nums`) to prevent optical shifting during continuous stream updates.

## Layout & Spacing

The layout is anchored in a high-density, multi-panel tactical viewport designed for maximum data visualization without ocular fatigue.

### Grid & Composition
- **Command Viewport (Desktop 1440px+):** 12-column dynamic grid utilizing `gutter` (1rem) and `margin` (1.5rem). The display accommodates fixed telemetry sidebars (320px to 380px) flanking an expansive 3D microgrid viewport or visual twin topology graph.
- **Field Inspector (Tablet 768px - 1439px):** 8-column layout. The digital twin map retains central hierarchy, while side logs collapse into collapsible contextual slide-overs.
- **Mobile Tactical Node (< 768px):** 4-column layout with `margin-mobile` (0.75rem). Panels shift into a vertically stacked, tabbed operational stack.

### Spatial Discipline
Whitespace is structured rather than expansive. Spacing between data points must follow strict mathematical cadences:
- `space-xs` (4px) separates coupled data values from unit labels.
- `space-sm` (8px) separates contiguous rows in log tables and badge tags.
- `space-md` (16px) establishes internal padding for telemetry panels and component framing.
- `space-lg` (24px) establishes separation between decoupled functional modules.

## Elevation & Depth

Depth is established through translucent chromatic layering, photonic glows, and micro-thin containment vectors rather than conventional drop shadows.

### Atmospheric Tiers
- **Tier 0 (Map Baseline):** Infinite dark background (`#070B14`) rendered with an optional subtle SVG coordinate crosshair grid at 4% opacity.
- **Tier 1 (Tactical Ground):** Background `#0D1422` with structural lines `rgba(72, 165, 255, 0.08)`.
- **Tier 2 (Glassmorphic HUD Panels):** Background `#111C2D` with a glass backdrop blur (`backdrop-filter: blur(12px)`) and a 1px border rendered in `rgba(72, 165, 255, 0.15)`.
- **Tier 3 (Floating Command Elements):** Background `#18263D` with a subtle top edge highlight (`1px solid rgba(72, 165, 255, 0.35)`) and an ambient diffuse glow (`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 12px rgba(72, 165, 255, 0.1)`).

### Threat Elevation States
Critical threat vectors break the ambient blue elevation:
- **Compromised Target Alert:** The panel border transitions to `1px solid #FF405D` accompanied by a pulsing tactical field: `box-shadow: 0 0 16px rgba(255, 64, 93, 0.25)`.
- **Nominal Telemetry Lock:** Selected operational nodes apply a localized photon lock: `box-shadow: 0 0 14px rgba(72, 165, 255, 0.2)`.

## Shapes

The shape system adopts a controlled micro-radius (`0.25rem` / 4px) to embody military-grade structural rigidity, precision machined instruments, and digital twin HUD screens.

- **Base Radius (0.25rem / 4px):** Standard for all interactive cards, telemetry indicators, log items, and primary buttons.
- **Large Radius (0.5rem / 8px):** Reserved for primary viewport containment windows and tactical command modals.
- **Corner Notches & Reticles:** High-priority cards optionally feature chamfered corner cutouts or 4px structural crosshairs overlaid on the top-left and bottom-right corners to enforce the tactical instrument aesthetic. Circular forms are strictly reserved for radar compass sweeps, status pings, and radio selectors.

## Components

### Buttons & Tactical Actions
- **Primary Command Button:** Background `#48A5FF`, text `#070B14` (Inter bold), corner radius 4px. Hover produces an inner white sheen and an outer electric aura (`box-shadow: 0 0 16px rgba(72, 165, 255, 0.5)`).
- **Secondary Intercept Button:** Transparent background, 1px border in `rgba(72, 165, 255, 0.3)`, text `#48A5FF`. Hover transitions surface to `rgba(72, 165, 255, 0.1)`.
- **Destructive/Emergency Isolator:** Background `#FF405D`, text `#FFFFFF`, corner radius 4px, reinforced with an active warning glow (`box-shadow: 0 0 20px rgba(255, 64, 93, 0.45)`).

### Chips & Node Status Badges
- Constructed with `label-caps` in Space Grotesk.
- **Nominal Node:** Background `rgba(53, 230, 161, 0.1)`, text `#35E6A1`, 1px border in `rgba(53, 230, 161, 0.3)`. Includes an animated 6px center status point.
- **Alert Node:** Background `rgba(255, 64, 93, 0.12)`, text `#FF405D`, 1px border in `rgba(255, 64, 93, 0.4)`.
- **Warning Node:** Background `rgba(244, 201, 93, 0.1)`, text `#F4C95D`, 1px border in `rgba(244, 201, 93, 0.3)`.

### Telemetry Cards & Panels
- Foundation: Solid `#111C2D` infused with backdrop blur.
- Borders: Continuous 1px border in `rgba(72, 165, 255, 0.15)`.
- Header: Space Grotesk uppercase subtitle with tiny monospace coordinate tokens (e.g., `SEC-04 // 60.02Hz`) positioned opposite the title.

### Input Fields & Search Bars
- Background `#0D1422`, 1px border `rgba(72, 165, 255, 0.2)`, text `#FFFFFF`.
- Focus state: Border transitions instantly to `#48A5FF` with a zero-delay `box-shadow: 0 0 8px rgba(72, 165, 255, 0.35)`. Placeholder text in muted cyan-gray (`rgba(255, 255, 255, 0.4)`).

### Telemetry Feeds & SIEM Data Lists
- Dense tabular rows with alternating hairline borders (`1px solid rgba(72, 165, 255, 0.05)`).
- Hover state: Background sweeps to `rgba(72, 165, 255, 0.04)`.
- Metrics display font Inter with `tabular-nums`, colored based on threshold severity.

### Tactical HUD Reticles & Radar Gauges
- Circular and angular SVG overlays featuring rotating radial sweep gradients (`conic-gradient(from 0deg, transparent 70%, rgba(72, 165, 255, 0.35) 100%)`).
- Frequency wave monitors utilize hairline 1.5px paths rendered in `#48A5FF` or `#35E6A1`.