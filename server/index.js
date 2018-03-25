import cluster from 'cluster';

import app from './server';
import cfg from './config';
import logger from './logger';

cluster.on('disconnect', (worker) => {
  logger.error('server/index', `Worker ${worker.id} died`);
  cluster.fork();
});

cluster.on('exit', (worker, code) => {
  logger.error('server/index', `Worker ${worker.id} died with code: ${code}`);
  cluster.fork();
});

if (cluster.isMaster) {
  for (let i = 0; i < cfg.cpus; i += 1) {
    cluster.fork();
  }
} else {
  app.listen(cfg.port, () => {
    logger.info(`Worker ${process.pid} started`);
  });
}
