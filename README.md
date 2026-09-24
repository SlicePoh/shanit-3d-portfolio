# Shanit Paul — After Hours

A 3D portfolio for meeeeeeeeeeeeeee. Now a miniature neighborhood, open all night.

A procedural, interactive five-store portfolio built with **Next.js App Router, React, TypeScript, React Three Fiber, Drei, Three.js, and Tailwind CSS**. Each storefront leads into an independent, explorable 3D room. The supplied resume is its primary content; personal interests are secondary environmental details. Models are procedural, with optional local artwork supplied by the owner. No remote fonts, character models, or album-art downloads.

## Run locally

Use Node.js 22 LTS (specified in `.nvmrc`) and npm to match the Netlify build environment. Next.js requires at least Node.js 20.9. Install with `npm install`, then start with `npm run dev` and open http://localhost:3000. A VS Code task, **Portfolio: development server**, is also included.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run content` | Generate typed-consumed resume data and prepare optional local artwork |
| `npm run build` | Type-checked production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint / React hooks checks |
| `npm run typecheck` | Strict TypeScript checks |
| `npm test` | Playwright desktop and mobile regression tests |

For a fresh test setup, install Chromium with `npx playwright install chromium`, run `npm run build`, then `npm test`. Playwright starts a production server automatically, or reuses an existing local server on port 3000. Browser screenshots and failure traces are saved to the ignored `test-results/` directory.

## Deploy to Netlify from GitHub

Commit and push the repository, including `netlify.toml`, `.nvmrc`, and `package-lock.json`. In Netlify, import the GitHub repository (or use the existing connected project) and deploy the `main` branch.

The checked-in configuration sets:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Base directory | Repository root (`.`); leave the UI field empty |
| Package directory | Leave empty; this is not a monorepo |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node.js | 22 LTS |
| Next.js runtime | `@netlify/plugin-nextjs` (current adapter, not version-pinned) |

Netlify installs the dependencies, builds Next.js, and uses its OpenNext adapter to deploy the pages, assets, and routing. No application secrets are needed for this iteration. Do not set `NODE_ENV=production` during dependency installation, because the build needs the development dependencies too.

### A successful deploy shows Netlify's “Page not found”

That page is a hosting/routing 404, not a Three.js rendering failure. Common causes are publishing the repository or the wrong output folder, skipping the Next.js adapter, deploying an old commit, or opening a URL belonging to another project. A successful upload alone does not prove that the homepage was deployed.

1. Push the deployment configuration to the branch connected to Netlify, then check that the new deploy uses that commit. Repository configuration cannot affect an already-published deploy.
2. Confirm the settings above under **Project configuration → Build & deploy / Continuous deployment**. Clear any incorrect package-directory setting.
3. If present, remove `NETLIFY_NEXT_PLUGIN_SKIP=true` or a manually pinned legacy Next.js runtime. The deployment log should identify the root `netlify.toml`, run `next build`, and execute `@netlify/plugin-nextjs`.
4. Use **Deploys → Trigger deploy → Clear cache and deploy site** (or the equivalent retry-with-cleared-cache option), and open the published production deploy's root URL.

Do not publish `.next/static` by itself: it contains assets, not the application routes. This project is also not configured for static export, so `out`, `dist`, `build`, and `public` are not its publish directory. Do not add a catch-all `/* /index.html 200` SPA rewrite; the Next.js adapter owns routing. Build output stays gitignored and is generated on Netlify.

