export default function(n) {
  let x = 0;
  for (let i = 0; i < n; i++) {
    x += Math.random();
  }

  return x / n;
}
