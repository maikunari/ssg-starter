/**
 * Scroll to Top Button
 * 
 * Shows a floating button after scrolling down 2 viewport heights
 * Smoothly scrolls back to top when clicked
 */

function initScrollToTop() {
  // Create the button element
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollButton);

  // Threshold: 2 viewport heights
  const scrollThreshold = window.innerHeight * 2;

  // Show/hide button based on scroll position
  function toggleButton() {
    if (window.scrollY > scrollThreshold) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  }

  // Scroll to top smoothly
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', toggleButton, { passive: true });
  scrollButton.addEventListener('click', scrollToTop);

  // Initial check
  toggleButton();
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
  initScrollToTop();
}

// Re-initialize after View Transitions
document.addEventListener('pagereveal', initScrollToTop);

// Export for potential external use
if (typeof window !== 'undefined') {
  window.initScrollToTop = initScrollToTop;
}
