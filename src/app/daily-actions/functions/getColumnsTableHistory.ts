import { SortersAnimalsType } from '../../../utils/sortersAnimals';
import { columnsTableHistoryAssignmentNumbers } from '../data/const/columnsTableHistoryAssignmentNumbers';
import { columnsTableHistoryDisposal } from '../data/const/columnsTableHistoryDisposal';
import { columnsTableHistoryInspection } from '../data/const/columnsTableHistoryInspection';
import { columnsTableHistoryResearch } from '../data/const/columnsTableHistoryResearch';
import { columnsTableHistoryTransfer } from '../data/const/columnsTableHistoryTransfer';
import { columnsTableHistoryTreatment } from '../data/const/columnsTableHistoryTreatment';
import { columnsTableHistoryVaccination } from '../data/const/columnsTableHistoryVaccination';

export const getColumnsTable = (keyTab: string, sorters: SortersAnimalsType) => {
    switch (keyTab) {
        case '1':
            return columnsTableHistoryInspection(sorters);
        case '2':
            return columnsTableHistoryVaccination(sorters);
        case '3':
            return columnsTableHistoryTreatment(sorters);
        case '4':
            return columnsTableHistoryTransfer(sorters);
        case '5':
            return columnsTableHistoryDisposal(sorters);
        case '6':
            return columnsTableHistoryResearch(sorters);
        case '7':
            return columnsTableHistoryAssignmentNumbers(sorters);
        default:
            break;
    }
};
