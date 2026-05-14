# /public/work — case-study assets

Drop project screenshots here. Each project gets its own folder named after
the case-study `id` in `app/work/cases.ts`.

## Convention

For each project, the cover image goes at:

```
public/work/<slug>/cover.jpg
```

The page uses `<slug>/cover.jpg` as `cases[].cover`. If the file isn't there
yet, the page renders a graceful gradient + icon fallback — nothing breaks.

## Current slugs

| Slug              | Live site                             |
| ----------------- | ------------------------------------- |
| `flote`           | https://flotelab.com/                 |
| `traded`          | https://traded.co/                    |
| `zentap`          | https://www.zentap.com/               |
| `upcomingevents`  | https://www.upcomingevents.com/philadelphia |
| `gooutfitter`     | https://www.gooutfitter.com/          |
| `eventstaffing`   | https://eventstaffing.co.uk/          |
| `cancelo`         | https://cancelo.io/                   |
| `assemble`        | https://assemble.fyi/                 |

## Image specs

- **Format:** JPG (preferred) or PNG
- **Aspect:** roughly 16:10 — the slot is responsive but renders at that ratio
- **Size:** ~1600×1000 is plenty; let Next/Image optimize for delivery
- **Content:** product screenshot, hero shot, or a polished marketing image

## Optional: more screenshots per project

If a project has a `screenshots[]` array in `cases.ts`, each entry should be
a path relative to `/public`, e.g. `/work/<slug>/01.jpg`, `/work/<slug>/02.jpg`.
