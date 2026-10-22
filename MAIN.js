// ==UserScript==
// @name         YT Music Material UI3 Expressive
// @namespace    https://github.com/Google0-Dev/UI3-YT-Music/tree/main
// @version      2.0
// @description  Material 3 Expressive redesign: real shape-scale tokens, springy motion, tonal elevation, seamless progress bar, upgrade-nag/ad removal.
// @author       Google0
// @match        https://music.youtube.com/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png?_=20180523032354
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const css = `
:root {
    --md3-bg: #121212;
    --md3-surface: #1e1e1e;
    --md3-surface-2: #2a2a2a;
    --md3-accent: #ffffff;
    --md3-accent-soft: rgba(255, 255, 255, .16);
    --md3-shape-xs: 4px;
    --md3-shape-sm: 8px;
    --md3-shape-md: 12px;
    --md3-shape-lg: 16px;
    --md3-shape-lg-plus: 20px;
    --md3-shape-xl: 28px;
    --md3-shape-xl-plus: 32px;
    --md3-shape-full: 999px;
    --md3-ease-expressive: cubic-bezier(.34, 1.56, .64, 1);
    --md3-ease-standard: cubic-bezier(.2, 0, 0, 1);
    --md3-dur-short: 150ms;
    --md3-dur-medium: 280ms;
    --md3-shadow-1: 0 1px 4px rgba(0, 0, 0, .35);
    --md3-shadow-2: 0 6px 20px rgba(0, 0, 0, .4);
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: .001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .001ms !important;
        scroll-behavior: auto !important;
    }
}

body {
    background: var(--md3-bg) !important;
}

ytmusic-mealbar-promo-renderer,
ytmusic-brand-promo-renderer,
.ytp-ad-message-container,
.ytp-ad-player-overlay,
.ytp-ad-player-overlay-instream-info,
#main-advertisement-container,
.yt-mealbar-promo-renderer {
    display: none !important;
    opacity: 0 !important;
    pointer-events: none !important;
}

ytmusic-guide-entry-renderer:has(a[href*="music_premium"]),
ytmusic-guide-entry-renderer:has(a[href*="paid_memberships"]) {
    display: none !important;
}

ytmusic-guide-renderer {
    margin: 10px !important;
    border-radius: var(--md3-shape-lg-plus) !important;
    overflow: hidden !important;
    background: transparent !important;
    transform: translateZ(0);
}

ytmusic-guide-renderer #guide-wrapper,
ytmusic-guide-renderer #guide-content,
ytmusic-guide-renderer #contentContainer,
ytmusic-guide-renderer #content {
    background: rgba(30, 30, 30, .82) !important;
    backdrop-filter: blur(18px) !important;
    -webkit-backdrop-filter: blur(18px) !important;
    border-radius: var(--md3-shape-lg-plus) !important;
    overflow: hidden !important;
    height: 100% !important;
    will-change: backdrop-filter;
}

ytmusic-guide-renderer::before,
ytmusic-guide-renderer::after {
    display: none !important;
}

#guide,
#mini-guide {
    background: transparent !important;
}

#guide-wrapper {
    border: none !important;
    box-shadow: none !important;
}

tp-yt-paper-item {
    margin: 4px 8px !important;
    border-radius: var(--md3-shape-md) !important;
    transition: transform var(--md3-dur-short) var(--md3-ease-expressive),
                background var(--md3-dur-short) var(--md3-ease-standard) !important;
}

tp-yt-paper-item:hover {
    background: rgba(255, 255, 255, .08) !important;
    transform: translateX(3px);
    will-change: transform;
}

tp-yt-paper-item:focus-visible {
    outline: 2px solid var(--md3-accent);
    outline-offset: -2px; /* inset, so it isn't clipped by overflow:hidden above */
}

   pronounced in Expressive. Previously the selected row used the same
   radius as every other row; a selection should read as its own shape. */
tp-yt-paper-item[aria-current="true"] {
    background: var(--md3-accent-soft) !important;
    border-radius: var(--md3-shape-full) !important;
}

tp-yt-paper-item.iron-selected {
    background: transparent !important;
}

ytmusic-responsive-list-item-renderer,
ytmusic-two-row-item-renderer,
ytmusic-carousel-shelf-renderer {
    background: rgba(255, 255, 255, .02);
    border-radius: var(--md3-shape-md) !important;
    transition: transform var(--md3-dur-medium) var(--md3-ease-expressive),
                background var(--md3-dur-short) var(--md3-ease-standard),
                box-shadow var(--md3-dur-medium) var(--md3-ease-standard);
}

ytmusic-responsive-list-item-renderer:hover,
ytmusic-two-row-item-renderer:hover {
    background: rgba(255, 255, 255, .05);
    transform: translateY(-3px);
    box-shadow: var(--md3-shadow-1);
    will-change: transform;
}

ytmusic-app img {
    border-radius: var(--md3-shape-sm) !important;
    transition: transform var(--md3-dur-short) var(--md3-ease-expressive) !important;
}

    transform: scale(1.03);
    will-change: transform;
}

ytmusic-nav-bar {
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    background: rgba(20, 20, 20, .72) !important;
    border-bottom: 1px solid rgba(255, 255, 255, .06);
    transform: translateZ(0);
    will-change: backdrop-filter;
}

button,
tp-yt-paper-icon-button {
    border-radius: var(--md3-shape-sm) !important;
    transition: transform var(--md3-dur-short) var(--md3-ease-expressive) !important;
}

button:hover,
tp-yt-paper-icon-button:hover {
    transform: scale(1.06);
    will-change: transform;
}

button:active,
tp-yt-paper-icon-button:active {
    transform: scale(.92);
}

button:focus-visible,
tp-yt-paper-icon-button:focus-visible {
    outline: 2px solid var(--md3-accent);
    outline-offset: 2px;
}

ytmusic-player-bar {
    background: rgba(24, 24, 24, .88) !important;
    backdrop-filter: blur(24px) !important;
    -webkit-backdrop-filter: blur(24px) !important;
    border-top: 1px solid rgba(255, 255, 255, .05) !important;
    border-radius: var(--md3-shape-xl-plus) var(--md3-shape-xl-plus) 0 0 !important;
    box-shadow: var(--md3-shadow-2);
    transform: translateZ(0);
    will-change: transform, backdrop-filter;
}

ytmusic-player-bar #progress-bar,
ytmusic-player-bar tp-yt-paper-slider {
    --paper-slider-active-color: var(--md3-accent) !important;
    --paper-slider-knob-color: var(--md3-accent) !important;
    --paper-slider-container-color: rgba(255, 255, 255, .2) !important;
}

ytmusic-player-bar #primaryProgress,
ytmusic-player-bar #indeterminateProgress,
ytmusic-player-bar .slider-progress {
    background-color: var(--md3-accent) !important;
}

ytmusic-player-bar .slider-knob-inner,
ytmusic-player-bar #slider-knob-inner {
    background-color: var(--md3-accent) !important;
    transform: scale(.75);
    transition: transform var(--md3-dur-short) var(--md3-ease-expressive) !important;
}

ytmusic-player-bar tp-yt-paper-slider:hover .slider-knob-inner,
ytmusic-player-bar tp-yt-paper-slider:hover #slider-knob-inner {
    transform: scale(1.15) !important;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, .18);
    border-radius: var(--md3-shape-full);
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, .28);
}
`;

    function injectStyle() {
        const style = document.createElement('style');
        style.id = 'ytm-md3-expressive';
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    injectStyle();

    function removeUpgrade() {
        const labels = document.querySelectorAll('yt-formatted-string');
        for (let i = 0; i < labels.length; i++) {
           
            const text = labels[i].textContent.trim().toLowerCase();
            if (text.includes('upgrade')) {
                const tab = labels[i].closest('ytmusic-guide-entry-renderer, tp-yt-paper-item');
                if (tab && tab.style.display !== 'none') {
                    tab.style.display = 'none';
                }
            }
        }

        const premiumLinks = document.querySelectorAll('a[href*="music_premium"], a[href*="paid_memberships"]');
        for (let i = 0; i < premiumLinks.length; i++) {
            const tab = premiumLinks[i].closest('ytmusic-guide-entry-renderer, tp-yt-paper-item');
            if (tab && tab.style.display !== 'none') {
                tab.style.display = 'none';
            }
        }
    }

    function skipAds() {
        const skipSelectors = [
            '.ytp-ad-skip-button',
            '.ytp-ad-skip-button-modern',
            '.ytp-skip-ad-button',
            'button[aria-label^="Skip"]'
        ];

        for (let i = 0; i < skipSelectors.length; i++) {
            const btn = document.querySelector(skipSelectors[i]);
            if (btn && btn.offsetParent !== null) {
                btn.click();
                return;
            }
        }

        const video = document.querySelector('video');
        if (video && document.querySelector('.ad-showing, .ad-interrupting')) {
          
            if (isFinite(video.duration) && video.currentTime < video.duration - 0.5) {
                video.currentTime = video.duration - 0.1;
            }
        }
    }

    function sweep() {
        skipAds();
        removeUpgrade();
    }

    let lastSweep = 0;
    let sweepPending = false;
    const SWEEP_THROTTLE_MS = 400;

    function scheduleSweep() {
        const now = Date.now();
        const elapsed = now - lastSweep;
        if (elapsed >= SWEEP_THROTTLE_MS) {
            lastSweep = now;
            sweep();
        } else if (!sweepPending) {
            sweepPending = true;
            setTimeout(() => {
                sweepPending = false;
                lastSweep = Date.now();
                sweep();
            }, SWEEP_THROTTLE_MS - elapsed);
        }
    }

    function startObserving() {
        sweep();
        const observer = new MutationObserver(scheduleSweep);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        setInterval(sweep, 2000);
    }

    if (document.body) {
        startObserving();
    } else {
        document.addEventListener('DOMContentLoaded', startObserving, { once: true });
    }
})();
