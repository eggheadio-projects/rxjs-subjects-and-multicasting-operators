var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x) || displayInPreview('source ' + x))
  .multicast(new Rx.Subject())
  .refCount();

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};

var subA = shared.subscribe(observerA); // start

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

var subB;
setTimeout(function () {
  subB = shared.subscribe(observerB); // 1 => 2
}, 2000);

setTimeout(function () {
  subA.unsubscribe(); // 2 => 1
  console.log('unsubscribed A') || displayInPreview('unsubscribed A');
}, 5000);

setTimeout(function () {
  subB.unsubscribe(); // 1 => 0 (stop)
  console.log('unsubscribed B') || displayInPreview('unsubscribed B');
}, 7000);





// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}





