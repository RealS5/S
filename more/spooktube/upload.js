const dropArea = document.querySelector(".sqaure-corners");
const inputFile = document.getElementById("input-file");
const uploadView = document.querySelector(".upload-view")

function upload(file) {
    let fileReader = new FileReader();
    fileReader.onload = ()=>{
        localStorage.setItem("videoURL", fileReader.result)
        console.log(file);
        window.location.replace('video/');
    }
    fileReader.readAsDataURL(file);
}

function drop(event) {
    event.preventDefault();
    let file
    if (event.type == 'change') {
        file = event.target.files[0];
    }
    else {
        file = event.dataTransfer.files[0];
    }
    
    upload(file);
}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {
    
}

dropArea.addEventListener('dragover', dragOver)
dropArea.addEventListener('draglever', dragLeave)
dropArea.addEventListener('drop', drop)
inputFile.addEventListener("change", drop)