# CyberShield V2.0 — Phase 1 QA checklist

Run the site over localhost or GitHub Pages (HTTPS). Confirm each item manually.

## Navigation and layout
- [ ] Every sidebar item opens its matching view.
- [ ] Dashboard cards open the correct tool.
- [ ] Mobile navigation opens and closes; Escape closes it.
- [ ] Search filters dashboard tool cards; Ctrl/Cmd + K focuses search.
- [ ] Layout remains usable at mobile, tablet and desktop widths.
- [ ] Reduced-motion preference is respected.

## Password lab
- [ ] Empty input shows the waiting state.
- [ ] Each of the five rules updates as input changes.
- [ ] Show/hide toggles the sample input.
- [ ] Generator works with each character-group combination.
- [ ] Generator refuses when no character group is selected.
- [ ] Copy action copies generated output.
- [ ] Generated passwords are not added to activity history.

## Hash studio and Base64
- [ ] SHA-256 output is 64 hexadecimal characters.
- [ ] SHA-384 output is 96 hexadecimal characters.
- [ ] SHA-512 output is 128 hexadecimal characters.
- [ ] Unicode text hashes without an encoding error.
- [ ] Base64 round-trips plain text, emoji and non-Latin text.
- [ ] Invalid Base64 and invalid UTF-8 produce a useful error.

## Validators
- [ ] IPv4 accepts 127.0.0.1 and rejects 256.1.1.1.
- [ ] IPv6 accepts 2001:db8::1 and ::1.
- [ ] IPv6 rejects multiple compression markers and malformed groups.
- [ ] URL inspector handles https://example.com/path.
- [ ] URL inspector flags HTTP and user-info when present.
- [ ] URL inspector does not claim that a URL is safe.

## Encryption lab
- [ ] Encrypting the same message twice produces different packages.
- [ ] Correct passphrase decrypts the generated package.
- [ ] Wrong passphrase fails authentication.
- [ ] Modified ciphertext fails authentication.
- [ ] Invalid package JSON is rejected without crashing.
- [ ] Passphrase and message are not added to activity history.

## Activity log
- [ ] Tool operations appear in the local log.
- [ ] History is limited to 50 entries.
- [ ] Export downloads JSON.
- [ ] Clear removes local activity.
- [ ] Malformed LocalStorage data does not prevent startup.

## Release checks
- [ ] Browser console has no uncaught errors.
- [ ] All referenced asset paths resolve.
- [ ] GitHub Pages loads the site over HTTPS.
