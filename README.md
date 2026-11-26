# COSMIC Orbit Website

This is not an official COSMIC™ Organization from System76. This is for hosting community applications and applets for the COSMIC™ Desktop.

The site is built with [Zola](https://www.getzola.org/). Each catalog entry lives in its own
JSON file under `data/submissions/`. The [Contribute page](https://cosmic-ext-orbit.github.io/contribute/)
prepares a pull request that adds one of these files.

## Building locally

```sh
just serve
```

This regenerates the catalog before starting Zola. For a one-off build, run
`python3 scripts/sync-projects.py && zola build`.

Use a filename like `application-github-cosmic-orbit-web-apps.json`. The JSON contains its
category, project name, description, repository URL, icon URL, and developer name. Existing
projects may omit metadata they do not have. The sync script generates `data/catalog.json` from these files and fetches missing repository
creation dates where available. The generated index is ignored by Git. CI creates it before deployment.

## Network Setup

**Network Maintainer:** [@FreddyFunk](https://github.com/FreddyFunk)

<!--

**Here are some ideas to get you started:**

🙋‍♀️ A short introduction - what is your organization all about?
🌈 Contribution guidelines - how can the community get involved?
👩‍💻 Useful resources - where can the community find your docs? Is there anything else the community should know?
🍿 Fun facts - what does your team eat for breakfast?
🧙 Remember, you can do mighty things with the power of [Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
-->
