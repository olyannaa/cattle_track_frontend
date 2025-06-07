import { Badge, TableProps, TabsProps } from 'antd';
import { FieldTable } from '../../components/FieldTable/FieldTable';
import { IAnimalTable } from '../interfaces/animalTable';
import { IdentificationFieldName } from '../types/animal';
import { IdentificationFieldTable } from '../../components/IdentificationFieldTable/IdentificationFieldTable';
import { TableCheckboxAccounting } from '../../components/TableCheckboxAccounting';
import { Link } from 'react-router-dom';

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
    {
        key: 'Яловые',
        label: 'Яловые',
    },
];

export const getColumns = (
    isEditTable: boolean,
    fieldsName: IdentificationFieldName[],
    isBarren: boolean
): TableProps<IAnimalTable>['columns'] =>
    !isBarren
        ? [
              {
                  title: '№ бирки',
                  dataIndex: 'tagNumber',
                  key: 'tagNumber',
                  render: (_, { identificationFields, ...animal }) => (
                      <Link className='link' to={`/animal-card/${animal.id}`}>
                          <FieldTable animal={animal} dataIndex={'tagNumber'} isEditTable={false} />
                      </Link>
                  ),
                  minWidth: 89,
                  sorter: true,
              },
              {
                  title: 'Дата рождения',
                  dataIndex: 'birthDate',
                  key: 'birthDate',
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'birthDate'} isEditTable={isEditTable} />
                  ),
                  minWidth: 116,
                  sorter: true,
              },
              {
                  title: 'Порода',
                  dataIndex: 'breed',
                  key: 'breed',
                  minWidth: 130,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'breed'} isEditTable={isEditTable} />
                  ),
                  sorter: true,
              },
              {
                  title: 'Группа',
                  dataIndex: 'groupName',
                  key: 'groupName',
                  sorter: true,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'groupName'} isEditTable={isEditTable} />
                  ),
                  minWidth: 225,
              },
              {
                  title: 'Статус',
                  dataIndex: 'status',
                  key: 'status',
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'status'} isEditTable={isEditTable} />
                  ),
                  minWidth: 128,
                  sorter: true,
              },
              {
                  title: 'Происхождение',
                  dataIndex: 'origin',
                  key: 'origin',
                  minWidth: 157,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'origin'} isEditTable={isEditTable} />
                  ),
                  sorter: true,
              },
              {
                  title: 'Место происхождения',
                  dataIndex: 'originLocation',
                  key: 'originLocation',
                  minWidth: 159,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'originLocation'} isEditTable={isEditTable} />
                  ),
                  sorter: true,
              },
              {
                  title: '№ матери',
                  dataIndex: 'motherTagNumber',
                  key: 'motherTagNumber',
                  minWidth: 78,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'motherTagNumber'} isEditTable={isEditTable} />
                  ),
                  sorter: true,
              },
              {
                  title: '№ отца',
                  dataIndex: 'fatherTagNumber',
                  key: 'fatherTagNumber',
                  minWidth: 78,
                  render: (_, { identificationFields, ...animal }) => (
                      <FieldTable animal={animal} dataIndex={'fatherTagNumber'} isEditTable={isEditTable} />
                  ),
                  sorter: true,
              },
              ...fieldsName.map(({ name }) => ({
                  title: name,
                  dataIndex: name,
                  key: name,
                  minWidth: 100,
                  render: (_: unknown, animal: IAnimalTable) => {
                      const fieldValue = animal.identificationFields?.find((f) => f.name === name)?.value ?? '';
                      return (
                          <IdentificationFieldTable
                              isEditTable={isEditTable}
                              nameField={name}
                              value={fieldValue}
                              id={animal.id}
                          />
                      );
                  },
              })),
          ]
        : [
              {
                  title: '№ бирки',
                  dataIndex: 'tagNumber',
                  key: 'tagNumber',
                  minWidth: 110,
                  sorter: true,
              },
              {
                  title: 'Яловая',
                  key: 'breed',
                  minWidth: 130,
                  render: () => <span>Яловая</span>,
                  sorter: true,
              },
              {
                  title: 'Статус',
                  dataIndex: 'status',
                  key: 'status',
                  render: (_, { identificationFields, ...animal }) => (
                      <Badge status={animal.status === 'Активное' ? 'success' : 'error'} text={animal.status} />
                  ),
                  minWidth: 128,
                  sorter: true,
              },
              {
                  title: 'Выбрать',
                  dataIndex: 'checked',
                  key: 'checked',
                  width: 106,
                  render: (_, { id }) => <TableCheckboxAccounting id={id} />,
              },
          ];
