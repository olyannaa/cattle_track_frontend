import { TableProps } from 'antd';
import { IDailyActionTable } from '../interface/IDailyActionTable';
import { TableCheckbox } from '../../components/custom-inputs/TableCheckbox';

export const columnsTableHistoryInspection: TableProps<IDailyActionTable>['columns'] = [
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
        minWidth: 133,
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
        title: 'Тип осмотра',
        dataIndex: 'subtype',
        key: 'subtype',
        width: 166,
    },
    {
        title: 'Результат',
        dataIndex: 'result',
        key: 'result',
        width: 159,
    },
    {
        title: 'Дата следующего осмотра',
        dataIndex: 'nextDate',
        key: 'nextDate',
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
