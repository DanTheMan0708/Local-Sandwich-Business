FRESH SANDWICHES WEBSITE
========================
Folder structure (keep it exactly like this):

  index.html            home page with the menu
  sandwich.html         the page every sandwich uses (don't copy it)
  order.html            the order page and WhatsApp button
  build-your-own.html   build-your-own page (hidden while it is switched off)
  css/style.css         colours, fonts and layout
  js/menu.js            <<< YOUR MENU AND SETTINGS. This is the file you edit.
  js/app.js             the code that makes the site work (you shouldn't need to touch it)
  images/logo-dark.png  your logo
  check.html            a checker page for you: open yourwebsite/check.html to see if anything is missing or wrong

EDITING (all in js/menu.js)
- Change a name, description, ingredients or allergens: find the sandwich in MENU and edit the text between the "quotes".
- Add a sandwich: copy a whole { ... } block, paste it after the last one (keep the comma between blocks) and change the text. Give it a new id (lowercase, hyphens, no spaces).
- Hide a sandwich (sold out or off the menu): change available: true to available: false.
- Bring back Build your own: in SETTINGS, buildYourOwn, change show: false to show: true.
- Change bread choices, delivery times, your number, the tagline, the footer text or the allergy tab: all in SETTINGS at the top.
- Automatic order emails (optional, free): get a key at web3forms.com and paste it into formKey.

Tips
- Keep every "quote", comma and bracket in place. If the site goes blank after an edit, a comma or quote is usually missing.
- On GitHub: open js/menu.js, click the pencil, edit, then Commit changes. The site updates in a minute or two.
- Never start a file path with a single slash (/css/style.css). It breaks on GitHub Pages.

IF SOMETHING DOESN'T WORK
1. Open check.html on your website. It shows missing files, old leftover files and mistakes in menu.js (green = fine, red = fix this, orange = look at this).
2. After uploading new files, GitHub can take a few minutes to update and your phone may show the old version. Wait a few minutes and refresh, or close and reopen your browser.
3. Delete old files from GitHub if you replaced them with the new folder layout (old loose style.css, app.js, logo-dark.png, chicken-mayo.html, rocket-ham-cheese.html and the sandwiches folder).
