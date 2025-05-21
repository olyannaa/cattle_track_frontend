import { TableProps } from 'antd';
import { IDailyActionTable } from '../interface/IDailyActionTable';
import { TableCheckbox } from '../../components/custom-inputs/TableCheckbox';

export const columnsTableHistoryTransfer: TableProps<IDailyActionTable>['columns'] = [
    {
        title: '№ животного',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        width: 83,
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        minWidth: 100,
    },
    {
        title: 'Исполнитель',
        dataIndex: 'performedBy',
        key: 'performedBy',
        minWidth: 180,
    },
    {
        title: 'Примечания',
        dataIndex: 'notes',
        key: 'notes',
        width: 159,
    },
    {
        title: 'Тип перевода',
        dataIndex: 'subtype',
        key: 'type',
        width: 166,
    },
    {
        title: 'Старая группа',
        dataIndex: 'oldGroupName',
        key: 'oldGroupName',
        width: 159,
    },
    {
        title: 'Новая группа',
        dataIndex: 'newGroupName',
        key: 'newGroupName',
        width: 133,
    },
    {
        title: 'Выбрать',
        dataIndex: 'checked',
        key: 'checked',
        minWidth: 106,
        render: (_, { id }) => <TableCheckbox id={id} />,
    },
];
