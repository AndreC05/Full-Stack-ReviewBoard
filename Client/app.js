const userForm = document.getElementById("userForm");
const fatchUrl = "http://localhost:8080/reviews";

async function handleSubmit(event) {
  event.preventDefault();

  //TODO get data from form
  const formData = new FormData(userForm);
  const body = Object.fromEntries(formData);

  console.log(body);

  //TODO make post request
  const response = await fetch(fatchUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

userForm.addEventListener("submit", handleSubmit);
