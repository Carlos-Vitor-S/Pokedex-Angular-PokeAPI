import { HttpResponse } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokeService } from 'src/services/poke.service';
import { InPokemon } from '../interfaces/in-pokemon';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
})
export class PokedexComponent implements OnInit {
  constructor(private pokeService: PokeService) {}

  pokemonImage: string = '';
  pokemonName: string = '';
  pokemonId: number = 1;
  currentCountValue: number = 1;
  apiResponse: number = 0;

  formPokemon = new FormGroup({
    inputSearch: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getPokemonById(1);
  }

  //Exibir pokemon versao dinamica /onChange
  getForm() {
    this.formPokemon
      .get('inputSearch')
      ?.valueChanges.subscribe((formResult: any) => {
        if (isNaN(formResult)) {
          this.getPokemonByName(String(formResult));
        } else {
          this.getPokemonById(Number(formResult));
        }
      });
  }

  //Exibir pokemon versao -> enter / submit
  submit() {
    if (this.apiResponse === 200) {
      let formResult: any = this.formPokemon.get('inputSearch');
      if (this.formPokemon.valid) {
        if (isNaN(formResult.value)) {
          this.getPokemonByName(String(formResult.value));
        } else {
          this.getPokemonById(Number(formResult.value));
        }
      }
    } else {
      console.log('Error ! veja Api response: ', this.apiResponse);
    }

    this.formPokemon.reset();
  }

  //Pegar pokemon por nome
  getPokemonByName(name: string) {
    this.pokeService.getPokemonByName(name).subscribe((data) => {
      this.pokemonName = String(data.body?.name);
      this.pokemonId = Number(data.body?.id);
      this.pokemonImage = String(
        data.body?.sprites.versions['generation-v']['black-white'].animated
          .front_default
      );
      this.currentCountValue = Number(data.body?.id);
      this.apiResponse = data.status;
    });
  }

  //Pegar pokemon por ID
  getPokemonById(id: number) {
    this.pokeService.getPokemonById(id).subscribe((data) => {
      if (data.status === 200) {
        this.pokemonName = String(data.body?.name);
        this.pokemonId = Number(data.body?.id);
        this.pokemonImage = String(
          data.body?.sprites.versions['generation-v']['black-white'].animated
            .front_default
        );
        this.currentCountValue = Number(data.body?.id);
      } else if (data.status === 404) {
        this.pokemonName = 'Not Found';
        this.pokemonId = 0;
        this.pokemonImage = '';
      }

      this.apiResponse = data.status;
      console.log('por nome: ', data);
      console.log(data.statusText, this.apiResponse);
    });
  }

  //onClick pegar o pokemon anterior
  getNextPokemon() {
    if (this.currentCountValue < 1050) {
      this.currentCountValue += 1;
      this.getPokemonById(this.currentCountValue);
    }
  }
  //onClick pegar o proximo pokemon
  getPrevPokemon() {
    if (this.currentCountValue > 1) {
      this.currentCountValue -= 1;
      this.getPokemonById(this.currentCountValue);
    }
  }
}
