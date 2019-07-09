import './lib/index'

// We strongly recommend adding this file to make UX more native alike. For example, it
// makes so that user cannot select anything with a long-tap.
import './lib/css/nativeAlike.css'

// A basic implementation of an overlay that smoothly appears and disappears
import './lib/css/overlay.css'

// A basic spinner, that is shown on top of the overlay
import './lib/css/spinner.css'

// Import your CSS files here!

CleverPayManager.init()
CleverPayManager.subscribe(function (configData) {
  // Modify the DOM according to the config, that came from remote server
})
