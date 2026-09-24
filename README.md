# Premium Interactive Digital Wedding Invitation - Phase 1

Phase 1 of a luxury, interactive, animated digital wedding invitation website built with vanilla HTML5, CSS3, and JavaScript.

## Highlights & Features

- **Interactive 3D Envelope Opening Experience**: Unseal the golden wax stamp, unfold the 3D flap, extract the inner invitation card, and trigger particle bursts.
- **100% Placeholder & Dynamic Configuration**: Built around a centralized `INVITATION_CONFIG` object in `js/script.js`. Zero hard-coded wedding details.
- **CSS/SVG Ornamental Photo Gallery**: Lightweight ornamental gold-framed gallery cards with full lightbox preview interaction.
- **Visual-Only Audio Control**: Floating music control UI supporting visual Play/Pause state toggling without any external audio dependencies or audio permissions.
- **Dynamic Countdown Ticker**: Time countdown logic driven by configurable ISO date strings.
- **Scroll-Driven Micro-Animations**: Intersecting scroll reveals for timeline events, venue details, and thank-you sections.
- **Mobile-First & Responsive Layout**: Tailored viewports from small mobile devices (`320px`) to desktop monitors (`1200px+`).
- **Accessibility & Motion Preference**: Built-in support for `@media (prefers-reduced-motion)` and keyboard navigation.

---

## Project Structure

```
wedding-invitation/
├── index.html            # Main HTML document
├── css/
│   └── style.css         # Custom CSS tokens, 3D envelope & glassmorphic styles
├── js/
│   └── script.js         # Centralized INVITATION_CONFIG & interaction engine
├── assets/
│   ├── images/           # Asset directory for future photos
│   ├── audio/            # Asset directory for future audio
│   └── icons/             # Asset directory for future icons
└── README.md             # Project documentation
```

---

## How to Run Locally

You can serve this static site using any local web server or by opening `index.html` directly in your browser.

### Option 1: Python HTTP Server (Recommended)
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option 2: Node.js Serve / Live Server
```bash
npx serve .
```

---

## Phase 2 Readiness

To update this invitation with real wedding details in Phase 2:
1. Open `js/script.js`.
2. Update the `INVITATION_CONFIG` object values (`brideName`, `groomName`, `weddingDate`, `venue`, `events`, `gallery`, `audioSrc`, `googleMapsUrl`).
3. Place real photos in `assets/images/` and audio in `assets/audio/`.
