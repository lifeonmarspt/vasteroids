Vasteroids.Utils = (function () {
  var randomInRange = function (min, max) {
    return min + Math.random()*(max-min);
  }

  return {
    randomInRange : randomInRange
  }
}());
