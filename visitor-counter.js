// Visitor Counter Script
(function() {
    'use strict';

    // Initialize visitor count on page load
    document.addEventListener('DOMContentLoaded', function() {
        initializeVisitorCounter();
    });

    function initializeVisitorCounter() {
        const counterDisplay = document.getElementById('visitor-count');
        
        if (!counterDisplay) {
            console.error('Visitor counter element not found');
            return;
        }

        // Get current count from localStorage
        let visitorCount = localStorage.getItem('visitorCount');
        
        // Check if this is a new visit (using sessionStorage)
        const hasVisitedThisSession = sessionStorage.getItem('hasVisited');
        
        if (!hasVisitedThisSession) {
            // New visit - increment the counter
            if (visitorCount === null) {
                visitorCount = 1;
            } else {
                visitorCount = parseInt(visitorCount) + 1;
            }
            
            // Save updated count
            localStorage.setItem('visitorCount', visitorCount);
            
            // Mark this session as visited
            sessionStorage.setItem('hasVisited', 'true');
        } else {
            // Returning in same session - just get existing count
            visitorCount = visitorCount || 0;
        }

        // Animate the counter
        animateCounter(counterDisplay, parseInt(visitorCount));
    }

    function animateCounter(element, targetCount) {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = targetCount / steps;
        let currentCount = 0;

        const timer = setInterval(function() {
            currentCount += increment;
            
            if (currentCount >= targetCount) {
                element.textContent = formatNumber(targetCount);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(currentCount));
            }
        }, stepDuration);
    }

    function formatNumber(num) {
        return num.toLocaleString();
    }

    // Optional: Add a reset function for testing (can be called from browser console)
    window.resetVisitorCounter = function() {
        localStorage.removeItem('visitorCount');
        sessionStorage.removeItem('hasVisited');
        location.reload();
    };
})();
