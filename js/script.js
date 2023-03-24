'use strict';

const formElem = document.getElementById('form');
const inputElem = document.getElementById('input');
const toDoElem = document.getElementById('todo-list');
const clearBtn = document.getElementById('btn-clear');

let toDoList = JSON.parse(localStorage.getItem('toDo')) || [];




const showBtnClear = () => {
    if(!!toDoList.length) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
};


const addArrayToLocalStorage = function() {
    localStorage.setItem('toDo', JSON.stringify(toDoList));
};


const examinationValue = function (value) {
    return value.trim() ? true : false;
};


const render = () => {
    toDoElem.innerHTML = '';

    toDoList.forEach((toDoItem, indexItem) => {
        const li = document.createElement('li');

        li.classList.add('item');

        li.insertAdjacentHTML('beforeend', `
                <div class="item__controller">
                <div class="item__controller-wrap">
                    <textarea disabled>${toDoItem.text}</textarea>
                    <div class="item__edit-controller">
                    <i class="fas fa-check-square done" ${toDoItem.done ? 'style = "color: limegreen"' : ''}></i> 
                        <i class="fa-solid fa-pen-to-square edit"></i>
                        <i class="fas fa-trash remove"></i>
                    </div>
                </div>
                    <div class="item__update-controller" style="display: none;">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>
            `);

        toDoElem.append(li);


        li.addEventListener('click', (e) => {
            const textEdit = li.querySelector('.item__controller textarea');
            const updateBlock = li.querySelector('.item__update-controller');

            if (e.target.classList.contains('done')) {
                e.target.style.color = 'limegreen';
                toDoItem.done = !toDoItem.done;
                addArrayToLocalStorage();
                render();
            } else if (e.target.classList.contains('remove')) {
                toDoList.splice(indexItem, 1);
                addArrayToLocalStorage();
                render();
            } else if (e.target.classList.contains('edit')) {
                textEdit.style.border = '1px solid #000';
                textEdit.removeAttribute('disabled');
                updateBlock.style.display = 'block';
            } else if (e.target.classList.contains('saveBtn') || e.target.classList.contains('cancelBtn')) {

                textEdit.style.border = 'none';
                textEdit.setAttribute('disabled', 'true');
                updateBlock.style.display = 'none';
                addArrayToLocalStorage();
                render();
            }

            if (e.target.classList.contains('saveBtn')) {
                toDoItem.text = textEdit.value;
                addArrayToLocalStorage();
                render();
            }

        });

    });

    showBtnClear();
};


formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    if (examinationValue(inputElem.value)) {

        const toDoItem = {
            text: inputElem.value,
            done: false,
        };

        toDoList.push(toDoItem);

        addArrayToLocalStorage();
        render();
        
        inputElem.value = '';
    }
});



clearBtn.addEventListener('click', () => {
    localStorage.clear();
    toDoList = [];
    render();
});


render();