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
      // console.log(phone);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-60" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary">Explore-More</button>
        </div>
      `;
      searchResult.appendChild(div);
    })
};

// Single Phone Details 
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
};

const displayPhoneDetail = phone => {
   const phoneDetails = document.getElementById('phone-details');
   console.log(phone);
   const div = document.createElement('div');
   div.classList.add('card');
   div.innerHTML = `
   <img src="${phone.image}" class="card-img-top w-50" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate: 'No Release Date Found'}</p>
        <p class="card-text fw-bolder text-success fs-3">Main-Features:- </p>
        <p class="card-text text-secondary fw-bold">Chip-Set: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text text-secondary fw-bold">Display-Size: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text text-secondary fw-bold">Memory: ${phone.mainFeatures.memory}</p>
    </div>
   `;
   phoneDetails.appendChild(div);
}