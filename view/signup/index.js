const signUp = document.querySelector("#signup");
const msg = document.querySelector(".msg");

signUp.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  try {
    e.preventDefault();
    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await axios
      .post("http://localhost:4000/user/signup", obj)
      .then((res) => {
        console.log(res);
        alert("Account Successfully Created");
      });
  } catch (err) {
    msg.innerHTML = `<h5 style="color: white;">Something went wrong </h5>`;
    setTimeout(() => {
      msg.remove();
    }, 4000);
    console.log(err);
  }
  signUp.reset();
}
