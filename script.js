let input = document.querySelector(".task-input");
let addBtn = document.querySelector(".add-btn");
let todoList = document.querySelector(".todo");
let completedList = document.querySelector(".completed");
let checkFlag = false;
let taskArr = [];

// let flag = false;
completedList.style.display = "none";

let tasksbtn = document.querySelector(".tasks-heading");
let completedbtn = document.querySelector(".completed-heading");

tasksbtn.addEventListener("click",(e)=>{
    completedList.style.display = "none";
    todoList.style.display = "block";
    // tasksbtn.style.textShadow = "-2px -1px 13px red"
    // completedbtn.style.textShadow = "0px 0px 0px white";
})
completedbtn.addEventListener("click",(e)=>{
    todoList.style.display = "none";
    completedList.style.display = "block";
    // completedbtn.style.textShadow = "-2px -1px 13px red"
    // tasksbtn.style.textShadow = "0px 0px 0px white";
})

if(localStorage.getItem("task-list")){
    taskArr = JSON.parse(localStorage.getItem("task-list"));

    taskArr.forEach((taskObj) => {

        createTask(taskObj.task, taskObj.status, taskObj.taskId);
    })
}

input.addEventListener("keydown", (e) => {
if(e.key!=="Enter") return;
   let task = input.value;
   if (!task) return;
   createTask(task, "todo");
   
})

function createTask(task, status, id){
   let taskId = id || shortid();
   let taskElem = document.createElement("li");
   taskElem.setAttribute("class", "task-li");
   taskElem.setAttribute("status", status);
   taskElem.setAttribute("id", taskId);
   taskElem.innerHTML = `
       <div class="task">${task}</div>
       <div class="action-btns">
           <span class="material-icons delete">
               delete_outline
           </span>
           <span class="material-icons check">
               check_circle_outline
           </span>
       </div>
   `;
   if(status == "todo"){
       todoList.appendChild(taskElem);
   }
   else if(status == "completed"){
       completedList.appendChild(taskElem);
   }

   if(!id){
   taskArr.push({taskId : taskId, task, status});
   localStorage.setItem("task-list", JSON.stringify(taskArr));}
   input.value = "";

   let deleteBtn = taskElem.querySelector(".delete");
   let checkBtn = taskElem.querySelector(".check");

   deleteBtn.addEventListener("click", deleteListener);
   checkBtn.addEventListener("click", toggleCheckListener);
}

function deleteListener(e) {
   let taskElem = e.target.parentElement.parentElement;
   let taskElemClass = taskElem.parentElement.getAttribute("class");
   let taskElemId = taskElem.getAttribute("id");
   let taskIdx = getTaskIdx(taskElemId);

   if (taskElemClass === "todo") {
       todoList.removeChild(taskElem);
   }
   else if (taskElemClass === "completed") {
       completedList.removeChild(taskElem);
   }

   taskArr.splice(taskIdx, 1);
   localStorage.setItem("task-list", JSON.stringify(taskArr));
}

function toggleCheckListener(e) {
   let taskElem = e.target.parentElement.parentElement;
   let taskElemClass = taskElem.parentElement.getAttribute("class");
   let taskElemId = taskElem.getAttribute("id");
   let taskIdx = getTaskIdx(taskElemId);

   if (taskElemClass === "todo") {
       todoList.removeChild(taskElem);
       completedList.appendChild(taskElem);
       taskElem.setAttribute("status", "completed");
       e.target.style.color = "#1abc9c";
       taskArr[taskIdx].status = "completed";
   }
   else if (taskElemClass === "completed") {
       completedList.removeChild(taskElem);
       todoList.appendChild(taskElem);
       taskElem.setAttribute("status", "todo");
       e.target.style.color = "#95a5a6";
       taskArr[taskIdx].status = "todo";
   }

   localStorage.setItem("task-list", JSON.stringify(taskArr));
}

function getTaskIdx(id){
   let taskIdx = taskArr.findIndex((taskObj) => {
       return taskObj.taskId === id;
   })

   console.log(id);
   console.log(taskArr);
   //console.log(taskObj.id);
   console.log(taskIdx);

   return taskIdx;
}