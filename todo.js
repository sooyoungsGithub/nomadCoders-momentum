const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input");
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];


function deleteToDO(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        console.log(li.id, toDo.id);
        return toDo.id !== parseInt(li.id);
    });
   toDos = cleanToDos;
   saveToDos();
}

function saveToDos() {
    // 로컬스토리지에는 데이터를 string형태로만 저장됨
    // JSON.stringify -> 어떠한 자바스크립트 object를 string으로 변환시켜줌
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "x";
    delBtn.addEventListener("click", deleteToDO);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    // push 후에 호출해주기
    // 저장할것을 가져온 후 호출해줘야 저장됨.
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos() {
    const loaededToDos = localStorage.getItem(TODOS_LS);
    if (loaededToDos !== null) {
        const parsedToDos = JSON.parse(loaededToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
