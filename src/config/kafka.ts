import { handleProductUpdate } from '../productCashe/product-update-handler';
import { MessageBroker } from '../types/broker';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });
    this.consumer = kafka.consumer({ groupId: clientId });
  }

  async connectConsumer() {
    await this.consumer.connect();
  }

  async disconnectConsumer() {
    await this.consumer.disconnect();
  }

  async consumeMessage(topics: string[], fromBeginning: boolean) {
    await this.consumer.subscribe({ topics, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        console.log({
          value: message.value?.toString(),
          topic,
          partition,
        });
        if (message.value !== null) {
          switch (topic) {
            case 'product':
              await handleProductUpdate(message.value.toString());
              return;
            default:
              console.log('Doing nothing...');
          }
        }
      },
    });
  }
}
