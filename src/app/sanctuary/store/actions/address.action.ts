import { createAction } from '@ngrx/store';

import { Address, AddressInput } from '../../graphql.schema';

export const createPersonAddress = createAction(
    '[AddEditOwnerComponent] Create Address',
    (addressInput: AddressInput) => ({ addressInput })
);

export const addressInfoLoaded = createAction(
    '[AddEditOwnerComponent] Address Info Loaded',
    (address: Address) => ({ address })
);

export const createSanctuaryAddressInfo = createAction(
    '[AddEditSanctuaryComponent] Create Address'
);

export const addressSanctuaryInfoLoaded = createAction(
    '[Sanctuary/API] Sanctuary Address Info Loaded',
    (address: Address) => ({ address })
);

export const loadAddressInfo = createAction(
    '[SanctuaryListComponent] Load Address Info'
);

export const addressesInfoLoaded = createAction(
    '[Sanctuary/API] Addresses Info Loaded',
    (addresses: Address[]) => ({ addresses })
);
