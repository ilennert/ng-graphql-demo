import { createAction } from '@ngrx/store';

import { Address, AddressInput } from '../../graphql.schema';

export const createPersonAddress = createAction(
    '[AddEditOwnerComponent] Create Address',
    (addressInput: AddressInput) => ({ addressInput })
);

export const addressPersonInfoLoaded = createAction(
    '[AddEditOwnerComponent] Address Info Loaded',
    (address: Address) => ({ address })
);

export const loadAddressInfo = createAction(
    '[SanctuaryListComponent] Load Address Info'
);

export const addressesInfoLoaded = createAction(
    '[Sanctuary/API] Addresses Info Loaded',
    (addresses: Address[]) => ({ addresses })
);
