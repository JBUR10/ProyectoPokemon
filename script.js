
let limite = 12;

let offset = 0;

async function obtenerPokemon() {

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${offset}`
        );

        const datos = await respuesta.json();

        for (const pokemon of datos.results) {

            obtenerDetalle(pokemon.url);

        }

    }

    catch (error) {

        alert("No fue posible conectar con la API.");

        console.error(error);

    }

}

// Obtener detalles

async function obtenerDetalle(url) {

    const respuesta = await fetch(url);

    const pokemon = await respuesta.json();

    mostrarPokemon(pokemon);

}

// Mostrar tarjeta

function mostrarPokemon(pokemon) {

    const contenedor = document.getElementById("contenedor");

    contenedor.innerHTML += `

    <div class="tarjeta">

        <img src="${pokemon.sprites.front_default}">

        <h2>${pokemon.name}</h2>

    </div>

    `;

}

// Cargar más

document.getElementById("btnMas").addEventListener("click", () => {

    offset += limite;

    obtenerPokemon();

});

// Buscar Pokémon

async function buscarPokemon() {

    const nombre = document
        .getElementById("buscar")
        .value
        .toLowerCase();

    if (nombre == "") {

        return;

    }

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nombre}`
        );

        if (!respuesta.ok) {

            throw new Error();

        }

        const pokemon = await respuesta.json();

        document.getElementById("contenedor").innerHTML = "";

        mostrarPokemon(pokemon);

    }

    catch {

        alert("Pokémon no encontrado");

    }

}

obtenerPokemon();