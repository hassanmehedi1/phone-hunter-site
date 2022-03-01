// error message 
let errorMsg = document.getElementById('error-message').style.display = 'none';

// Spinner 
const toggleSpinner = displayStyle => {
   document.getElementById('spinner').style.visibility = displayStyle;
}
const toggleSearchResult = displayStyle => {
   document.getElementById('search-result').style.visibility = displayStyle;
}

const searchPhone = () => {
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value ;

   toggleSpinner('visible');
   toggleSearchResult('hidden');

   // Clear Data 
   searchField.value = '';
   document.getElementById('error-message').style.display = 'none'
   if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
        toggleSpinner('hidden');
    }
    else{
      // Load Data
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url)
   .then(res => res.json())
   .then(data => displaySearchResult(data.data))
    }

}


// Display Search Result
const displaySearchResult = phones => {
   const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    document.getElementById('error-message').style.display = 'none'
   if (!phones.length) {
      document.getElementById('error-message').style.display = 'block';
      toggleSpinner('hidden');
   }
    else{
       phones.slice(0, 20).forEach(phone => {
      console.log(phone);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="card w-100 p-0 h-100">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary">Explore-More</button>
        </div>
      `;
      searchResult.appendChild(div);
    })
      toggleSpinner('hidden');
      toggleSearchResult('visible');
    }
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
   const div = document.createElement('div');
   div.classList.add('card');
   div.innerHTML = `
   <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
        <h5 class="card-title fs-2">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate: '<span class="text-danger fw-bold">No Release Date Found</span>'}</p>
        <p class="card-text fw-bolder text-success fs-4">Main-Features:- </p>
        <p class="card-text text-secondary fw-bold">Chip-Set: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text text-secondary fw-bold">Display-Size: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text text-secondary fw-bold">Memory: ${phone.mainFeatures.memory}</p>

        <p class="card-text fw-bolder text-info fs-4">Sensors:- </p>
        <p class="card-text text-secondary fw-bold">Sensors: ${phone.mainFeatures.sensors}</p>

        <p class="card-text fw-bolder text-warning fs-4">Others:- </p>
        <p class="card-text text-secondary fw-bold ">Bluetooth: ${phone.others?.Bluetooth ? phone.others?.Bluetooth: '<span class="text-danger">Information Not Available</span>'}</p>
        <p class="card-text text-secondary fw-bold">GPS: ${phone.others?.GPS ? phone.others?.GPS: '<span class="text-danger">Information Not Available</span>'}</p>
        <p class="card-text text-secondary fw-bold">NFC: ${phone.others?.NFC ? phone.others?.NFC: '<span class="text-danger">Information Not Available</span>'}</p>
        <p class="card-text text-secondary fw-bold">Radio: ${phone.others?.Radio ? phone.others?.Radio: '<span class="text-danger">Information Not Available</span>'}</p>
        <p class="card-text text-secondary fw-bold">USB: ${phone.others?.USB ? phone.others?.USB: '<span class="text-danger">Information Not Available</span>'}</p>
    </div>
   `;
   phoneDetails.appendChild(div);
}
