function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")
    document
        .querySelector('#container')
        .classList
        .toggle('hide')
    document
        .querySelector('body')
        .classList
        .toggle('hideScroll')
    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}   

function checkFields(event) {

    const valuesToCheck = [
        'title',
        'category',
        'image',
        'description',
        'link'
    ];

    const isEmpty = valuesToCheck.find(value => {
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && haveOnlySpaces){
            return true;
        }
    })

    if(isEmpty){
        event.preventDefault();
        alert('Por favor, preencha todos os campos')
    }

}

function atualizarIdea( id ){
    location.href = `http://localhost:3000/ideias/atualize/${id}` //Atualizar na produção
}