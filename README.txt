Owl's Opus Inventor Lab - Rowlie Design Studio Update

Updates:
- AI Sidekick renamed Rowlie.
- Sidekick replaced with Rowlie Coach Panel.
- Rowlie gives feedback based on response strength.
- Coach Me More cycles through deeper coaching questions.
- Matching sentence starters stay aligned to the current coaching question.
- Inventor Thinking Meter added.
- Rowlie's Notebook automatically collects student thinking.
- Inventor Mindset Badges added.
- Rowlie's Design Studio added with prototype canvas, testing plan, buildability check, and notebook.
- Teacher Hub includes prototype and science evidence.
- Firebase-ready code remains; paste your Firebase config into app.js to sync results across devices.

Teacher Hub password: teacher name is the password. Example: Stasny / Stasny.


v6 Update - Prototype Studio Drawing + Upload
- Prototype Canvas now supports freehand drawing with finger, Apple Pencil, or mouse.
- Students can upload a photo of a sketch or physical prototype.
- Students can save/download the prototype drawing.
- Rowlie label chips help students annotate parts, materials, science, input, output, energy, safety, and testing.
- Drawing and uploaded photo save in the browser session and are included in the student's work.


v7 Update - Navigation Menu
- Added an Inventor Lab Menu so students can jump between sections instead of only clicking Next.
- Completed sections show a checkmark and green highlight.
- Current section is highlighted purple.
- Future sections remain locked until student information and the required cards are selected.
- Students can revisit and revise earlier responses.


v7.1 Debug Fix - Navigation menu now renders under the top bar on every student screen.


v8.1 Update - Full 24-Card Inventor Hall of Fame
- Replaced Deck 3 image with the approved 24-card Invention Spotlight visual.
- Updated the app's third deck from 10 cards to all 24 inventor/invention exhibits.
- Deck 3 now functions as the Inventor Hall of Fame.
- Each card includes invention name, inventor, what it does, problem solved, science behind it, and a remix-thinking prompt.


v8.2 Update - Progressive Web App Ready
- Added manifest.json so the project can be installed to an iPad home screen.
- Added service-worker.js for basic offline caching of the core app files.
- Added app icons.
- Added install support and iPad instructions.
- This remains a web-based project that can behave like an app when added to the Home Screen.
- For a full shared classroom deployment, host this folder using Firebase Hosting and paste your Firebase config into app.js.


v8.3 Update - True Random Deck Sorting + Design Table
- Added true shuffled deck queues for all three decks.
- Each deck shuffles all cards, draws from the top, and reshuffles only when empty.
- Switch Card now avoids immediately repeating the current card.
- Added Design Table with Draw All Three, Switch Problem, Switch Power-Up, Switch Hall of Fame, and Keep This Set.
- Decks track remaining cards before reshuffle.
- This better matches the physical classroom card activity.


v8.4 Update - Inventor Wall + Rowlie AI Helper + Smarter Design Table
- Added Inventor Wall as a separate tab/button.
- Students can publish their project idea to the Inventor Wall from Summary.
- Inventor Wall displays student, period, selected cards, pitch, science, badges, and "Inspired Me" likes.
- Added "Not Feeling It" and "Deal Me a Whole New Hand" to the Design Table.
- Added inspiration meter for card combinations.
- Added Rowlie AI Helper as an interactive prompt/chat-style thinking coach.
- Rowlie can prompt for problem, user, science, originality, prototype, or stuck support.
- Smart randomization remains active: shuffled deck queues, no immediate repeats, reshuffle after deck is exhausted.


Version 9 updates: keeps the v8.4.1 look, fixes Inventor Wall navigation, uses true no-repeat deck queues for all three decks, keeps card switching before writing, adds autosave input binding, updates the PWA cache version, and adds a small v9 label.
