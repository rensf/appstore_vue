<script>
    import draggable from 'vuedraggable';
    import render from './render';

    const components = {
        itemBtns(h, element, index, parent) {
            const { copyItem, deleteItem } = this.$listeners
            return [
                <span class="drawing-item-copy" title="复制" onClick={event =>{
                    copyItem(element, parent); event.stopPropagation()
                }}>
                    <Icon size="16" type="md-copy" />
                </span>,
                <span class="drawing-item-delete" title="删除" onClick={event =>{
                    deleteItem(index, parent); event.stopPropagation()
                }}>
                    <Icon size="16" type="md-trash" />
                </span>
            ];
        }
    };

    const layouts = {
        colFormItem(h, element, index, parent) {
            const { activeItem } = this.$listeners
            let className = this.activeId === element.formId ? 'drawing-item active-from-item' : 'drawing-item'
            if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
            let labelWidth = element.labelWidth ? `${element.labelWidth}px` : null
            if (element.showLabel === false) labelWidth = '0'
            return (
                <Col span={element.span} class={className} nativeOnClick={ event => { activeItem(element); event.stopPropagation() }}>
                    <FormItem label-width={labelWidth} label={element.showLabel ? element.label : ''} required={element.required}>
                        <render key={element.renderKey} conf={element} onInput={event => {this.$set(element, 'defaultValue', event)}} />
                    </FormItem>
                    {components.itemBtns.apply(this, arguments)}
                </Col>
            )
        },
        rowFormItem(h, element, index, parent) {
            const { activeItem } = this.$listeners
            const className = this.activeId === element.formId ? 'drawing-row-item active-from-item' : 'drawing-row-item'
            let child = renderChildren.apply(this, arguments)
            if (element.type === 'flex') {
                child = <Row type={element.type} justify={element.justify} align={element.align}>
                            {child}
                        </Row>
            }
            return (
                <Col span={element.span}>
                    <Row gutter={element.gutter} class={className} nativeOnClick={event => { activeItem(element); event.stopPropagation() }}>
                        <span class="component-name">{element.componentName}</span>
                        <draggable list={element.children} animation={340} group="componentsGroup" class="drag-wrapper">
                            {child}
                        </draggable>
                        {components.itemBtns.apply(this, arguments)}
                    </Row>
                </Col>
            )
        }
    }

    function renderChildren(h, element, index, parent) {
        if (!Array.isArray(element.children)) return null
        return element.children.map((el, i) => {
            const layout = layouts[el.layout]
            if (layout) {
                return layout.call(this, h, el, i, element.children)
            }
            return layoutIsNotFound.call(this)
        })
    }

    function layoutIsNotFound() {
        throw new Error(`没有与${this.element.layout}匹配的layout`)
    }

    export default {
        name: 'DraggableItem',
        components: {
            render,
            draggable
        },
        props: [
            'element',
            'index',
            'drawingList',
            'activeId',
            'formConf'
        ],
        render(h) {
            const layout = layouts[this.element.layout]
            console.log("!!!!!!!!!!!!!!!!!!" + layout)
            if (layout) {
                return layout.call(this, h, this.element, this.index, this.drawingList)
            }
            return layoutIsNotFound.call(this)
        }
    };
</script>
