# Jekyll Migration Plan: Design Sprint Playbook

## Overview
Convert the existing static HTML Design Sprint Playbook to Jekyll while maintaining 100% visual fidelity and functionality. This migration will enable better content management through Markdown files while preserving all styling, JavaScript functionality, and user experience.

## Current State Analysis
- **Static site**: Single `index.html` (1,588 lines), `style.css` (2,881 lines), `app.js` (985 lines)
- **Content**: 7 main sections with complex nested content
- **Styling**: Custom CSS design system with CSS variables, responsive design, dark mode support
- **JavaScript**: Navigation, smooth scrolling, search, filtering, interactive elements
- **Deployment**: Ready for GitHub Pages

## Migration Goals
1. ✅ **Preserve**: Exact visual appearance, all functionality, performance
2. ✅ **Improve**: Content management, maintainability, scalability
3. ✅ **Maintain**: GitHub Pages compatibility, zero-config deployment

---

## Phase 1: Jekyll Setup & Configuration

### Step 1.1: Initialize Jekyll Structure
Create the following directory structure:

```
design-sprint-playbook/
├── _config.yml
├── _layouts/
│   ├── default.html
│   ├── chapter.html
│   └── home.html
├── _includes/
│   ├── head.html
│   ├── navigation.html
│   ├── exercise-card.html
│   ├── phase-detailed.html
│   ├── mvp-phase.html
│   └── play-card.html
├── _data/
│   ├── exercises.yml
│   ├── plays.yml
│   ├── metrics.yml
│   ├── roles.yml
│   └── site.yml
├── _chapters/
│   ├── 01-game-plan.md
│   ├── 02-squad.md
│   ├── 03-discovery.md
│   ├── 04-mvp.md
│   ├── 05-ai-sprints.md
│   ├── 06-plays.md
│   └── 07-metrics.md
├── assets/
│   ├── css/
│   │   └── style.css (moved from root)
│   └── js/
│       └── app.js (moved from root)
├── index.md
└── Gemfile
```

### Step 1.2: Create `_config.yml`
```yaml
title: "Moreland Connect Playbook: From Vision to Victory"
description: "Your comprehensive guide to running world-class design sprints"
baseurl: ""
url: "https://dboone31.github.io"

# Build settings
markdown: kramdown
highlighter: rouge
permalink: pretty

# Collections
collections:
  chapters:
    output: false

# Plugins
plugins:
  - jekyll-feed

# Include/Exclude
include:
  - _pages

exclude:
  - node_modules
  - .sass-cache
  - .jekyll-cache
  - gemfiles
  - Gemfile
  - Gemfile.lock
  - README.md

# Sass
sass:
  sass_dir: _sass
  style: compressed

# Defaults
defaults:
  - scope:
      path: ""
      type: "chapters"
    values:
      layout: "chapter"
```

### Step 1.3: Create `Gemfile`
```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Windows and JRuby does not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# GitHub Pages
gem "github-pages", group: :jekyll_plugins
```

---

## Phase 2: Layout Creation

### Step 2.1: Create `_layouts/default.html`
Extract the base HTML structure from current `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    {% include head.html %}
</head>
<body>
    {% include navigation.html %}
    
    <main class="main-content">
        {{ content }}
    </main>

    <script src="{{ '/assets/js/app.js' | relative_url }}"></script>
</body>
</html>
```

### Step 2.2: Create `_layouts/home.html`
```html
---
layout: default
---

<section id="home" class="hero-section content-section">
    <div class="container">
        <div class="hero-content">
            {{ content }}
        </div>
    </div>
</section>

{% for chapter in site.chapters %}
    {% if chapter.path contains '_chapters/' %}
        <section id="{{ chapter.slug }}" class="content-section">
            <div class="container">
                {{ chapter.content }}
            </div>
        </section>
    {% endif %}
{% endfor %}
```

### Step 2.3: Create `_layouts/chapter.html`
```html
<div class="chapter-header">
    <span class="chapter-number">{{ page.chapter_number }}</span>
    <h2>{{ page.title }}</h2>
    <p class="chapter-subtitle">{{ page.subtitle }}</p>
</div>

{{ content }}
```

