
import { Sanctuary } from './sanctuary';
import { Pet } from './pet';
import { Address } from '../graphql.schema';
import { Range } from './range';
import { Owner } from './owner';
import { Species } from './species';

export interface SanctuaryGraph {
    sanctuaries?: Sanctuary[];
    addresses?: Address[];
    pets?: Pet[];
    ranges?: Range[];
    owners?: Owner[];
    species?: Species[];
}
