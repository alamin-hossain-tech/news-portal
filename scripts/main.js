let fetchCategories = () => {
  let urlCategory = "https://openapi.programming-hero.com/api/news/categories";
  fetch(urlCategory)
    .then((response) => response.json())
    .then((data) => {
      let categoriesArray = data.data.news_category; // load array from api
      console.log(data.data.news_category);
      displayCategory(categoriesArray);
      // pass array to display data
    })
    .catch((error) => {
      document.write(`Something Went Wrong . Error :${error}`);
    });
};

let displayCategory = (categoriesArray) => {
  let categories = document.getElementById("categories");
  categoriesArray.forEach((element) => {
    let newlist = document.createElement("li");
    newlist.classList.add("list-none");

    newlist.innerHTML = `<a onclick="showNews(${element.category_id},'${element.category_name}')" class="nav-link" href="#">${element.category_name}</a>`;
    categories.appendChild(newlist);
    // console.log("Element::"+element.category_name);
  });
};

// ----------------------------------

let displayNews = (news, categoryName) => {
  let totalItem = document.getElementById("totalNews");
  let articles = document.getElementById("artcles");
  articles.innerHTML = "";

  let newarray = news.sort((a, b) =>
    b.total_view > a.total_view ? 1 : b.total_view < a.total_view ? -1 : 0
  );
  console.log(news.length, typeof news.length);
  newarray.forEach((post) => {
    totalItem.innerText = `${
      news.length !== 0 ? news.length : "No data Found"
    } items found for category: ${categoryName}`;

    let article = document.createElement("div");
    article.classList.add("row");
    article.innerHTML = `
      <article  class="shadow p-4 mb-5 bg-body rounded">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
          <div class="thumbnail w-100 h-100">
            <img
              src="${post.image_url}"
              style="width: 100%; height: 100%"
              alt="image"
              class="rounded"
            />
          </div>
        </div>
        <div class="col-12 mt-sm-4 col-sm-12 col-md-12 col-lg-8 px-4">
          <h2>
            ${post.title}
          </h2>
          <div class="text mt-3 mb-4">
            <p class="txt_formate">${post.details.slice(0, 400)}......</p>
          </div>
          <!-- post information -->
          <div class="post_details row mb-3">
            <div
              class="col d-flex align-items-center justify-content-between"
            >
              <!-- Author -->
              <div class=" d-none d-sm-none d-md-block  author d-flex align-items-center gap-2">
                <img
                  style="height: 3rem"
                  src=${post.author.img}
                  class="img-fluid rounded-circle"
                  alt="profile"
                />
                <div class="">
                  <p class="border-0 m-0 text-muted">${post.author.name}</p>
                  <span class="text-muted">${post.author.published_date} </span>
                </div>
              </div>
              <!-- Total View -->
              <div class="total_view d-none d-sm-none d-md-block">
                <span><i class="fa-regular fa-eye"></i></span>
                <span>${post.total_view}</span>
              </div>
              <!-- Rating -->
              <div class="rating d-none d-sm-none d-md-block">
                <a href="#"
                  ><i class="fa-solid fa-star-half-stroke"></i
                ></a>
                <a href="#"><i class="fa-regular fa-star"></i></a>
                <a href="#"><i class="fa-regular fa-star"></i></a>
                <a href="#"><i class="fa-regular fa-star"></i></a>
                <a href="#"><i class="fa-regular fa-star"></i></a>
              </div>
              <!-- read more -->
              <div class="readMore">
                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="showmodal" onclick="showModal('${
                  post._id
                }')"
                  ><i class="fa-solid fa-angles-right"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

      `;
    articles.appendChild(article);
  });
  spinner.classList.add("d-none");
};

//
//
//
//
let showNews = (categoryType, cName = "") => {
  let spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  let newsUrl = `https://openapi.programming-hero.com/api/news/category/0${categoryType}`;
  fetch(newsUrl)
    .then((response) => response.json())
    .then((data) => {
      let newsArray = data.data;
      displayNews(newsArray, cName);
    });

  spinner.classList.add("d-none");
};

//
//
//
fetchCategories();
