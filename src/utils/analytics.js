let initialized = false

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID

function loadScript(url) {
  const scriptElement = document.createElement('script')
  const firstScript = document.scripts[0]

  scriptElement.src = url
  firstScript.parentNode.insertBefore(scriptElement, firstScript)
}

function initialize() {
  if (initialized) {
    return
  }

  initialized = true

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    loadScript('//www.google-analytics.com/analytics.js')

    window.GoogleAnalyticsObject = 'ga'

    if (!window.ga) {
      window.ga = function ga() {
        (window.ga.q = window.ga.q || []).push(arguments)
      }
    }

    window.ga.l = +new Date()
    window.ga('create', GOOGLE_ANALYTICS_ID, 'auto')
  }
}

// Event
function track(event, properties = {}) {
  initialize()

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    window.ga('send', {
      hitType: 'event',
      eventAction: event,
      eventCategory: properties.category || 'All',
      eventLabel: properties.label,
      eventValue: properties.value,
      nonInteraction: properties.interaction === false,
    })
  }
}

// Page view
function page(name) {
  initialize()

  const {protocol, hostname, pathname, search} = window.location

  // Google Analytics
  if (GOOGLE_ANALYTICS_ID) {
    window.ga('send', {
      hitType: 'pageview',
      location: protocol + '//' + hostname + pathname + search,
      title: name,
    })
  }
}

exports.track = track
exports.page = page
