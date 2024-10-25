const userForm = document.getElementById("userForm");
const outputDiv = document.getElementById("outputDiv");
const fetchUrl = "http://localhost:8080/reviews";

//handle form data submition
async function handleSubmit(event) {
  event.preventDefault();

  //get data from form
  const formData = new FormData(userForm);
  const body = Object.fromEntries(formData);

  //make post request
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Display new review when submit button is pressed
  resetOutput();
  handleGetReviews();
}

// increase likes by 1 and send PUT request
async function handleLike(event) {
  // get the id of the review to update from the id of the button
  const reviewId = event.target.id.slice(-1);

  const body = {
    id: reviewId,
  };

  //make put request
  const response = await fetch(fetchUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // update review like count
  resetOutput();
  handleGetReviews();
}

//handle function for delete button
async function handleDelete(event) {
  // get the id of the review to delete
  const reviewId = event.target.id.slice(-1);

  const body = {
    id: reviewId,
  };

  //make put request
  const response = await fetch(fetchUrl, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // update review like count
  resetOutput();
  handleGetReviews();
}

//Create elements of each review post
function createReviewElements(listOfReviews, currentIndex) {
  const reviewDiv = document.createElement("div");
  const reviewAuthor = document.createElement("h3");
  const reviewContent = document.createElement("p");
  const reviewDate = document.createElement("h4");
  const likeBtn = document.createElement("button");
  const likeCount = document.createElement("h4");
  const deleteBtn = document.createElement("button");

  reviewDiv.setAttribute("id", `review${currentIndex}`);
  reviewAuthor.textContent = listOfReviews[currentIndex].author;
  reviewContent.textContent = listOfReviews[currentIndex].content;
  reviewDate.textContent = listOfReviews[currentIndex].date;
  likeBtn.textContent = "Like";
  likeBtn.setAttribute("id", `likeBtn${listOfReviews[currentIndex].id}`);
  likeCount.textContent = listOfReviews[currentIndex].likes;
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("id", `deleteBtn${listOfReviews[currentIndex].id}`);

  //event listner for like button
  likeBtn.addEventListener("click", handleLike);

  //event listner for delete button
  deleteBtn.addEventListener("click", handleDelete);

  //Append new elements to the new div
  reviewDiv.appendChild(reviewAuthor);
  reviewDiv.appendChild(reviewContent);
  reviewDiv.appendChild(reviewDate);
  reviewDiv.appendChild(likeBtn);
  reviewDiv.appendChild(likeCount);
  reviewDiv.appendChild(deleteBtn);

  //append new div to outputDiv
  outputDiv.appendChild(reviewDiv);
}

//Reset outputDiv
function resetOutput() {
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.lastChild);
  }
}

//make get request
async function handleGetReviews(event) {
  const response = await fetch(fetchUrl);
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    createReviewElements(data, i);
  }
}

userForm.addEventListener("submit", handleSubmit);
handleGetReviews();
