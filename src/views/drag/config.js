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
        tag: 'i-input',
        tagIcon: 'md-create',
        placeholder: '请输入',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: {width: '100%'},
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
        tag: 'i-input',
        tagIcon: 'md-create',
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
        style: {width: '100%'},
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
        tag: 'i-input',
        tagIcon: 'md-create',
        type: 'password',
        placeholder: '请输入',
        defaultValue: undefined,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: {width: '100%'},
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
        tag: 'i-select',
        placeholder: '请选择',
        defaultValue: undefined,
    },
    {
        label: '单选框',
        tag: 'i-radio'
    },
    {
        label: '复选框',
        tag: 'i-checkbox'
    },
    {
        label: '时间选择',
        tag: 'i-date-picker'
    },
    {
        label: '文件上传',
        tag: 'i-upload'
    }
];
