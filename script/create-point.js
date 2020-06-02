const UFSelect = document.querySelector("[name=uf]");
const citySelect = document.querySelector("[name=city]");
const stateInput = document.querySelector("[name=state]");

function clearCitySelect() {
  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
}

function selectAPI(url, select) {
  fetch(url)
    .then((res) => res.json())
    .then((items) => {
      for (const item of items) {
        select.innerHTML += `<option value='${item.id}'>${item.nome}</option>`;
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

populateUFs();
clearCitySelect();

UFSelect.addEventListener("change", populateCities);
