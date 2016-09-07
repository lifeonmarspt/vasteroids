//Due to a battery safety issue, all sound  in a webpage starts muted unless
//a sound is played inside a non-synthetic touch event

function createAndPlayNoise() {
    if (THREE.AudioContext.state !== "suspended")
    {
        window.removeEventListener('touchend', createAndPlayNoise)
        return
    }

    var buffer = THREE.AudioContext.createBuffer(1, 1, 22050);
    var source = THREE.AudioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(THREE.AudioContext.destination);
    source.play();
}

if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
  window.addEventListener('touchend', createAndPlayNoise, false);
}
