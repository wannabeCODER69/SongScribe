# Premium Polish Plan (No UI redesign)

## Information gathered
- Layout uses Tailwind utility classes; components are primarily:
  - `frontend/src/components/DashboardCard.jsx` (shared card styling + shadow)
  - `frontend/src/components/StudioWorkspace.jsx` (Upload card, Song Information card, Transcript card, export buttons)
  - `frontend/src/components/SongInfoPanel.jsx`, `UploadPanel.jsx`, `TranscriptPanel.jsx` (standalone page cards, but main UI appears driven by `StudioWorkspace.jsx`)
- Current polish issues match existing repo TODO:
  - Song Information card proportions/typography/badge placement
  - Upload card spacing and height
  - Transcript readability (line-height + padding + scroll region)
  - Shadow intensity reduction and card/button radius consistency

## Plan (file-by-file)

### 1) `frontend/src/components/DashboardCard.jsx`
- Reduce shadow intensity slightly (lower the outer shadow alpha / spread).
- Keep inset highlight unchanged.
- Standardize base card radius if needed (keep current rounded-[24px] to avoid layout shift; only if reference requires smaller consistent radius across app).

### 2) `frontend/src/components/StudioWorkspace.jsx`
- **Song Information card** (keep structure, just adjust spacing/typography):
  - Artwork: adjust size to ~118px and internal corner radius to match reference.
  - Align artwork/text to top: remove any implicit vertical centering via `items-center` -> `items-start` on relevant wrapper(s) without reflowing sections.
  - Increase artwork/text gap to 24px.
  - Reduce title/artist/album/year font sizes slightly (e.g., 20->18, 15->14, 14->13) while preserving hierarchy.
  - Move “Match Found” badge: add/adjust top margin so badge sits below metadata by ~16px.
  - Place “AcoustID Confidence” below badge.
  - Add a bit more vertical breathing room using small `mt-*` adjustments.

- **Upload card**:
  - Reduce card height by ~12px (106px target) by adjusting `h-[106px]` and/or vertical paddings to tighten.
  - Nudge content upward ~10px by reducing top padding/margins (`pt-1`, icon margin `mb-3`, and overall button inner spacing) without moving the button position in the grid.
  - Increase spacing between icon/title/subtitle/button with small margin changes.
  - Ensure upload button remains centered (keep grid `place-items-center` on the outer card button; adjust inner spans only).

- **Transcript card**:
  - Keep only transcript scrollable: ensure transcript scroll container is the only element with `overflow-y-auto` (already true) and avoid adding overflow elsewhere.
  - Improve readability: set transcript container line-height to 1.6 (via `leading-[1.6]`), increase padding by ~16px (increase padding on the scroll box), add ~2px padding inside (adjust from `p-[20px]` to slightly larger e.g. `p-[22px]` or `px/py` tweaks).
  - Refine segment box padding/radius slightly for consistent proportions.

- **Card radii / button sizes**:
  - Ensure export buttons already at 48px; if any other buttons in this file deviate, normalize to consistent `h-12` equivalents and radii `rounded-[14px]`/`rounded-[15px]`.
  - Slightly reduce shadows on upload/Song/Transcript cards if they currently use heavy `shadow-[...]`.

### 3) `frontend/src/components/SongInfoPanel.jsx`, `UploadPanel.jsx`, `TranscriptPanel.jsx`
- Only apply minimal typography/spacing/shadow/radius tweaks if these components are used anywhere besides `StudioWorkspace.jsx`.
- If unused in current Home route, keep changes minimal to avoid unintended differences.

### 4) `frontend/src/index.css` (if needed)
- No functional change; only if transcript scrollbar/readability benefits from minor tweak.

## Dependent files to be edited
- `frontend/src/components/DashboardCard.jsx`
- `frontend/src/components/StudioWorkspace.jsx`
- (Optional) `frontend/src/components/SongInfoPanel.jsx`
- (Optional) `frontend/src/components/UploadPanel.jsx`
- (Optional) `frontend/src/components/TranscriptPanel.jsx`

## Followup steps
- Run frontend build/format to verify Tailwind classes compile.
- Visual sanity check in browser.

<ask_followup_question>
Confirm approval to proceed with the polish changes exactly as described (no layout/component movement, only spacing/typography/shadow/radius/button-size tweaks). Also confirm whether the “reference” styling is based on `StudioWorkspace.jsx` (current Home view) so we prioritize changes there.
</ask_followup_question>

