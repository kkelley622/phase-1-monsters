// - When the page loads, show the first 50 monsters. Each monster's name, age, and
//   description should be shown.

    // fetch data from this url http://localhost:3000/monsters/?_limit=50&_page=1

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters()
    createForm()
    document.querySelector("#monster-form").addEventListener("submit", (event) => {
        event.preventDefault()
        let name = document.querySelector('#monster-name')
        let age = document.querySelector('#monster-age') 
        let description = document.querySelector('#monster-description')

        monsterObj = {
            name,
            age,
            description
        }

        console.log(monsterObj)
        postNewMonster(monsterObj, event)
    })
    
})

const createForm = () => {
    let formContainer = document.querySelector("#create-monster")
    let form = document.createElement('form')
    form.id = 'monster-form'

    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')

    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')

    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "MAKE MONSTER!!"
    nameInput.id = "monster-name"
    ageInput.id = "monster-age"
    descriptionInput.id = "monster-description"


    h2.innerHTML = "Create Monster"
    nameLabel.innerText = "name"
    ageLabel.innerText = "age"
    descriptionLabel.innerText = "description"


    form.append(nameInput, nameLabel, ageInput, ageLabel, descriptionInput, descriptionLabel, button)
    formContainer.append(h2, form)
}

const postNewMonster = ({name, age, description}, event) => {
    event.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: "POST",
        headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
            },
        body: JSON.stringify({name, age, description})
    })
    .then(response => response.json)
    .then(monster => {
        addOneMonster(monster)
        event.target.reset 
    })
}

const fetchMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`) //first promise  
    .then(response =>  response.json()) //starts second promise
    .then (monsterData => {
        monsterData.forEach((monster) => {
            addOneMonster(monster)


    })
})
}

const addOneMonster = (monster) => {
        let monsterContainer = document.querySelector("#monster-container")
        let card = document.createElement("div")
        let name = document.createElement("h2")
        let age = document.createElement("h4")
        let description  = document.createElement("p")
        name.innerText = monster.name
        age.innerText = `Age: ${monster.age}`
        description.innerText = `Bio: ${monster.description}`

        card.append(name, age, description)
        monsterContainer.append(card)
}


// - Above your list of monsters, you should have a form to create a new monster.
//   You should have fields for name, age, and description, and a 'Create Monster
//   Button'. When you click the button, the monster should be added to the list
//   and saved in the API.
// - At the end of the list of monsters, show a button. When clicked, the button
//   should load the next 50 monsters and show them.