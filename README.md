# YK Studio Matrix

A refined website concept designed and built by **YK**.

Signature: `YK-STUDIO-MATRIX-2026-v1`

## Purpose

This project is a portfolio-grade demonstration of a single, strict design language for a modern business website. It is deliberately industry-agnostic so that any serious brand can look at it and immediately picture how it would adapt to their own identity.

Nothing in the live content is tied to a specific industry. The system carries the impression — the brand is tuned in.

## Features

- One strict monochrome design language (white, black, grey)
- Custom soft-follow cursor (auto-disabled on touch devices)
- Magnetic primary buttons
- Word-by-word hero reveal
- Live status word that rotates (Composing / Refining / Drafting / Crafting / Designing)
- Floating section rail with live active state
- Scroll progress bar
- Mouse-tracking hero spotlight
- 3D tilt on device, floating cards, showcase cards, and compositions
- Text scramble animation on the composition index
- Animated counters
- Testimonial slider with smooth crossfade
- Visitor journey panel (Attract / Convince / Convert / Retain / Compose)
- Six section archetypes with filters
- Three composition tones inside one design language
- Refined contact form with validation
- Live local-time footer detail
- Accessible, keyboard-friendly, `prefers-reduced-motion` aware
- Zero dependencies, zero build step

## File structure

```text
website_dev3/
├── index.html
├── styles.css
├── script.js
├── 404.html
├── LICENSE
├── README.md
└── .gitignore
```

## Customization

The whole system is content-driven. To tune it around a brand:

1. Edit `index.html` to update copy, the visitor journey panel labels, the composition cards, and the contact focus options.
2. Edit `styles.css` to adjust the look. Key tokens live at the top:

```css
:root {
    --black: #0b0b0b;
    --paper: #fbfaf6;
    --grey-700: #6f6f6f;
    --serif: "Playfair Display", Georgia, serif;
    --text-base: 17px;
}
```

3. Edit `script.js` to change the journey panel content (`stageData`), rotating status words, or testimonial quotes.

The author attribution is intentionally everywhere:

- Fixed `YK crafted experience` badge
- Footer credit and signature
- HTML, CSS, and JS source headers
- Console signature on load
- `LICENSE` ownership

## Deploy to GitHub Pages

```bash
cd website_dev3
git init
git add .
git commit -m "Initial YK Studio Matrix website"
git branch -M main
git remote add origin https://github.com/YOURUSER/YOURREPO.git
git push -u origin main
```

Then enable GitHub Pages from `Settings -> Pages -> main / root`.

## License

Proprietary. All rights reserved. See `LICENSE`.
