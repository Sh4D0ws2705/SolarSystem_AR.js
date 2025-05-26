// Gắn component gesture vào hệ mặt trời

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#solar-system").setAttribute("gesture-handler", "");

//   const earthBtn = document.querySelector("#earthButton");
//   const marsBtn = document.querySelector("#marsButton");
//   const venusBtn = document.querySelector("#venusButton");
//   const mercuryBtn = document.querySelector("#mercuryButton");
//   const sunBtn = document.querySelector("#sunButton");

//   earthBtn.addEventListener("click", () => {
//     document.getElementById("modal-earth").style.display = "block";
//   });

//   sunBtn.addEventListener("click", () => {
//     document.getElementById("modal-sun").style.display = "block";
//   });

//   marsBtn.addEventListener("click", () => {
//     document.getElementById("modal-mars").style.display = "block";
//   });

//   venusBtn.addEventListener("click", () => {
//     document.getElementById("modal-venus").style.display = "block";
//   });

//   mercuryBtn.addEventListener("click", () => {
//     document.getElementById("modal-mercury").style.display = "block";
//   });
// });

// // Hàm đóng modal
// function closeModal(id) {
//   document.getElementById(id).style.display = "none";
// }

const planetData = {
  sun: { model: "#model-sun", scale: "0.07 0.07 0.07" },
  mercury: { model: "#model-mercury", scale: "0.6 0.6 0.6" },
  venus: { model: "#model-venus", scale: "0.001 0.001 0.001" },
  earth: { model: "#model-earth", scale: "0.0002 0.0002 0.0002" },
  mars: { model: "#model-mars", scale: "0.7 0.7 0.7" },
};

let currentPlanetId = null; // Biến toàn cục lưu hành tinh đang zoom

document.addEventListener("DOMContentLoaded", () => {
  // Gán sự kiện click cho các nút button hành tinh
  ["sun", "mercury", "venus", "earth", "mars"].forEach((planet) => {
    const btn = document.querySelector(`#${planet}Button`);
    if (btn) {
      btn.addEventListener("click", () => {
        showZoomedPlanet(planet);
      });
    }
  });

  // Gán sự kiện click cho nút đóng zoom
  const closeZoomBtn = document.querySelector("#closeZoomBtn");
  if (closeZoomBtn) {
    closeZoomBtn.addEventListener("click", () => {
      closeZoom();
    });
  }

  // Gán sự kiện cho nút Info chỉ 1 lần
  const infoBtn = document.querySelector("#infoButton");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      if (currentPlanetId) {
        openModal(`modal-${currentPlanetId}`);
      }
    });
  }

  // Bật gesture-handler cho hệ mặt trời khi load
  const solarSystem = document.querySelector("#solar-system");
  if (solarSystem) {
    solarSystem.setAttribute("gesture-handler", "");
  }
});

function showZoomedPlanet(planetId) {
  const zoomed = document.querySelector("#zoomedPlanet");
  const model = document.querySelector("#zoomedModel");
  const solarSystem = document.querySelector("#solar-system");
  const data = planetData[planetId];

  if (!zoomed || !model || !solarSystem || !data) return;

  // Lưu planetId hiện tại
  currentPlanetId = planetId;

  // Gán model và scale cho zoomedModel
  model.setAttribute("gltf-model", data.model);
  model.setAttribute("scale", data.scale);

  // Hiện zoomed, ẩn hệ mặt trời
  zoomed.setAttribute("visible", "true");
  solarSystem.setAttribute("visible", "false");

  // Bật gesture cho zoomedModel
  model.setAttribute("gesture-handler", "");
}

function closeZoom() {
  const zoomed = document.querySelector("#zoomedPlanet");
  const solarSystem = document.querySelector("#solar-system");

  if (zoomed && solarSystem) {
    zoomed.setAttribute("visible", "false");
    solarSystem.setAttribute("visible", "true");
  }

  currentPlanetId = null; // Xoá hành tinh hiện tại khi đóng
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}