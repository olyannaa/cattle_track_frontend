import { useState } from 'react';
import { FormAddResearch } from '../forms/form-add-research/FormAddResearch';
import { useAppSelector } from '../../../../app-service/hooks';
import { selectIsGroup } from '../../service/animalsDailyActionsSlice';

type Props = {
    resetHistory: () => void;
};

export const WrapperFormResearch = ({resetHistory }: Props) => {
    const isGroup = useAppSelector(selectIsGroup)
    const [formsId, setFormsId] = useState<string[]>([
        Date.now().toString(36) + Math.random().toString(36).substring(2),
    ]);
    return formsId.map((id, i) => (
        <FormAddResearch
            key={id}
            num={i + 1}
            formsIdLength={formsId.length}
            idForm={id}
            setFormsId={setFormsId}
            isGroup={isGroup}
            resetHistory={resetHistory}
        />
    ));
};
