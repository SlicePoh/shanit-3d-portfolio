# Portfolio 3D Room Update --- Copilot Instructions

## Goal

Update the existing Next.js + React Three Fiber 3D portfolio prototype.

The current prototype has a stacked miniature building with stores and
side UI cards. Do NOT redesign the project into a normal portfolio
website.

The target is a **night-time miniature 3D neighborhood** where each
store is a self-contained interactive room. The 3D environment is the
primary navigation and the resume content is the primary content inside
each room.

## Visual References

The project will contain these reference assets:

-   `reference/chatgpt-building-reference.png`
-   `reference/gemini-building-reference.png`
-   `reference/westeros-map.*`
-   `reference/seaotter-logo.*`
-   `reference/barcelona-logo.*`
-   `reference/queen.*`

The first two building images are the primary visual references.

Use them to match:

-   isometric / slightly elevated camera
-   stylized low-poly diorama
-   irregular stacked storefronts
-   dark night background
-   warm interior lighting
-   selective neon/sign lighting
-   compact detailed storefronts
-   visible street/sidewalk
-   dark charcoal/navy surroundings
-   warm orange/yellow windows
-   varied storefront colors
-   mismatched building shapes and sizes

Do not turn the scene into a clean modern SaaS-style 3D website.

Do not add large HTML cards beside the building as the primary
navigation. The stores themselves are the navigation.

------------------------------------------------------------------------

# CRITICAL STRUCTURAL CHANGE

The current implementation treats the stores mostly as objects in one
exterior scene.

Change the architecture so that every major store has its own **interior
room view**.

The interaction should be:

1.  User sees the entire building.
2.  User hovers a store.
3.  Store highlights subtly.
4.  User clicks the store.
5.  Camera smoothly moves/zooms toward that store.
6.  The exterior view transitions into the store's interior.
7.  The interior becomes the primary scene.
8.  The user can look around the room.
9.  Resume content is presented as physical objects in the room.
10. Clicking the main content object opens its detailed information.
11. A "Back to building" control returns to the exterior.

The interior should feel like a real room, not like a card displayed
over the building.

------------------------------------------------------------------------

# BUILDING GEOMETRY

The building should have multiple stacked stores.

Do NOT align every floor in the same orientation.

Use this concept:

## Ground floor

Two stores facing opposite directions.

Example:

-   Store A faces north.
-   Store B faces south.

## First floor

Two stores facing opposite directions perpendicular to the previous
floor.

Example:

-   Store C faces east.
-   Store D faces west.

## Higher floors

Continue rotating / varying orientations.

The stores should appear diagonally offset, stacked and slightly
misaligned, similar to a miniature architectural diorama.

The building should feel assembled from independent storefronts rather
than one rectangular apartment block.

Keep the existing general ramen-store structure if it already looks
good.

------------------------------------------------------------------------

# ROOM SYSTEM

Create a reusable room system.

Suggested architecture:

``` text
BuildingScene
  ├── StoreExterior
  └── StorePortal / StoreEntry
        ↓
      RoomScene
        ├── RoomCamera
        ├── RoomLighting
        ├── RoomObjects
        ├── RoomHotspots
        └── RoomContentPanel
```

Create reusable concepts such as:

``` ts
type StoreRoom = {
  id: string;
  title: string;
  theme: string;
  exteriorPosition: [number, number, number];
  exteriorRotation: [number, number, number];
  roomCameraPosition: [number, number, number];
  roomCameraTarget: [number, number, number];
};
```

Do not duplicate camera, transition and interaction logic for every
store.

------------------------------------------------------------------------

# IMPORTANT CONTENT RULE

The 3D room contains two kinds of information:

## Primary content

This MUST be my resume content.

It should be the first thing visible when entering a room.

## Secondary content

This is my personal-interest material.

It should exist as environmental detail / Easter eggs.

Examples:

-   music records
-   anime references
-   Naruto-inspired objects
-   Barcelona memorabilia
-   Westeros artifacts
-   posters
-   instruments

