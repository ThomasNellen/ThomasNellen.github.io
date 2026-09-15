# Personal research homepage

A static site. No build step, no framework, no dependencies. Open the HTML
files in a browser and they work.

```
index.html      Landing page: name, short bio, contact, updates feed
work-in-progress.html   Projects under revision or drafting
published.html          Refereed articles, book chapters, thesis
working-papers.html     Every working paper, published version or not
writings.html   Shorter pieces for a general audience
assets/site.css All styling, including the light and dark palettes
assets/site.js  The topic filter on the papers page
cv.html         Curriculum vitae, the source for the PDF
assets/cv.css   CV layout, including the print rules
assets/cv.pdf   Generated from cv.html, do not edit by hand
assets/build-cv.sh  Rerenders the PDF after you edit cv.html
```

## Editing

Anything in `[square brackets]` is a placeholder. Search for `[` to find
them all.

The three research pages share one layout. To add a paper, copy an
`<article class="paper">` block on the relevant page and edit it. Its `data-topics` attribute lists the topics it belongs to;
those words must match the `data-topic` attribute on a filter button at
the top of the same file. Adding a new topic means adding a button and
using its word in the papers that belong to it.

Topics are shared across all three pages, so a paper listed as both a
working paper and a published article should carry the same tags in both
places.

Each paper carries a `<details class="cite">` block holding its BibTeX
entry. Edit the text inside `<pre class="bibtex">` directly. Keep it
flush against the left margin, because `<pre>` preserves every space.
Use `@article` for published work, `@techreport` for a working paper in
a numbered series and `@unpublished` for work in progress. The citation
key convention is surname, year, short slug, as in `nellen2026working`.

To add an update or a writing, copy one `<article class="update">` block
in `index.html` or one `<article class="writing">` block in
`writings.html`. Newest goes first.

## The CV

`cv.html` is the source. Edit it, then run:

```bash
./assets/build-cv.sh
```

That drives headless Chrome over the page and writes `assets/cv.pdf`.
Page size, margins and the print type scale live in the `@media print`
block at the bottom of `assets/cv.css`. Watch the page count after
editing, since a single extra line can push a fourth page.

The detailed source CV in `ressources/` is deliberately excluded from git
by `.gitignore`. It carries a private address and phone numbers, and this
repository is public.

## Machine-readable research

New papers added from here on get the treatment proposed in Paul
Goldsmith-Pinkham and Kyle Jensen's post on LLM-friendly academic papers
(paulgp.com, March 2026). Existing work is not being converted
retroactively.

At minimum that means an `llms.txt` beside the PDF: a short author-written
orientation covering what the paper shows, what it does not show, the data
and methods, the key results, the limitations and scope, a navigation
guide, and the publication status. The limitations section is the one that
matters and the one no model can write for you. Name the populations,
periods and conditions the result does not cover.

Where the LaTeX source and a reproduction package exist, the fuller form is
a zip bundle holding `paper.md`, `figures/`, `data/` as CSV rather than
images of tables, `code/` with a single `reproduce.sh` and pinned
dependencies, and `references.bib`.

## Previewing locally

```bash
cd ~/Documents/Homepage && python3 -m http.server 4173
```

Then open http://localhost:4173 in a browser. Stop it with Ctrl-C.

## Colors and type

Every color is a CSS custom property declared at the top of
`assets/site.css`. The light palette is in `:root`; the two blocks after
it redefine the same names for dark mode. Change a value once and it
applies everywhere.

The typefaces are Newsreader for headings, Public Sans for body text and
JetBrains Mono for dates, labels and the topic filter. They load from
Google Fonts via the `<link>` tag in each page's `<head>`.

## Publishing

Any static host works. Three that are free and need no credit card:

**GitHub Pages.** Create an empty repository on github.com, then:

```bash
git remote add origin https://github.com/USERNAME/REPO.git && git push -u origin main
```

In the repository's Settings, under Pages, set the source to the `main`
branch and the root folder. The site appears at
`https://USERNAME.github.io/REPO/` within a minute or two. For a
repository named `USERNAME.github.io` it appears at the bare domain.

**Cloudflare Pages** and **Netlify** both let you connect the same
repository and deploy on every push, with a free subdomain and a free
TLS certificate.

## Custom domain

Buy the domain from a registrar, then point it at the host. On GitHub
Pages that means adding a file named `CNAME` at the top of the repository
containing only your domain, and creating the DNS records GitHub's Pages
settings page tells you to create. The other two hosts walk you through
it in their dashboards.
