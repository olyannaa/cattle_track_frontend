export const InputLabel = ({ label }: { label: string }) => {
    return (
        <div
            style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px',
            }}
        >
            {label}
        </div>
    );
};