The secondary content should NEVER visually overpower the resume
content.

------------------------------------------------------------------------

# REMOVE / CHANGE CURRENT SIDE CARDS

The current prototype displays large content cards beside the 3D
building.

Do not use these as the primary content presentation.

Replace them with:

-   small contextual labels when necessary
-   room-specific physical objects
-   small HTML detail panels only after a physical object is clicked

The first thing the visitor should see after entering a room is the
actual resume-themed object/display.

------------------------------------------------------------------------

# ROOM 1 --- SHINOBI RAMEN

This is the bottom-most store.

## Exterior

Keep the existing ramen-shop concept.

Use:

-   Japanese ramen shop
-   red/orange awning
-   warm yellow/orange interior
-   lanterns
-   wooden signage
-   ramen counter
-   stools
-   small tables
-   dark night environment

The anime reference should be subtle rather than a direct reproduction
of copyrighted Naruto characters.

## Interior

The main focus is a large physical **menu card**.

The menu card is the Projects navigation.

Example:

``` text
SHINOBI RAMEN

PROJECT MENU

01  Shinobi Tracker
02  MemBlock
03  Vewrite
```

Clicking a menu item opens that project's detail view.

Each project gets its own project page/panel.

The project content comes from:

`content/projects.md`

## Environmental Easter eggs

Include subtle Naruto/anime-inspired objects:

-   ramen bowl
-   fish-cake narutomaki
-   Japanese wall decoration
-   scrolls
-   small shinobi-inspired props
-   subtle hand-sign reference

Do not make these more prominent than the project menu.

------------------------------------------------------------------------

# ROOM 2 --- MUSIC STORE & VINYL

Create a music shop / record store.

## Main focus

The first thing visible should be a large wall/display containing:

# TECHNICAL SKILLS

Organize the skills according to the resume categories.

The exact content is in:

`content/skills.md`

The wall should clearly show the categories and every skill.

Do not omit skills.

## Environmental details

Use the secondary content to establish the music identity:

-   vinyl records on walls
-   CDs
-   record player
-   speakers
-   guitar
-   violin
-   piano
-   harmonium
-   music shelves
-   album-like fictional covers

Personal music references can include:

-   Queen
-   Seedhe Maut
-   Fossils
-   KR\$NA
-   Hemanta Mukherjee

Do not reproduce copyrighted album artwork.

The music objects are atmosphere/Easter eggs. The skills wall is the
primary portfolio content.

------------------------------------------------------------------------

# ROOM 3 --- WESTEROS MUSEUM

The location should explicitly be presented as a:

# MUSEUM

Theme:

-   Westeros
-   medieval stone architecture
-   museum display cases
-   maps
-   swords
-   armor
-   crowns
-   dragon references
-   historical artifacts
-   Iron Throne-inspired display
-   candles / torches
-   dark stone walls

Use provided Westeros reference assets if present.

Do not reproduce copyrighted character models.

## Main focus

The main museum displays should contain my:

# PROFESSIONAL EXPERIENCE

Use the complete content in:

`content/experience.md`

Do not summarize away the details.

The experience chronology, companies, roles, dates and every resume
bullet should be preserved.

The museum can represent experience as:

-   exhibits
-   plaques
-   display cases
-   historical chapters
-   artifacts

But the actual resume text must remain accessible.

## Secondary content

Actual Westeros lore, maps, swords, dragons and other artifacts are
secondary Easter eggs.

------------------------------------------------------------------------

# ROOM 4 --- FC BARCELONA SPORTS STORE

Theme:

-   FC Barcelona-inspired colors
-   football merchandise
-   jerseys
-   scarves
-   boots
-   footballs
-   trophy cabinet
-   club-history style displays

Use the provided Barcelona reference asset where appropriate.

Do not make the resume content subordinate to the football theme.

## Main focus

The room should present:

# ACHIEVEMENTS & CERTIFICATIONS

