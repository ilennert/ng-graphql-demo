import { createAction } from '@ngrx/store';

import { Address, AddressInput } from '../../graphql.schema';

export const createAddress = createAction(
    '[AddEditAddressComponent] Create Address',
    (addressInput: AddressInput) => ({ addressInput })
);

export const loadAddressInfo = createAction(
    '[SanctuaryListComponent] Load Address Info'
);

export const addressInfoLoaded = createAction(
    '[Sanctuary/API] Address Info Loaded',
    (address: Address) => ({ address })
);

export const addressesInfoLoaded = createAction(
    '[Sanctuary/API] Addresses Info Loaded',
    (addresses: Address[]) => ({ addresses })
);
