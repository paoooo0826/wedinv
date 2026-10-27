# Sam & Yan — Wedding Invitation

Recreated from the supplied Canva design DAHYRaYBQ78. This version preserves the original envelope, wax seal, love letter, floral ornaments, lanterns, lace paper, and vintage frames. The interface uses burgundy #641722, ivory #F8F4ED, antique gold #B59A69, and charcoal #302728.

## Use or deploy

The website is buildless. Open `dist/index.html`, or upload the contents of `dist/` to any static host. No installation, server, database, or API keys are required. All artwork is bundled locally. Cormorant Garamond (body, labels, and controls) and Great Vibes (wedding titles) are bundled locally with their OFL licenses; fonts load without contacting Google Fonts. The venue map requires an internet connection.

Pages: envelope cover → letter / countdown / vintage menu → details, entourage, or RSVP. Navigation supports browser Back and direct hash links. The brand and navigation share a centered axis, menu objects have matching footprints, and a centered Back to Top control appears on long pages. On mobile, layouts reflow and text stays readable. Keyboard navigation, focus styles, reduced motion, and a printable details/entourage view are included.

## Confirmed source details

- Sam & Yan; March 26, 2027.
- Invitation arrival time: 3:00 PM Philippine time.
- Ceremony: 3:30 PM, D Manor Events Center (Garden).
- Reception: 5:00 PM.
- Semi-formal attire. Guests must not wear white, burgundy, or green.
- Suggested guest shades: chocolate, dusty nude, champagne, and taupe.
- Guests are limited to those named on the invitation.
- All entourage names and assignments come from the Canva reference.

The original countdown pointed to midnight; the website counts down to the invitation's stated 3 PM arrival. The decorative schedule image in Canva used different times, so the website's schedule follows the explicit invitation text above. The calendar download uses the same date and Philippine time; no end time has been invented.

## RSVP

The original fifth Canva page is blank and contains no contact address, RSVP form, or deadline. This version displays a clear contact-details placeholder and does not collect, store, or pretend to submit responses.

To activate the RSVP button, set either `rsvpUrl` to a confirmed HTTPS response-form URL or `rsvpEmail` to the couple's confirmed email in `dist/app.js`. No other edits are needed. Do not publish a placeholder address as a real contact.

## Visual treatment

The reference's overall composition and supplied artwork are retained. Two consistent font roles substitute for the original Canva fonts. Body text and controls use Cormorant Garamond; decorative titles use Great Vibes. All key text blocks use centered alignment, shared type sizes, and an 8-pixel spacing scale. Typography, line spacing, contrast, and mobile layout are refined. Sponsor and wedding-party rows pair their content so wrapping names do not misalign adjacent roles. Existing decorative artwork is presented through CSS clipping/layout. Original Canva files were inspected without committing changes.

Artwork comes from the user's reference design; retain any usage rights associated with those original assets when distributing the site.

The letter prelude is grouped with its title inside the stationery and shares the same script font and burgundy color. Compact mobile navigation stays on one line. Internal links use forward arrows, the guest-attire phrase stays together, and below-the-fold/hidden-page images are lazy-loaded.
