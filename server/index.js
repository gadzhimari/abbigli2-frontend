import cluster from 'cluster';

import app from './server';
import cfg from './config';
import logger from './logger';

cluster.on('disconnect', (worker) => {
  logger.error(`Worker ${worker.id} died`);
  cluster.fork();
});

cluster.on('exit', (worker, code) => {
  logger.error(`Worker ${worker.id} died with code: ${code}`);
  cluster.fork();
});

if (cluster.isMaster) {
  for (let i = 0; i < cfg.cpus; i++) {
    console.log('fooork');
    cluster.fork();
  }
} else {
  app.listen(cfg.port, () => {
    logger.info(`Worker ${process.pid} started`);
  });
}
