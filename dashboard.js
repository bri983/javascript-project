const toast = (message, bgColor = "red", color = "white", fontWeight = "bold", marginTop = "50px", borderRadius = "50px") => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: bgColor,
            color: color,
            fontWeight: fontWeight,
            marginTop,
            borderRadius,
        },
        onClick: function () { },
    }).showToast();
};


let obj = {}
const addNote = () => {
    const note = title.value.trim();
    const notes = noteInput.value.trim();
    const input = document.getElementById("image")
    const file = input.files[0]
    console.log(file);
    if (note === "" || notes === "") {
        // alert("fill all input")
        toast('Please fill all the fields', 'blue', 'white', 'bold', '50px', '50px')
        return;
    }
    // else if (!/^[A-Z]/.test(note)) {
    //     alert("Title must contain only capital letters (A-Z) with no spaces.");
    //     return;
    // }
    else if (note === "") {
        alert("Please Add  Title");
        return;
    }
    else if (notes === "") {
        alert("Please add a Note");
        return;

    }
    else if(file === ""){
        alert("add your image")
    }
    else if (file == undefined) {
        imageShow = ""
        obj = {
            note,
            notes,
            imageShow
        }
        allNote.push(obj)
        localStorage.setItem("user", JSON.stringify(allNote))
        console.log(allNote);
        displayNotes();
        title.value = "";
        noteInput.value = "";
    }
    else {

        const reader = new FileReader;
        reader.addEventListener("load", (e) => {
            imageShow = e.target.result
            obj = {
                note,
                notes,
                imageShow
            }
            allNote.push(obj)
            localStorage.setItem("user", JSON.stringify(allNote))
            console.log(allNote);
            displayNotes();
            title.value = "";
            noteInput.value = "";
        })
        reader.readAsDataURL(file)

    }
}

const deleteNote = (book) => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
        allNote.splice(book, 1);
        localStorage.setItem("user", JSON.stringify(allNote))
        console.log(allNote);

        displayNotes();
    }
}

const allNote = JSON.parse(localStorage.getItem('notes')) || [];
show.innerHTML = (allNote)
console.log(allNote);
displayNotes()

function displayNotes() {
    show.innerHTML = "";
    allNote.map((output, index) => {
        show.innerHTML += `
            <div class="mb-3 pt-3 ps-3 pb-5 border border-light rounded-3 text-white card" style="background-color: rgb(32,33,36); position: relative;">
                <h3>${output.note}</h3>
                <p class="pt-2 pe-3">${output.notes}</p>
                ${output.imageShow ? `<img class="imageStyle" id="image${index}" src="${output.imageShow}" />` : ""}
                <div class="d-flex justify-content-center gap-2" style="position: absolute; bottom:10px;">
                    <button class="btn btn-danger" onclick="deleteNote(${index})" style="width:100px;">Delete</button>
                    <button class="btn btn-warning" onclick="editNote(${index})" style="width:100px;">Edit</button>
                </div>
            </div>`;
    });
}
const editTitle = document.getElementById("newTitle")
const editText = document.getElementById("newText")
const editNoteParent = document.querySelector(".editNote")
const panel = document.querySelectorAll(".blur")
const saveChange = document.getElementById("saveChange")
let i;
const editNote = (index) => {
    i = index
    editNoteParent.style.display = "flex"
    panel.forEach((e) => {
        e.style.filter = "blur(10px)"
    })
    editTitle.value = allNote[index].note
    editText.value = allNote[index].notes
    
}

saveChange.addEventListener("click",()=>{
    allNote[i].note = editTitle.value
    allNote[i].notes = editText.value
    editNoteParent.style.display = "none"
    panel.forEach((e) => {
        e.style.filter = "blur(0px)"
    })
    displayNotes()
})

// Hide & Show

const title = document.getElementById("title")
const noteInput = document.getElementById("noteInput")
const stay = document.getElementById("stay")
const btn = document.getElementById("btn")

document.addEventListener("click", (e) => {
    if (e.target == title || e.target == noteInput || e.target == stay || e.target == btn) {
        const allShow = document.querySelectorAll(".show")
        allShow.forEach((show) => {
            show.style.display = "block"
        })
        document.querySelector(".note").style.height = "250px"
    }
    else {
        const allShow = document.querySelectorAll(".show")
        allShow.forEach((show) => {
            show.style.display = "none"
        })
        document.querySelector(".note").style.height = "150px"
    }
})



const iconClick = () => {
    const spans = document.querySelectorAll(".span");
    spans.forEach(span => {
        // Toggle display between "inline" and "none"
        if (span.style.display === "inline") {
            span.style.display = "none";
            span.style.color = "none";
        } else {
            span.style.display = "inline";
        }
    });
}

const showSpan = () => {
    const icon = document.querySelectorAll(".span")
    icon.forEach((span) => {
        span.style.display = "inline";
        // span.style.color = "yellow";        span.style.fontWeight = "bold";
        // span.style.transition = "1s ease"

    })
}
const hideSpan = () => {
    const icon = document.querySelectorAll(".span")
    icon.forEach((span) => {
        span.style.display = "none";
    })
}



const showText = () => {
    hoverText.style.display = "block"
}

const removeText = () => {
    hoverText.style.display = "none"

}
