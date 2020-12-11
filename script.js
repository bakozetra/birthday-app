//Set the function for the  promise.
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Grab the element from html
const tbody = document.querySelector('ul');
const form = document.querySelector('.form');

//fuction that handle every function we need
async function getData() {
    // fetch file of people
    const response = await fetch('https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/93debb7463fbaaec29622221b8f9e719bd5b119f/birthdayPeople.json');
    const data = await response.json();
    // empty array to store everything
    let people = [];
    people = data;
    console.log(people)

    function displayData() {
        //Sort people’s birthdays from the youngest to the oldest.
        const newDataSort = people.sort((a, b) => b.birthday - a.birthday);
        //created html and  map the newDataSort.
        const html = newDataSort.map((person, index) => {

            function calculate_age(dob) {
                var diff_ms = Date.now() - dob.getTime();
                var age_dt = new Date(diff_ms);
                return Math.abs(age_dt.getUTCFullYear() - 1970);
            }
            let year = calculate_age(new Date(person.birthday));
            year = year + 1;
            const newDate = new Date(person.birthday);
            const month = newDate.toLocaleString('default', { month: 'long' });
            const dayBirthday = newDate.getDate();
            // calculate birday day in between
            var birthday = new Date(person.birthday);
            var today = new Date();
            //Set current year or the next year if you already had birthday this year
            birthday.setFullYear(today.getFullYear());
            if (today > birthday) {
                birthday.setFullYear(today.getFullYear() + 1);
            }

            //Calculate difference between days
            const daysTobirthday = Math.floor((birthday - today) / (1000 * 60 * 60 * 24))
            console.log(daysTobirthday);
            return `
    <li data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
     <img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}" class ="person-image"/>
     <div>
      <h3 class ="name">${person.lastName} ${person.firstName}</h3>
      <p class="age">Turns ${year} on ${month} on ${dayBirthday} th </p>
      </div>
      <p class="day">
      ${daysTobirthday === 0 ? `🎂🎂🎂` : `in ${daysTobirthday} days`}</p>
      <div class= "icon">
          <button class="edit">
            <img src="./svg/edit.svg" alt="">
          </button>
          <button class="delete">
            <img src="./svg/delete.svg" alt="">
          </button>
      </div>
    </li>
  `
        }).join('');
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
            id: Date.now(),
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
        const birthdayId = people.find((birthday => birthday.id == id));
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
            popup.innerHTML =
                `<fieldset>
              <h3>Edit</h3>
              <label>Lastname</label>
              <input type="text" name="lastName" value="${person.lastName}"/>
              <label>Firstname</label>
              <input type="text" name="firstName" value="${person.firstName}"/>
              <label>Birthday</label>
              <input type="date" id="start" name="tripStart"value="2000-01-01" min="2000-01-01" max="2020-12-31">
              <button type="submit">Submit</button>
            </fieldset>`;
            const skipButton = document.createElement('button');
            skipButton.type = 'button'; // so it doesn't submit
            skipButton.textContent = 'Cancel';
            popup.firstElementChild.appendChild(skipButton);
            document.body.appendChild(popup);
            // await wait(10);
            popup.classList.add('open');

            popup.addEventListener(
                'submit',
                e => {
                    e.preventDefault();
                    person.lastName = e.target.lastName.value;
                    person.firstName = e.target.firstName.value;
                    person.birthday = e.target.tripStart.value;
                    resolve();
                    displayData()
                    destroyPopup(popup);
                } ,  { once: true }
            );

            skipButton.addEventListener(
                'click',
                () => {
                    resolve(null);
                    destroyPopup(popup);
                },
                { once: true }
            );

        });

        
    };


    // Function for the delete the about the people .
    const deleteBirthdayPopup = id => {
        console.log(id);
        const filterIdOfPeople = people.filter(person => person.id != id);
        let deleteDiv = document.createElement('div');
        deleteDiv.classList.add('popup');
        deleteDiv.insertAdjacentHTML('afterbegin', `
            <fieldset>
                <h3>Delete ${id.firstName} ${id.lastName}</h3>
                <p>Are you sure you want to delete this person from the list?</p>
                <button type="submit" class ='delete'>Delete</button>
                <button type = "button" class ="cancel-delete">Cancel</button>
            </fieldset>
    `);

        document.body.appendChild(deleteDiv)
        deleteDiv.classList.add("open");
        deleteDiv.addEventListener("click", (e) => {
            e.preventDefault()
            const deleteButon = e.target.closest("button.delete");
            if (deleteButon) {
                people = filterIdOfPeople;
                displayData(people);
                destroyPopup(deleteDiv);
                tbody.dispatchEvent(new CustomEvent('updateList'));
            }
            const cancelButton = e.target.closest("button.cancel-delete");
            if (cancelButton) {
                deleteDiv.classList.remove("open");
            }
        })
    };

    // fuction to check the target 
    const handleClick = e => {
        if (e.target.closest('button.edit')) {
            const editButton = e.target.closest('li');
            const idToEdit = editButton.dataset.id;
            console.log(idToEdit);
            editBirthday(idToEdit);
        }
        if (e.target.closest('button.delete')) {
            const deleteButton = e.target.closest('li');
            const idToDelete = deleteButton.dataset.id;
            console.log(idToDelete);
            deleteBirthdayPopup(idToDelete);
        }
    }
    form.addEventListener('submit', birthdays);
    tbody.addEventListener('click', handleClick);
    // Stored the data inside of the local storage. 
    const initLocalStorage = () => {
        const birthdayList = JSON.parse(localStorage.getItem('people'));
        if (birthdayList) {
            people = birthdayList;
        }
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
    };
    // update the local storage 
    const updateLocalStorage = () => {
        localStorage.setItem('people', JSON.stringify(people));
    };

    window.addEventListener('DOMContentLoaded', birthdays);
    tbody.addEventListener('listUpdated', updateLocalStorage);
    initLocalStorage();
    displayData();

}

getData();