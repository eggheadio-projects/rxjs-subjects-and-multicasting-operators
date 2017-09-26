function subjectFactory() {
  return new Rx.Subject(); 
}

var shared = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory)
  .refCount();

// subject: --0--1--2--3--4--5|
//                               A
// subject2:                     --0--1--2--3--4--5|

var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

var subA = shared.subscribe(observerA); // 0 => 1
console.log('subscribed A');

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

var subB;
setTimeout(function () {
  subB = shared.subscribe(observerB);
  console.log('subscribed B');
}, 2000);

setTimeout(function () {
  subA.unsubscribe();
  console.log('unsubscribed A');
}, 5000);

setTimeout(function () {
  subB.unsubscribe();
  console.log('unsubscribed B');
}, 7000);

setTimeout(function () {
  subA = shared.subscribe(observerA); // 0 => 1 (connect)
  console.log('subscribed A');
}, 8000);











