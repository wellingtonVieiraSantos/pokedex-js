const api = 'https://pokeapi.co/api/v2/pokemon/'

let id = 1
const pokemonMaximo = 649

const buttonNext = document.querySelector('.next')
const buttonPrev = document.querySelector('.prev')

const pokemonName = document.querySelector('#name')
const pokemonId = document.querySelector('#id')

const pokemonTypes = {
    'normal': {
        'bg':'#b5b5aa',
        'color': '#000'
    },
    'grass': {
        'bg': '#82C961',
        'color': '#000'
    },
    'water': {
        'bg':'#4DA6FA',
        'color': '#fff'
    },
    'fire': {
        'bg':'#F0514B',
        'color': '#fff'
    },
    'fighting': {
        'bg':'#B25E57',
        'color': '#fff'
    },
    'flying': {
        'bg':'#749EF2',
        'color': '#fff'
    },
    'poison': {
        'bg':'#A55E9A',
        'color': '#fff'
    },
    'ground': {
        'bg':'#DBBE5F',
        'color': '#000'
    },
    'rock': {
        'bg':'#BFB076',
        'color': '#000' 
    },
    'bug': {
        'bg':'#B7C44E',
        'color': '#000'
    },
    'ghost': {
        'bg':'#7976C2',
        'color': '#fff'
    },
    'electric': {
        'bg':'#F6D25A',
        'color': '#000' 
    },
    'psychic': {
        'bg':'#EB61A6',
        'color': '#fff'
    },
    'ice': {
        'bg':'#87DFFB',
        'color': '#000' 
    },
    'dragon': {
        'bg':'#8775EC',
        'color': '#fff'
    },
    'dark': {
        'bg':'#8B6756',
        'color': '#fff'
    },
    'steel': {
        'bg':'#B8B7C9',
        'color': '#000' 
    },
    'fairy': {
        'bg':'#E5A4E6',
        'color': '#000' 
    }
}


const pokemonFetch = async (idPokemon) => {
    const response = await fetch(`${api}${idPokemon}`)
    const data = await response.json()
    createHTML(data)
    id = data.id
    console.log(id)
}

pokemonFetch(id)
    
buttonNext.addEventListener('click', ()=>{
    id < pokemonMaximo ? pokemonFetch(++id) : null
})

buttonPrev.addEventListener('click', ()=>{
    id > 1 ? pokemonFetch(--id) : null
})

pokemonId.addEventListener('focus', (e)=>{
    e.target.value = ''
})

pokemonId.addEventListener('input', (e)=>{
    id = parseInt(e.target.value, 10)
    if(e.target.value <= pokemonMaximo){
        pokemonFetch(id)}
    else{
        id = pokemonMaximo
        pokemonFetch(pokemonMaximo)
    }
})

pokemonName.addEventListener('focus', (e)=>{
    e.target.value = ''
})

pokemonName.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter')
    if(e.target.value !== '') pokemonFetch(normalizeName(e.target.value))
})

pokemonName.addEventListener('mouseleave', (e) =>{
    if(e.target.value !== '') pokemonFetch(normalizeName(e.target.value))
})


const createHTML = (data) =>{
    const pokemonType = document.querySelector('#type')
    const pokemonImage = document.querySelector('.pokemonImg')
    const pokemonTypeBgcolor = document.querySelector('.type')
    const circles = Array.from(document.querySelectorAll('.circles'))

    pokemonName.value = captalizeName(data.name)
    pokemonId.value = normalizeNumber(data.id)
    pokemonType.innerText = captalizeName(data.types[0].type.name)
    pokemonImage.setAttribute('src', data.sprites.versions['generation-v']['black-white'].animated.front_default)

    pokemonTypeBgcolor.style.backgroundColor = pokemonTypes[data.types[0].type.name].bg
    pokemonType.style.color = pokemonTypes[data.types[0].type.name].color

    circles.map(circle => {
        circle.style.backgroundColor = pokemonTypes[data.types[0].type.name].bg
    })
}

const captalizeName = (data) =>{
    return data[0].toUpperCase() + data.slice(1)
}

const normalizeNumber = (data) =>{
    if(data < 10) return `00${data}`
    else if(data < 100) return `0${data}`
    return data
}

const normalizeName = (data) => {
    return data.replace(/\s/g, '').toLowerCase()
}
