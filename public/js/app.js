console.log('Client Side functions loading')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent= '';
messageTwo.textContent= '';

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
fetch('http://localhost:3000/weather?address=' + location ).then((response)=>{
    response.json().then((data) =>{

        if(data.error)
        {
            messageOne.textContent=  data.error           
        }
        else
        {
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast.Temperature
            console.log(data.forecast.Temperature)          
        }
})
})
})