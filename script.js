// const calcDistanceToBirthday = require("./utils")
import {calcDistanceToBirthday} from "./utils.js"
//Set the function for the  promise.


function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// Grab the element from html
const tbody = document.querySelector('ul');
const Addbutton = document.querySelector(".addButton")
console.log(Addbutton);
const searchNameFilter = document.querySelector('.searchName');
const filterMonthFilter = document.querySelector('.filterMonth');

//fuction that handle every function we need
async function getData() {
    // fetch file of people
    const response = await fetch('https://gist.githubusercontent.com/Pinois/e1c72b75917985dc77f5c808e876b67f/raw/b17e08696906abeaac8bc260f57738eaa3f6abb1/birthdayPeople.json');
    const data = await response.json();
    // empty array to store everything
    let people = [];
    people = data;
    people = people.map(person => calcDistanceToBirthday(person))

   

    function displayData  (people) {
        console.log(people);
            if (searchNameFilter.value !== '') {
                people = people.filter(person => {
                    const fullNameLowercase =
                        person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase();
                    return fullNameLowercase.includes(searchNameFilter.value.toLowerCase());
                });
                }
      

        if (filterMonthFilter.value !== '') {
            people = people.filter(person => {
                let birthday = new Date(person.birthday);
                return birthday.getMonth() === Number(filterMonthFilter.value);
            });
            
        }
       
        //Sort people’s birthdays from the youngest to the oldest.
    if(!people) {
        return 
    }

        const newDataSort = people.slice().sort((a, b) => ( a.distanceToBirthday - b.distanceToBirthday ))

        //created html and  map the newDataSort.
        const html = newDataSort.map((person, index) => {

            return `
    <li data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}" class ="person-image"/>
        <div class = "aboutyear">
            <h3 class ="name">${person.lastName} ${person.firstName}</h3>
            <p class="age">Turns <b>${person.futureAge}</b>years on ${person.birthdayMonth} on ${person.birthdayDay} th </p>
        </div>
        <div class="edit-delete-day-wraper">
            <p class="day">
            ${person.distanceToBirthday == 0 ? `🎂🎂🎂` : `in ${person.distanceToBirthday} days`}</p>
            <div class= "icon">
               <button class="edit">
                <img src="./svg/edit.svg" alt="">
                </button>
                <button class="delete">
                <img src="./svg/delete.svg" alt="">
               </button>
           </div>
        </div>
    </li>
  `
        }).join('');
        tbody.innerHTML = html;
        tbody.dispatchEvent(new CustomEvent('listUpdated'));
    }

    console.log(people);
    // Function that handle the add data (birthday)

    searchNameFilter.addEventListener('input', () => displayData(people));
    filterMonthFilter.addEventListener('change', () => displayData(people));

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
    const editBirthday = async( id) => {
        const birthdayId = people.find((birthday => birthday.id == id));
        console.log(birthdayId);
        const result =  await editBirthdayPopup(birthdayId);
        console.log("editbirthdat", result);
        if (result) {
        
            displayData(people);
        }
    }

    const editBirthdayPopup = person => {
        return new Promise(async resolve => {
            const birthdayDate = new Date(person.birthday).toISOString().slice(0, 10);
            const todayDate = new Date().toISOString().slice(0 , 10);
            const popup = document.createElement('form');
            popup.classList.add('popup');
            popup.innerHTML =
                `<fieldset class="edit_person-wrapper">
              <h3 class="edit_person">Edit ${person.firstName}</h3>
              <label>Lastname</label>
              <input type="text" name="lastName" value="${person.lastName}"/>
              <label>Firstname</label>
              <input type="text" name="firstName" value="${person.firstName}"/>
              <label>Birthday</label>
              <input type="date" id="start" name="bithdayDate" value="${birthdayDate}" max = "${todayDate}">
              <div class= "addChages-cancel-wrapper">
                  <button type="submit">Save changes</button>
                  <button type="button" id="cancel-btn">Cancel</button>
              </div>
            </fieldset>`;
          
                
            document.body.appendChild(popup);
            // await wait(10);
            popup.classList.add('open');

            popup.addEventListener(
                'submit',
                e => {
                    e.preventDefault();
                    person.lastName = e.target.lastName.value;
                    person.firstName = e.target.firstName.value;
                    person.birthday = e.target.bithdayDate.value;
                    const personWithCalculateDate = calcDistanceToBirthday(person)
                    resolve(personWithCalculateDate);
                    displayData(people)
                    destroyPopup(popup);
                }, { once: true }
            );

            const skipButton = document.querySelector('#cancel-btn');
            skipButton.addEventListener(
                'click',
                () => {
                  
                    destroyPopup(popup); //  resolve(null);
                },
                { once: true }
            );
     
        });
    };


    // Function for the delete the about the people .
    const deleteBirthdayPopup = id => {
        console.log(id);
        const filterIdOfPeople = people.filter(person => person.id != id);
        console.log(filterIdOfPeople);
        const selectedPerson = people.filter(person => person.id == id)[0];
        console.log(selectedPerson);
        let deleteDiv = document.createElement('div');
        deleteDiv.classList.add('popup');
        deleteDiv.insertAdjacentHTML('afterbegin', `
            <fieldset class ="want_to_delete">
                <h3>Delete ${selectedPerson.firstName} ${selectedPerson.lastName}</h3>
                <p>Are you sure you want to delete this person from the list?</p>
                <div class="deleted_button">
                    <button type="submit" class ='delete'>Delete</button>
                    <button type = "button" class ="cancel-delete">Cancel</button>
                </div>
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
            deleteBirthdayPopup(idToDelete);
        }
    }
    tbody.addEventListener('click', handleClick);

    const AddPersonPopup = () => {
        const popup = document.createElement('form');
        const todayDate = new Date().toISOString().slice(0 , 10);
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="add-form"> 
                <label for="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname">
                <label for="lastname">Last name</label>
                <input type="text" name="lastname" id="lastname">
                <label for="birthday">Birthday</label>
                <input type="date" id="birthday" name="birthday" max = "${todayDate}">
                <label for="image">Image</label>
                <input type="url" name="image">
                <div class="add-cancel-wrapper">
                    <button type="submit">Add</button>
                    <button type = "button" id ="cancel-btn"> Cancel</button>
                </div>
            </div>
        
            `
        document.body.appendChild(popup);
        // await wait(10);
        popup.classList.add('open');
        popup.addEventListener(
            "submit",
            e => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const newBirthday = {
                    lastName: formEl.lastname.value,
                    firstName: formEl.firstname.value,
                    birthday: formEl.birthday.value,
                    picture: formEl.image.value,
                    id: Date.now(),
                }
                calcDistanceToBirthday(newBirthday)
                people.push(newBirthday);
                console.log(people);
            
                displayData(people);
                destroyPopup(popup)
                popup.reset()
                tbody.dispatchEvent(new CustomEvent('listUpdated'));
            }
        )
        const skipButton = document.querySelector('#cancel-btn');
            skipButton.addEventListener(
                'click',
                () => {
                    destroyPopup(popup);
                },
                { once: true }
            );

    }

    Addbutton.addEventListener("click", AddPersonPopup)
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

    tbody.addEventListener('listUpdated', updateLocalStorage);
    initLocalStorage();

    displayData(people);

}

getData();