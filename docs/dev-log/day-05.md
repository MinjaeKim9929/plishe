# Day 5 - Frontend Pattern Library & UI Components

**Date**: January 18, 2026

---

## Summary

Started frontend development by creating a Pattern Library page to establish visual consistency. Built core UI components (Button, Input) with full accessibility support and dark/light mode compatibility. Designed a unique LP vinyl-inspired component for playlist display, giving Plishe a distinctive visual identity.

---

## Completed Tasks

### 1. Pattern Library Setup

#### `app/pattern-library/page.tsx`
- [x] Created pattern library page structure
- [x] Dark/Light theme toggle for testing both modes
- [x] ComponentCard wrapper for section organization
- [x] Subsection component for consistent layout
- [x] Table layout for variant × size comparison
- [x] Sticky header with theme controls

### 2. Button Component

#### `components/common/Button.tsx`
- [x] 5 variants: primary, secondary, ghost, danger, link
- [x] 4 sizes: sm, md, lg, xl
- [x] 3D press effect with box-shadow
- [x] Loading state with spinner
- [x] Disabled state handling
- [x] Full width option
- [x] Keyboard accessible with focus ring
- [x] Light/dark mode compatible

### 3. Input Component

#### `components/common/Input.tsx`
- [x] 2 variants: default (outline), filled
- [x] 3 sizes: sm, md, lg
- [x] Label with required asterisk (*)
- [x] Error state with red border and message
- [x] Helper text support
- [x] Left/right icon slots
- [x] Loading spinner state
- [x] Clearable with X button
- [x] Character count display
- [x] Full WCAG accessibility (aria-invalid, aria-describedby, etc.)

**Problem Solved**: Clearable input not working for uncontrolled inputs

**Solution**: Use internal ref with `useImperativeHandle` pattern:
```tsx
const internalRef = useRef<HTMLInputElement>(null);
useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);
```
This ensures the clear button works regardless of whether parent passes a ref.

### 4. Vinyl Component

#### `components/common/Vinyl.tsx`
- [x] LP record visual design with radial gradient grooves
- [x] 5 sizes: xs, sm, md, lg, xl
- [x] 6 color variants: black, red, blue, orange, purple, gold
- [x] Center label with cover art or fallback initial
- [x] Realistic groove pattern (varying density)
- [x] Dead wax/run-out area
- [x] Outer rim with shadow
- [x] Multi-layer shine/reflection effect
- [x] Spindle hole detail
- [x] Spin animation when playing (3s rotation)
- [x] Play/pause button overlay on hover
- [x] Hover lift effect

### 5. Theme System Updates

#### `app/globals.css`
- [x] Added `--color-border-strong` token for both modes
- [x] Added `.light-theme` and `.dark-theme` override classes
- [x] Added `animate-spin-slow` keyframes (3s rotation)
- [x] Fixed text-muted visibility (changed to #8a8a8a)

#### `next.config.ts`
- [x] Added remote image patterns for picsum.photos and i.pravatar.cc

---

## Component API Reference

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'link'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interactions |
| `fullWidth` | `boolean` | `false` | Full container width |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'filled'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input height |
| `label` | `string` | — | Field label |
| `error` | `string` | — | Error message |
| `helperText` | `string` | — | Helper text |
| `leftIcon` | `ReactNode` | — | Left icon slot |
| `rightIcon` | `ReactNode` | — | Right icon slot |
| `loading` | `boolean` | `false` | Show spinner |
| `clearable` | `boolean` | `false` | Show clear button |
| `showCharacterCount` | `boolean` | `false` | Show count with maxLength |
| `onClear` | `() => void` | — | Clear button callback |

### Vinyl

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Vinyl dimensions |
| `color` | `'black' \| 'red' \| 'blue' \| 'orange' \| 'purple' \| 'gold'` | `'black'` | Vinyl color |
| `coverUrl` | `string` | — | Center label image |
| `coverAlt` | `string` | `'Cover'` | Image alt text |
| `fallbackText` | `string` | — | Text for initial fallback |
| `isSpinning` | `boolean` | `false` | Enable spin animation |
| `showPlayButton` | `boolean` | `false` | Show play on hover |
| `isPlaying` | `boolean` | `false` | Show pause icon |
| `onPlay` | `() => void` | — | Play button callback |

---

## File Structure After Day 5

```
frontend/web/
├── app/
│   ├── globals.css              # Theme tokens, animations
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── pattern-library/
│       └── page.tsx             # Pattern library (new)
├── components/
│   ├── common/
│   │   ├── Button.tsx           # (new)
│   │   ├── Input.tsx            # (new)
│   │   └── Vinyl.tsx            # (new)
│   └── features/
│       └── playlist/            # (ready for PlaylistCard)
├── lib/
│   └── supabase.ts
└── next.config.ts               # Added image remotePatterns
```

---

## Design Decisions

### 1. 3D Button Style
Chose raised button with box-shadow "3D" effect to match Plishe's playful, music-focused brand. Provides tactile feedback on press.

### 2. Outline vs Filled Inputs
- **Default (outline)**: Transparent background, visible border - for general use
- **Filled**: Solid background, no border - for dark surfaces or emphasis

### 3. LP Vinyl Concept
Unique visual identity for playlist display. Vinyl record metaphor connects to music heritage while being visually distinctive. Color variants allow personalization.

---

## Problem-Solving Pattern Documented

### Internal Ref with ForwardRef

**Problem**: Component using `forwardRef` needs internal DOM access, but forwarded ref may not be passed.

**Solution**:
```tsx
const internalRef = useRef<HTMLInputElement>(null);
useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);
// Use internalRef for internal operations (always available)
```

**When to use**: Clearable inputs, auto-focus, scroll-to-element, any internal DOM manipulation.

---

## Current Project Status

**Phase**: Week 2 - Frontend Development (In Progress)

### Milestone Progress:
- [x] Backend API complete (Day 4)
- [x] Pattern Library setup
- [x] Button component
- [x] Input component
- [x] Vinyl component
- [ ] Avatar component
- [ ] Badge component
- [ ] Card component
- [ ] PlaylistCard (using Vinyl)

---

## Next Steps

1. Complete remaining Tier 1 components (Avatar, Badge, Card)
2. Build PlaylistCard using Vinyl component
3. Create layout components (Navbar, Sidebar)
4. Implement SWR API client
5. Build playlist listing page

---

## Notes

- All components support both light and dark mode
- Using Tailwind CSS v4 with CSS-based theme configuration
- Pattern library serves as living documentation
- Components follow WCAG accessibility guidelines
- Vinyl component creates unique visual identity for Plishe
