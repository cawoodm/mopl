"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Topic = exports.New = void 0;
function New() {
    const subscriptions = [];
    return {
        publish(msg) {
            // Find all subscriptions to this message's topics
            const callbacks = subscriptions.filter((s) => s.topics.find((t) => msg.topics.find((mt) => mt.topic === t.topic)));
            callbacks.forEach((cb) => {
                cb.callback(msg);
            });
        },
        subscribe(topics, callback) {
            subscriptions.push(new Subscription({ topics: topics, callback: callback }));
        },
        unsubscribe(topics) {
        }
    };
}
exports.New = New;
class Topic {
    constructor(topic) {
        this.topic = topic;
    }
}
exports.Topic = Topic;
class Message {
    constructor(obj = {}) {
        this.topics = obj.topics || [];
        this.headers = obj.headers || [];
        this.payload = obj.payload || null;
    }
}
exports.Message = Message;
class Subscription {
    constructor(obj) {
        this.id = obj.id || '';
        this.topics = obj.topics || [];
        this.callback = obj.callback || function () { };
    }
}
