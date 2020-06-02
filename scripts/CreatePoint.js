function populateUf(){
  const ufSelect = document.querySelector('select[name=uf]')
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( res=> res.json())
    .then( states => {
      states.forEach(state=>{
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }) 
    })
}
populateUf()

function getCities(event){
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')
  const ufCode = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufCode}/municipios`)
    .then( res => res.json())
    .then( cities =>{
      cities.forEach(city => {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      })
      citySelect.disabled = false
    })
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)