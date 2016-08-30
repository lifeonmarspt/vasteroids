function normal_random(n) {
  var x = 0;
  for (var i = 0; i < n; i++) {
    x += Math.random();
  }

  return x / n;
}

export default normal_random
