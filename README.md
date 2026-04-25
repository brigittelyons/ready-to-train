# Ready to Train?

A minimal workout tracking app that lets you build your workouts on the fly. Select your primary lift, log your sets, and pivot to a different exercise if equipment is busy — all from your phone.

Built as a single HTML file. No app store, no account, no install. Your data lives in your own Supabase database.

---

## Features

- Pick a primary lift by movement pattern, or browse all exercises at once
- See your last session stats before you start
- Log sets with weight and reps (or just reps for bodyweight exercises)
- Automatically suggested accessories based on antagonist movement patterns
- Always includes a stability exercise in the suggestions
- Tip to add a second primary lift for a balanced session
- Add as many lifts as you need in one session
- Everything saves to your Supabase database when you finish
- Works on any phone browser — add to home screen for a native app feel

---

## Files

- `index.html` — the app
- `icon.png` — home screen icon (1024x1024)
- `README.md` — this file

---

## Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a free account and a new project.

---

### 2. Create your tables

In the **Table Editor**, create two tables: **Exercises** and **Sessions**.

**Exercises table**

This is where you build your own exercise library. The app is only as useful as what you put here — so take a few minutes to add the lifts you actually do.

| id | name | movement | type |
|---|---|---|---|
| 1 | Deadlift | Hinge | primary |
| 2 | Hip Thrusts | Hinge | primary |
| 3 | Good Mornings | Hinge | accessory |
| 4 | Step Ups | Squat | accessory |
| 5 | Bulgarian Split Squats | Squat | accessory |
| 6 | Farmer's Carry | Stability | accessory |

The rows above are just examples — replace them with your own lifts.

- `id` — unique number for each exercise
- `name` — whatever you call the exercise
- `movement` — used to filter exercises and generate accessory suggestions. Use: `Hinge`, `Squat`, `Push`, `Pull`, or `Stability`
- `type` — `primary` for your main lifts, `accessory` for supplemental work (lowercase, no spaces)

**How accessories work:** the app automatically suggests accessories based on antagonist movement patterns — no manual tagging needed. After a Hinge primary, it suggests Squat accessories. After a Push, it suggests Pull accessories. It always includes one Stability exercise. The more exercises you add with the right `movement` and `type`, the better the suggestions.

You can add, edit, or remove exercises at any time directly in the Supabase table editor — changes appear in the app on next load.

**Sessions table**

| id | date | session_id | exercise_id | exercise_name | set_number | weight_lbs | reps |
|---|---|---|---|---|---|---|---|

Leave this empty — the app writes to it automatically when you finish a session. Make sure the `date` column is set to type `date`.

---

### 3. Set up Row Level Security

In **Authentication → Policies**, enable RLS on both tables and add the following policies:

**Exercises table**
- SELECT — enable read access for all users

**Sessions table**
- SELECT — enable read access for all users
- INSERT — enable insert access for all users (set `with check` to `true`)

---

### 4. Enable the Data API

Go to **Settings → Integrations → Data API** and make sure both tables are exposed.

---

### 5. Get your API credentials

Go to **Settings → API** and copy:
- **Project URL** — `https://yourproject.supabase.co`
- **Publishable key** — starts with `sb_publishable_`

Open `index.html` in a text editor and find these lines near the top of the `<script>` section:

```javascript
const SUPABASE_URL = 'https://yourproject.supabase.co';
const SUPABASE_KEY = 'your-publishable-key';
```

Replace with your project URL and publishable key.

---

### 6. Host the app

Push your files to a public GitHub repository, then go to **Settings → Pages**. Set the source to **Deploy from a branch**, select `main`, and click Save. GitHub will give you a URL at `yourusername.github.io/your-repo-name` within a minute or two.

---

### 7. Add to your phone's home screen

- **iPhone**: Open the URL in **Safari** → tap the share button → **Add to Home Screen** → name it "Ready to Train?"
- **Android**: Open in Chrome → three dots → **Add to Home Screen**

It will open full screen like a native app with the dumbbell icon.

---

## Adding past sessions

You can add historical workout data directly in the Supabase Sessions table editor:

- All sets from the same gym visit should share the same `session_id` (e.g. `S20260421`)
- `exercise_id` must match the id in your Exercises table exactly
- `weight_lbs` can be left blank for bodyweight exercises
- `date` should be in `YYYY-MM-DD` format (e.g. `2026-04-21`)
- The app shows the most recent session per exercise based on date — make sure dates are accurate

---

## Customizing your exercises

Edit the Exercises table in Supabase at any time — add new lifts, change movement categories, or update types. Changes appear in the app on next load. No redeployment needed.

---

## Color palette

- `#832161` — Royal Plum
- `#9b7ede` — Soft Periwinkle
- `#e8db7d` — Gold
- `#1a1a1a` — Near Black (icon background)

---

## Built with

- Vanilla HTML, CSS, JavaScript
- Supabase as the database and API
- Hosted on GitHub Pages

---

## License

MIT — do whatever you want with it.
