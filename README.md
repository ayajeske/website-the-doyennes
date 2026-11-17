# The Doyennes website

Static homepage for The Doyennes (version B of the design: photo slider, parallax, signature quotes).

- `index.html`: the page
- `styles.css`: page-wide styles and responsive rules
- `main.js`: hero and quote sliders, contact form
- `images/`: photos

The "Become one of us" form saves requests in Supabase (project `the-doyennes`, table `meeting_requests`). View them in the Supabase dashboard under Table Editor.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.
