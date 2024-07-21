const nameinput = document.querySelector('.nameinput');
const welcomeMessage = document.getElementById('welcomeMessage');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function start() {
    if (localStorage.getItem('name')) {
        nameinput.value = localStorage.getItem('name');
        console.log(`hello ${localStorage.getItem('name')}`);
    }
    if (localStorage.getItem('nameRemembered')) {
        welcomeMessage.textContent = `hi`;
        console.log(`current rememebered stage: ${localStorage.getItem('closedHTML')}`)

        if (localStorage.getItem('closedHTML') == "1") {
            welcomeMessage.textContent = `hey i rememebered your name!`
        }
        else if (localStorage.getItem('closedHTML') == "2") {
            var arrayWelcomeMessage = [
                "S", // 0
                "hi",
                "welcome again",
                "hey",
                "sello",
                "so welcome again", // 4
            ];
            welcomeMessage.textContent = arrayWelcomeMessage[getRandomNumber(0, 4)];
        }
    }
}

start();
//EventListeners
window.addEventListener('beforeunload', function(event) {
    console.log('bye bye');
    if (localStorage.getItem('closedHTML') == null || localStorage.getItem('closedHTML') == "" || localStorage.getItem('closedHTML') == "0" && nameinput.value) {
        localStorage.setItem('closedHTML', "1");
    }
    else if (localStorage.getItem('closedHTML') == "1") {
        localStorage.setItem('closedHTML', "2");
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'g' || event.key === 'G') {
        console.log('The "G" key was pressed');
    }
});

//fun stuff
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState == "visible") {
      console.log("hey..")
      welcomeMessage.textContent = `Welcome Back!`
    } 
    else {
      console.log("why did you leave...")
      welcomeMessage.textContent = `waiting for`
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const buttonsWithImages = document.querySelectorAll('.with-image');
    buttonsWithImages.forEach(button => {
        const imageUrl = button.getAttribute('data-image');
        button.style.backgroundImage = `url('${imageUrl}')`;
    });
});

nameinput.addEventListener('change', function() {
    localStorage.setItem('name', nameinput.value);
    localStorage.setItem('nameRemembered', true);
    if (localStorage.getItem('closedHTML')) {
        localStorage.setItem('closedHTML', "0");
    }
});