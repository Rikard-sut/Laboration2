window.addEventListener('load', () => {
    addTogglefunction();
    searchForPeople();
    deleteFavButton();
    editFavButton();
    addOwnFav();
})


function searchForPeople() {
    //Liten funktion först här för att ta bort info i listan vid ny sökning.
    let sendButton = document.querySelector('.sendbutton');
    sendButton.addEventListener('click', () => {
        let list = document.querySelector('.api-list-container ul')
        if (list) {
            list.remove();
        }
    })
    const url = 'https://swapi.dev/api/people/?search=';
    sendButton.addEventListener('click', async () => {
        const options = {
            method: 'GET'
        }
        try {

            let searchValue = document.querySelector('.search-field').value;
            let qs = searchValue;

            const response = await fetch(url + qs, options);
            const json = await response.json();
            const apiList = json.results;
            console.log(apiList);

            let container = document.querySelector('.api-list-container');
            let listOfNewPeople = document.createElement('ul');

            //Här sätter jag hela ledet av att fylla på listan med async await.
            //för att kunna hämta ut homeworld också. Lägger till En Promse.Resolve()
            //i slutet på fetchHomeworld för att man faktiskt ska få ut ett värde
            // å inte bara ett promise.
            // Hade mycket problem här.
            for (let i of apiList) {
                let person = await addPeopleToDom(i);
                listOfNewPeople.appendChild(person);
            }
            container.appendChild(listOfNewPeople);
        }
        catch{
            console.log("kunde inte hämta info");
        }
    })
}
async function addPeopleToDom(person) {
    let info = document.createElement('li');
    let homeworld = await fetchHomeWorld(person.homeworld);
    console.log(homeworld);
    info.innerText = `Namn: ${person.name}. Hemvärld: ${homeworld}`;
    createFavButton(info);

    return info;
}
async function fetchHomeWorld(url) {
    const options = {
        method: 'GET'
    }
    let queryString = url.replace(http,https);
    const response = await fetch(queryString, options);
    const json = await response.json();
    console.log(json.name);
    homeworldName = Promise.resolve(json.name);
    return homeworldName;
}
function addTogglefunction() {
    let resultButton = document.querySelector('.api-button');
    let resultContainer = document.querySelector('.api-list-container');
    let favouriteContainer = document.querySelector('.favourite-list-container');

    resultButton.addEventListener('click', event => {
        resultContainer.classList.toggle('display-list');
        resultButton.classList.toggle('favourite-active');

    })
    resultButton.addEventListener('click', event => {
        favouriteContainer.classList.toggle('dont-display')
    })
}

function createFavButton(listElement) {
    let addFavButton = document.createElement('button');
    addFavButton.labels
    let favouriteContainer = document.querySelector('.favourite-list');
    addFavButton.addEventListener('click', event => {
        let newFavourite = document.createElement('li');
        newFavourite.innerText = listElement.innerText;
        favLiSelect(newFavourite);
        favouriteContainer.appendChild(newFavourite);
    })
    listElement.append(addFavButton);
}
function favLiSelect(li) {
    li.addEventListener('click', event => {
        li.classList.toggle('active');
    })
}
function deleteFavButton() {
    let deletFavbutton = document.querySelector('.remove-fav');
    deletFavbutton.addEventListener('click', event => {
        let liToDelete = document.querySelectorAll('.active');
        for (let i of liToDelete) {
            i.remove();
        }
    })
}
function editFavButton() {
    let editFavButton = document.querySelector('.edit-fav');
    editFavButton.addEventListener('click', event => {
        let liToEdit = document.querySelector('.active');
        let editField = document.createElement('input');
        let editFinishedButton = document.createElement('button');
        editFinishedButton.innerText = "klar";
        editFinishedButton.style.backgroundColor = "Black";
        editFinishedButton.style.color = "White";

        editField.value = liToEdit.innerText;
        editField.style.width = "100%";
        liToEdit.append(editField);
        liToEdit.append(editFinishedButton);
        editFinishedButton.addEventListener('click', event => {
            liToEdit.innerText = editField.value;
        })

    })
}
function addOwnFav(){
    let addOwnFavButton = document.querySelector('.add-own');
    let favList = document.querySelector('.favourite-list');
    let name = "Namn: ";

    addOwnFavButton.addEventListener('click', event => {
        let infoField = document.createElement('input');
        let infoFinishedButton = document.createElement('button');
        infoFinishedButton.innerText = "Klar";
        infoFinishedButton.style.backgroundColor = "Black";
        infoFinishedButton.style.color = "White";

        infoField.style.width = "90%";
        favList.append(infoField);
        favList.append(infoFinishedButton);

        infoFinishedButton.addEventListener('click', event =>{
            let newPerson = document.createElement('li');
            newPerson.innerText = infoField.value;
            favLiSelect(newPerson);
            infoField.remove();
            infoFinishedButton.remove();
            favList.append(newPerson);
        })
    })
}