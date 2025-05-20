import { columnsTableHistoryAssignmentNumbers } from '../data/const/columnsTableHistoryAssignmentNumbers';
import { columnsTableHistoryDisposal } from '../data/const/columnsTableHistoryDisposal';
import { columnsTableHistoryInspection } from '../data/const/columnsTableHistoryInspection';
import { columnsTableHistoryResearch } from '../data/const/columnsTableHistoryResearch';
import { columnsTableHistoryTransfer } from '../data/const/columnsTableHistoryTransfer';
import { columnsTableHistoryTreatment } from '../data/const/columnsTableHistoryTreatment';

export const getColumnsTable = (keyTab: string) => {
    switch (keyTab) {
        case '1':
            return columnsTableHistoryInspection;
        case '2':
            return columnsTableHistoryInspection;
        case '3':
            return columnsTableHistoryTreatment;
        case '4':
            return columnsTableHistoryTransfer;
        case '5':
            return columnsTableHistoryDisposal;
        case '6':
            return columnsTableHistoryResearch;
        case '7':
            return columnsTableHistoryAssignmentNumbers;
        default:
            break;
    }
};
