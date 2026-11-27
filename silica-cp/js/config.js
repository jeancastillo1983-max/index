/* Runtime configuration. The artifact/preview build swaps this file (tools/build-artifact.js). */
window.FP_CONFIG = {
  videoMode: 'embed',      // 'embed' = YouTube iframe on click (LMS); 'link' = poster opens YouTube in a new tab
  reviewMode: false,       // true = every module and the exam unlocked (stakeholder review)
  sequential: true,        // modules unlock in order; exam unlocks after the capstone (Module 8)
  narration: true,         // show Listen buttons (browser text-to-speech) with captions
  storagePrefix: 'scp:',   // localStorage namespace (keeps this course separate from others on the same LMS host)
  brand: { name: 'Upchurch', tagline: 'Safety Training', logo: 'assets/img/upchurch-logo.png', logoDark: 'assets/img/upchurch-logo-white.png' }
};
