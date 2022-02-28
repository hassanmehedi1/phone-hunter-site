const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value ;

   // Clear Data 
   searchField.value = '';

   // Load Data
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url)
   .then(res => res.json())
   .then(data => displaySearchResult(data.data))

}

// Display Search Result
const displaySearchResult = phones => {
   const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
      console.log(phone);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-100" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetail()" type="button" class="btn btn-primary">Explore-More</button>
        </div>
      `;
      searchResult.appendChild(div);
    })
}