export interface AnimalAction {
    animalId: string;
    eventType: string;
    fields: {
        [key: string]: string | null;
    };
    eventDate: string;
    performedBy: string | null;
}
