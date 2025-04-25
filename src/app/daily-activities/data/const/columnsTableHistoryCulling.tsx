import { TableProps } from 'antd';
import { IAnimalTable } from '../interface/IAnimalTable';

export const columnsTableHistoryCulling: TableProps<IAnimalTable>['columns'] = [
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
        title: 'Тип выбраковки',
        dataIndex: 'type',
        key: 'type',
        width: 166,
    },
];
