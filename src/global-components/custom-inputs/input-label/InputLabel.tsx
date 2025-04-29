export const InputLabel = ({
    label,
    marginSize = '8px',
}: {
    label: string;
    marginSize?: string;
}) => {
    return (
        <div
            style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#333',
                lineHeight: '24px',
                marginBottom: marginSize,
            }}
        >
            {label}
        </div>
    );
};
