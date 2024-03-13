class Crud {
    constructor(){
        this.url = 'https://65e15639d3db23f7624ace30.mockapi.io/users'
    }
//This is the asynchronous function that uses the post method to create a new user.
    async createNewContact(user) { 
        let response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(user),
            header: {
                'content-type': 'application/json'
            }
            
                
        })
        //This returns a confirmation response that the user has been created,
    
        let newChange = {
            name: 'Tiana Anderson',
            email: 'talove19@gmail.com',
            phone: '7988005695',
            
        
        }
        console.log("newUserAdded:", newChange);
        let data= await response.json();
        console.log("data:",data);
        return this.readAllContacts();

    }
    
//This is the asynchronous function that reads all the date from the users in the API and prints that array data in the console.
    async readAllContacts() {
        let response = await fetch(this.url);
        let data = await response.json();
        console.log("readAllContacts data:",data);

        //every time we perform a get request we call on the displayUsers function
        return this.displayUsers(data);
    }
//This is the asynchronous function that uses the PUT method to update a users data and prints that change to the console.
    async updateContacts(event, userId) {
        // console.clear(); //optional but clears the console when used.
console.log("Updating contacts...", userId);
let updatedContactEmail = document.getElementById(`update-contact-email-${userId}`).value
console.log("Updated Contact Email:", updatedContactEmail);

console.log("unique url:", `${this.url}/${userId}`);

        let response = await fetch(`${this.url}/${userId}`, {
            method: 'PUT',
            body:JSON.stringify({
                name: userName,
                email: updatedContactEmail,
                }),
                headers:{
                    'Content-Type':'application/json'
                    }
        })
        let confirmation = await response.json();
        console.log("confirmation",confirmation);

        return this.readAllContacts(); //fetches and displays the new data AFTER we updated the api
    }

//This is the asynchronous function that 
    async deleteContact(id) {
        let response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        })
        let confirmation = await response.json();
        console.log(confirmation);

        return this.readAllContacts();
    }

    displayUsers(userData){
        let userDataElement = document.getElementById("userData"); //get the id of the main element to populate with data
        userDataElement.innerHTML = ""; //clears out the html before populating it with the data.
        console.log("user data element:", userDataElement, "this is my user data:",userData);

        //loops through the userData array
for (let index = 0; index < userData.length; index++) {
    //loop - begin
    let userName = userData[index].name
    let userEmail = userData[index].email
    let userId = userData[index].id

    // console.log("Index:", index, userName);
    // user Data Container code
    let userDataContainer = document.createElement("div")

    //sets the id attribute: https://stackoverflow.com/questions/4851699/setting-the-id-attribute-of-an-input-element-dynamically-in-ie-alternative-for
    userDataContainer.setAttribute("id", `user-${userId}`);
    userDataContainer.innerHTML = `
    <div class="users">${userName}
    ${userEmail}
        <div>
            <!-- button actions will go here - begin -->

            <!-- button 1 -->
            <div id="update">
                <input type="text" id="update-contact-email-${userId}">
                <button id="updateContact-${userId}">Update Contact Email</button>
            </div>

            <!-- button 2 -->
            <div id="deleteContact">
                <input type="text" id="delete-contact-${userId}">
                <button id="deleteContact--${userId}">Delete Contact</button>
            </div>
            <!-- button actions will go here - end -->
        </div>
    </div>
    `

    // appends the user data information to the main element ie. userData on index.html
    userDataElement.appendChild(userDataContainer)

    //add a click eventlistener to the update contact button
    document.getElementById(`updateContact-${userId}`).addEventListener("click", (event) => this.updateContacts(event, userId)); 

    //loop - begin
}

      
    }
}





let project = new Crud();

// project.updateContacts();
project.createNewContact()
project.readAllContacts(); 
;
// project.deleteContact(19);