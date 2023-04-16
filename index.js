import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://my-list-app-f6ed4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldElement = document.getElementById("input-field")
const addButtonElement = document.getElementById("add-button")
const shoppingListElement = document.getElementById("shopping-list")

addButtonElement.addEventListener("click", function() {
    let inputValue = inputFieldElement.value

    push(shoppingListInDB, inputValue)

    clearInputFieldElement()
})

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListElement()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValues = currentItem[1]
            appendItemToShoppingListElement(currentItem)
        }
    } else{
        shoppingListElement.innerHTML = "No items here....yet" 
    }

})

function clearShoppingListElement(){
    shoppingListElement.innerHTML = ""
}
function clearInputFieldElement() {
    inputFieldElement.value = ""
}

function appendItemToShoppingListElement(item){
    // shoppingListElement.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    
    let newElement = document.createElement("li")
    newElement.textContent = itemValue
    shoppingListElement.append(newElement)

    newElement.addEventListener("dblclick", function (){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

}