---

## Phase 3: Include Components

### Step 3.1: Create `_includes/head.html`
Extract from current `<head>` section:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
<link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
```

### Step 3.2: Create `_includes/navigation.html`
Extract navigation from current HTML:

```html
<nav class="main-nav" id="mainNav">
    <div class="nav-container">
        <div class="nav-brand">
            <h3>{{ site.data.site.nav_brand }}</h3>
        </div>
        <div class="nav-chapters">
            <a href="#home" class="nav-link active" data-section="home">Game Plan</a>
            <a href="#squad" class="nav-link" data-section="squad">The Squad</a>
            <a href="#discovery" class="nav-link" data-section="discovery">Discovery Sprint</a>
            <a href="#mvp" class="nav-link" data-section="mvp">Design-to-MVP</a>
            <a href="#ai" class="nav-link" data-section="ai">AI Sprints</a>
            <a href="#plays" class="nav-link" data-section="plays">Plays & Drills</a>
            <a href="#metrics" class="nav-link" data-section="metrics">Success Metrics</a>
        </div>
        <div class="nav-search">
            <input type="text" placeholder="Search playbook..." class="search-input" id="searchInput">
        </div>
    </div>
</nav>
```

### Step 3.3: Create `_includes/exercise-card.html`
```html
<div class="exercise-card">
    <h5>{{ include.title }}</h5>
    <p class="exercise-duration">{{ include.duration }}</p>
    <p>{{ include.description }}</p>
    {% if include.details %}
    <details class="exercise-details">
        <summary>View detailed instructions</summary>
        <div class="exercise-content">
            {{ include.details | markdownify }}
        </div>
    </details>
    {% endif %}
</div>
```

### Step 3.4: Create `_includes/play-card.html`
```html
<div class="play-card" data-phase="{{ include.phase }}" data-tags="{{ include.tags }}">
    <div class="play-header">
        <h4>{{ include.title }}</h4>
        <span class="play-duration">{{ include.duration }}</span>
    </div>
    <p class="sports-name">{{ include.sports_name }}</p>
    <p>{{ include.description }}</p>
    <span class="play-phase">{{ include.phase_display }}</span>
    {% if include.content %}
    <details class="play-details">
        <summary>View complete instructions</summary>
        <div class="play-content">
            {{ include.content | markdownify }}
        </div>
    </details>
    {% endif %}
</div>
```

---

## Phase 4: Data Extraction

### Step 4.1: Create `_data/site.yml`
```yaml
nav_brand: "Moreland Playbook"
hero:
  title: "Moreland Connect Playbook"
  subtitle: "From Vision to Victory"
  description: "Your comprehensive guide to running world-class design sprints. Two proven playbooks to take ideas from concept to market-ready solutions, with the depth and precision of Thoughtbot's methodology."
```

### Step 4.2: Create `_data/exercises.yml`
Extract all exercises from the HTML:

```yaml
understand:
  - title: "Problem Statement"
    duration: "30 minutes"
    description: "Frame the core problem in user-centered language with success criteria."
    details: |
      **Setup:** Whiteboard or digital canvas, sticky notes
      
      **Process:**
      1. Have each team member write their understanding of the problem (5 min)
      2. Share and cluster similar problem statements (10 min)
      3. Identify the core problem and affected user groups (10 min)
      4. Draft single problem statement with success criteria (5 min)
      
      **Output:** One-sentence problem statement with measurable success criteria

  - title: "Pitch Practice"
    duration: "20 minutes"
    description: "Each stakeholder pitches their understanding of the solution space."
    details: |
      **Setup:** Timer, presentation space
      
      **Process:**
      1. Each key stakeholder gets 3 minutes to pitch their vision
      2. Focus on: problem, user, solution hypothesis, success metrics
      3. No questions or feedback during pitches
      4. Note commonalities and differences
      
      **Scoring Criteria:** Problem clarity, user focus, solution feasibility, metric definition

