import { Checkbox, TableProps } from 'antd';
import { IDailyActionTable } from '../interface/IDailyActionTable';
import { TableCheckbox } from '../../components/custom-inputs/TableCheckbox';

export const columnsTableHistoryResearch: TableProps<IDailyActionTable>['columns'] = [
    {
        title: '№ животного',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        width: 83,
    },
    {
        title: 'Название исследования',
        dataIndex: 'name',
        key: 'name',
        minWidth: 100,
    },
    {
        title: 'Вид материала',
        dataIndex: 'materialType',
        key: 'materialType',
        minWidth: 100,
    },
    {
        title: 'Дата забора',
        dataIndex: 'collectionDate',
        key: 'collectionDate',
        minWidth: 100,
    },
    {
        title: 'Кто проводил взятие',
        dataIndex: 'collectedBy',
        key: 'collectedBy',
        minWidth: 100,
    },
    {
        title: 'Примечания',
        dataIndex: 'notes',
        key: 'notes',
        width: 159,
    },
    {
        title: 'Дата результата',
        dataIndex: 'performDate',
        key: 'performDate',
        minWidth: 100,
    },
    {
        title: 'Результат',
        dataIndex: 'result',
        key: 'result',
        minWidth: 106,
        render: (_, action) => (
            <div style={{ marginLeft: '20px' }}>
                <Checkbox checked={action.result === 'true' ? true : false} />
            </div>
        ),
    },
    {
        title: 'Выбрать',
        dataIndex: 'checked',
        key: 'checked',
        minWidth: 106,
        render: (_, { id }) => <TableCheckbox id={id} />,
    },
];
