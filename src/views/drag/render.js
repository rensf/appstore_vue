import { makeMap } from './util';
import { Checkbox } from 'view-design';

const isAttr = makeMap(
    'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,'
    + 'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,'
    + 'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,'
    + 'name,contenteditable,contextmenu,controls,coords,data,datetime,default,'
    + 'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,'
    + 'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,'
    + 'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,'
    + 'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,'
    + 'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,'
    + 'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,'
    + 'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,'
    + 'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,'
    + 'target,title,type,usemap,value,width,wrap'
)

function vModel(self, dataObject, defaultValue) {
    if (dataObject.props.tag !== 'DatePicker') {
        dataObject.props.value = defaultValue
    }

    dataObject.on.input = val => {
        self.$emit('input', val)
    }
}

const componentChild = {
    'Input': {
        prepend(h, conf, key) {
            return <template slot="prepend">{conf[key]}</template>
        },
        append(h, conf, key) {
            return <template slot="append">{conf[key]}</template>
        }
    },
    'Select': {
        options(h, conf, key) {
            const list = []
            conf.options.forEach(item => {
                list.push(<Option label={item.label} value={item.value} disabled={item.disabled}></Option>)
            })
            return list
        }
    },
    'RadioGroup': {
        options(h, conf, key) {
            const list = []
            conf.options.forEach(item => {
                list.push(<Radio label={item.value}>{item.label}</Radio>)
            })
            return list
        }
    },
    'CheckboxGroup': {
        options(h, conf, key) {
            const list = []
            conf.options.forEach(item => {
                list.push(<Checkbox label={item.value}>{item.label}</Checkbox>)
            })
            return list
        }
    }
}

export default {
    render(h) {
        const dataObject = {
            attrs: {},
            props: {},
            on: {},
            style: {}
        }
        const confClone = JSON.parse(JSON.stringify(this.conf))
        const children = []

        const childObjs = componentChild[confClone.tag]
        if (childObjs) {
            Object.keys(childObjs).forEach(key => {
                const childFunc = childObjs[key]
                if (confClone[key]) {
                    children.push(childFunc(h, confClone, key))
                }
            })
        }

        /**
         * iview Select 有个label属性阻碍placeholder出现
         */
        if (confClone.tag === 'Select') {
            delete confClone.label
        }

        Object.keys(confClone).forEach(key => {
            const val = confClone[key]
            if (key === 'vModel') {
                vModel(this, dataObject, confClone.defaultValue)
            } else if (dataObject[key]) {
                dataObject[key] = val
            } else if (!isAttr(key)) {
                dataObject.props[key] = val
            } else {
                dataObject.attrs[key] = val
            }
        })

        return h(this.conf.tag, dataObject, children)
    },
    props: ['conf']
}

