export default function(longitude, latitude, radius) {
  return {
    x: radius * Math.sin(longitude) * Math.cos(latitude),
    z: radius * Math.cos(longitude) * Math.cos(latitude),
    y: radius * Math.sin(latitude)
   }
};
