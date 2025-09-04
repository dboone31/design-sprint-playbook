---
title: "The Squad"
slug: "squad"
chapter_number: "Chapter 2"
subtitle: "Team roles and formations for sprint success"
layout: chapter
---

<div class="chapter-header">
    <span class="chapter-number">Chapter 2</span>
    <h2>The Squad</h2>
    <p class="chapter-subtitle">Team roles and formations for sprint success</p>
</div>

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

<div class="team-formations">
    <h4>Example Team Formations</h4>
    <div class="formation-examples">
        <div class="formation-card">
            <h5>Discovery Sprint Formation</h5>
            <p>Minimum viable team for rapid validation</p>
            <ul>
                <li>Facilitator + Decider + Designer + Researcher + 1 Technical contributor</li>
                <li><strong>Size:</strong> 5 people</li>
                <li><strong>Duration:</strong> 5 days intensive</li>
            </ul>
        </div>
        <div class="formation-card">
            <h5>MVP Sprint Formation</h5>
            <p>Full development team for market-ready solution</p>
            <ul>
                <li>All roles present with potential for multiple developers</li>
                <li><strong>Size:</strong> 6-8 people</li>
                <li><strong>Duration:</strong> 12-17 weeks</li>
            </ul>
        </div>
    </div>
</div>