# Continue for all exercises...
```

### Step 4.3: Create `_data/plays.yml`
Extract all plays from the HTML:

```yaml
- title: "Note-and-Vote"
  duration: "5 min"
  sports_name: "The Quick Huddle"
  description: "Rapid structured decision-making process for any situation requiring quick consensus."
  phase: "all"
  phase_display: "All phases"
  tags: "note vote decision making quick"
  content: |
    ## Purpose & Goals
    Make quick decisions with team input while maintaining momentum and avoiding analysis paralysis.
    
    ## Step-by-Step Process
    1. **Silent Writing (2-3 min):** Everyone writes ideas/answers silently on sticky notes
    2. **Silent Review (2-3 min):** Post notes, everyone reviews silently
    3. **Dot Voting (2-3 min):** Everyone votes with dots on preferred options
    4. **Decider's Call (1-2 min):** Decider makes final choice considering votes
    
    ## Required Materials
    - Sticky notes (different colors optional)
    - Pens for all participants
    - Dot stickers for voting
    - Wall space or large surface

# Continue for all plays...
```

### Step 4.4: Create `_data/roles.yml`
```yaml
- name: "Facilitator"
  sports_analogy: "Head Coach"
  description: "Runs the room, protects time, keeps energy and decisions flowing"
  class: "facilitator"
  responsibilities:
    - "Process enforcement and time management"
    - "Energy management and group dynamics"
    - "Decision facilitation and conflict resolution"
    - "Exercise instruction and quality control"
  engagement: "Present for all sprint activities. Critical for maintaining momentum and ensuring proper execution of methodologies."

# Continue for all roles...
```

---

## Phase 5: Content Migration

### Step 5.1: Create `index.md`
```markdown
---
layout: home
---

# {{ site.data.site.hero.title }}

**{{ site.data.site.hero.subtitle }}**

{{ site.data.site.hero.description }}

## Corrected Timeline Offerings

<div class="hero-offerings">
    <div class="offering-card prototype-path">
        <div class="offering-header">
            <h3>Discovery Sprint</h3>
            <p class="offering-subtitle">Prototype Path - True Design Sprint</p>
            <div class="timeline-badge">1-5 weeks</div>
        </div>
        <div class="offering-details">
            <p><strong>Purpose:</strong> Get to a validated, user-tested prototype</p>
            <p><strong>Focus:</strong> WHAT to build and WHY it matters</p>
            <p><strong>Outcome:</strong> User-validated interactive prototype + proceed/pivot/pause decision</p>
            <div class="timeline-detail">
                <small>Typical: 5 days intensive or 1-3 weeks distributed</small>
            </div>
        </div>
        <a href="#discovery" class="btn btn--primary">View Discovery Playbook</a>
    </div>
    
    <div class="offering-card mvp-path">
        <div class="offering-header">
            <h3>Design-to-MVP Sprint</h3>
            <p class="offering-subtitle">Full MVP Development Path</p>
            <div class="timeline-badge">12-17 weeks</div>
        </div>
        <div class="offering-details">
            <p><strong>Purpose:</strong> Develop a working, shippable MVP</p>
            <p><strong>Focus:</strong> HOW to build functionally and get to market</p>
            <p><strong>Outcome:</strong> Working MVP + Product Roadmap + Build-ready backlog + ROI model</p>
            <div class="timeline-detail">
                <small>3-4+ months: Discovery (1-5 weeks) + MVP Development (7-9 weeks) + Testing & Refinement (3-4 weeks)</small>
            </div>
        </div>
        <a href="#mvp" class="btn btn--primary">View MVP Playbook</a>
    </div>
</div>

<!-- Continue with philosophy section... -->
```

### Step 5.2: Create `_chapters/01-game-plan.md`
```markdown
---
title: "Game Plan"
slug: "home"
chapter_number: "Chapter 1"
subtitle: "Strategic framework and philosophy"
---

<!-- This content is handled in index.md for the home page -->
```

### Step 5.3: Create `_chapters/02-squad.md`
```markdown
---
title: "The Squad"
slug: "squad"
chapter_number: "Chapter 2"
subtitle: "Team roles and formations for sprint success"
---

