const API_URL='https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events';

const state ={
    events:[],
};

const EventList = document.querySelector("#Events");

const addEventForm=document.querySelector("#addEvent");
addEventForm.addEventListener("submit",addEvent);

/*
* sync state with the API and renderer
*/
async function render(){
    await getEvent();
    renderEvent();
}
//render initial page
render();
// get event from server through API
async function getEvent(){
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data
    } catch (error) {
        console.error(error);
    }
}
// render the events on server to HTML page
async function renderEvent(){
    if(state.events.length===0){
        EventList.innerHTML = "<li>No artist</li>"
      }
      const eventCard = state.events.map((event)=>{
        const li = document.createElement('li');
        li.classList.add(event.id);
        li.innerHTML=`<h2>${event.name}</h2>
        <h3>${event.date}</h3>
        <h3>${event.time}</h3>
        <h3>${event.location}</h3>
        <p>${event.description}</p>
        <button onclick="deleteEvent(${event.id})" id=${event.id}>delete</button>
        `;
        return li;
      })
      EventList.replaceChildren(...eventCard)
}
// async function deleteEvent(id){
//     // tried to just remove the <li> from <ul>, doesn't work
//     // .remove() is not a function
//     // .parenetNode is undefined

//     //const li=document.getElementsByClassName(id);
//     //li.remove();

//     // so may be better off just to delete it from the server and then render

//     try {
//         const response= await fetch(`${API_URL}/${id}`,{
//             method: "DELETE",
//             header:{"Content-type":"application/json",},
//         });
//     } catch (error) {
//         console.error(error);
//     }
//     render();
// }

/**
 * Ask the API to create a new event based on form data
 * @param {Event} event
 */
// async function addEvent(event){
//     event.preventDefault();
//   const da= new Date(addEventForm.date.value)

//   try {
//     const response= await fetch(API_URL,{
//       method: "POST",
//       header:{"Content-Type":"application/json"},
//       body: JSON.stringify({
//         name: addEventForm.name.value,
//         description: addEventForm.description.value,
//         date: da.toISOString(),
//         //addEventForm.time.value,
//         location: addEventForm.location.value

//       })
      
//     }) 
//     console.log(addEventForm.name.value);
//       addEventForm.name.value="";
//       addEventForm.description.value='';
//       addEventForm.date.value='';
//       //addEventForm.time.value='';
//       addEventForm.location.value='';

//       const result= await response.json();
//       console.log(result);
//       if(result.success){
//         console.log("Added successfully")
//       }else{
//         console.log("failed to add event")
//       }
//       render();
      
//   } catch (error) {
//     console.log(error)
//   }

  

async function addParty(event) {
  event.preventDefault();
  const da = new Date(addEventForm.date.value);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: addEventForm.name.value,
        description: addEventForm.description.value,
        date: da.toISOString(),
        location: addEventForm.location.value
      })
    });
    addEventForm.name.value = '';
    addEventForm.description.value = '';
    addEventForm.date.value = '';
    addEventForm.location.value = '';

    let result = await response.json();
    console.log(result);

    if (result.success) {

      console.log('added party successfully');

    } else {

      console.log('failed to add party');

    }

    render();

  } catch (error) {
    console.error(error);
  }
}


    // await createEvent(
    //     addEventForm.name.value,
    //     addEventForm.description.value,
    //     Da.toISOString(),
    //     //addEventForm.time.value,
    //     addEventForm.location.value

    //   );
      


// async function createEvent(name,description,date,location){
    
//     try {
//       const response= await fetch(API_URL,{
//         method: "POST",
//         header: {"Content-Type":"application/json"},
//         body: JSON.stringify({name,description,date,location}),
//       });
      
//       const json =await response.json();
//     //   if(json.error){
//     //     throw new Error(json.message)
//     //     console.log("fail to create event")
//     //   }
//       render();
//     } catch (error) {
//       console.error(error);
//       console.log(error);
//     }
//   }