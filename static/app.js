 
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages_item messages_item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages_item messages_item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

// /*=============== SHOW MENU ===============*/
// const navMenu = document.getElementById('nav-menu'),
//       navToggle = document.getElementById('nav-toggle'),
//       navClose = document.getElementById('nav-close')

// /*===== MENU SHOW =====*/
// /* Validate if constant exists */
// if(navToggle){
//     navToggle.addEventListener('click', () =>{
//         navMenu.classList.add('show-menu')
//     })
// }

// /*===== MENU HIDDEN =====*/
// /* Validate if constant exists */
// if(navClose){
//     navClose.addEventListener('click', () =>{
//         navMenu.classList.remove('show-menu')
//     })
// }


// /*=============== REMOVE MENU MOBILE ===============*/
// const navLink = document.querySelectorAll('.nav__link')

// const linkAction = () =>{
//     const navMenu = document.getElementById('nav-menu')
//     // When we click on each nav__link, we remove the show-menu class
//     navMenu.classList.remove('show-menu')
// }
// navLink.forEach(n => n.addEventListener('click', linkAction))


// /*=============== CHANGE BACKGROUND HEADER ===============*/
// const scrollHeader = () =>{
//     const header = document.getElementById('header')
//     // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
//     this.scrollY >= 50 ? header.classList.add('bg-header') 
//                        : header.classList.remove('bg-header')
// }
// window.addEventListener('scroll', scrollHeader)

// /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll('section[id]')
    
// const scrollActive = () =>{
//   	const scrollY = window.pageYOffset

// 	sections.forEach(current =>{
// 		const sectionHeight = current.offsetHeight,
// 			  sectionTop = current.offsetTop - 58,
// 			  sectionId = current.getAttribute('id'),
// 			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

// 		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
// 			sectionsClass.classList.add('active-link')
// 		}else{
// 			sectionsClass.classList.remove('active-link')
// 		}                                                    
// 	})
// }
// window.addEventListener('scroll', scrollActive)


// /*=============== SHOW SCROLL UP ===============*/
// const scrollUp = () =>{
// 	const scrollUp = document.getElementById('scroll-up')
//     // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
// 	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
// 						: scrollUp.classList.remove('show-scroll')
// }
// window.addEventListener('scroll', scrollUp) 


// /*=============== SCROLL REVEAL ANIMATION ===============*/
// const sr = ScrollReveal({
//     origin:'top',
//     distance:'60px',
//     duration: 2500,
//     delay:400,
// }) 

// sr.reveal(`.home__data, .footer__container, .footer__group`)
// sr.reveal(`.home__img`, {delay: 700, origin:'bottom'})
// sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
// sr.reveal(`.choose__img, .calculate__content`, {origin:'left'})
// sr.reveal(`.choose__content, .calculate__img`, {origin:'right'})


// /*=============== CALCULATE JS ===============*/
// const calculateForm = document.getElementById('calculate-form'),
//       calculateCm = document.getElementById('calculate-cm'),
//       calculateKg = document.getElementById('calculate-kg'),
//       calculateMessage = document.getElementById('calculate-message')

// const calculateBmi = (e) =>{
//     e.preventDefault()

//     //Check if the fields have a value
//     if(calculateCm.value ===''|| calculateKg.value === ''){
//         // Add and remove color
//         calculateMessage.classList.remove('color-green')
//         calculateMessage.classList.add('color-red')

//         // Show message
//         calculateMessage.textContent = 'Fill in the Height and Weight 😊'

//         // Remove message three seconds
//         setTimeout(() =>{
//             calculateMessage.textContent = ''
//         },3000)
//      }else{
//         //BMI Formula
//         const cm = calculateCm.value / 100,
//               kg = calculateKg.value,
//               bmi = Math.round(kg / (cm * cm)) 

//         // Show your health status
//         if(bmi <18.5){
//             // Add color and display message
//             calculateMessage.classList.add('color-green')
//             calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😕`
//         } else if(bmi< 25){
//             calculateMessage.classList.add('color-green')
//             calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 🥰`
//         }else{
//             calculateMessage.classList.add('color-green')
//             calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😣`

//         }

//         // To clear the input field
//         calculateCm.value = ''
//         calculateKg.value = ''

//         //Remove message four seconds
//         setTimeout(() =>{
//             calculateMessage.textContent = ''
//         },4000)
//      }
// }

// calculateForm.addEventListener('submit', calculateBmi)




// /*=============== EMAIL JS ===============*/


