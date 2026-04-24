# Ready to Train?

A minimal workout tracking app built for the gym. Select your primary lift, log your sets, and pivot to a different exercise if equipment is busy — all from your phone.

Built as a single HTML file. No app store, no account, no install. Your data lives in your own Google Sheet.

---

## Features

- Pick a primary lift by muscle group, or browse all exercises at once
- See your last session stats before you start
- Log sets with weight and reps (or just reps for bodyweight exercises)
- Suggested accessories after each lift
- Add as many lifts as you need in one session
- Everything saves to your Google Sheet when you finish
- Works on any phone browser — add to home screen for a native app feel

---

## Files

- `gym-pivot.html` — the app
- `icon.png` — home screen icon (1024x1024)
- `README.md` — this file

---

## Setup

### 1. Create your Google Sheet

Create a new Google Sheet with two tabs:

**Exercises tab**

| id | name | muscle_group | type | accessories |
|---|---|---|---|---|
| 1 | Deadlift | Hamstrings | primary | 3,4,5 |
| 2 | Hip Thrusts | Hamstrings,Glutes | primary | 3,4,5 |
| 3 | Good Mornings | Hamstrings | accessory | |
| 4 | Step Ups | Hamstrings,Glutes | accessory | |
| 5 | Bulgarian Split Squats | Hamstrings,Glutes | accessory | |

- `id` — use `=ROW()-1` in cell A2 and drag down
- `muscle_group` — comma-separated if the exercise targets multiple groups
- `type` — either `primary` or `accessory` (lowercase, no spaces)
- `accessories` — comma-separated list of exercise ids that pair well with this lift

**Sessions tab**

| id | date | session_id | exercise_id | exercise_name | set_number | weight_lbs | reps |
|---|---|---|---|---|---|---|---|

Leave this empty — the app writes to it automatically when you finish a session.

---

### 2. Add the Apps Script

In your Google Sheet, go to **Extensions → Apps Script**. Delete any existing code and paste in the following:

```javascript
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'getExercises') return getExercises();
  if (action === 'getSessions') return getSessions(e.parameter.exerciseId);
  return response({ error: 'Unknown action' });
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.action === 'logSet') return logSet(data);
  return response({ error: 'Unknown action' });
}

function getExercises() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Exercises');
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const exercises = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return response(exercises);
}

function getSessions(exerciseId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sessions');
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return response([]);
  const headers = rows[0];
  let sessions = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  if (exerciseId) {
    sessions = sessions.filter(row => String(row.exercise_id) === String(exerciseId));
  }
  return response(sessions);
}

function logSet(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sessions');
  const lastRow = sheet.getLastRow();
  const newId = lastRow;
  sheet.appendRow([
    newId,
    data.date,
    data.session_id,
    data.exercise_id,
    data.exercise_name,
    data.set_number,
    data.weight_lbs,
    data.reps
  ]);
  return response({ success: true });
}

function response(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Click **Save**, then **Deploy → New deployment**. Set:
- Type → **Web app**
- Execute as → **Me**
- Who has access → **Anyone**

Click **Deploy** and copy the URL it gives you.

---

### 3. Update the app

Open `gym-pivot.html` in a text editor. Near the top of the `<script>` section, find this line:

```javascript
const API = 'https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec';
```

Replace it with your deployed Apps Script URL.

---

### 4. Host the app

Go to [app.netlify.com](https://app.netlify.com), create a free account, click **Add new site → Deploy manually**, and drag your folder (containing `gym-pivot.html` and `icon.png`) onto the drop zone. You'll get a permanent URL.

---

### 5. Add to your phone's home screen

- **iPhone**: Open the URL in **Safari** → tap the share button → **Add to Home Screen** → name it "Ready to Train?"
- **Android**: Open in Chrome → three dots → **Add to Home Screen**

It will open full screen like a native app with the dumbbell icon.

---

## Adding past sessions

You can add historical workout data directly to the Sessions tab in your Google Sheet:

- All sets from the same gym visit should share the same `session_id` (e.g. `S20260421`)
- `exercise_id` must match the id in your Exercises tab exactly
- `weight_lbs` can be left blank for bodyweight exercises
- Dates should be entered and formatted via Format → Number → Date in Google Sheets
- The app shows the most recent session per exercise based on date — make sure dates are accurate
- New rows are appended to the bottom — enter past sessions in chronological order

---

## Customizing your exercises

Edit the Exercises tab in your Google Sheet at any time — add new lifts, muscle groups, or accessory relationships. Changes appear in the app on next load. No redeployment needed.

---

## Color palette

- `#832161` — Royal Plum
- `#9b7ede` — Soft Periwinkle
- `#e8db7d` — Gold
- `#1a1a1a` — Near Black (icon background)

---

## Built with

- Vanilla HTML, CSS, JavaScript
- Google Sheets as the database
- Google Apps Script as the API
- Hosted on Netlify

---

## License

MIT — do whatever you want with it.
