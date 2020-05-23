import * as C from './channel';
const CH = C.New();

const foo = new C.Topic("foo");
CH.subscribe([foo], (m: C.Message) => {
  console.log("I received a message on channel 'foo'", m.payload);
})
const m1 = new C.Message({ topics: [foo], payload: 'bar' });
CH.publish(m1);

