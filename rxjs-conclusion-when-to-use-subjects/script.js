function subjectFactory() {
  return new Rx.Subject();
}

var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(sharedDelayed);
    return merged;
  });

var sub = result.subscribe(x => console.log(x));











