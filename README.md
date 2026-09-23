# Shanit Paul — After Hours

A 3D portfolio for meeeeeeeeeeeeeee. Now a miniature neighborhood, open all night.

A procedural, interactive five-store portfolio prototype built with **Next.js App Router, React, TypeScript, React Three Fiber, Drei, Three.js, and Tailwind CSS**. No external models, textures, album covers, logos, font downloads, or copyrighted character artwork.

## Run locally

Requires Node.js 20.9+ and npm. Install with `npm install`, then start with `npm run dev` and open http://localhost:3000. A VS Code task, **Portfolio: development server**, is also included.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Type-checked production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint / React hooks checks |
| `npm run typecheck` | Strict TypeScript checks |
| `npm test` | Playwright desktop and mobile regression tests |

For a fresh test setup, install Chromium with `npx playwright install chromium`, run `npm run build`, then `npm test`. Playwright starts a production server automatically, or reuses an existing local server on port 3000. Browser screenshots and failure traces are saved to the ignored `test-results/` directory.

## Explore

- **Shinobi Ramen → Projects:** a paper menu of Shinobi Tracker, MemBlock, and Vewrite.
- **Club 1899 → Achievements:** representative jerseys and an interactive trophy cabinet. No official club branding.
- **The Westeros Archive → Experience:** an original fictional atlas and career exhibits, not a reproduction of an existing map or asset.
- **B-Side Records → Skills:** physical record sleeves for eleven languages and technologies.
- **Midnight Manga → Experiments:** original book spines and an experimental-project shelf.

Hover a store for its label and an emissive edge. Click a facade or its label to focus the orthographic camera. Store menus open readable HTML detail panels, keeping the world visible. Records, museum exhibits, the trophy, and selected project/book cards are also clickable.

Drag to orbit within constrained angles; scroll/pinch to zoom. **Back to building** or the reset button returns to the overview. **Escape** closes the directory, backs out of an item, or returns to the building. The directory is keyboard accessible and includes Education and About. Panels are non-modal so the scene and directory remain usable.

## Architecture

- `data/types.ts`: portfolio item, store, and category contracts.
- `data/stores.ts`: store transforms, visual accents, content mapping, and profile text.
- `data/projects.ts`, `experience.ts`, `skills.ts`, `achievements.ts`: structured content, not embedded in presentation components.
- `lib/navigation.ts`: pure, renderer-independent navigation reducer.
- `components/Portfolio.tsx`: application state, dynamic scene loading, HTML shell, directory, and fallback.
- `components/scene/Building.tsx`: store renderer registry and shared building utilities.
- `components/scene/Store.tsx`: reusable procedural shell and `StoreRendererProps` adapter contract.
- Individual scene renderers: architecture and sparse representative props for each shop.
- `components/scene/CameraRig.tsx`: damped focus/overview transitions, responsive framing, constrained orbit.
- `components/scene/LabelProjection.tsx`: projects anchors into the main HTML tree; avoids extra React roots.
- `components/ui/`: accessible HTML menus and category-specific detail panels.

### Replacing geometry with Spline assets

Keep the store IDs, local origin at floor-center, `StoreRendererProps`, and content data unchanged. Replace a renderer in the registry with a component that loads a licensed/self-authored export supported by Three.js (such as glTF). Map object selection to `onItem(itemId)` and use `selected` to reveal detailed interiors. The wrapper supplies hover/selection behavior and the global store transform; camera focus, HTML panels, and navigation stay unchanged. A native Spline runtime would require its own rendering/event adapter; that integration is intentionally not included in this prototype.

## Content status

**This is a prototype, not a verified résumé.** Names and interests supplied in the brief are represented, but job dates, education credentials, award details, project results, and repository/demo URLs were not supplied. Missing details are explicitly identified as prototype entries, and missing external links are disabled instead of pointing to fabricated destinations. Replace those entries before publishing. The skill descriptions describe the technologies, not an asserted proficiency level.

## Rendering and responsiveness

- One lazy-loaded WebGL scene, demand-driven rendering, and bounded pixel ratio (1–1.5).
- Shared box geometry/materials; instanced books, bricks, and pavement.
- One shadow-casting directional light with a 1024px map, a non-shadowing fill, and three short-range warm accent lights.
- A one-frame low-resolution contact-shadow pass; no continuous post-processing, particle systems, or external asset loading.
- Additional records and item labels mount only when their shop is selected. The complete interiors remain intentionally sparse for this first version.
- Reduced-motion preference skips camera/CSS animation; no autoplay audio.
- Mobile uses compact shop markers and scrollable bottom sheets, with an optional simplified HTML presentation on every screen.
- WebGL initialization failures and context loss switch automatically to the complete HTML directory view.

## Tests

The Playwright suite covers data invariants, all five stores, project/experience/skill panels, back/Escape behavior, keyboard access and focus restoration, reduced motion, the simplified presentation, forced WebGL failure, overflow, and direct mesh picking plus orbit/zoom/reset. Chromium runs with software WebGL in tests to keep them usable in GPU-less environments. This is not a substitute for profiling on a physical low-end mobile device.

## Prototype scope

The focus is composition, lighting, modular architecture, camera motion, and working discovery flows. High-detail interiors, real résumé content, analytics, contact submission, audio, post-processing bloom/SSAO, and actual Spline integration are intentionally left for future iterations.
