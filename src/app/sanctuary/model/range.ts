
export interface Range {
    id: string;
    petId: string;
    ownerId?: string;
    sanctuaryId?: string;
    toOwner: boolean;
    transactionDate: Date;
}
