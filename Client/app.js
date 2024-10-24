const userForm = document.getElementById("userForm");
const fetchUrl = "http://localhost:8080/reviews";

//handle form data submition
async function handleSubmit(event) {
  event.preventDefault();

  //get data from form
  const formData = new FormData(userForm);
  const body = Object.fromEntries(formData);

  console.log(body);

  //make post request
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

//Create elements of each review post
function createReviewElements(listOfReviews, currentIndex) {
  const reviewDiv = document.createElement("div");
  const reviewAuthor = document.createElement("h3");
  const reviewContent = document.createElement("p");
  const likeBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
}

//make get request
async function handleGetReviews(event) {
  const response = await fetch(fetchUrl);
  const data = await response.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    createReviewElements(data, i);
  }
}

userForm.addEventListener("submit", handleSubmit);
handleGetReviews();
