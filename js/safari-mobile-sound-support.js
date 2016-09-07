if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  window.addEventListener('touchend', function() {
    var buffer = THREE.AudioContext.createBuffer(1, 1, 22050);
    var source = THREE.AudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(THREE.AudioContext.destination);
    source.play();
  }, false);
}
