// navbar scroll functionality
const header = document.getElementById("navBar");
let headerOffset = header.offsetTop;
window.addEventListener("scroll", () =>
  header.classList.toggle("fixed", window.scrollY >= headerOffset)
);

// api call
let apiUrl = "./strapi.json";

// let apiUrl =
//   "https://strapi-production-3931.up.railway.app/api/posts/?populate=*";

async function getData() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.log("api error");
  }
}

// content injection
const postContainer = document.getElementById("postWrapper");

document.addEventListener("DOMContentLoaded", async () => {
  const apiData = await getData();

  apiData.data.reverse().forEach((element) => {
    const { title, body, headerimage } = element.attributes;

    const container = document.createElement("div");
    container.classList.add("postContainer");

    container.style.backgroundImage = `url('${headerimage.data.attributes.url}')`;

    container.innerHTML = `
      <div class="posttitleWrapper">
      <h2 class="postTitle">${title}</h2>
      </div>
    `;

    const paragraphContainer = document.createElement("div");
    paragraphContainer.classList.add("paragraphContainer");
    container.appendChild(paragraphContainer);

    for (let post of body) {
      let paraElement = document.createElement("p");
      paraElement.style.padding = "0.5rem";
      paraElement.style.textAlign = "center";
      let para = post.children[0].text;

      paraElement.innerText = para;
      paragraphContainer.append(paraElement);
    }

    container.addEventListener("click", (e) => {
      e.currentTarget.children[1].classList.toggle("visible");
      e.currentTarget.children[0].classList.toggle("titleVisible");

      console.log(e.currentTarget.children);
    });

    postContainer.appendChild(container);
  });
});

function scrollTo(location) {
  let targetEl = document.getElementById(location);
  targetEl.scrollIntoView;
}

let navBtns = document.querySelectorAll(".navText");

navBtns.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    console.log(e);
    // scrollTo(e.target.id);
  });
});
