// const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const endpoint = `people.json`;
const tbody = document.querySelector('tbody');
const form = document.querySelector('.form');
//fuction that handle every function we need
async function getData() {
    const response = await fetch('people.json');
    const data = await response.json();
    let people = [];
    people = data;
    console.log(people)

    // dispaly data function

    function displayData() {
        const newDataSort = people.sort((a, b) => a.birthday - b.birthday);
        const html = newDataSort.map((person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
      <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
      <td>${person.lastName} ${person.firstName}</td>
      <td>${person.birthday}</td>
      <td class= "icon">
          <button class="edit">
            <img src="./icon-edit-image.png" alt="">
          </button>
          <button class="delete">
            <img src="./icon-delete-image.jpg" alt="">
          </button>
      </td>
    </tr>
  `
        ).join('');
        tbody.innerHTML = html;
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
    }

    // Function that handle the add data (birthday)

    const birthdays = e => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const newBirthday = {
            lastName: formEl.lastname.value,
            firstName: formEl.firstname.value,
            birthday: formEl.birthday.value,
            picture: formEl.image.value,
        }

        people.push(newBirthday);
        console.log(people);
        displayData();
        form.reset();
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
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

    // Function that handle the edit form (editBirthday)
    const editBirthday = id => {
        const birthdayId = people.find((birthday => birthday.id === id));
        console.log(birthdayId);
        const result = editBirthdayPopup(birthdayId);
        if (result) {
            displayData(result);
        }

    }
    const editBirthdayPopup = person => {
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
          </fieldset>`);

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
            await wait(10);
            popup.classList.add('open');
        });
    };

    const deleteBirthday = id => {
        const person = people.find(person => person.id === id);
        console.log(id);
        const result = deleteBirthdayPopup(person);
        if (result) {
            people = people.filter(person => person.id !== result.id);
            displayData(people);
        }
    };

    const deleteBirthdayPopup = person => {
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
            </fieldset>`);

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
                    displayData(people);
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
            console.log(idToDelete);
            deleteBirthday(idToDelete);
        }
    }
    form.addEventListener('submit', birthdays);
    tbody.addEventListener('click', handleClick);
    const initLocalStorage = () => {
        const birthdayList = JSON.parse(localStorage.getItem('people'));
        if (birthdayList) {
            people = birthdayList;
        }
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
    };

    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };

    window.addEventListener('DOMContentLoaded', birthdays);
    tbody.addEventListener('listUpdated', updateLocalStorage);
    initLocalStorage();
    displayData();
}
getData();