If the 404 remains, inspect the exact deploy URL, resolved build settings, and adapter section of its deployment log rather than changing the 3D components. See [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) and [the OpenNext configuration guide](https://opennext.js.org/netlify).

## Explore

- **Shinobi Ramen → Projects:** a physical menu for MemBlock, Shinobi Tracker, and Vewrite, with a counter, bowls and lanterns.
- **FC Barcelona Sports Store → Achievements:** Rising Star trophy, technical-writing programme, six clickable certificates, and secondary jerseys.
- **Westeros Museum → Experience:** three chronological exhibits containing all 36 top-level resume bullets, including the nested filter dimensions. Supplied map and abstract medieval artifacts remain secondary.
- **Music Store & Vinyl → Skills:** all 42 skills in four clearly separated wall sections, with records, guitar, violin, piano, harmonium and supplied music artwork.
- **Midnight Manga → Placeholder:** its original attic position and the shared interior architecture are preserved. Final content is intentionally deferred.

Hover a store for its label and a subtle emissive edge. Click its facade, label, or directory entry to zoom toward the storefront and transition into its room. No detail panel opens on entry. Select the physical menu, skills group, experience plaque, award, or certificate to open its full details. Closing details returns to the room, not the building.

Drag to orbit the whole building, including its opposite-facing stores; room orbit is constrained to keep the content wall in view. Scroll/pinch to zoom. **Back to building** returns to the exterior. **Escape** closes the directory, backs out of a detail, or exits/cancels a room. The compact HTML directory includes Education and About. A simplified view retains all content without WebGL.

## Architecture

- [content/projects.md](content/projects.md), [content/skills.md](content/skills.md), [content/experience.md](content/experience.md), [content/achievements.md](content/achievements.md): canonical resume content, outside the 3D components.
- [scripts/prepare-content.mjs](scripts/prepare-content.mjs): parses Markdown using `marked`, validates IDs and HTTP(S) links, generates [data/resume.json](data/resume.json), and copies supplied artwork. Runs before development, builds and tests. After editing Markdown during an active development session, run `npm run content` again (or restart the server).
- [data/stores.ts](data/stores.ts): exterior positions/rotations, content mapping, and profile information.
- [data/rooms.ts](data/rooms.ts): reusable room camera presets and responsive physical-display layout.
- [lib/navigation.ts](lib/navigation.ts): exterior → entering → interior → leaving state machine. Revision tokens discard stale transitions after cancellation or a new selection.
- [components/scene/rooms/RoomScene.tsx](components/scene/rooms/RoomScene.tsx): shared room shell, lighting, displays and themed decoration.
- [components/scene/CameraRig.tsx](components/scene/CameraRig.tsx): responsive exterior and interior framing, smooth interpolation, bounded room orbit.
- [components/scene/rooms/RoomSurfaces.tsx](components/scene/rooms/RoomSurfaces.tsx): projects three corners of each physical frame into a CSS affine transform. Accessible HTML typography follows the actual 3D plane without extra React roots.
- [components/ui/RoomContent.tsx](components/ui/RoomContent.tsx): keyboard-operable physical display faces. Details remain separate, readable, scrollable HTML.

### Replacing geometry with Spline assets

Keep the store IDs, local origin at floor-center, `StoreRendererProps`, and content data unchanged. Replace a renderer in the registry with a component that loads a licensed/self-authored export supported by Three.js (such as glTF). Map object selection to `onItem(itemId)` and use `selected` to reveal detailed interiors. The wrapper supplies hover/selection behavior and the global store transform; camera focus, HTML panels, and navigation stay unchanged. A native Spline runtime would require its own rendering/event adapter; that integration is intentionally not included in this prototype.

## Content status

The supplied resume Markdown has replaced the prototype projects, skills, experience and achievements. Dates and every experience bullet are preserved. Project repository/demo URLs and credential URLs were **not supplied**: placeholders never become live links. Add bare HTTP(S) URLs or Markdown links to the relevant metadata fields and regenerate content. Education credentials are still explicitly unspecified; no degree, institution or graduation date has been invented.

The original update documents and visual references remain untouched. Four provided images (Barcelona, Westeros map, Queen and Seedhe Maut) are copied to local public artwork by the preparation script. They are secondary room props, not the primary content. Missing optional source images leave procedural decoration in place. No sea-otter asset was present. Verify permission to publicly distribute supplied third-party artwork before deployment.

## Rendering and responsiveness

- One lazy-loaded WebGL canvas, demand-driven rendering, and bounded pixel ratio (1–1.5). Only the exterior or the active room is mounted.
- Shared box geometry/materials; instanced books, bricks, and pavement.
- One shadow-casting directional light with a 1024px map; short-range room lamps do not cast extra shadows.
- An exterior-only one-frame contact-shadow pass; no continuous post-processing or particle systems.
- Mobile uses narrower/taller skill and certificate walls and vertically arranged museum plaques; no resume skills are omitted to fit.
- Reduced-motion preference skips camera/CSS animation; no autoplay audio.
- Mobile uses compact shop markers and scrollable bottom sheets, with an optional simplified HTML presentation on every screen.
- WebGL initialization failures and context loss switch automatically to the complete HTML directory view.

## Tests

The Playwright suite covers original-source content completeness, opposite storefront orientations, the preserved attic, entry/exit and cancellation, all room frames, all six certificates, detail focus restoration, reduced motion, simplified mode, forced WebGL failure, and direct exterior mesh picking/orbit/zoom/reset. Room screenshots are captured for desktop and mobile. Chromium uses software WebGL; physical-device performance and manual artwork review remain separate checks. For an isolated production check while development runs on port 3000, set `PLAYWRIGHT_PORT=3100` when running the tests after a build.

## Prototype scope

The five-room architecture and four resume rooms are implemented. Final manga content, unspecified education details/URLs, analytics, contact submission, audio, post-processing bloom/SSAO, and actual Spline integration are left for future iterations.
