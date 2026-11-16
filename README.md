# Delight Healing Studio

Static site (no build step). Deploy on Vercel.

## Setup
1. Edit the settings at the top of `script.js`: your UPI ID, WhatsApp community link, and a free access key from https://web3forms.com (registrations are emailed to you).
2. Test locally: open `index.html`, or run `npx serve`.
3. Deploy: push to GitHub, import the repo in Vercel (framework "Other", no build command), then add your domain.

## Payment flow
Visitor scans the UPI QR, pays, enters the UTR/reference ID with their details, and is redirected to `thank-you.html`.
You receive an email per registration; match the UTR against your bank/UPI app, then confirm on WhatsApp.

## Later
Swap the QR block for a Cashfree/Instamojo payment link and set its redirect URL to `/thank-you.html`.
Add the Meta Pixel to `index.html` and fire `Lead` on `thank-you.html`.
