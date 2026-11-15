# 🛡️ CyberShield — Shield Sphere

<div align="center">

![CyberShield](https://img.shields.io/badge/CYBERSHIELD-SHIELD_SPHERE-FF6B00?style=for-the-badge&labelColor=080B12)
![Version](https://img.shields.io/badge/VERSION-2.0.0-FF9E44?style=for-the-badge&labelColor=080B12)
![Stack](https://img.shields.io/badge/STACK-VANILLA_JS-F7DF1E?style=for-the-badge&labelColor=080B12)

### Think secure. Build smarter.

A browser-based cybersecurity learning and defensive utility workspace built with HTML, CSS and JavaScript.

[Live Demo](https://arjunsharma-55.github.io/CyberShield/) · [Repository](https://github.com/ArjunSharma-55/CyberShield)

</div>

---

## About

CyberShield — Shield Sphere is an educational project for exploring digital safety concepts through practical browser-based utilities. Version 2.0 keeps the original identity while improving the interface, reliability and cryptographic demonstrations.

## Phase 1 modules

| Module | Functionality |
|---|---|
| Password lab | Basic rule coverage and cryptographically random password generation |
| Hash studio | SHA-256, SHA-384 and SHA-512 text digests |
| Base64 utility | UTF-8-safe encoding and decoding |
| IP validator | Local IPv4 and IPv6 syntax validation |
| URL inspector | URL component parsing and basic review indicators |
| Encryption lab | Password-derived AES-256-GCM encryption/decryption demo |
| Activity log | Browser-local history, JSON export and clear controls |

## Technology

- HTML5 and CSS3
- Vanilla JavaScript (no framework or build step)
- Web Crypto API for hashing, random values and AES-GCM
- LocalStorage for a small, local activity log
- GitHub Pages for static hosting

## Run locally

1. Clone the repository.
2. Open the project folder.
3. Start a local static server, or open the HTML entry point in a browser.
4. Use HTTPS or localhost for Web Crypto features. Some browser cryptography APIs are restricted to secure contexts.

## Project structure

    CyberShield/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## Roadmap

- [x] Phase 1 — refreshed dashboard, responsive interface and core utility improvements
- [ ] Phase 2 — expanded defensive utilities and usability improvements
- [ ] Phase 3 — verified URL reputation, website configuration checks and CVE data explorer
- [ ] Phase 4 — threat-awareness feed and interactive cyber learning academy
- [ ] Phase 5 — optional AI explanations, reports, automated tests and release hardening

## Accuracy and privacy notes

- Password analysis is a basic rule-coverage demonstration, not a definitive strength verdict or breach check.
- Hashing is one-way; it is not encryption.
- Base64 is encoding, not encryption.
- IP validation checks syntax only. It does not contact or scan a host.
- URL inspection parses the supplied string locally. It does not visit the URL, follow redirects or query a reputation provider. No warning indicators is not a safety verdict.
- The encryption lab demonstrates Web Crypto AES-GCM with PBKDF2-derived keys. It is an educational implementation, not a reviewed production key-management solution.
- Activity history is stored in this browser's LocalStorage. Do not use a shared browser for sensitive work.
- No API key or secret should be embedded in this static frontend.

Use these tools only for systems and data you own or are authorized to assess. Never rely on this project alone to make security decisions.

## Developer

**Arjun Sharma** · [GitHub](https://github.com/ArjunSharma-55)

---

<div align="center">

**CYBERSHIELD — SHIELD SPHERE**  
*Understand digital risks. Learn defensive security. Build responsibly.*

</div>