let baseUrl = 'http://localhost:5000/api/';
let mediaUrl = 'http://localhost:5000/';
if (window.location.host === 'dirasat-admin-dev.falconweb.app') {
  baseUrl = 'https://dirasat-api-dev.falconweb.app/api/';
  mediaUrl = 'https://dirasat-api-dev.falconweb.app/';
} else if (window.location.host === 'dirasat-admin-qa.falconweb.app') {
  baseUrl = 'https://dirasat-api-qa.falconweb.app/api/';
  mediaUrl = 'https://dirasat-api-qa.falconweb.app/';
} else if (window.location.host === 'dirasat-admin-staging.falconweb.app') {
  baseUrl = 'https://dirasat-api-staging.falconweb.app/api/';
  mediaUrl = 'https://dirasat-api-staging.falconweb.app/';
} else if (window.location.host === 'admin.dirasat-international.com') {
  baseUrl = 'https://api.dirasat-international.com/api/';
  mediaUrl = 'https://api.dirasat-international.com/';
}

module.exports = { baseUrl, mediaUrl };
