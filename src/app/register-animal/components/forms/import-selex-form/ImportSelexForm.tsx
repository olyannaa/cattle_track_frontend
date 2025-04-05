/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, List } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import styles from './ImportSelexForm.module.css';
import { useRegistrationAnimalFromCSVMutation } from '../../../services/registration-animal';

export const ImportSelexForm = () => {
    const [registerAnimalFromCsv, { isLoading, isError, isSuccess }] =
        useRegistrationAnimalFromCSVMutation();
    const [registerAnimalCSVForm] = Form.useForm();

    const data = [
        'Инвентарный номер (обязательное поле, всегда первая колонка)',
        'Дата рождения',
        'Дата поступления',
        'Дата выбытия',
        'Причина выбытия',
        'Расход',
        'Живая масса при выбытии',
        'Последнее взвешивание (дата)',
        'Последнее взвешивание (вес)',
        'Пол (1-бычок, 2-телка, 3-бык, 4-корова)',
        'Статус',
        'Инв.№ предка - O (отец)',
        'Инв.№ предка - M (мать)',
        'Порода',
        'Хозяйство рождения',
        'Область рождения',
        'Гос-во рождения',
    ];

    const registrationAnimalCsv = (dataForm: {
        file: {
            file: File;
            fileList: any;
        };
    }) => {
        const registerData: FormData = new FormData();
        registerData.append('file', dataForm.file.fileList?.[0]?.originFileObj);
        registerAnimalFromCsv(registerData);
        /** Добавить обработку */
        registerAnimalCSVForm.resetFields();
    };

    return (
        <div className={styles['import-selex']}>
            <Form onFinish={registrationAnimalCsv} form={registerAnimalCSVForm}>
                <h2>Импорт животных из файла выгрузки СЕЛЭКС</h2>
                <Form.Item
                    name='file'
                    className={styles['import-selex__dragger']}
                    rules={[{ required: true, message: 'Обязательное поле' }]}
                >
                    <Dragger beforeUpload={() => false}>
                        <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>
                            Выберите или перетащите файл
                        </p>
                        <p className='ant-upload-hint'>
                            Максимальный размер файла 200Mb. Формат SCV
                        </p>
                    </Dragger>
                </Form.Item>
                <Button htmlType='submit' loading={isLoading}>
                    Импортирова данные
                </Button>
            </Form>
            <div>
                <h3 className={styles['import-selex__additional-title']}>
                    Файл должен содержать следующие колонки:
                </h3>
                <div className={styles['import-selex__additional-container']}>
                    <h3 className={styles['import-selex__additional-subtitle']}>
                        Дополнительные способы идентификации
                    </h3>
                    <p>
                        Дополнительные способы идентификации: Вы можете добавить
                        любые дополнительные колонки для идентификации животных
                        (например, УНСМ, Электронная метка, и др.). Эти поля
                        будут автоматически созданы в системе как дополнительные
                        поля идентификации.
                    </p>
                </div>
                <List
                    className={styles['import-selex__additional-list']}
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                />
            </div>
        </div>
    );
};
