const root = document.querySelector("#root");

const form = document.createElement('form');

root.append(form);

const config = {
    country: ''
}

const URL = "./db.json";

const getData = () => fetch(URL)
    .then(response => response.json())
    .then(data => {
        for (let creator of selects(data)) creator.next();
    })
    .catch(error => console.log(`Fetch error - ${error}`));

function* selects(data) {
    yield* createSelect('country', data);
    yield* createSelect('cities', data);
    yield* createSelect('streets', data);
}

const selectChanged = (select, key) => {
    const selected = select.options[select.selectedIndex].value;
    config[key] = selected;
    console.log(config[key]);
    console.log(key);
    debugger;
    return selected;
}

const defaultOption = (key, select) => {
    const option = document.createElement('option');
    select.append(option);
    option.textContent = `Choose the ${key}`;
    option.setAttribute('value', key);
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
    select.setAttribute('onchange', `selectChanged(${select}, ${key})`);
    createOptions(data, select, key);
}

getData();