<div class="squad-overview">
    <div class="squad-guidelines">
        <h4>Team Formation Guidelines</h4>
        <ul>
            <li><strong>Core Team Size:</strong> 5-7 contributors for optimal decision-making</li>
            <li><strong>Decision Authority:</strong> Clear Decider role prevents analysis paralysis</li>
            <li><strong>Specialist Integration:</strong> Bring in experts for specific phases as needed</li>
            <li><strong>Cross-functional Balance:</strong> Technical, business, and user perspectives represented</li>
        </ul>
    </div>
</div>

<div class="squad-grid">
    {% for role in site.data.roles %}
    <div class="role-card {{ role.class }}">
        <div class="role-header">
            <h4>{{ role.name }}</h4>
            <span class="sports-analogy">{{ role.sports_analogy }}</span>
        </div>
        <p class="role-description">{{ role.description }}</p>
        <div class="role-details">
            <h5>Key Responsibilities:</h5>
            <ul>
                {% for responsibility in role.responsibilities %}
                <li>{{ responsibility }}</li>
                {% endfor %}
            </ul>
            <h5>When to Engage:</h5>
            <p>{{ role.engagement }}</p>
        </div>
    </div>
    {% endfor %}
</div>

<!-- Continue with team formations section... -->
```

### Step 5.4: Create `_chapters/03-discovery.md`
```markdown
---
title: "Discovery Sprint Playbook"
slug: "discovery"
chapter_number: "Chapter 3"
subtitle: "Get to a validated prototype in 1-5 weeks"
---

<div class="sprint-overview">
    <div class="sprint-stats">
        <div class="stat">
            <strong>Duration:</strong> 1-5 weeks (Typical: 5 days intensive)
        </div>
        <div class="stat">
            <strong>Focus:</strong> WHAT to build and WHY it matters
        </div>
        <div class="stat">
            <strong>Outcome:</strong> User-validated interactive prototype + proceed/pivot/pause decision
        </div>
    </div>
</div>

<div class="phases-detailed">
    <!-- Phase 0: Understand -->
    <div class="phase-detailed">
        <div class="phase-header-detailed">
            <div class="phase-info">
                <span class="phase-number-large">Phase 0</span>
                <div class="phase-names">
                    <h3>Understand</h3>
                    <p class="sports-name">The Scout Report</p>
                </div>
            </div>
            <div class="phase-timing">
                <span class="duration">Day 1 / Week 1</span>
            </div>
        </div>
        
        <div class="phase-content">
            <div class="phase-description">
                <p><strong>Goal:</strong> Gather existing knowledge, expose assumptions, identify knowledge gaps</p>
                <p>This phase sets the foundation by aligning the team on the problem space, understanding constraints, and surfacing assumptions that need validation.</p>
            </div>
            
            <div class="exercises-grid">
                {% for exercise in site.data.exercises.understand %}
                {% include exercise-card.html 
                   title=exercise.title 
                   duration=exercise.duration 
                   description=exercise.description 
                   details=exercise.details %}
                {% endfor %}
            </div>
            
            <div class="phase-outputs">
                <h5>Expected Outputs</h5>
                <ul class="outputs-list">
                    <li>Clear problem statement with success criteria</li>
                    <li>Prioritized assumptions board</li>
                    <li>Initial user journey map</li>
                    <li>Scope boundaries and constraints</li>
                    <li>Team alignment on problem and approach</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Continue with other phases... -->
