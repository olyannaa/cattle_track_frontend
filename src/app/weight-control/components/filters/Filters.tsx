import { CheckboxCustom } from '../../../../global-components/custom-inputs/checkbox/Checkbox';
import { useAppDispatch } from '../../../../app-service/hooks';
import { changeFiltersWeightControl } from '../../service/weightControlSlice';
import { FormFilters } from './FormFilters';

type Props = {
    keyTab: string;
};

export const Filters = ({ keyTab }: Props) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <CheckboxCustom
                title='Только активные животные'
                onChange={(e) =>
                    dispatch(
                        changeFiltersWeightControl({
                            name: 'isActive',
                            value: e.target.checked,
                        })
                    )
                }
                defaultChecked={true}
                style={{ maxWidth: '432px', width: '100%' }}
            />
            <FormFilters />
        </>
    );
};
