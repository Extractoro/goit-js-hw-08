/* 
Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
в которых сохраняй текущие значения полей формы. 
Пусть ключом для хранилища будет строка "feedback-form-state".

При загрузке страницы проверяй состояние хранилища, 
и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.

При сабмите формы очищай хранилище и поля формы, 
а также выводи объект с полями email, message и текущими их значениями в консоль.

Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
Для этого добавь в проект и используй библиотеку lodash.throttle. */
import throttle from 'lodash.throttle';
const formEl = document.querySelector('.feedback-form')
const emailEl = document.querySelector('input')
const messageEl = document.querySelector('textarea')
const LOCALSTORAGE = 'feedback-form-state';
const formValuesStorage = {};

formEl.addEventListener('submit', onSubmitBtn)
formEl.addEventListener('input', throttle(onFormChange, 500))

function onSubmitBtn(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.forEach((value, name) => {
        if (value === '') {
            alert('Все поля должны быть заполнены')
        }
        console.log('name:', name);
        console.log('value:', value);
    })
    e.target.reset()
    localStorage.removeItem(LOCALSTORAGE);
}

function onFormChange(e) {
    formValuesStorage[e.target.name] = e.target.value
    localStorage.setItem("feedback-form-state", JSON.stringify(formValuesStorage))
}


function onSaveText() {
    const savedMessage = localStorage.getItem("feedback-form-state")
    const parsedMessage = JSON.parse(savedMessage)

    if (parsedMessage) {
        emailEl.value = parsedMessage.email || ''
        messageEl.value = parsedMessage.message || ''
    }
}

onSaveText()