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
  const addbtn = document.querySelector("#addBtn");
  const ingredientDiv = document.querySelector("#ingredients");
  addbtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.setAttribute("name", "ingredients");
    input.className = "formReview";
    ingredientDiv.appendChild(input);
    //.classList.add("formReview");
  });
});
