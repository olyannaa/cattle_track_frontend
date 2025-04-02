import { Flex, Table} from "antd";
import { HeaderContent } from "../../global-components/HeaderContent/HeaderContent";
import styles from './RegisterAnimalPage.module.css'
import { columns, items } from "./data";
import { IAnimal, useLazyGetAnimalsQuery } from "../../app-service/services/animals";
import { useEffect, useState } from "react";
import { IUser } from "../../utils/userType";

export const RegisterAnimalPage = () => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '')
    const [typeAnimal, setTypeAnimal] = useState<string>('Корова')
    const [getAnimalsQuery] = useLazyGetAnimalsQuery()
    const [animals, setAnimals] = useState<IAnimal[]>([])

    const getAnimals = async ()=> {
        const response = (await getAnimalsQuery({Id:user.organizationId, Type:typeAnimal})).data
        setAnimals(response||[])
    }

    const exportCSV= ()=>{

    }

    useEffect(()=> {
        getAnimals()
    }, [typeAnimal])
    console.log([...animals.map((animal)=>({...animal,key:animal.id}))][0])
    return (
        <Flex vertical gap={'16px'}>
            <HeaderContent items={items} title="Учет животных" onChange={setTypeAnimal} buttonText={'Экспортировать таблицу (SCV)'} buttonClick={exportCSV}/>
            <Flex className={styles['wrapper-table']}>
                <Table columns={columns} style={{width:'100%'}} dataSource={animals.map((animal)=>({...animal,key:animal.id}))}/>
            </Flex>
        </Flex>
    );
};
