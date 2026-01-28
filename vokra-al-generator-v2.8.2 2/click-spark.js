// click-spark.js — pure JS click spark effect
(function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "9999",
  });

  document.body.appendChild(canvas);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const sparks = [];
  function getSparkColor() {
    const html = document.documentElement;
    const body = document.body;

    const dataTheme = (html.getAttribute("data-theme") || "").toLowerCase();

    // 只看你页面自己的主题状态
    const isDark =
      dataTheme === "dark" ||
      html.classList.contains("dark") ||
      body.classList.contains("dark") ||
      html.classList.contains("theme-dark") ||
      body.classList.contains("theme-dark");

    // dark：白色火花；light：深色火花（一定能在浅底上看到）
    return isDark ? "#ffffff" : "#7c5cbf";
  }

  document.addEventListener("click", (e) => {
    const count = 10;
    const radius = 18;
    const duration = 400;
    const color = getSparkColor();

    const now = performance.now();

    for (let i = 0; i < count; i++) {
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / count,
        start: now,
      });
    }

    function animate(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const progress = (t - s.start) / duration;

        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        const eased = progress * (2 - progress);
        const dist = eased * radius;
        const len = 8 * (1 - eased);

        const x1 = s.x + Math.cos(s.angle) * dist;
        const y1 = s.y + Math.sin(s.angle) * dist;
        const x2 = s.x + Math.cos(s.angle) * (dist + len);
        const y2 = s.y + Math.sin(s.angle) * (dist + len);

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      if (sparks.length > 0) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  });
})();
