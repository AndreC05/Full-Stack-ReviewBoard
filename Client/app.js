const userForm = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");
const outputDiv = document.getElementById("outputDiv");
const fetchUrl = "https://full-stack-reviewboard.onrender.com/reviews";

const userName = usernameInput();

//ask for username
function usernameInput() {
  return prompt("What is your username?");
}

//Play click sound
function playClickSound() {
  const click = new Audio("./public/assets/click.mp3");
  click.play();
}

submitBtn.addEventListener("click", playClickSound);

//play like sound
function playLikeSound() {
  const like = new Audio("./public/assets/yay.mp3");
  like.play();
}

//play delete sound
function playDeleteSound() {
  const deleteSound = new Audio("./public/assets/deleteBtn.mp3");
  deleteSound.play();
}

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
  const reviewId = event.target.id.replace("likeBtn", "");

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
  const reviewId = event.target.id.replace("deleteBtn", "");

  //get name of the author of the post
  const authorData = document.getElementById(`author${reviewId}`);
  const authorName = authorData.textContent;

  //ensure only author of the post can delete comment
  if (authorName === userName) {
    const body = {
      id: reviewId,
    };

    //make delete request
    const response = await fetch(fetchUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    //play sound
    playDeleteSound();

    // update review like count
    resetOutput();
    handleGetReviews();
  } else {
    alert(
      "You are not the author of this post. Only the author can delete this post"
    );
  }
}

//Create elements of each review post
function createReviewElements(listOfReviews, currentIndex) {
  const reviewDiv = document.createElement("div");
  const interactDiv = document.createElement("div");
  const reviewAuthor = document.createElement("h3");
  const reviewContent = document.createElement("p");
  const reviewDate = document.createElement("h4");
  const likeBtn = document.createElement("button");
  const likeCount = document.createElement("h4");
  const deleteBtn = document.createElement("button");

  const id = listOfReviews[currentIndex].id;
  const content = listOfReviews[currentIndex].content;
  const author = listOfReviews[currentIndex].author;
  const likes = listOfReviews[currentIndex].likes;
  const date = listOfReviews[currentIndex].date;

  //Set attributes and textcontent
  reviewDiv.setAttribute("id", `review${id}`);
  reviewDiv.setAttribute("class", "reviewDiv");
  interactDiv.setAttribute("class", "interactDiv");
  reviewAuthor.textContent = author;
  reviewAuthor.setAttribute("id", `author${id}`);
  reviewContent.textContent = content;
  reviewDate.textContent = date;
  likeBtn.textContent = "Like";
  likeBtn.setAttribute("id", `likeBtn${id}`);
  likeBtn.setAttribute("class", "likeBtn");
  likeCount.textContent = likes;
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("id", `deleteBtn${id}`);
  deleteBtn.setAttribute("class", "deleteBtn");

  //event listner for like button
  likeBtn.addEventListener("click", handleLike);
  likeBtn.addEventListener("click", playLikeSound);

  //event listner for delete button
  deleteBtn.addEventListener("click", handleDelete);

  //append buttons and counter to new div
  interactDiv.appendChild(likeBtn);
  interactDiv.appendChild(likeCount);
  interactDiv.appendChild(deleteBtn);

  //Append new elements to the new div
  reviewDiv.appendChild(reviewAuthor);
  reviewDiv.appendChild(reviewContent);
  reviewDiv.appendChild(reviewDate);
  reviewDiv.appendChild(interactDiv);

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
