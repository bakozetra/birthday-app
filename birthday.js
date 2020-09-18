
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));
//fetch the data
async function getData() {
    const response = await fetch('people.json');
    const data = await response.json();
    return data;
}

// getData();
const tbody = document.querySelector('tbody');
const form = document.querySelector('.form');

let newData = [];

async function displayData() {
    newData = await getData();
    const newDataSort = newData.sort((a, b) => a.birthday - b.birthday);
    const html = newDataSort.map((person, index) => `
   <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
      <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
      <td>${person.lastName}</td>
      <td>${person.firstName}</td>
      <td>${person.birthday}</td>
      <td>
          <button class="edit">
          <img src="./icon" alt=""/>
          </button>
          <button class="delete">
          <img src="" alt=""/>
          </button>
      </td>
    </tr>
  `
    ).join('');
    tbody.innerHTML = html;
    tbody.dispatchEvent(new CustomEvent('listUpdated'));
}

displayData();
const birthdays = e => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const newBirthday = {
        lastName: formEl.lastname.value,
        firstName: formEl.firstname.value,
        birthday: formEl.birthday.value,
    }

    newData.push(newBirthday);
    console.log(newData);
    displayData();
    tbody.dispatchEvent(new CustomEvent('listUpdated'));
}

form.addEventListener('submit', birthdays);
console.log(newData);
// edit 
const editBirthday = async id => {
    const birthdayId = newData.find((birthday => birthday.id === id));
    console.log(birthdayId);
    const result = await editPartnerPopup(birthdayId);
    console.log(result);
    if (result) {
        displayData(result);
    }
  
}

async function destroyPopup(popup) {
    popup.classList.remove('open');
    // wait for 1 second, to let the animation do its work
    await wait(1000);
    // remove it from the dom
    popup.remove();
    // remove it from the javascript memory
    popup = null;
}

const editPartnerPopup = person => {
    return new Promise(async resolve => {
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
                <h3>Edit</h3>
                <label>Lastname</label>
                <input type="text" name="lastName" value="${person.lastName}"/>
                <label>Firstname</label>
                <input type="text" name="firstName" value="${person.firstName}"/>
                <label>Birthday</label>
                <input type="text" name="birthday"  value="${person.birthday}"/>
                <button type="submit">Submit</button>
            </fieldset>
	`);

        const skipButton = document.createElement('button');
        skipButton.type = 'button'; // so it doesn't submit
        skipButton.textContent = 'Cancel';
        popup.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener(
            'click',
            () => {
                resolve(null);
                destroyPopup(popup);
            },
            { once: true }
        );

        popup.addEventListener(
            'submit',
            e => {
                e.preventDefault();
                person.lastName = e.target.lastName.value;
                person.firstName = e.target.firstName.value;
                person.birthday = e.target.birthday.value;
                resolve(person);
                destroyPopup(popup);
            },
            { once: true }
        );

        document.body.appendChild(popup);
        await wait(50);
        popup.classList.add('open');
    });
};

const deletePartner = async id => {
    const person = newData.find(person => person.id === id);
    console.log(person);
    const result = await deleteDeletePopup(person);
    if (result) {
        newData = newData.filter(person => person.id !== result.id);
        displayData(newData);
    }
};

const deleteDeletePopup = person => {
    return new Promise(async resolve => {
        // create the html form
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
                <h3>Delete ${person.firstName} ${person.lastName}</h3>
                <p>Are you sure you want to delete this person from the list?</p>
			    <button type="submit">Delete</button>
            </fieldset>
		`
        );

        const skipButton = document.createElement('button');
        skipButton.type = 'button'; // so it doesn't submit
        skipButton.textContent = 'Cancel';
        popup.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener(
            'click',
            () => {
                resolve(null);
                destroyPopup(popup);
            },
            { once: true }
        );

        popup.addEventListener(
            'submit',
            e => {
                e.preventDefault();
                // popup.input.value;
                resolve(person);
                destroyPopup(popup);
            },
            { once: true }
        );

        document.body.appendChild(popup);
        await wait(50);
        popup.classList.add('open');
    });
};


const handleClick = e => {
    if (e.target.closest('button.edit')) {
        const editButton = e.target.closest('tr');
        const idToEdit = editButton.dataset.id;
        console.log(idToEdit);
        editBirthday(idToEdit);
    }
    if (e.target.closest('button.delete')) {
        const deleteButton = e.target.closest('tr');
        const idToDelete = deleteButton.dataset.id;
        deletePartner(idToDelete);
    }
}

const initLocalStorage = () => {
    const birthdayList = JSON.parse(localStorage.getItem('newData'));
    if (birthdayList) {
        newData = birthdayList;
        console.log(newData);
    }
    tbody.dispatchEvent(new CustomEvent('listUpdated'));
};

const updateLocalStorage = () => {
    localStorage.setItem('newData', JSON.stringify(newData));
};

window.addEventListener('DOMContentLoaded', birthdays);
tbody.addEventListener('listUpdated', updateLocalStorage);
tbody.addEventListener('click', handleClick);
initLocalStorage();
