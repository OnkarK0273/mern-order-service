import config from 'config';
import app from './app';
import logger from './config/logger';
import { initDb } from './config/db';
import { MessageBroker } from './types/broker';
import { createMessageBroker } from './common/factories/brokerFactory';

const startServer = async () => {
  const PORT: number = config.get('server.port') || 5502;
  let broker: MessageBroker | null = null;
  try {
    await initDb();
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(['product', 'topping'], false);

    logger.info('Database connected successfully');

    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
      if (broker) {
        await broker.disconnectConsumer();
      }
      logger.on('finish', () => {
        process.exit(1);
      });
    }
  }
};

void startServer();
