// navbar scroll functionality
const header = document.getElementById("navBar");
let headerOffset = header.offsetTop;
window.addEventListener("scroll", () =>
  header.classList.toggle("fixed", window.scrollY >= headerOffset)
);

// api call
let apiUrl =
  "https://strapi-production-3931.up.railway.app/api/posts/?populate=*";

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
      <div class="titleWrapper">
      <h2 class="postTitle">${title}</h2>
      </div>
      <p class="postBody">${body[0].children[0].text}</p>
    `;

    container.addEventListener("click", (e) => {
      e.currentTarget.children[1].classList.toggle("visible");
    });

    postContainer.appendChild(container);
  });
});
