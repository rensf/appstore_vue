export const formConf = {
    formName: '表单',
    formRef: 'Form',
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
        disabled: false,
        required: true,
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
        disabled: false,
        required: true,
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
        disabled: false,
        required: true,
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
        disabled: false,
        required: true,
        options: [{
            label: '选项一',
            value: 1
        }, {
            label: '选项二',
            value: 2
        }],
        changeTag: true
    },
    {
        label: '复选框',
        tag: 'CheckboxGroup',
        tagIcon: 'checkbox',
        defaultValue: [],
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: {},
        disabled: false,
        required: true,
        options: [{
            label: '选项一',
            value: 1
        }, {
            label: '选项二',
            value: 2
        }],
        changeTag: true
    },
    {
        label: '日期选择',
        tag: 'DatePicker',
        tagIcon: 'date',
        type: 'date',
        placeholder: '请选择',
        defaultValue: null,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        required: true,
        format: 'yyyy-MM-dd',
        readonly: false,
        changeTag: true
    },
    {
        label: '时间选择',
        tag: 'TimePicker',
        tagIcon: 'time',
        type: 'time',
        placeholder: '请选择',
        defaultValue: null,
        span: 24,
        showLabel: true,
        labelWidth: null,
        style: { width: '100%' },
        clearable: true,
        disabled: false,
        required: true,
        readonly: false,
        changeTag: true
    }
    // {
    //     label: '文件上传',
    //     tag: 'i-upload',
    //     tagIcon: 'md-create',
    // }
];
