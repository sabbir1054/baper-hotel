//loader spinning
const loading = () => {
  document.getElementById("spinner").classList.add("spinner-border");
  setTimeout(() => {
    document.getElementById("spinner").classList.remove("spinner-border");
  }, 3000);
};

//Search box function
const searchFood = () => {
  const searchText = document.getElementById("search-food").value;

  if (searchText == "") {
    alert("Please input food"); //error
  } else {
    getFood(searchText);
    document.getElementById("search-food").value = "";
  }
};
//Get food info from server
const getFood = async (search) => {
  loading();
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayFood(data.meals);
  } catch {
    alert("Please try another food");
  }
};
//Display food by search result
const displayFood = (foods) => {
  const cards = document.getElementById("cards");
  cards.textContent = "";

  if (foods == 0) {
    alert("Search another food");
  } else {
    foods.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card">
          <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${food.strMeal}</h5>
              <p class="card-text">${food.strInstructions.slice(0, 200)}</p>
            </div>
            <button type="button" onclick="getFoodDetails(${
              food.idMeal
            })" class="btn btn-primary text-white w-25"  data-bs-toggle="modal" data-bs-target="#exampleModal" >
              More
            </button> 
          </div>
    `;
      cards.appendChild(div);
    });
  }
};
//Get selected food
const getFoodDetails = async (foodId) => {
  clearModal();
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayFoodDetails(data.meals);
};
//Show selected food
const displayFoodDetails = (meal) => {
  const modalBody = document.getElementById("modal-body");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <img src='${meal[0].strMealThumb}' class="card-img-top" alt="...">
       <div class="card-body">
          <h5 class="card-title">${meal[0].strMeal}</h5>
            <p class="card-text">${meal[0].strInstructions.slice(0, 250)}</p>
          <a href="${meal[0].strYoutube}" class="btn btn-primary">Watch</a>
      </div>

  `;
  modalBody.appendChild(div);
};

//clear modal
const clearModal = () => {
  const modalBody = document.getElementById("modal-body");
  modalBody.textContent = "";
};
