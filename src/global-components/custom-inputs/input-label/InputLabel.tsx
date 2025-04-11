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
                fontWeight: 'bold',
                color: '#333',
                marginBottom: marginSize,
            }}
        >
            {label}
        </div>
    );
};
