const circle = document.getElementById("circle");

const ovserver = new IntersectionObserver((items) => {
  const trackingInfo = items[0];
  if (trackingInfo.isIntersecting) {
    console.log("Circle is visible");
    ovserver.disconnect();
  } else {
    console.log("Circle is not visible");
  }
});

ovserver.observe(circle);
