# WCAG 2.2 Complete Guide

> **Current Standard**: WCAG 2.2 was published as a W3C Recommendation on **October 5, 2023**, and is the current recommended standard for web accessibility compliance.

---

## Table of Contents

1. [Overview](#1-overview)
2. [POUR Principles](#2-pour-principles)
3. [Conformance Levels](#3-conformance-levels)
4. [Principle 1: Perceivable](#4-principle-1-perceivable)
5. [Principle 2: Operable](#5-principle-2-operable)
6. [Principle 3: Understandable](#6-principle-3-understandable)
7. [Principle 4: Robust](#7-principle-4-robust)
8. [New in WCAG 2.2](#8-new-in-wcag-22)
9. [Quick Reference Checklist](#9-quick-reference-checklist)

---

## 1. Overview

### What is WCAG?

The Web Content Accessibility Guidelines (WCAG) are international standards published by the World Wide Web Consortium (W3C) that explain how to make web content accessible to people with disabilities, including:

- Visual impairments (blindness, low vision, color blindness)
- Hearing impairments (deafness, hard of hearing)
- Motor disabilities (limited fine motor control, tremors)
- Cognitive disabilities (learning disabilities, memory issues)

### Version History

| Version  | Release Date  | Success Criteria |
| -------- | ------------- | ---------------- |
| WCAG 1.0 | May 1999      | 65 checkpoints   |
| WCAG 2.0 | December 2008 | 61 criteria      |
| WCAG 2.1 | June 2018     | 78 criteria      |
| WCAG 2.2 | October 2023  | **86 criteria**  |

### Key Changes from WCAG 2.1

- **Added**: 9 new success criteria
- **Removed**: SC 4.1.1 Parsing (now obsolete)
- **Focus Areas**: Low vision, cognitive disabilities, motor disabilities, mobile accessibility

---

## 2. POUR Principles

WCAG is organized around four fundamental principles, known as **POUR**:

### Perceivable

Information and user interface components must be presentable to users in ways they can perceive. Content cannot be invisible to all of their senses.

### Operable

User interface components and navigation must be operable. The interface cannot require interaction that a user cannot perform.

### Understandable

Information and the operation of the user interface must be understandable. Content and operation cannot be beyond users' comprehension.

### Robust

Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

---

## 3. Conformance Levels

WCAG defines three levels of conformance:

| Level   | Description                                              | Criteria Count           |
| ------- | -------------------------------------------------------- | ------------------------ |
| **A**   | Minimum accessibility - removes the most severe barriers | 25 criteria              |
| **AA**  | Mid-range - addresses major barriers for most users      | 38 additional (63 total) |
| **AAA** | Highest - enhanced accessibility for specific needs      | 23 additional (86 total) |

> **Legal Standard**: Most laws and regulations (ADA, Section 508, EAA) require **Level AA** conformance.

---

## 4. Principle 1: Perceivable

_"Information and user interface components must be presentable to users in ways they can perceive."_

### Guideline 1.1: Text Alternatives

Provide text alternatives for non-text content.

| SC    | Name             | Level | Description                                                                    |
| ----- | ---------------- | ----- | ------------------------------------------------------------------------------ |
| 1.1.1 | Non-text Content | A     | All non-text content has a text alternative that serves the equivalent purpose |

### Guideline 1.2: Time-based Media

Provide alternatives for time-based media.

| SC    | Name                                                 | Level | Description                                                                                 |
| ----- | ---------------------------------------------------- | ----- | ------------------------------------------------------------------------------------------- |
| 1.2.1 | Audio-only and Video-only (Prerecorded)              | A     | Provide alternatives for prerecorded audio-only and video-only content                      |
| 1.2.2 | Captions (Prerecorded)                               | A     | Captions are provided for all prerecorded audio content in synchronized media               |
| 1.2.3 | Audio Description or Media Alternative (Prerecorded) | A     | An alternative or audio description is provided for prerecorded video                       |
| 1.2.4 | Captions (Live)                                      | AA    | Captions are provided for all live audio content in synchronized media                      |
| 1.2.5 | Audio Description (Prerecorded)                      | AA    | Audio description is provided for all prerecorded video content                             |
| 1.2.6 | Sign Language (Prerecorded)                          | AAA   | Sign language interpretation is provided for all prerecorded audio content                  |
| 1.2.7 | Extended Audio Description (Prerecorded)             | AAA   | Extended audio description is provided where pauses are insufficient                        |
| 1.2.8 | Media Alternative (Prerecorded)                      | AAA   | An alternative for time-based media is provided for all prerecorded synchronized media      |
| 1.2.9 | Audio-only (Live)                                    | AAA   | An alternative that presents equivalent information is provided for live audio-only content |

### Guideline 1.3: Adaptable

Create content that can be presented in different ways without losing meaning.

| SC    | Name                    | Level | Description                                                                                |
| ----- | ----------------------- | ----- | ------------------------------------------------------------------------------------------ |
| 1.3.1 | Info and Relationships  | A     | Information, structure, and relationships can be programmatically determined               |
| 1.3.2 | Meaningful Sequence     | A     | Correct reading sequence can be programmatically determined                                |
| 1.3.3 | Sensory Characteristics | A     | Instructions don't rely solely on sensory characteristics (shape, size, location, sound)   |
| 1.3.4 | Orientation             | AA    | Content doesn't restrict view to single display orientation unless essential               |
| 1.3.5 | Identify Input Purpose  | AA    | The purpose of input fields collecting user information can be programmatically determined |
| 1.3.6 | Identify Purpose        | AAA   | The purpose of UI components, icons, and regions can be programmatically determined        |

### Guideline 1.4: Distinguishable

Make it easier for users to see and hear content.

| SC     | Name                          | Level | Description                                                                                                                         |
| ------ | ----------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1.4.1  | Use of Color                  | A     | Color is not used as the only visual means of conveying information                                                                 |
| 1.4.2  | Audio Control                 | A     | Mechanism to pause/stop/control volume for audio playing automatically for >3 seconds                                               |
| 1.4.3  | Contrast (Minimum)            | AA    | Text has contrast ratio of at least **4.5:1** (3:1 for large text)                                                                  |
| 1.4.4  | Resize Text                   | AA    | Text can be resized up to 200% without loss of content or functionality                                                             |
| 1.4.5  | Images of Text                | AA    | Text is used instead of images of text (with exceptions)                                                                            |
| 1.4.6  | Contrast (Enhanced)           | AAA   | Text has contrast ratio of at least **7:1** (4.5:1 for large text)                                                                  |
| 1.4.7  | Low or No Background Audio    | AAA   | Prerecorded audio-only content has minimal background sounds                                                                        |
| 1.4.8  | Visual Presentation           | AAA   | For blocks of text: colors selectable, max 80 characters wide, not justified, line spacing 1.5+                                     |
| 1.4.9  | Images of Text (No Exception) | AAA   | Images of text are only used for decoration or where essential                                                                      |
| 1.4.10 | Reflow                        | AA    | Content reflows without horizontal scrolling at 320px width / 256px height                                                          |
| 1.4.11 | Non-text Contrast             | AA    | UI components and graphics have contrast ratio of at least **3:1**                                                                  |
| 1.4.12 | Text Spacing                  | AA    | No loss of content when text spacing is adjusted (line height 1.5×, paragraph spacing 2×, letter spacing 0.12×, word spacing 0.16×) |
| 1.4.13 | Content on Hover or Focus     | AA    | Additional content appearing on hover/focus is dismissible, hoverable, and persistent                                               |

---

## 5. Principle 2: Operable

_"User interface components and navigation must be operable."_

### Guideline 2.1: Keyboard Accessible

Make all functionality available from a keyboard.

| SC    | Name                    | Level | Description                                                                         |
| ----- | ----------------------- | ----- | ----------------------------------------------------------------------------------- |
| 2.1.1 | Keyboard                | A     | All functionality is operable through a keyboard interface                          |
| 2.1.2 | No Keyboard Trap        | A     | Keyboard focus can be moved away from any component                                 |
| 2.1.3 | Keyboard (No Exception) | AAA   | All functionality is operable through keyboard with no exceptions                   |
| 2.1.4 | Character Key Shortcuts | A     | Single-character key shortcuts can be turned off, remapped, or only active on focus |

### Guideline 2.2: Enough Time

Provide users enough time to read and use content.

| SC    | Name              | Level | Description                                                             |
| ----- | ----------------- | ----- | ----------------------------------------------------------------------- |
| 2.2.1 | Timing Adjustable | A     | Time limits can be turned off, adjusted, or extended                    |
| 2.2.2 | Pause, Stop, Hide | A     | Moving, blinking, scrolling content can be paused, stopped, or hidden   |
| 2.2.3 | No Timing         | AAA   | Timing is not an essential part of the activity                         |
| 2.2.4 | Interruptions     | AAA   | Interruptions can be postponed or suppressed                            |
| 2.2.5 | Re-authenticating | AAA   | User can continue activity without loss of data after re-authenticating |
| 2.2.6 | Timeouts          | AAA   | Users are warned of data loss due to inactivity timeout                 |

### Guideline 2.3: Seizures and Physical Reactions

Do not design content in a way that is known to cause seizures.

| SC    | Name                             | Level | Description                                                                 |
| ----- | -------------------------------- | ----- | --------------------------------------------------------------------------- |
| 2.3.1 | Three Flashes or Below Threshold | A     | No content flashes more than 3 times per second (or below flash thresholds) |
| 2.3.2 | Three Flashes                    | AAA   | No content flashes more than 3 times per second                             |
| 2.3.3 | Animation from Interactions      | AAA   | Motion animation triggered by interaction can be disabled                   |

### Guideline 2.4: Navigable

Provide ways to help users navigate, find content, and determine where they are.

| SC     | Name                          | Level | Description                                                                         |
| ------ | ----------------------------- | ----- | ----------------------------------------------------------------------------------- |
| 2.4.1  | Bypass Blocks                 | A     | Mechanism to bypass repeated blocks of content                                      |
| 2.4.2  | Page Titled                   | A     | Pages have titles that describe topic or purpose                                    |
| 2.4.3  | Focus Order                   | A     | Focusable components receive focus in order that preserves meaning                  |
| 2.4.4  | Link Purpose (In Context)     | A     | Purpose of each link can be determined from link text or context                    |
| 2.4.5  | Multiple Ways                 | AA    | More than one way to locate a page within a set of pages                            |
| 2.4.6  | Headings and Labels           | AA    | Headings and labels describe topic or purpose                                       |
| 2.4.7  | Focus Visible                 | AA    | Keyboard focus indicator is visible                                                 |
| 2.4.8  | Location                      | AAA   | Information about user's location within a set of pages is available                |
| 2.4.9  | Link Purpose (Link Only)      | AAA   | Purpose of each link can be identified from link text alone                         |
| 2.4.10 | Section Headings              | AAA   | Section headings are used to organize content                                       |
| 2.4.11 | Focus Not Obscured (Minimum)  | AA    | **NEW in 2.2** - Focused component is not entirely hidden by author-created content |
| 2.4.12 | Focus Not Obscured (Enhanced) | AAA   | **NEW in 2.2** - No part of focused component is hidden by author-created content   |
| 2.4.13 | Focus Appearance              | AAA   | **NEW in 2.2** - Focus indicator meets minimum area and contrast requirements       |

### Guideline 2.5: Input Modalities

Make it easier to operate functionality through various inputs beyond keyboard.

| SC    | Name                        | Level | Description                                                                             |
| ----- | --------------------------- | ----- | --------------------------------------------------------------------------------------- |
| 2.5.1 | Pointer Gestures            | A     | Multipoint or path-based gestures have single-pointer alternatives                      |
| 2.5.2 | Pointer Cancellation        | A     | Functions using single pointer can be cancelled (up-event, abort, undo, or essential)   |
| 2.5.3 | Label in Name               | A     | Accessible name contains visible label text                                             |
| 2.5.4 | Motion Actuation            | A     | Motion-operated functionality has UI alternatives and can be disabled                   |
| 2.5.5 | Target Size (Enhanced)      | AAA   | Target size is at least **44×44 CSS pixels**                                            |
| 2.5.6 | Concurrent Input Mechanisms | AAA   | Content doesn't restrict use of different input modalities                              |
| 2.5.7 | Dragging Movements          | AA    | **NEW in 2.2** - Dragging operations have single-pointer alternatives                   |
| 2.5.8 | Target Size (Minimum)       | AA    | **NEW in 2.2** - Target size is at least **24×24 CSS pixels** (with spacing exceptions) |

---

## 6. Principle 3: Understandable

_"Information and the operation of user interface must be understandable."_

### Guideline 3.1: Readable

Make text content readable and understandable.

| SC    | Name              | Level | Description                                                                                 |
| ----- | ----------------- | ----- | ------------------------------------------------------------------------------------------- |
| 3.1.1 | Language of Page  | A     | Default human language of page can be programmatically determined                           |
| 3.1.2 | Language of Parts | AA    | Language of passages/phrases can be programmatically determined                             |
| 3.1.3 | Unusual Words     | AAA   | Mechanism to identify definitions of unusual words/phrases                                  |
| 3.1.4 | Abbreviations     | AAA   | Mechanism to identify expanded form of abbreviations                                        |
| 3.1.5 | Reading Level     | AAA   | Supplemental content or simpler version available when text requires advanced reading level |
| 3.1.6 | Pronunciation     | AAA   | Mechanism to identify pronunciation of ambiguous words                                      |

### Guideline 3.2: Predictable

Make pages appear and operate in predictable ways.

| SC    | Name                      | Level | Description                                                                      |
| ----- | ------------------------- | ----- | -------------------------------------------------------------------------------- |
| 3.2.1 | On Focus                  | A     | No context change when component receives focus                                  |
| 3.2.2 | On Input                  | A     | No context change when user changes setting without prior notification           |
| 3.2.3 | Consistent Navigation     | AA    | Navigation mechanisms occurring on multiple pages are in the same relative order |
| 3.2.4 | Consistent Identification | AA    | Components with same functionality are identified consistently                   |
| 3.2.5 | Change on Request         | AAA   | Context changes are initiated only by user request                               |
| 3.2.6 | Consistent Help           | A     | **NEW in 2.2** - Help mechanisms appear in same relative order across pages      |

### Guideline 3.3: Input Assistance

Help users avoid and correct mistakes.

| SC    | Name                                      | Level | Description                                                                                 |
| ----- | ----------------------------------------- | ----- | ------------------------------------------------------------------------------------------- |
| 3.3.1 | Error Identification                      | A     | Input errors are automatically detected and described to the user                           |
| 3.3.2 | Labels or Instructions                    | A     | Labels or instructions are provided when content requires user input                        |
| 3.3.3 | Error Suggestion                          | AA    | If input error is detected, suggestions for correction are provided                         |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA    | Submissions are reversible, checked, or confirmed for legal/financial data                  |
| 3.3.5 | Help                                      | AAA   | Context-sensitive help is available                                                         |
| 3.3.6 | Error Prevention (All)                    | AAA   | Submissions are reversible, checked, or confirmed for all user input                        |
| 3.3.7 | Redundant Entry                           | A     | **NEW in 2.2** - Previously entered information is auto-populated or selectable             |
| 3.3.8 | Accessible Authentication (Minimum)       | AA    | **NEW in 2.2** - Cognitive function tests not required for authentication (with exceptions) |
| 3.3.9 | Accessible Authentication (Enhanced)      | AAA   | **NEW in 2.2** - Cognitive function tests not required (fewer exceptions)                   |

---

## 7. Principle 4: Robust

_"Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies."_

### Guideline 4.1: Compatible

Maximize compatibility with current and future user agents, including assistive technologies.

| SC        | Name              | Level | Description                                                                               |
| --------- | ----------------- | ----- | ----------------------------------------------------------------------------------------- |
| ~~4.1.1~~ | ~~Parsing~~       | -     | **REMOVED in 2.2** - Now obsolete as assistive technologies no longer directly parse HTML |
| 4.1.2     | Name, Role, Value | A     | UI components have programmatically determinable name, role, and state                    |
| 4.1.3     | Status Messages   | AA    | Status messages can be programmatically determined without receiving focus                |

---

## 8. New in WCAG 2.2

### Summary of 9 New Success Criteria

| SC     | Name                                 | Level | Primary Benefit                            |
| ------ | ------------------------------------ | ----- | ------------------------------------------ |
| 2.4.11 | Focus Not Obscured (Minimum)         | AA    | Keyboard users, low vision                 |
| 2.4.12 | Focus Not Obscured (Enhanced)        | AAA   | Keyboard users, low vision                 |
| 2.4.13 | Focus Appearance                     | AAA   | Keyboard users, low vision                 |
| 2.5.7  | Dragging Movements                   | AA    | Motor disabilities                         |
| 2.5.8  | Target Size (Minimum)                | AA    | Motor disabilities, mobile users           |
| 3.2.6  | Consistent Help                      | A     | Cognitive disabilities                     |
| 3.3.7  | Redundant Entry                      | A     | Cognitive disabilities, motor disabilities |
| 3.3.8  | Accessible Authentication (Minimum)  | AA    | Cognitive disabilities                     |
| 3.3.9  | Accessible Authentication (Enhanced) | AAA   | Cognitive disabilities                     |

### Detailed New Criteria Explanations

#### 2.4.11 Focus Not Obscured (Minimum) - Level AA

When a UI component receives keyboard focus, the component is not entirely hidden by author-created content (like sticky headers, cookie banners, or chat widgets).

```css
/* Example: Ensure focused elements are visible */
.sticky-header {
	/* Leave space for focus indicators */
	position: sticky;
	top: 0;
}

/* Add scroll margin to elements */
:target {
	scroll-margin-top: 100px;
}
```

#### 2.5.7 Dragging Movements - Level AA

Any functionality that uses dragging must have a single-pointer alternative that doesn't require dragging.

```html
<!-- Bad: Drag-only reorder -->
<ul class="sortable-list">
	<li draggable="true">Item 1</li>
</ul>

<!-- Good: Drag with button alternatives -->
<ul class="sortable-list">
	<li>
		Item 1
		<button aria-label="Move up">↑</button>
		<button aria-label="Move down">↓</button>
	</li>
</ul>
```

#### 2.5.8 Target Size (Minimum) - Level AA

Interactive targets must be at least **24×24 CSS pixels**, or have sufficient spacing from other targets.

```css
/* Ensure minimum target size */
button,
a,
input[type='checkbox'],
input[type='radio'] {
	min-width: 24px;
	min-height: 24px;
}

/* Or ensure adequate spacing */
.inline-link {
	padding: 4px; /* Creates effective target area */
}
```

#### 3.2.6 Consistent Help - Level A

Help mechanisms (contact info, chat, FAQ links) must appear in the same relative order across multiple pages.

#### 3.3.7 Redundant Entry - Level A

Information previously entered by the user should be auto-populated or available for selection.

```html
<!-- Good: Auto-populate from previous step -->
<input type="text" id="shipping-address" autocomplete="shipping street-address" value="123 Main St" />
<!-- Pre-filled from billing -->
```

#### 3.3.8 Accessible Authentication (Minimum) - Level AA

Authentication processes must not require cognitive function tests (memorizing passwords, solving puzzles, transcribing text) unless:

- An alternative method exists
- A mechanism assists completion (password manager support)
- Object recognition is used
- Personal content recognition is used

```html
<!-- Good: Allow password managers -->
<input type="password" autocomplete="current-password" name="password" />

<!-- Good: Offer alternatives -->
<button>Login with Password</button>
<button>Login with Email Link</button>
<button>Login with Passkey</button>
```

---

## 9. Quick Reference Checklist

### Level A Essentials (25 criteria)

- [ ] All images have appropriate alt text (1.1.1)
- [ ] Captions for prerecorded audio/video (1.2.1-1.2.3)
- [ ] Content structure is programmatically determinable (1.3.1-1.3.3)
- [ ] Color is not the only way to convey information (1.4.1)
- [ ] Auto-playing audio can be controlled (1.4.2)
- [ ] All functionality works with keyboard (2.1.1-2.1.2, 2.1.4)
- [ ] Time limits can be adjusted (2.2.1-2.2.2)
- [ ] No content flashes more than 3 times/second (2.3.1)
- [ ] Skip navigation link provided (2.4.1)
- [ ] Pages have descriptive titles (2.4.2)
- [ ] Focus order is logical (2.4.3)
- [ ] Link purpose is clear (2.4.4)
- [ ] Touch gestures have alternatives (2.5.1-2.5.4)
- [ ] Page language is specified (3.1.1)
- [ ] No unexpected context changes (3.2.1-3.2.2)
- [ ] Help is consistently placed (3.2.6) **NEW**
- [ ] Errors are clearly identified (3.3.1-3.3.2)
- [ ] Previously entered info is auto-filled (3.3.7) **NEW**
- [ ] UI components have accessible names/roles (4.1.2)

### Level AA Requirements (38 additional)

- [ ] Live captions provided (1.2.4-1.2.5)
- [ ] Content adapts to orientation (1.3.4-1.3.5)
- [ ] Text contrast ratio ≥ 4.5:1 (1.4.3)
- [ ] Text resizable to 200% (1.4.4)
- [ ] No images of text (1.4.5)
- [ ] Content reflows at 320px width (1.4.10)
- [ ] Non-text contrast ≥ 3:1 (1.4.11)
- [ ] Text spacing adjustable (1.4.12)
- [ ] Hover/focus content is controllable (1.4.13)
- [ ] Multiple ways to find pages (2.4.5)
- [ ] Headings/labels are descriptive (2.4.6)
- [ ] Focus indicator is visible (2.4.7)
- [ ] Focus is not obscured (2.4.11) **NEW**
- [ ] Dragging has alternatives (2.5.7) **NEW**
- [ ] Touch targets ≥ 24px (2.5.8) **NEW**
- [ ] Language of parts identified (3.1.2)
- [ ] Consistent navigation/identification (3.2.3-3.2.4)
- [ ] Error suggestions provided (3.3.3-3.3.4)
- [ ] Authentication is accessible (3.3.8) **NEW**
- [ ] Status messages announced (4.1.3)

---

## Resources

### Official W3C Resources

- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG22/quickref/)
- [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)

### Testing Tools

- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/)
- [Lighthouse (Chrome)](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

_Last Updated: January 2025_
