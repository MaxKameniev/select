const root = document.querySelector("#root");

const form = document.createElement('form');

root.append(form);

const URL = "./db.json";

const getData = () => fetch(URL)
    .then(response => response.json())
    .then(data => {
        createSelect('country', data);
        createSelect('cities', data);
    })
    .catch(error => console.log(error));

const selectChanged = select => {
    const selected = select.options[select.selectedIndex].value;
    console.log(selected);
}

const createOptions = (data, select, key) => {
    data.map(el => {
        const option = document.createElement('option');
        select.append(option);
        option.textContent = el[key] || el;
        option.setAttribute('value', el[key] || el);
    })
}

const createSelect = (key, data) => {
    const select = document.createElement('select');
    form.append(select);
    select.setAttribute('name', key);
    select.setAttribute('onchange', 'selectChanged(this)');
    createOptions(data, select, key);
}

getData();