/* Runtime configuration. The artifact/preview build swaps this file (tools/build-artifact.js). */
window.FP_CONFIG = {
  videoMode: 'embed',      // 'embed' = YouTube iframe on click (LMS); 'link' = poster opens YouTube in a new tab
  reviewMode: false,       // true = every module and the exam unlocked (stakeholder review)
  sequential: true,        // modules unlock in order; exam unlocks after Module 9
  narration: true,         // show Listen buttons (browser text-to-speech) with captions
  brand: { name: 'Upchurch', tagline: 'Safety Training', logo: 'assets/img/upchurch-logo.png', logoDark: 'assets/img/upchurch-logo-white.png' }
};