Use:

`content/achievements.md`

The room should have:

-   trophy display
-   award plaque
-   certification shelf / certificate display
-   achievement cards
-   football jerseys as secondary visual elements

Certifications should be clickable and should include their links when
the source information contains a link.

------------------------------------------------------------------------

# ROOM 5 --- MANGA SHOP

The manga shop can be implemented later.

For now:

-   preserve a placeholder store
-   preserve its exterior position
-   create the same room architecture
-   do not spend time implementing its final content

It will later contain additional resume/personal content.

------------------------------------------------------------------------

# DATA / CONTENT

All resume content must live outside the 3D components.

Use:

``` text
content/
  projects.md
  skills.md
  experience.md
  achievements.md
```

The room components should consume this content through a data layer.

Do not hardcode resume text inside JSX.

------------------------------------------------------------------------

# CAMERA TRANSITIONS

Use smooth transitions.

Exterior:

-   orthographic/isometric camera
-   whole building visible

Interior:

-   perspective or orthographic camera depending on what looks better
-   close-up room framing
-   room fills most of viewport
-   no visible giant empty exterior around it

Suggested flow:

``` text
EXTERIOR
   ↓
hover store
   ↓
highlight
   ↓
click
   ↓
camera moves toward storefront
   ↓
store fills viewport
   ↓
transition / portal
   ↓
INTERIOR ROOM
```

When leaving:

``` text
INTERIOR
   ↓
Back to building
   ↓
camera exits room
   ↓
EXTERIOR
```

Use GSAP or smooth interpolation.

------------------------------------------------------------------------

# ROOM CAMERA

Each room should have its own camera target.

The room should initially frame the PRIMARY resume content.

For example:

Ramen: camera looks toward project menu.

Music: camera looks toward skills wall.

Westeros: camera looks toward experience exhibits.

Barcelona: camera looks toward trophies/certifications.

Do not start each room by looking at a random corner.

------------------------------------------------------------------------

# PHYSICAL INTERACTION

Important portfolio principle:

Do not make every object clickable.

Only important objects should be interactive.

Example:

Ramen: Project menu items = clickable.

Music: Skills wall / skill groups = clickable.

Westeros: Experience exhibits = clickable.

Barcelona: Awards and certification displays = clickable.

Secondary objects can simply be decorative.

------------------------------------------------------------------------

# ACCESSIBILITY / FALLBACK

Keep a small normal HTML navigation option.

The 3D world is the primary experience, but users must still be able to
navigate to:

-   Projects
-   Skills
-   Experience
-   Achievements
-   Education
-   About

Do not make the portfolio unusable if WebGL is unavailable.

------------------------------------------------------------------------

# IMPLEMENTATION ORDER

Do NOT implement all rooms simultaneously.

Work in this order:

## Phase 1

Refactor the architecture:

-   Store data
-   Room state
-   Camera transitions
-   Exterior → interior transition
-   Back to building
-   reusable room component

## Phase 2

Fully implement:

**Shinobi Ramen**

This is the reference implementation for all future rooms.

## Phase 3

Implement:

**Music Store**

## Phase 4

Implement:

**Westeros Museum**

## Phase 5

Implement:

**Barcelona Football Store**

## Phase 6

Manga shop and remaining content later.

------------------------------------------------------------------------

# DESIGN PRIORITY

When choosing between adding more content and improving the visual
quality, choose visual quality.

Priority:

1.  Composition
2.  Store silhouette
3.  Lighting
4.  Camera
5.  Room transition
6.  Primary resume content
7.  Environmental detail
8.  Easter eggs

Do not fill the scene with random objects just to make it look detailed.

Every object should have a visual reason to exist.

------------------------------------------------------------------------

# FINAL RULE

This is not:

"Resume + 3D decoration."

It is:

"An interactive miniature world where my resume is embedded into the
architecture."

The visitor should enter a store because they are curious about the
theme, then discover my professional information inside it.
