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
    newlist.classList.add("nav-item");

    newlist.innerHTML = `<a onclick=" " class="nav-link" href="#">${element.category_name}</a>`;
    categories.appendChild(newlist);
    // console.log("Element::"+element.category_name);
  });
};

fetchCategories();
console.log("Hello");
