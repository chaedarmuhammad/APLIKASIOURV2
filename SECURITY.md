# Security Policy: innerHTML Usage

## Overview

This application uses `innerHTML` extensively to render Japanese text with furigana markup (`<ruby>` HTML tags). This is a deliberate design choice because:

1. **Furigana requires HTML**: Japanese text with reading aids uses `<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>` which cannot be rendered via `textContent`.
2. **Data is trusted**: All content comes from bundled static data files (`data-n5.js`, `data-n4.js`), NOT from user input or external APIs.

## Security Rules

### SAFE: Trusted data from BABS array
```javascript
// OK — data from static bundled files
el.innerHTML = bab.bunpou[0].reibun[0].jp; // Contains <ruby> tags
```

### UNSAFE: User input — MUST escape
```javascript
// MUST use escapeHtml() for user-provided strings
el.innerHTML = `Results for "${escapeHtml(userQuery)}"`;
```

### Functions Available

| Function | Use Case |
|----------|----------|
| `escapeHtml(str)` | Escape ALL user input before inserting into HTML |
| `sanitizeTrustedHtml(str)` | Extra safety layer for data that should only contain formatting HTML (strips script/iframe/event handlers) |

## Audit Summary (v2.1.0)

- **31 total `innerHTML` assignments** in app.js
- **4 cases** clear content (`.innerHTML = ''`) — safe
- **26 cases** render trusted BABS data — safe (static bundle)
- **1 case** displayed user search query — **fixed with `escapeHtml()`**

## Recommendations for Future Development

1. Always use `escapeHtml()` for any string that originates from:
   - User input (search bars, form fields)
   - URL parameters
   - Imported file content (before display)
   - External API responses

2. For trusted data (BABS), `innerHTML` is acceptable because:
   - Data is version-controlled in the repository
   - Data never changes at runtime
   - Data is loaded from same-origin scripts

3. Consider using `sanitizeTrustedHtml()` as defense-in-depth if data sources change in the future.
