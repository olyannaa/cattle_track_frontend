import { TableProps, TabsProps } from 'antd';
import { FieldTable } from '../../components/FieldTable/FieldTable';
import { IAnimalTable } from '../interfaces/animalTable';

export enum animalTableColumns {}

export const items: TabsProps['items'] = [
    {
        key: 'Корова',
        label: 'Коровы',
    },
    {
        key: 'Нетель',
        label: 'Нетели',
    },
    {
        key: 'Бык',
        label: 'Быки',
    },
    {
        key: 'Телка',
        label: 'Телки',
    },
    {
        key: 'Бычок',
        label: 'Бычки',
    },
];

export const getColumns = (isEditTable: boolean): TableProps<IAnimalTable>['columns'] => [
    {
        title: '№ бирки',
        dataIndex: 'tagNumber',
        key: 'tagNumber',
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'tagNumber'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 80,
        sorter: true,
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'birthDate'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 103,
        sorter: true,
    },
    {
        title: 'Порода',
        dataIndex: 'breed',
        key: 'breed',
        minWidth: 130,
        sorter: true,
    },
    {
        title: 'Группа',
        dataIndex: 'groupName',
        key: 'groupName',
        sorter: true,
        render: (_, animal) => (
            <FieldTable
                animal={animal}
                dataIndex={'groupName'}
                isEditTable={isEditTable}
            />
        ),
        minWidth: 225,
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (_, animal) => (
            <FieldTable animal={animal} dataIndex={'status'} isEditTable={isEditTable} />
        ),
        minWidth: 128,
        sorter: true,
    },
    {
        title: 'Происхождение',
        dataIndex: 'origin',
        key: 'origin',
        minWidth: 118,
        sorter: true,
    },
    {
        title: 'Место происхождения',
        dataIndex: 'originLocation',
        key: 'originLocation',
        minWidth: 159,
        sorter: true,
    },
    {
        title: '№ матери',
        dataIndex: 'motherTagNumber',
        key: 'motherTagNumber',
        minWidth: 78,
        sorter: true,
    },
    {
        title: '№ отца',
        dataIndex: 'fatherTagNumber',
        key: 'fatherTagNumber',
        minWidth: 78,
        sorter: true,
    },
];
