var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x) || displayInPreview('source ' + x))
  .share();

// share = publish().refCount()
// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
// publishBehavior = multicast + BehaviorSubject
// publishLast = multicast + AsyncSubject

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};

var subA = shared.subscribe(observerA);

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

var subB;
setTimeout(function () {
  subB = shared.subscribe(observerB);
}, 2000);

setTimeout(function () {
  subA.unsubscribe();
  console.log('unsubscribed A') || displayInPreview('unsubscribe A');
}, 5000);

setTimeout(function () {
  subB.unsubscribe();
  console.log('unsubscribed B') || displayInPreview('unsubscribed B');
}, 7000);




// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}






