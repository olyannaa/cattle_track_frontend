export interface AnimalAction {
    id: string;
    animalId: string;
    actionType: string;
    actionSubtype: string | null;
    actionDate: string;
    performedBy: string;
    result: string | null;
    medicine: string | null;
    dose: string | null;
    notes: string | null;
    nextActionDate: string | null;
    oldGroupId: string | null;
    newGroupId: string | null;
}
