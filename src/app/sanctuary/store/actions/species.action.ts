import { createAction } from '@ngrx/store';

import { Species, SpeciesInput } from '../../graphql.schema';

export const createSpecies = createAction(
    '[] Create Species',
    (speciesInput: SpeciesInput) => ({ speciesInput })
);

export const speciesCreated = createAction(
    '[] New Species Created',
    (species: Species) => ({ species })
);

export const getSpecies = createAction(
    '[] Get Species'
);

export const getSpeciesLoaded = createAction(
    '[] Get Species Loaded',
    (species: Species[]) => ({ species })
);

