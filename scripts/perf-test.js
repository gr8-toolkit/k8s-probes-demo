import http from 'k6/http'

export const options = {
  discardResponseBodies: true,
  scenarios: {
    check_dep: {
      exec: 'check_dep',
      gracefulStop: '10s',
      executor: 'constant-arrival-rate',
      rate: 900,
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 15000,
    },
    check_nodep: {
      exec: 'check_nodep',
      gracefulStop: '3s',
      executor: 'constant-arrival-rate',
      rate: 900,
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 4000,
    },
  },
  thresholds: {}
}

for (let key in options.scenarios) {
  for (let prefix of ['http_req_failed', 'http_req_duration', 'http_reqs']) {
    let thresholdName = `${prefix}{scenario:${key}}`;
    if (!options.thresholds[thresholdName]) {
      options.thresholds[thresholdName] = [];
    }
    options.thresholds[thresholdName].push('1==1');
  }
}
export function check_dep() {
  http.get(`${__ENV.TEST_URL}/check-dep`)
}

export function check_nodep() {
  http.get(`${__ENV.TEST_URL}/check-nodep`)
}
