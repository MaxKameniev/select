const root = document.querySelector("#root");

const form = document.createElement('form');

root.append(form);

const URL = "./db.json";

const getData = () => fetch(URL)
    .then(response => response.json())
    .then(data => {
       selects(data).next();
    })
    .catch(error => console.log(`Fetch eerror - ${error}`));

function* selects(data) {
    yield* createSelect('country', data);
    yield* createSelect('cities', data);
    yield* createSelect('streets', data);
}

const selectChanged = select => {
    const selected = select.options[select.selectedIndex].value;
    console.log(selected);
    return selected;
}

const createOptions = (data, select, key) => {
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
    select.setAttribute('onchange', 'selectChanged(this)');
    createOptions(data, select, key);
}

getData();