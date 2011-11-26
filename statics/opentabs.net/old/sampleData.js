var sampleData = [
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 1,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'proposed'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 2,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'proposed'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 3,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'proposed'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 4,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'proposed'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 11,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'declined'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 12,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'declined'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 13,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'declined'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 14,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'declined'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 21,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'accepted'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 22,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'accepted'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 23,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'accepted'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 24,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'accepted'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 31,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'requested'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 32,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'requested'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 33,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'requested'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 34,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'requested'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 41,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'sent'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 42,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'sent'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 43,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'sent'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 44,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'sent'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 51,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'received'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 52,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'received'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 53,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'received'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 54,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'received'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 61,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'closed'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 62,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'you',
    status: 'closed'
  },
  {
    payer: 'you',
    payee: 'mich@unhosted.org',
    amount: 63,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'closed'
  },
  {
    payer: 'mich@unhosted.org',
    payee: 'you',
    amount: 64,
    currency: 'beer',
    timestamp: 1234567890.123,
    proposer: 'mich@unhosted.org',
    status: 'closed'
  }
  ];
