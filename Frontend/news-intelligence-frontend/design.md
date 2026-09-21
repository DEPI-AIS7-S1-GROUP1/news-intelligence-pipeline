# Landing Page Design System --- AI Article Classification

## 1. Design Direction

Redesign the existing landing page into a **dark, cinematic,
experimental AI/editorial experience**.

The visual reference is the supplied Wonderland-style landing page
screenshot: - Pure/deep black background. - Large centered typography. -
Minimal white/gray UI. - Small red accent for the active section
indicator. - Ambient particles, glowing dots, thin lines, and geometric
fragments. - Numbered section navigation on the left. - Small
navigation/header at the top. - Scroll-driven full-screen section
transitions. - The page should feel like an interactive digital studio /
experimental AI product, not a conventional SaaS template.

The project itself is an **Article Classification API built with
FastAPI**. The design language should connect: **articles → text
processing → classification → API / AI output**.

Do not copy the reference website literally. Use its interaction model
and visual language as inspiration and adapt it to the existing
application's content.

------------------------------------------------------------------------

## 2. Core Visual Principles

### Background

-   Primary background: near-black, approximately `#050505` to
    `#000000`.
-   Avoid large colorful gradients.
-   Use subtle atmospheric lighting only.
-   White is the primary foreground color.
-   Secondary text should be muted gray.
-   Use a restrained red accent for active navigation / tiny highlights.
-   Keep large empty areas. Do not overcrowd the screen.

### Typography

Use a modern, clean sans-serif with excellent large-display rendering.

Recommended hierarchy: - Hero/display text: very large, light/regular
weight. - Supporting text: small to medium, muted gray. - Navigation:
small, understated. - Section numbers: compact and low-contrast. -
Technical/API text: monospace font.

Typography should be the main visual element.

Avoid: - Heavy bold SaaS headings everywhere. - Excessive rounded
cards. - Generic purple AI gradients. - Excessive glassmorphism. - Large
collections of icons.

------------------------------------------------------------------------

## 3. Page Structure

The existing project already has its own sections.

**Do not decide how many sections the application should have.** **Do
not create or remove sections simply to match this design document.**

Instead: 1. Inspect the current implementation. 2. Identify every
existing landing-page section. 3. Preserve the existing content and
purpose of those sections. 4. Apply this visual system to those existing
sections. 5. If the current project has 2, 3, 4, 5, or more sections,
adapt the navigation and scroll system dynamically. 6. Never hard-code
assumptions such as "there must be exactly 3 sections."

Every existing section should behave as a full-screen visual scene where
practical.

------------------------------------------------------------------------

## 4. Header

Create a minimal fixed header.

### Left

Project/product name.

Possible treatment: `CLASSIFY.` or the project's existing brand/name.

### Right

Keep only the navigation/actions that already exist in the application.

Example visual treatment: `API` · `DOCS` · `GITHUB`

Rules: - Small typography. - Muted gray by default. - White on hover. -
No large navigation pills. - No bulky navbar background. - Header can
have a subtle backdrop only when required for readability.

------------------------------------------------------------------------

## 5. Section Navigation

Create a fixed vertical section navigator on the left side.

Example:

01 02 03 04 05 ...

The number of items must be generated from the actual existing sections.

### Active state

The active section should have: - brighter text; - a short red
horizontal line; - subtle transition.

Inactive items: - low-opacity gray; - small typography.

Clicking a number should smoothly navigate to the corresponding existing
section.

The active number must update automatically while scrolling.

Do not duplicate content inside the navigator.

------------------------------------------------------------------------

## 6. Full-Screen Scroll Experience

The reference uses a strong one-section-at-a-time browsing experience.

Implement a controlled, polished scroll experience:

-   Each existing section should occupy approximately `100vh` when
    appropriate.
-   Scrolling should transition naturally to the next/previous section.
-   Use smooth scrolling.
-   Avoid abrupt jumps.
-   Support mouse wheel, trackpad, keyboard, and touch.
-   Do not break normal mobile scrolling.
-   Respect `prefers-reduced-motion`.

Possible implementation: - CSS scroll snapping where it improves
reliability. - GSAP / ScrollTrigger if already available or if it
clearly improves the interaction. - Do not add a large animation
dependency without checking the existing stack first.

The experience should feel intentional, not like a normal long webpage.

------------------------------------------------------------------------

## 7. Hero / First Existing Section

The first existing section should become the strongest visual scene.

Concept:

### Main message

Use the project's real purpose, not generic agency copy.

Example direction:

**Understand articles.** **Classify them instantly.**

Supporting line:

**An AI-powered article classification API built with FastAPI.**

Use the actual project terminology/content when available.

### Visual layer

Behind or around the typography, create a subtle AI/text-processing
atmosphere: - tiny glowing dots; - thin radial lines; - small geometric
fragments; - occasional particles; - very subtle movement; -
depth/parallax responding to pointer movement.

The particles should remain secondary to the text.

Do NOT turn the page into a noisy particle demo.

------------------------------------------------------------------------

## 8. Hero Animation

The animation should feel like an experimental digital product.

Suggested sequence:

1.  Background appears first.
2.  Small ambient particles fade in.
3.  Main heading enters with a smooth upward/fade motion.
4.  Supporting line follows.
5.  Decorative lines and fragments move subtly into position.
6.  A small bottom prompt such as: `Scroll to explore` fades in last.

Optional: - A subtle text-processing effect can appear around the
hero. - Article keywords can briefly highlight and dissolve. - A small
classification label can appear as a floating technical detail.

Keep the animation short and replay-safe.

Do not make users wait several seconds before the content becomes
usable.

------------------------------------------------------------------------

## 9. Article / AI Visual Language

