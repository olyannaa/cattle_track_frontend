import { TableProps } from 'antd';
import { IAnimalTable } from '../interface/IAnimalTable';

export const columnsTableHistoryTransfer: TableProps<IAnimalTable>['columns'] = [
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
        title: 'Тип перевода',
        dataIndex: 'type',
        key: 'type',
        width: 166,
    },
    {
        title: 'Старая группа',
        dataIndex: 'oldGroupId',
        key: 'oldGroupId',
        width: 159,
    },
    {
        title: 'Новая группа',
        dataIndex: 'newGroupId',
        key: 'newGroupId',
        width: 133,
    },
];
