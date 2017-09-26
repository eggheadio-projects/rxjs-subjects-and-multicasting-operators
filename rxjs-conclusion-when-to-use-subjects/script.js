function subjectFactory() {
  return new Rx.Subject();
}

var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x) || displayInPreview('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(sharedDelayed);
    return merged;
  });

var sub = result.subscribe(x => console.log(x) || displayInPreview(x));



// display in plunker preview
function displayInPreview(string) {
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode(string); 
  newDiv.appendChild(newContent);
  document.body.appendChild(newDiv)
}