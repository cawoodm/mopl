# MOPL
Message Oriented Programming Language

Can we program sensibly without calling procedures/functions directly but just using pub/sub?

Can we then distribute our code over several computers seamlessly by externalizing the message broker?

## Classic Programming
```
function add(n1, n2) {
  return n1 + n2
}
function divide(n1, n2) {
  return n1 / n2
}
let r1 = add(1, 1);
let r2 = divide(42, 6);
console.log(r1, r2); // 2, 7
```

## Message-Orientated Programming
```
let r1 = await Channel.publish("add", {n1: 1, n2: 2});
let r2 = await Channel.publish("divide", {n1: 42, n2: 6});
console.log(r1, r2); // Hopefully 2, 7
```