exports.config = {
  backends: { statics: 80 },
  redirect: {
    "opentabs-net.nodejitsu.com": "opentabs.net",
    "www.opentabs.net": "opentabs.net"
  },
  domainsDir: 'statics/'
};
