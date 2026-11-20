# Jeevan Kumar S — Portfolio

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
```
Output goes to `dist/` — deploy that folder to Vercel, Netlify, or GitHub Pages.

## What's inside
- Dedicated pages: `/about`, `/projects`, `/projects/:id`, `/experience`, `/skills`, `/certifications`, and `/contact`
- `src/App.jsx` — client-side page navigation; the home route keeps the complete portfolio
- `src/components/Projects.jsx` and `ProjectDetail.jsx` — filterable project cards and individual project detail pages
- `src/components/About.jsx` — profile overview and highlights
- `src/components/NodeField.jsx` — ambient animated node-network canvas (hero + contact background)
- `src/components/Arsenal.jsx` — interactive skill carousel (Technical Arsenal)
- `src/components/Certificates.jsx` — auto-scrolling certificate marquee
- `src/components/Projects.jsx`, `Trajectory.jsx`, `Contact.jsx`, `Nav.jsx`, `Hero.jsx`
- `src/data/content.js` and `src/data/experience.js` — project, profile, skills, and internship content

Run `npm run build` to generate the production bundle in `dist/`.
