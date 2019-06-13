const root = document.querySelector("#root");

const form = document.createElement('form');

root.append(form);

const config = {};

const URL = "./db.json";

const getData = () => fetch(URL)
    .then(response => response.json())
    .then(data => {
        getSelection(data);
    })
    .catch(error => console.log(`Fetch error - ${error}`));

const getSelection = (data) => {
    createSelect('country', data);
    createSelect('cities', data);
    createSelect('streets', data);
} 

const selectChanged = (select, key) => {
    config[key] = select.options[select.selectedIndex].value;
}

const defaultOption = (key, select) => {
    const option = document.createElement('option');
    select.append(option);
    option.textContent = `Choose the ${key}`;
    option.setAttribute('value', 'default');
}

const createOptions = (data, select, key) => {
    defaultOption(key, select);
    data.map(el => {
        const option = document.createElement('option');
        select.append(option);
        option.textContent = el[key];
        option.setAttribute('value', el[key]);
    })
}

const createSelect = (key, data) => {
    const select = document.createElement('select');
    form.append(select);
    select.setAttribute('name', key);
    select.onclick = () => selectChanged(select, key);
    createOptions(data, select, key);
}

getData();