import { TableProps } from 'antd';
import { IAnimalTable } from '../interface/IAnimalTable';

export const columnsTableHistoryInspection: TableProps<IAnimalTable>['columns'] = [
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
        title: 'Дата осмотра',
        dataIndex: 'performDate',
        key: 'performDate',
        minWidth: 100,
        sorter: (a, b) => a.category.localeCompare(b.category),
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Исполнитель',
        dataIndex: 'performedBy',
        key: 'performedBy',
        minWidth: 266,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Примечания',
        dataIndex: 'notes',
        key: 'notes',
        width: 159,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Тип осмотра',
        dataIndex: 'type',
        key: 'type',
        width: 166,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Результат осмотра',
        dataIndex: 'result',
        key: 'result',
        width: 159,
        ellipsis: {
            showTitle: false,
        },
    },
    {
        title: 'Дата следующего осмотра',
        dataIndex: 'nextActionDate',
        key: 'nextActionDate',
        width: 133,
        ellipsis: {
            showTitle: false,
        },
    },
];
