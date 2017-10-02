var subject = new Rx.AsyncSubject();

// Subject
// ReplaySubject: replays many, before or after completion
// BehaviorSubject: replays one, only before completion
// AsyncSubject: replays one, only if completed

var observerA = {
  next: function (x) { console.log('A next ' + x) || displayInPreview('A next ' + x); },
  error: function (err) { console.log('A error ' + err) || displayInPreview('A error ' + err); },
  complete: function () { console.log('A done') || displayInPreview('A done'); },
};


subject.subscribe(observerA);
console.log('observerA subscribed') || displayInPreview('observerA subscribed');

var observerB = {
  next: function (x) { console.log('B next ' + x) || displayInPreview('B next ' + x); },
  error: function (err) { console.log('B error ' + err) || displayInPreview('B error ' + err); },
  complete: function () { console.log('B done') || displayInPreview('B done'); },
};

setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subject.complete(), 350);

/*
----1---2---3--|       
  .............3|
                   3|
*/

setTimeout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed') || displayInPreview('observerB subscribed');
}, 400);



// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}