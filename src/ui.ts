export class ValueSlider {
    name: string
    tagPrefix: string
    values: any[]
    value: any
    i: number
    defaultI: number
    container: HTMLDivElement
    input: HTMLInputElement
    label?: HTMLLabelElement
    valueDisplay?: HTMLSpanElement
    callback?: Function

    constructor(parent: HTMLElement, name: string, values: any[], callback?: Function,
        defaultI: number = 0, tagPrefix?: string, label: boolean = true,
        valueDisplay: boolean = true) {
        this.name = name
        this.tagPrefix = tagPrefix || name.replace(' ', '-').toLowerCase()
        this.values = values
        this.value = values[defaultI]
        this.i = defaultI
        this.defaultI = defaultI
        this.callback = callback

        this.container = document.createElement('div')
        this.container.id = `${this.tagPrefix}-container`
        this.container.classList.add('slider-container')

        this.input = document.createElement('input')
        this.input.type = 'range'
        this.input.id = `${this.tagPrefix}-input`
        this.input.classList.add('slider-input')
        this.input.min = '0'
        this.input.max = (this.values.length - 1).toString()
        this.input.step = '1'
        this.input.defaultValue = this.defaultI.toString()
        this.input.addEventListener('input', (ev) => this.onInput(ev))

        if (label) {
            this.label = document.createElement('label')
            this.label.id = `${this.tagPrefix}-label`
            this.input.classList.add('slider-label')
            this.label.htmlFor = this.input.id
            this.label.innerHTML = this.name
            this.container.appendChild(this.label)
        }
        this.container.appendChild(this.input)

        if (valueDisplay) {
            this.valueDisplay = document.createElement('span')
            this.valueDisplay.id = `${this.tagPrefix}-value`
            this.valueDisplay.classList.add('slider-value')
            this.container.appendChild(this.valueDisplay)
        }
        this.select(this.i)
        parent.appendChild(this.container)
    }

    select(i: number) {
        this.i = i
        this.value = this.values[i]
        if (this.valueDisplay) {
            this.valueDisplay.innerHTML = this.value.toString()
        }
    }

    onInput(ev: Event) {
        this.select(parseInt(this.input.value))
        if (this.callback) {
            this.callback(this, ev)
        }
    }
}