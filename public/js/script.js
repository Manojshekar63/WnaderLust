// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

if (document.getElementById('map')) {
  mapboxgl.accessToken = document.querySelector('meta[name="map-token"]').content;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [78.0421, 27.1751],
    zoom: 9
  });
  new mapboxgl.Marker()
    .setLngLat([78.0421, 27.1751])
    .addTo(map);
}