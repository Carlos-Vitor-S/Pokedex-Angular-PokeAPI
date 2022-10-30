export interface InPokemon {
  id: number;
  type: string;
  name: string;
  sprites: {
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
}