Throughout the landing page, the visual language should reference text
classification without relying on stock illustrations.

Useful visual motifs: - text fragments; - highlighted keywords; -
classification labels; - confidence percentages; - JSON snippets; - API
request/response fragments; - thin connection lines; - small data
points; - scanning/highlighting effects.

Example:

`ARTICLE` ↓ `PROCESSING` ↓ `CLASSIFICATION` ↓ `TECHNOLOGY · 94.8%`

These should appear as subtle visual storytelling rather than large
dashboard components.

------------------------------------------------------------------------

## 10. Section Transitions

Transitions between existing sections should feel connected.

Use techniques such as: - typography moving vertically; -
opacity/fade; - scale from `0.98 → 1`; - slight blur resolving into
focus; - particles moving with the scroll; - lines changing position; -
content entering from different directions.

Avoid: - aggressive zooming; - excessive rotation; - constant
bouncing; - random animations; - animations that make text difficult to
read.

Each section should have its own visual identity while still belonging
to the same system.

------------------------------------------------------------------------

## 11. Micro-interactions

Use restrained interactions:

### Mouse

-   Background particles react subtly to pointer position.
-   Decorative elements have slight parallax.
-   Interactive buttons can have magnetic movement.
-   Cards/code blocks can have a very small 3D tilt if appropriate.

### Hover

Buttons: - subtle text movement; - underline/line reveal; - small glow.

Navigation: - opacity increases; - active red accent becomes slightly
brighter.

Do not over-animate every element.

------------------------------------------------------------------------

## 12. API / Technical Content

When an existing section contains API information, make it feel like
part of the same visual world.

Example visual:

POST `/classify`

``` json
{
  "text": "Article content..."
}
```

Then:

``` json
{
  "category": "technology",
  "confidence": 0.948
}
```

Use: - dark transparent surfaces; - thin borders; - monospace
typography; - subtle scan/highlight animation.

Avoid conventional white code-editor cards.

------------------------------------------------------------------------

## 13. Buttons

Buttons should be minimal.

Preferred style: - transparent or nearly transparent background; - thin
border; - white text; - small radius or even sharp/soft minimal
geometry; - animated border/underline on hover.

Examples: `TRY CLASSIFIER` `VIEW API` `GITHUB`

Use the project's actual actions instead of inventing buttons.

------------------------------------------------------------------------

## 14. Decorative System

Use a consistent set of decorations across the page:

-   1px lines;
-   small dots;
-   triangles;
-   tiny squares;
-   radial lines;
-   subtle grid;
-   faint noise/grain;
-   small red markers.

The decorations should feel algorithmic and technical.

Avoid decorative illustrations that have no connection to the project.

------------------------------------------------------------------------

## 15. Color System

Primary: - `#000000` - `#050505`

Text: - `#FFFFFF` - `#D4D4D4` - `#8A8A8A` - `#555555`

Accent: - restrained red, approximately `#E53935`

Borders: - white with very low opacity.

Glow: - white with very low opacity; - red only for intentional accent
moments.

Do not introduce a large multicolor palette.

------------------------------------------------------------------------

## 16. Responsive Design

Desktop is the primary reference, but the page must remain polished
on: - large desktop; - laptop; - tablet; - mobile.

On mobile: - Replace the left vertical navigator with a compact
indicator if necessary. - Keep full-screen sections only where they do
not hurt usability. - Reduce particle density. - Reduce animation
complexity. - Scale typography using `clamp()`. - Preserve the visual
hierarchy. - Never allow text to overlap important content.

------------------------------------------------------------------------

## 17. Performance

The visual quality must not come at the expense of performance.

Requirements: - Prefer CSS transforms and opacity for animation. - Avoid
unnecessary DOM animation. - Use requestAnimationFrame carefully for
custom pointer effects. - Reduce particle count on low-power/mobile
devices. - Avoid continuously running expensive WebGL effects unless
they provide real value. - Lazy-load heavy assets. - Avoid layout
thrashing. - Respect `prefers-reduced-motion`.

The page should feel smooth rather than overloaded.

------------------------------------------------------------------------

## 18. Accessibility

Maintain: - readable contrast; - keyboard navigation; - visible focus
states; - semantic headings; - accessible buttons/links; -
reduced-motion support.

Animations must never be the only way to understand content.

------------------------------------------------------------------------

## 19. Implementation Rules

Before changing the UI:

1.  Inspect the entire current frontend.
2.  Identify the framework, styling system, animation libraries,
    routing, and existing component structure.
3.  Identify every current landing-page section.
4.  Understand the purpose/content of each section.
5.  Reuse existing content and functionality whenever possible.
6.  Refactor components only when needed for the new design.
7.  Do not rewrite backend/API logic unless the frontend requires a
    small integration adjustment.
8.  Do not invent fake API results or fake project capabilities.
9.  Do not add unnecessary dependencies.
10. Keep the implementation maintainable.

### Critical rule

**Do not force the project into a predefined number of sections.**

The design system is dynamic and must adapt to whatever sections already
exist.

------------------------------------------------------------------------

## 20. Final Visual Target

The final result should feel like:

**Dark cinematic + editorial typography + experimental AI interface +
smooth scroll-driven motion.**

It should NOT feel like:

-   generic SaaS;
-   generic AI template;
-   standard Bootstrap landing page;
-   dashboard-heavy UI;
-   excessive glassmorphism;
-   colorful gradient AI website.

The visual reference should guide: - composition; - spacing; -
typography; - darkness; - navigation; - section transitions; - ambient
particles; - minimalism.

The project's own content and identity must guide: - text; - API
examples; - article classification visuals; - section content; -
actions; - branding.

The result should look like a **real creative AI product showcase**,
while remaining functional and performant.
