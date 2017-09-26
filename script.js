var connectableObservable = Rx.Observable.interval(1000)
  .take(5)
  .multicast(new Rx.ReplaySubject(100));

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};


connectableObservable.connect();

connectableObservable.subscribe(observerA);

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

setTimeout(function () {
  connectableObservable.subscribe(observerB);
}, 2000);



// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}