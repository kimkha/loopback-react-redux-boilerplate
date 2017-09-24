const es = require('event-stream');

module.exports = function(app) {
  const DemoTicker = app.models.DemoTicker;
  DemoTicker.createChangeStream(function(err, changes) {
    changes.pipe(es.stringify());
  });
  setInterval(() => {
    DemoTicker.create({
      market: 'BTC-VND',
      high: Math.random(),
      low: Math.random(),
      last: Math.random(),
      bid: Math.random(),
      ask: Math.random(),
    });
  }, 5000);
};