</div>
```

### Step 5.5: Create remaining chapter files
Continue the pattern for:
- `_chapters/04-mvp.md`
- `_chapters/05-ai-sprints.md`
- `_chapters/06-plays.md`
- `_chapters/07-metrics.md`

---

## Phase 6: Asset Migration

### Step 6.1: Move CSS
```bash
mkdir -p assets/css
mv style.css assets/css/style.css
```

### Step 6.2: Move JavaScript
```bash
mkdir -p assets/js
mv app.js assets/js/app.js
```

**Important:** Update any relative paths in CSS/JS if needed.

---

## Phase 7: Testing & Validation

### Step 7.1: Local Testing
```bash
bundle install
bundle exec jekyll serve
```

### Step 7.2: Visual Comparison Checklist
- [ ] Navigation identical
- [ ] Hero section layout matches
- [ ] All chapter sections render correctly
- [ ] Exercise cards display properly
- [ ] Play cards function correctly
- [ ] Responsive design maintained
- [ ] Dark mode support works
- [ ] JavaScript functionality preserved
- [ ] Search works
- [ ] Filtering works
- [ ] Smooth scrolling works
- [ ] All animations preserved

### Step 7.3: Content Verification
- [ ] All exercises present and formatted correctly
- [ ] All plays display with full content
- [ ] All metrics and benchmarks shown
- [ ] Role cards render properly
- [ ] All links work
- [ ] No broken includes or missing data

---

## Phase 8: Deployment Preparation

### Step 8.1: GitHub Pages Configuration
Update `_config.yml` with production settings:

```yaml
# Production settings
url: "https://dboone31.github.io"
baseurl: "/design-sprint-playbook"

# GitHub Pages specific
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Build optimization
future: false
unpublished: false
```

### Step 8.2: Create `.gitignore`
```
_site
.sass-cache
.jekyll-cache
.jekyll-metadata
vendor
node_modules
```

### Step 8.3: Final Repository Structure
```
design-sprint-playbook/
├── .gitignore
├── _config.yml
├── Gemfile
├── Gemfile.lock
├── index.md
├── _layouts/
├── _includes/
├── _data/
├── _chapters/
├── assets/
└── JEKYLL_MIGRATION_PLAN.md (this file)
```

---

## Phase 9: Deployment

### Step 9.1: Commit Changes
```bash
git add .
git commit -m "Convert to Jekyll while preserving all functionality and styling"
git push origin main
```

### Step 9.2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Save

### Step 9.3: Verify Deployment
- Site should be available at `https://dboone31.github.io/design-sprint-playbook`
- All functionality should work identically to the original

---

## Post-Migration Benefits

### For Content Editors:
1. **Easy editing**: Write in Markdown instead of HTML
2. **Modular content**: Each chapter in separate file
3. **Data-driven**: Exercises and plays in YAML files
4. **Version control**: Track changes to content easily
5. **No HTML knowledge required**: Focus on content, not formatting

### For Developers:
1. **Maintainable**: Separated concerns (content/presentation/data)
2. **Scalable**: Easy to add new chapters, exercises, plays
3. **Consistent**: Templates ensure uniform formatting
4. **Automated**: GitHub Pages builds automatically

### For Users:
1. **Identical experience**: No changes to functionality or appearance
2. **Same performance**: Jekyll generates static HTML
3. **Same URL structure**: All links continue to work

---

## Rollback Plan

If issues arise during migration:

1. **Immediate rollback**: Revert to original `index.html` structure
2. **Partial rollback**: Keep Jekyll structure but serve original files temporarily
3. **Debug approach**: Compare generated HTML with original HTML

---

## Success Criteria

Migration is complete when:

- [ ] Visual appearance is 100% identical
- [ ] All JavaScript functionality works
- [ ] All content is present and correctly formatted
- [ ] Site builds successfully on GitHub Pages
- [ ] Content can be edited via Markdown files
- [ ] No broken links or missing assets
- [ ] Performance is equivalent or better
- [ ] SEO and accessibility are maintained

---

## Notes for Implementation

### Critical Considerations:
1. **Preserve HTML structure**: Jekyll output must match current DOM structure exactly for JavaScript compatibility
2. **Maintain CSS classes**: All existing CSS selectors must continue to work
3. **Asset paths**: Update relative paths when moving files to `assets/` directory
4. **GitHub Pages limitations**: Some Jekyll plugins may not be supported
5. **Testing priority**: Visual comparison and JavaScript functionality are highest priority

### Optional Enhancements (Post-Migration):
1. Add Jekyll SEO plugin
2. Implement automated content validation
3. Add content editing guidelines
4. Create content templates for new exercises/plays
5. Add automated deployment checks

---

**Migration Complexity**: Medium
**Estimated Time**: 4-6 hours for experienced Jekyll developer
**Risk Level**: Low (preserves existing functionality)
**Rollback Time**: < 30 minutes if needed
