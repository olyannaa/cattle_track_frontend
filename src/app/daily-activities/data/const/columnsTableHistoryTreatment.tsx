import { TableProps } from 'antd';
import { IAnimalTable } from '../interface/IAnimalTable';

export const columnsTableHistoryTreatment: TableProps<IAnimalTable>['columns'] = [
    {
        title: '№ животного',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        width: 83,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Дата',
        dataIndex: 'performDate',
        key: 'performDate',
        minWidth: 100,
        sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
        title: 'Исполнитель',
        dataIndex: 'performedBy',
        key: 'performedBy',
        minWidth: 266,
    },
    {
        title: 'Примечания',
        dataIndex: 'notes',
        key: 'notes',
        width: 159,
    },
    {
        title: 'Диагноз',
        dataIndex: 'result',
        key: 'result',
        width: 166,
    },
    {
        title: 'Препарат',
        dataIndex: 'medicine',
        key: 'medicine',
        width: 166,
    },
    {
        title: 'Доза',
        dataIndex: 'dose',
        key: 'dose',
        width: 166,
    },
    {
        title: 'Дата следующего осмотра',
        dataIndex: 'nextActionDate',
        key: 'nextActionDate',
        width: 133,
    },
];
