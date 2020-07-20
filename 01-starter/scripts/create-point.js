// This script gets the Brazilian States and Cities.
function populateFS() {
  const fsSelect = document.querySelector("select[name=fs]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        fsSelect.innerHTML += `<option value="${state.id}">${state.nome} (${state.sigla})</option>`;
      }
    });
}

populateFS();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const fsValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${fsValue}/municipios`;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome} - ${city.microrregiao.mesorregiao.UF.sigla}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=fs]").addEventListener("change", getCities);
