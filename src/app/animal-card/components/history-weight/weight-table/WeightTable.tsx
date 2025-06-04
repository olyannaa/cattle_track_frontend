import { Table } from 'antd';
import { HistoryPoint } from '../../../data/interfaces/animal-chart';

interface DataType extends HistoryPoint {
    key: string;
}

export const WeightTable = ({ points }: { points: HistoryPoint[] }) => {
    const dataSource: DataType[] = points.map((point, index) => ({
        ...point,
        key: index.toString(),
    }));

    const columns = [
        {
            title: 'Дата',
            dataIndex: 'x',
            key: 'x',
            render: (date: string) => new Date(date).toLocaleDateString('ru-RU'),
            sorter: (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
            defaultSortOrder: 'descend',
        },
        {
            title: 'Вес, кг',
            dataIndex: 'y',
            key: 'y',
            render: (weight: number) => `${weight} кг`,
            sorter: (a, b) => a.y - b.y,
        },
    ];

    return <Table<DataType> columns={columns} dataSource={dataSource} showSorterTooltip={{ target: 'sorter-icon' }} />;
};
