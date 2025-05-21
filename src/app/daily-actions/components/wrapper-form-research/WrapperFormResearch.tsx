import { useState } from 'react';
import { FormAddResearch } from '../forms/form-add-research/FormAddResearch';

type Props = {
    isGroup: boolean;
    resetHistory: () => void;
};

export const WrapperFormResearch = ({ isGroup, resetHistory }: Props) => {
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
