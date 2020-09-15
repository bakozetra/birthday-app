let newsData=[];

//fetch on load
window.addEventListener('load', getData);

function getData() {
  fetch('people.json')
  .then(response => response.json())
  .then(data => newsData = data)
  .then(displayData)
  .catch(error => notifyUser(error))
}
getData();
console.log(getData());
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');

function displayData () {
 console.log(newsData);
  const html = newsData.map((person, index) => `
  <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
      <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
      <td>${person.lastName}</td>
      <td>${person.firstName}</td>
      <td>${person.birthday}</td>
      <td>
          <button class="edit">
              <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
          </button>
          <button class="delete">
              <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          </button>
      </td>
  </tr>
 `
 ).join('');
  tbody.innerHTML = html;
 }
 
 const showBirthdays = e => {
   e.preventDefault();
   console.log(e.currentTarget);
   const formEl = e.currentTarget;
   const newBirthday = {
    firstName : formEl.firstname.value,
    lastName: formEl.lastname.value,
    birthday: formEl.birthday.value,
    id : Date.now()
   }
 newsData.push(newBirthday);
 tbody.dispatchEvent(new CustomEvent('listUpdated'));
 }

 const initLocalStorage = () => { 
  const bookList = JSON.parse(localStorage.getItem('newsData'));
  if(bookList) {
     newsData = bookList;
  }
  tbody.dispatchEvent(new CustomEvent ('listUpdated'));
 };
 
 const updateLocalStorage = () => {
     localStorage.setItem('newsData', JSON.stringify(newsData));
 };

form.addEventListener('listUpdated' , showBirthdays);
window.addEventListener('DOMContentLoaded', showBirthdays);
tbody.addEventListener('listUpdated', updateLocalStorage)
 initLocalStorage();

