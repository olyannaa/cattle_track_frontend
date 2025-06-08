import { FormFilter } from '../../../daily-actions/components/forms/form-filter/FormFilter';
import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';
import {
    changeFiltersAnimals,
    changeIsGroup,
    deleteAllAnimals,
    selectFiltersAnimals,
} from '../../../daily-actions/service/animalsDailyActionsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app-service/hooks';
import { useEffect } from 'react';
import {
    IRequestGetFilterAnimals,
    useLazyGetAllAnimalsIdQuery,
    useLazyGetFilterAnimalsQuery,
} from '../../../daily-actions/service/dailyActions';

export const FilterFormInfo = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFiltersAnimals);

    const [getFilterAnimalsQuery] = useLazyGetFilterAnimalsQuery();
    const [getAllAnimalsIdQuery] = useLazyGetAllAnimalsIdQuery();

    const getFilterAnimals = async (data: IRequestGetFilterAnimals = { filters: filters }) => {
        await getFilterAnimalsQuery(data);
    };

    const getAllAnimalsId = async (data: IRequestGetFilterAnimals = { filters: filters }) => {
        await getAllAnimalsIdQuery(data);
    };

    useEffect(() => {
        dispatch(changeIsGroup(false));
    }, []);

    useEffect(() => {
        getFilterAnimals({
            filters: filters,
        });
        getAllAnimalsId({
            filters: filters,
        });
        dispatch(deleteAllAnimals());
    }, [filters]);

    return (
        <div>
            <div className='form-title'>
                <CheckboxCustom
                    title='Только активные животные'
                    onChange={(e) =>
                        dispatch(
                            changeFiltersAnimals({
                                name: 'isActive',
                                value: e.target.checked,
                            })
                        )
                    }
                    defaultChecked={true}
                />
            </div>
            <FormFilter></FormFilter>
        </div>
    );
};
