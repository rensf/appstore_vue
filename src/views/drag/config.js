export const formConf = {
    formRef: 'elForm',
    formModel: 'formData',
    labelPosition: 'right',
    labelWidth: 100,
    formRules: 'rules',
    disabled: false,
    span: 24,
    formBtns: true
};

export const inputComponents = [
    {
        label: '单行文本',
        tag: 'Input',
        tagIcon: 'input',
        placeholder: '请输入',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: { width: '100%' },
        clearable: true,
        prepend: '',
        append: '',
        prefix: '',
        suffix: '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disable: false,
        required: true,
        regList: [],
        changeTag: true
    },
    {
        label: '多行文本',
        tag: 'Input',
        tagIcon: 'textarea',
        type: 'textarea',
        placeholder: '请输入',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        autosize: {
            minRows: 4,
            maxRows: 4
        },
        style: { width: '100%' },
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disable: false,
        required: true,
        regList: [],
        changeTag: true
    },
    {
        label: '密码',
        tag: 'Input',
        tagIcon: 'password',
        type: 'password',
        placeholder: '请输入',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: { width: '100%' },
        clearable: true,
        prepend: '',
        append: '',
        prefix: '',
        suffix: '',
        maxlength: null,
        'show-word-limit': false,
        readonly: false,
        disable: false,
        required: true,
        regList: [],
        changeTag: true
    }
];

export const selectComponents = [
    {
        label: '下拉选择',
        tag: 'Select',
        tagIcon: 'select',
        placeholder: '请选择',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        required: true,
        filterable: false,
        multiple: false,
        options: [{
            label: '选项一',
            value: 1
        }, {
            label: '选项二',
            value: 2
        }],
        regList: [],
        changeTag: true
    },
    {
        label: '单选框',
        tag: 'RadioGroup',
        tagIcon: 'radio',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: {},
        optionType: 'default',
        border: false,
        disabled: false,
        required: true,
        options: [{
            label: '选项一',
            value: 1
        }, {
            label: '选项二',
            value: 2
        }],
        regList: [],
        changeTag: true,
    },
    // {
    //     label: '复选框',
    //     tag: 'i-checkbox',
    //     tagIcon: 'md-create',
    // },
    // {
    //     label: '时间选择',
    //     tag: 'i-date-picker',
    //     tagIcon: 'md-create',
    // },
    // {
    //     label: '文件上传',
    //     tag: 'i-upload',
    //     tagIcon: 'md-create',
    // }
];
