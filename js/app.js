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
    })
}