const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const noTask = document.querySelector('.no-task');

let current_todos = JSON.parse(localStorage.getItem('todos')) || [];
let nb_todos = 0;
// const html_templete = `
//     <li class="list-group-item d-flex justify-content-between align-items-center text-light">
//         <span>Hello mate, enjoy using my todo app</span>
//         <i class="far fa-trash-alt delete"></i>
//     </li>
//     <li class="list-group-item d-flex justify-content-between align-items-center text-light">
//         <span>Don't forget to practice some programming skills today</span>
//         <i class="far fa-trash-alt delete"></i>
//     </li>
// `;
// list.innerHTML += html_templete;


function showEmptyMessage() {
    if(nb_todos) noTask.classList.add('d-none');
    else noTask.classList.remove('d-none');
}

const generateTemplate = todo => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center text-light">
         <span>${todo}</span>
         <i class="far fa-trash-alt delete"></i>
      </li>
    `;

    list.innerHTML += html;
};

// add todos
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
        current_todos.push(todo);
        nb_todos++ ;
        localStorage.setItem('todos', JSON.stringify(current_todos));
        showEmptyMessage();
    }

});


//delete todos
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        const value = e.target.previousElementSibling.textContent;
        current_todos = current_todos.filter(ele => ele != value);
        localStorage.setItem('todos', JSON.stringify(current_todos));
        e.target.parentElement.remove();
        nb_todos-- ;
        showEmptyMessage();
    }
});

// search todos
const filterTodos = (term) => {

    Array.from(list.children)
      .filter(todo => !todo.textContent.toLowerCase().includes(term))
      .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
      .filter(todo => todo.textContent.toLowerCase().includes(term))
      .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

if(localStorage.getItem('todos')){
    JSON.parse(localStorage.getItem('todos'))
        .forEach(todo => {
            generateTemplate(todo);
            addForm.reset();
            nb_todos++;
        });
}

showEmptyMessage();