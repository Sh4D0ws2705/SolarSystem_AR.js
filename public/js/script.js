// Gesture logic (zoom + xoay)

AFRAME.registerComponent("gesture-handler", {
  init: function () {
    const el = this.el;
    let lastDist = null;
    let isDragging = false;
    let lastTouchX = 0;
    let lastTouchY = 0;

    const scaleLimit = { min: 0.3, max: 3 };

    el.sceneEl.canvas.addEventListener("touchstart", function (e) {
      if (e.touches.length === 2) {
        // Zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastDist = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1) {
        // Xoay
        isDragging = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      }
    });

    el.sceneEl.canvas.addEventListener("touchmove", function (e) {
      if (e.touches.length === 2) {
        // Zoom
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const newDist = Math.sqrt(dx * dx + dy * dy);

        if (lastDist) {
          let scale = el.getAttribute("scale");
          const zoom = newDist / lastDist;
          scale.x = Math.min(
            scaleLimit.max,
            Math.max(scaleLimit.min, scale.x * zoom)
          );
          scale.y = Math.min(
            scaleLimit.max,
            Math.max(scaleLimit.min, scale.y * zoom)
          );
          scale.z = Math.min(
            scaleLimit.max,
            Math.max(scaleLimit.min, scale.z * zoom)
          );
          el.setAttribute("scale", scale);
        }

        lastDist = newDist;
      } else if (e.touches.length === 1 && isDragging) {
        // Xoay
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - lastTouchX;
        const deltaY = currentY - lastTouchY;

        lastTouchX = currentX;
        lastTouchY = currentY;

        let rotation = el.getAttribute("rotation");
        rotation.y += deltaX * 0.5; // Xoay trái-phải
        rotation.x -= deltaY * 0.5; // Xoay lên-xuống (trừ để xoay đúng hướng)
        // rotation.x = Math.max(-90, Math.min(90, rotation.x));
        el.setAttribute("rotation", rotation);
      }
    });

    el.sceneEl.canvas.addEventListener("touchend", function (e) {
      if (e.touches.length < 2) {
        lastDist = null;
      }
      if (e.touches.length === 0) {
        isDragging = false;
      }
    });
  },
});



// Gắn component gesture vào hệ mặt trời

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#solar-system").setAttribute("gesture-handler", "");

  const earthBtn = document.querySelector("#earthButton");
  const marsBtn = document.querySelector("#marsButton");
  const venusBtn = document.querySelector("#venusButton");
  const mercuryBtn = document.querySelector("#mercuryButton");
  const sunBtn = document.querySelector("#sunButton");

  earthBtn.addEventListener("click", () => {
    document.getElementById("modal-earth").style.display = "block";
  });

  sunBtn.addEventListener("click", () => {
    document.getElementById("modal-sun").style.display = "block";
  });

  marsBtn.addEventListener("click", () => {
    document.getElementById("modal-mars").style.display = "block";
  });

  venusBtn.addEventListener("click", () => {
    document.getElementById("modal-venus").style.display = "block";
  });

  mercuryBtn.addEventListener("click", () => {
    document.getElementById("modal-mercury").style.display = "block";
  });
});

// Hàm đóng modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
