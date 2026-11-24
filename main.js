function textToLiElement(text) {
  const el = document.createElement("li");
  el.textContent = text;
  return el;
}

function renderGeolocationPosition(container, geoPos) {
  const items = ["accuracy", "latitude", "longitude"];
  container.innerHTML = "";
  const ul = document.createElement("ul");
  for (let item of items) {
    ul.append(textToLiElement(`${item}: ${geoPos.coords[item]}`));
  }
  ul.append(textToLiElement(`timestamp: ${geoPos["timestamp"]}`));
  const gpsLi = textToLiElement(
    `gps: ${geoPos.coords.latitude},${geoPos.coords.longitude}`,
  );
  gpsLi.addEventListener("click", () => {
    navigator.clipboard.writeText(
      `${geoPos.coords.latitude},${geoPos.coords.longitude}`,
    );
  });
  ul.append(gpsLi);
  container.appendChild(ul);
}

function renderGeolocationError(container, geoError) {
  container.innerHTML = "";
  container.textContent = geoError.message;
}

const geolocationContainer = document.getElementById("geolocation");
const renderGeo = renderGeolocationPosition.bind(null, geolocationContainer);
const renderGeoError = renderGeolocationError.bind(null, geolocationContainer);
navigator.geolocation.getCurrentPosition(renderGeo, renderGeoError, {
  enableHighAccuracy: true,
});
