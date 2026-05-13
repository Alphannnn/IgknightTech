# Blog featured images

Drop one image per article at the path below. JPG, PNG, or WebP all work — the
filename and extension must match what's set in `app/resources/resources-data.ts`
on each article's `image` field.

Recommended specs:
- **Aspect ratio:** 16:10 or 16:9 (covers render in both contexts)
- **Resolution:** at least 1600 × 1000 px (so large cards stay sharp on
  Retina / 4K displays)
- **Format:** WebP preferred for file size, JPG fine
- **File size:** under 250 KB per image after compression (sharp.dev or
  squoosh.app both work)

| Article | Drop file at |
|---|---|
| How we estimate software projects | `public/blog/estimating-software.jpg` |
| The unreasonable effectiveness of plain SQL | `public/blog/plain-sql.jpg` |
| Why we don't write microservices anymore | `public/blog/no-microservices.jpg` |
| Why your first ML model should be embarrassingly simple | `public/blog/embarrassingly-simple-ml.jpg` |
| Migrating 4M users with zero downtime | `public/blog/migrating-4m-users.jpg` |
| Design tokens as engineering contracts | `public/blog/design-tokens-contracts.jpg` |
| Building HIPAA-compliant systems in 2025 | `public/blog/hipaa-2025.jpg` |
| The state of React Server Components in production | `public/blog/rsc-in-prod.jpg` |
| Designing for trust in fintech mobile apps | `public/blog/trust-in-fintech.jpg` |
| How we ship ML to production in 30 days | `public/blog/ml-30-days.jpg` |

Until an image is dropped at one of these paths, the article renders with the
existing generative cover — gradient + grid + big editorial letter — so missing
files never produce a broken-image icon.

To remove an image (revert to the generative cover), just delete the `image`
field from that article in `resources-data.ts`.
