async function searchAddress(zipCode) {
  let messageError = document.querySelector('#erro')
  messageError.innerHTML = ''
  try {
    const zipCodeQuery = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
    const convertedZipCodeQuery = await zipCodeQuery.json()
    if(convertedZipCodeQuery.erro) {
      throw Error('CEP não existente')
    }
    const city = document.querySelector('#cidade')
    const publicPlace = document.querySelector('#endereco')
    const district = document.querySelector('#bairro')
    const state = document.querySelector('#estado')

    city.value = convertedZipCodeQuery.localidade
    publicPlace.value = convertedZipCodeQuery.logradouro
    district.value = convertedZipCodeQuery.bairro
    state.value = convertedZipCodeQuery.uf

    console.log(convertedZipCodeQuery)
    return convertedZipCodeQuery
  } catch(erro) {
    messageError.innerHTML = `<p> CEP inválido. Tente novamente</p>`
    console.log(erro)
  }
}

const zipCode = document.querySelector('#cep')
zipCode.addEventListener('focusout', () => searchAddress(zipCode.value))
