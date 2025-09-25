export interface Option {
    label: string;
    value: string;
}

export interface Dependency {
    id: string;
    value: string;
}

export interface FormQuestion {
    id: string;
    question: string;
    type: 'single' | 'multiselect' | 'text' | 'textarea';
    options: Option[];
    required: boolean;
    dependsOn?: Dependency;
}

export interface FormData {
    [key: string]: string | string[];
}

