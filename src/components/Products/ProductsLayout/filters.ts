export const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false }
        ]
    },
    {
        id: 'material',
        name: 'Material',
        options: [
            { value: 'wood', label: 'Wood', checked: false },
            { value: 'metal', label: 'Metal', checked: false },
            { value: 'plastic', label: 'Plastic', checked: false },
            { value: 'leather', label: 'Leather', checked: true },
            { value: 'fabric', label: 'Fabric', checked: false },
            { value: 'other', label: 'Other', checked: false }
        ]
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true }
        ]
    }
];
