/**
 * Reading Progress Indicator
 * Shows a progress bar at the top of blog posts indicating scroll progress
 */

function initReadingProgress() {
  // Only initialize on blog post pages
  const blogPost = document.querySelector('.blog-post');
  if (!blogPost) return;

  // Create progress bar elements
  const progressContainer = document.createElement('div');
  progressContainer.className = 'reading-progress';

  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress__bar';

  progressContainer.appendChild(progressBar);
  document.body.appendChild(progressContainer);

  /**
   * Calculate and update reading progress
   */
  function updateProgress() {
    // Calculate scroll percentage
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Calculate how much of the page can be scrolled
    const scrollableHeight = documentHeight - windowHeight;

    // Calculate percentage (0-100)
    const scrollPercentage = (scrollTop / scrollableHeight) * 100;

    // Clamp between 0 and 100
    const clampedPercentage = Math.min(100, Math.max(0, scrollPercentage));

    // Update progress bar width
    progressBar.style.width = `${clampedPercentage}%`;
  }

  // Listen for scroll events
  window.addEventListener('scroll', updateProgress, { passive: true });

  // Initial update
  updateProgress();
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReadingProgress);
} else {
  initReadingProgress();
}

// Reinitialize after View Transitions
window.addEventListener('pagereveal', initReadingProgress);

// Expose for manual initialization if needed
window.initReadingProgress = initReadingProgress;
