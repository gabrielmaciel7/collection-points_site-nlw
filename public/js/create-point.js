const UFSelect = document.querySelector("[name=uf]");
const citySelect = document.querySelector("[name=city]");
const stateInput = document.querySelector("[name=state]");

const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("[name=items]");
let selectedItems = [];

function clearCitySelect() {
  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
  citySelect.disabled = true;
}

function selectAPI(url, select) {
  fetch(url)
    .then((res) => res.json())
    .then((items) => {
      for (const item of items) {
        if (select === UFSelect)
          select.innerHTML += `<option value='${item.id}'>${item.nome}</option>`;
        if (select === citySelect)
          select.innerHTML += `<option value='${item.nome}'>${item.nome}</option>`;
      }
    });
}

function populateUFs() {
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  const select = UFSelect;

  selectAPI(url, select);
}

function populateCities(event) {
  const UFValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFValue}/municipios`;
  const select = citySelect;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  clearCitySelect();
  selectAPI(url, select);
  citySelect.disabled = false;
}

function setCollectedItems(itemLi) {
  const itemId = itemLi.dataset.id;
  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => item != itemId);
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  setCollectedItems(itemLi);
}

populateUFs();
clearCitySelect();

UFSelect.addEventListener("change", populateCities);

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}
