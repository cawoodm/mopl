export function New(): Channel {
  const subscriptions: Subscription[] = [];
  return {
    publish(msg: Message): void {
      // Find all subscriptions to this message's topics
      const callbacks = subscriptions.filter((s) => s.topics.find((t) => msg.topics.find((mt) => mt.topic === t.topic)));
      callbacks.forEach((cb) => {
        cb.callback(msg);
      });
    },
    subscribe(topics: Topic[], callback: Function): void {
      subscriptions.push(new Subscription({ topics: topics, callback: callback }));
    },
    unsubscribe(topics: Topic[]): void {
    }
  }
}
export interface Channel {
  publish(msg: Message): void;
  subscribe(topics: Topic[], callback: Function): void;
  unsubscribe(topics: Topic[]): void;
}
export class Topic {
  topic: string
  constructor(topic: string) {
    this.topic = topic;
  }
}
export class Message {
  topics: Topic[];
  headers: Header[];
  payload: any;
  constructor(obj: any = {}) {
    this.topics = obj.topics || [];
    this.headers = obj.headers || [];
    this.payload = obj.payload || null;
  }
}
export type Header = {
  key: string,
  value: string
}
class Subscription {
  id: string;
  topics: Topic[];
  callback: Function;
  constructor(obj: any) {
    this.id = obj.id || '';
    this.topics = obj.topics || [];
    this.callback = obj.callback || function () { };
  }
}