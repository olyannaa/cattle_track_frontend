export interface ISelect {
    placeholder?: string;
    options: { value: string; label: string }[];
    label: string;
    value: string;
    onChange: (value:string)=> void
}
