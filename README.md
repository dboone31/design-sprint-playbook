# Moreland Connect Playbook: From Vision to Victory

A comprehensive guide to running world-class design sprints, converted from a static HTML site to Jekyll for better maintainability and GitHub Pages deployment.

## Overview

This repository contains the **Moreland Connect Playbook**, a professional design sprint methodology guide that includes:

- **Discovery Sprint Playbook** - Get to a validated prototype in 1-5 weeks
- **Design-to-MVP Sprint** - Develop a working, shippable MVP in 12-17 weeks
- **Team formations and roles** for sprint success
- **AI-focused sprint methodologies**
- **Comprehensive plays & drills library**
- **Success metrics and KPIs**

## Technology Stack

- **Jekyll** - Static site generator
- **Liquid** - Templating language
- **Markdown** - Content format
- **YAML** - Data structure for exercises, roles, metrics
- **HTML/CSS/JavaScript** - Frontend styling and interactivity
- **GitHub Pages** - Deployment platform

## Local Development Setup

### Prerequisites

- **Ruby** (version 2.7 or higher)
- **Bundler** gem
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/design-sprint-playbook.git
   cd design-sprint-playbook
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

### Running Locally

1. **Start the Jekyll development server:**
   ```bash
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:4000
   ```

3. **The site will auto-regenerate when you make changes to files.**

### Alternative Development Commands

- **Build only (no server):**
  ```bash
  bundle exec jekyll build
  ```

- **Build and serve with incremental builds:**
  ```bash
  bundle exec jekyll serve --incremental
  ```

- **Build for production (GitHub Pages):**
  ```bash
  JEKYLL_ENV=production bundle exec jekyll build
  ```

## File Structure

```
design-sprint-playbook/
├── _chapters/                 # Individual chapter content
│   ├── 02-squad.md           # Team roles and formations
│   ├── 03-discovery.md       # Discovery sprint methodology
│   ├── 04-mvp.md            # MVP development process
│   ├── 05-ai-sprints.md     # AI-focused methodologies
│   ├── 06-plays.md          # Plays & drills library
│   └── 07-metrics.md        # Success metrics and KPIs
├── _data/                    # Structured data files
│   ├── exercises.yml        # Sprint exercises by phase
│   ├── plays.yml            # Individual plays and drills
│   ├── roles.yml            # Team roles and responsibilities
│   ├── metrics.yml          # Success metrics definitions
│   └── site.yml             # Global site configuration
├── _includes/               # Reusable template components
│   ├── head.html           # HTML head section
│   ├── navigation.html     # Main navigation bar
│   ├── exercise-card.html  # Exercise card template
│   └── play-card.html      # Play card template
├── _layouts/               # Page layout templates
│   ├── default.html       # Base layout
│   ├── home.html          # Home page layout
│   └── chapter.html       # Chapter page layout
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── app.js         # Interactive functionality
├── _config.yml            # Jekyll configuration
├── Gemfile                # Ruby dependencies
├── index.md               # Home page content
└── README.md              # This file
```

## Content Management

### Adding New Exercises

1. Edit `_data/exercises.yml`
2. Add your exercise under the appropriate phase (understand, ideation, converge, prototype, test)
3. Include: title, duration, description, and detailed instructions

### Adding New Plays

1. Edit `_data/plays.yml`
2. Include: title, duration, sports_name, description, phase, tags, and content

### Adding New Roles

1. Edit `_data/roles.yml`
2. Include: name, sports_analogy, description, class, responsibilities, and engagement

### Modifying Chapter Content

1. Edit the appropriate file in `_chapters/`
2. Use Markdown for content formatting
3. Include proper front matter with title, slug, chapter_number, and subtitle

## Styling and Design

- **Main CSS:** `assets/css/style.css`
- **JavaScript:** `assets/js/app.js`
- **Responsive design** with mobile-first approach
- **Professional color scheme** with teal accents
- **Card-based layouts** for easy scanning
- **Interactive elements** including collapsible details and search

## Deployment

### GitHub Pages (Automatic)

1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy
3. Site will be available at: `https://yourusername.github.io/design-sprint-playbook`

### Manual Deployment

1. Build the site locally:
   ```bash
   JEKYLL_ENV=production bundle exec jekyll build
   ```

2. Deploy the `_site` folder to your hosting platform

## Troubleshooting

### Common Issues

**Jekyll server won't start:**
- Ensure Ruby version is 2.7+
- Run `bundle install` to update dependencies
- Check for port conflicts (default: 4000)

**Styling not loading:**
- Hard refresh browser (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)
- Check that `assets/css/style.css` exists
- Verify Jekyll is serving assets correctly

**Content not updating:**
- Check file syntax (YAML front matter, Markdown formatting)
- Restart Jekyll server if auto-regeneration fails
- Verify file paths are correct

### Debug Mode

Run Jekyll with verbose output:
```bash
bundle exec jekyll serve --verbose
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally with `bundle exec jekyll serve`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Original Design

This Jekyll site maintains 100% visual fidelity with the original static HTML design while adding:
- Better content management through Markdown
- Structured data in YAML files
- Modular template components
- Easy deployment via GitHub Pages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions about the design sprint methodology or this implementation, please open an issue in this repository.
