const videoPlayer = document.getElementById("videoPlayer");
const circles = document.querySelectorAll('.circle');
const circleFaces = document.querySelectorAll('.circle-face');
const commentContainer = document.querySelector('.comments-container');
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-button");


function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
};

function randomCharacterFace() {
    const characters = ':)"{}_+~`<>.,?|\!@#$%^&*()-=[];';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
};

function randomFaceText() {
    const letters = Math.floor(Math.random() * 3) + 1;
    let faceText = '';
    for (let i = 0; i < letters; i++) {
        faceText += randomCharacterFace();
    }
    return faceText;
};

function randomizeCircleColor(circle) {
    circle.style.backgroundColor = randomColor();
};

function randomizeCircleFace(face) {
    face.textContent = randomFaceText();
};

function addComment() {
    if (commentInput.value.trim() !== '') {
        const newComment = document.createElement('div');
        newComment.className = 'comment-container';
        
        const circleContainer = document.createElement('div');
        circleContainer.className = 'circle-container';
        
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.backgroundColor = randomColor();
        
        const circleFace = document.createElement('div');
        circleFace.className = 'circle-face';
        circleFace.textContent = randomFaceText();
        
        circle.appendChild(circleFace);
        circleContainer.appendChild(circle);
        
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';
        
        const heart = document.createElement('img');
        heart.src = 'images/icons/heart.svg';
        heart.alt = 'heart';
        heart.className = 'heart';
        
        const heartText = document.createElement('div');
        heartText.className = 'heart-text';
        heartText.textContent = Math.floor(Math.random(0,100) * 100);
        
        heartContainer.appendChild(heart);
        heartContainer.appendChild(heartText);
        
        circleContainer.appendChild(heartContainer);
        newComment.appendChild(circleContainer);
        
        const commentTextDiv = document.createElement('div');
        commentTextDiv.style.padding = '0px 10px';
        commentTextDiv.style.width = '100%';
        
        const commentText = document.createElement('p');
        commentText.textContent = commentInput.value;

        commentTextDiv.appendChild(commentText);
        newComment.appendChild(commentTextDiv);

        commentContainer.appendChild(newComment);
        
        commentInput.value = '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let videoURL = localStorage.getItem("videoURL");
    console.log("Video Local URL:", videoURL); // Debugging log
    videoPlayer.src = videoURL;
    videoPlayer.parentElement.load();

    videoPlayer.onerror = function() {
        console.error("FAILED TO EXTRACT:", videoURL);
    };
});

commentButton.addEventListener('click', addComment);

circles.forEach(randomizeCircleColor);
circleFaces.forEach(randomizeCircleFace);
