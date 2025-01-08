# Snip-Slide - Playnite Addon

## Structur
Snip-Slide/
├── src/
│   ├── main.js
│   ├── styles.css
│   ├── utils.js
│   └── popupHandler.js
├── assets/
│   └── (Hier könnten später Icons oder Bilder liegen)
├── lib/
│   └── (Hier könnten später externe Bibliotheken liegen)
├── README.md
├── manifest.json
└── LICENSE

---

## Overview
**Snip-Slide** is a Playnite addon that enhances accessibility by introducing an edge-triggered popup menu. It offers users quick access to their favorite games without interfering with the main interface, inspired by taskbars or overlays like the Xbox Game Bar.

---

## Features
1. **Edge Triggered Popup**
   - Menu appears when the mouse moves to the left edge of the screen and hides when the mouse leaves.
2. **Quick Favorites Access**
   - Displays a list of favorite games or shortcuts directly within the popup.
3. **Customizable Design**
   - Users can modify icon styles, colors, and popup layout.
4. **Lightweight Integration**
   - Minimal performance impact with clean code structure.

---

## File Descriptions
- **`main.js`** - Handles the core logic for popup behavior and UI interactions.
- **`styles.css`** - Manages the appearance of the popup and trigger button.
- **`utils.js`** - Contains reusable helper functions for event handling.
- **`popupHandler.js`** - Manages popup visibility and transitions.
- **`manifest.json`** - Defines the addon metadata, including name, version, and dependencies.
- **`LICENSE`** - Specifies the MIT license for open-source distribution.
- **`README.md`** - Provides detailed instructions for setup, customization, and usage.

---

## Setup Instructions
1. Download or clone the repository.
2. Place the `SnipSlide/` folder into your Playnite extensions directory.
3. Restart Playnite and activate the addon from the settings menu.

---

## Technical Details
- **Mouse Edge Detection**
  - Uses JavaScript event listeners to detect cursor proximity to screen edges.
- **Popup Animation**
  - CSS transitions handle smooth appearance and disappearance.
- **Custom Configurations**
  - Allows easy adjustments for position, icon styles, and content layout.

---

## Contribution
- **Author**: GhostVPN
- **Version**: Beta 1.0
- **License**: MIT

---

## Future Plans
- Add drag-and-drop support for favorites management.
- Introduce hotkey activation as an alternative to edge detection.
- Enable theme compatibility for more customization options.

---

Feedback and suggestions are welcome!
