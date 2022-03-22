
const byName = document.querySelector('#byName');
const type = document.querySelector('#byType');
const id = document.querySelector('#byId');
const searchPokemon = document.querySelector('#searchButton');

byName.addEventListener('click', () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = 'POKEDEX: <label class="title red"> NAME </label>';
	input.id = 'searchName';
	input.placeholder = 'Enter Name';
});

type.addEventListener('click', () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = 'POKEDEX: <label class="title red"> TYPE </label>';
	input.id = 'searchType'
	input.placeholder = 'Enter Type';
});

id.addEventListener('click', () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = 'POKEDEX: <label class="title red"> ID </label>';
	input.id = 'searchId';
	input.placeholder = 'Enter Id';
});

const restartLayout = () => {
	const photo = document.querySelector('#pokeImg');
	const pokemonName = document.querySelector('#pokeName');
	const type = document.querySelector('#type');
	const stadistics = document.querySelector('#stats');
	const moves = document.querySelector('#moves');
	photo.src = `assets/images/pokeball.png`;
	pokemonName.innerHTML = `<h1 id="pokeName" class="title"> WHO'S THAT POKEMON? </h1>`;
	type.innerHTML = '<p> Type: </p>';
	stadistics.innerHTML = `<p> Stadistics: </p>`;
	moves.innerHTML = '<p> Movements: </p>';
}

searchPokemon.addEventListener('click', () => {
	const input = document.querySelector('.input');
	const search = input.id;
	const pokemon = input.value.toLowerCase();
	switch(search) {
		case 'searchName':
			searchByName(pokemon);
			break;
		case 'searchType':
			searchByType(pokemon);
			break;
		case 'searchId':
			searchById(pokemon);
			break;
	}
	input.value = '';
});

const searchByName = async(pokeName) => {
	drawPokemon(await getPokemonByName(pokeName));
}

const searchByType = async(type) => {
	const pokeType =  await getPokemonByType(type);
	const number = Math.floor(Math.random() * pokeType.length);
	const pokemonType = pokeType[number].pokemon.name;
	drawPokemon(await getPokemonByName(pokemonType));
}

const searchById = async(id) => {
	drawPokemon(await getPokemonById(id));
}

const getPokemonByName = async(pokeName) => {
	try {
    	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokeName }`);
		if(!resp.ok) throw drawError();
		const pokemon = await resp.json();
		return pokemon;
	} catch (err) {
		throw drawError();
	}
}

const getPokemonByType = async(type) => {
	try {
    	const resp = await fetch(`https://pokeapi.co/api/v2/type/${ type }`);
		if(!resp.ok) throw drawError();
		const { pokemon } = await resp.json();
		return pokemon;
	} catch (err) {
		throw drawError();
	}
}

const getPokemonById = async(id) => {
	try {
    	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`);
		if(!resp.ok) throw drawError();
		const pokemon = await resp.json();
		return pokemon;
	} catch (err) {
		throw drawError();
	}
}

const drawPokemon = (pokemon) => {
	const pokePhoto = document.querySelector("#pokeImg");
	const newPokemon = document.querySelector('#pokeName');
	const type = document.querySelector('#type');
	const stadistics = document.querySelector('#stats');
	const moves = document.querySelector('#moves');
	pokePhoto.src = pokemon.sprites.front_default;
	newPokemon.innerHTML = `It's: <h1 id="pokeName" class="title red"> ${ pokemon.name } </h1>`;
	type.innerHTML = `<p> Type: <b class="red"> ${ pokemon.types[0].type.name } </b> </p>`;
	stadistics.innerHTML = '<p> Stadistics: </p> <div id="stadistics"> </div>';
	moves.innerHTML = '<p> Movements: </p> <div id="movements"> </div>';
	const stats = document.querySelector('#stadistics');
	const movements = document.querySelector('#movements');
	for (let i = 0; i < pokemon.stats.length; i ++) {
		if(i % 2 == 0) {
			const ul = document.createElement('ul');
			ul.classList.add('list');
			ul.classList.add('horizontal');
			ul.innerHTML = `
				<li class="text">
					${ pokemon.stats[i].stat.name }: <b class="red"> ${ pokemon.stats[i].base_stat } </b>
				</li>
				<li class="text">
					${ pokemon.stats[i + 1].stat.name }: <b class="red"> ${ pokemon.stats[i + 1].base_stat } </b>
				</li>
			`;
			stats.append(ul);
		}
		i ++;
	}
	for (let i = 0; i < pokemon.moves.length; i ++) {
		if(i % 2 == 0) {
			const ul = document.createElement('ul');
			ul.classList.add('list');
			ul.classList.add('horizontal');
			if(i + 1 < pokemon.moves.length) {
				ul.innerHTML = `
					<li class="text">
						<b> ${ pokemon.moves[i].move.name } </b>
					</li>
					<li class="text">
						<b> ${ pokemon.moves[i + 1].move.name } </b>
					</li>
				`;
				movements.append(ul);
			}
		}
		i ++;
	}
}

const drawError = () => {
	const title = document.querySelector('#pokeName');
	restartLayout();
	title.innerHTML = `<b class="red"> ERROR: </b> THAT POKEMON DOESN'T EXIST`;
}

/*
const searchName = () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = `<h2 id="title" class="title" value="name"> POKEDEX: NAME </h2>`;
	input.id = 'searchName';
	input.placeholder = 'Enter Name';
}

const searchType = () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = `<h2 id="title" class="title" value="type"> POKEDEX: TYPE </h2>`;
	input.id = 'searchType'
	input.placeholder = 'Enter Type'
}

const searchId = () => {
	restartLayout();
	const title = document.querySelector('#title');
	const input = document.querySelector('.input');
	title.innerHTML = `<h2 id="title" class="title" value="id"> POKEDEX: ID </h2>`;
	input.id = 'searchId';
	input.placeholder = 'Enter Id';
}

const searchPokemon = () => {
	const input = document.querySelector('.input');
	const search = input.id;
	const pokemon = input.value;
	console.log(pokemon);
	switch(search) {
		case 'searchName':
			searchByName(pokemon);
			break;
		case 'searchType':
			searchByType(pokemon);
			break;
		case 'searchId':
			searchById(pokemon);
			break;
	}
	input.value = '';
}

*/
