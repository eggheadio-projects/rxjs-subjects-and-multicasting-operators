var connectableObservable = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x) || displayInPreview('source ' + x))
  .multicast(new Rx.Subject());

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};

var sub = connectableObservable.connect(); // start

var subA = connectableObservable.subscribe(observerA);

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

var subB;
setTimeout(function () {
  subB = connectableObservable.subscribe(observerB);
}, 2000);

setTimeout(function () {
  sub.unsubscribe(); // stop
  console.log('unsubscribed shared execution') || displayInPreview('unsubscribed shared execution');
}, 5000);





// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}





