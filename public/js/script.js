// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("couldbepizza JS imported successfully!");
  var animation = bodymovin.loadAnimation({
    container: document.getElementById("pizzaAnimation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/images/pizza.json",
  });
});
