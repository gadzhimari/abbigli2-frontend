import checkCatalog from './lib/catalog/checkCatalog';

const CronJob = require('cron').CronJob;
const intel = require('intel');

intel.basicConfig({
  format: '[%(date)s] %(name)s:: %(message)s',
  level: intel.INFO,
  file: './node-server.log',
});

checkCatalog((updated) => {
  const message = updated ? 'catalog cache updated' : 'catalog do not need update';
  console.log('initial catalog cache');

  intel.info(message);
});

const job = new CronJob({
  cronTime: '00 */5 * * * *',
  onTick: () => {
    checkCatalog((updated) => {
      const message = updated ? 'catalog cache updated' : 'catalog do not need update';

      intel.info(message);
    });
  },
  start: true,
});

job.start();
