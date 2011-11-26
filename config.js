exports.config = {
  backends: { statics: 80 },
  redirect: {
    "libredocs.nodejitsu.com": "libredocs.org",
    "www.libredocs.org": "libredocs.org",
    "libredoc.org": "libredocs.org",
    "www.libredoc.org": "libredocs.org"
  },
  domainsDir: 'statics/'
};
