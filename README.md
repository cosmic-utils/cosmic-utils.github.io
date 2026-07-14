# COSMIC Utils Website

This is not an official COSMIC™ Organization from System76. This is for hosting community applications and applets for the COSMIC™ Desktop.

The site is built with [Zola](https://www.getzola.org/) and showcases every application, applet, theme,
service and script listed in [cosmic-utils/cosmic-project-collection](https://github.com/cosmic-utils/cosmic-project-collection).
Nothing about the project list is maintained by hand here — to add a project, open a PR against that
repository instead.

## Building locally

```sh
python3 ./scripts/sync-projects.py ./data   # fetch and convert the latest project data
zola serve                                  # or `zola build` for a one-off build
```

`scripts/sync-projects.py` downloads the RON files from cosmic-project-collection and converts them
into JSON under `data/`, which Zola's templates read via `load_data`. The `data/*.json` files are
also committed as a last-known-good fallback so the site still builds if the fetch fails; CI
refreshes them on every deploy.

## Network Setup

The COSMIC Utils website is accessible via multiple domains:

| Domain | Purpose |
|--------|---------|
| [cosmic-utils.org](https://cosmic-utils.org) | Primary domain (proxies to GitHub Pages) |
| [cosmic-utilities.org](https://cosmic-utilities.org) | Redirects to cosmic-utils.org |
| [cosmic-utils.github.io](https://cosmic-utils.github.io) | GitHub Pages (upstream) |

All domains support HTTPS with automatic certificate management. The `www` subdomains redirect to their non-www counterparts.

**Network Maintainer:** [@FreddyFunk](https://github.com/FreddyFunk)

<!--

**Here are some ideas to get you started:**

🙋‍♀️ A short introduction - what is your organization all about?
🌈 Contribution guidelines - how can the community get involved?
👩‍💻 Useful resources - where can the community find your docs? Is there anything else the community should know?
🍿 Fun facts - what does your team eat for breakfast?
🧙 Remember, you can do mighty things with the power of [Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
-->
