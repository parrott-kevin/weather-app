const routes = {
  weatherUnderground: {
    autocomplete: query => `http://autocomplete.wunderground.com/aq?query=${query}`,
    conditions: (apiKey, lat, long) => `http://api.wunderground.com/api/${apiKey}/geolookup/conditions/q/${lat},${long}.json`
  }
}

module.exports = routes
