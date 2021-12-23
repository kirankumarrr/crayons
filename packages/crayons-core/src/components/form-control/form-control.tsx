import { Component, Prop, h, Element, State } from '@stencil/core';
import { hasSlot } from '../../utils';
@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
  shadow: true,
})
export class FormControl {
  @Element() el;

  @Prop()
  label: any;
  @Prop()
  required: any;
  @Prop()
  placeholder: any;
  @Prop()
  touched: any;
  @Prop()
  error: any;
  @Prop()
  type: any;
  @Prop()
  inputType: any;
  @Prop()
  name = '';
  @Prop()
  choices: any;
  @Prop()
  controlProps: any;

  @State() hasSlot = false;

  renderControl() {
    if (this.hasSlot) return null;
    let cmp;
    switch (this.type) {
      case 'input':
        cmp = (
          <fw-input
            type={this.inputType}
            name={this.name}
            placeholder={this.placeholder}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, this.inputType)}
          ></fw-input>
        );
        break;
      case 'textarea':
        cmp = (
          <fw-textarea
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, this.inputType)}
          ></fw-textarea>
        );
        break;

      case 'date':
        cmp = (
          <fw-datepicker
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, this.inputType)}
          ></fw-datepicker>
        );
        break;

      case 'checkbox':
        cmp = (
          <fw-checkbox
            name={this.name}
            required={this.required}
            {...this.controlProps?.checkboxProps(this.name, this.inputType)}
          >
            {this.label}
          </fw-checkbox>
        );
        break;

      case 'radio':
        cmp = (
          <fw-radio-group
            allow-empty
            label={this.label}
            name={this.name}
            required={this.required}
            {...this.controlProps?.radioProps(this.name, this.inputType)}
          >
            {this.choices?.map((ch) => {
              return <fw-radio value={ch.value}>{ch.value}</fw-radio>;
            })}
          </fw-radio-group>
        );
        break;

      case 'select':
        cmp = (
          <fw-select
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            options={this.choices.map((f) => ({
              ...f,
              text: f.value,
            }))}
            multiple={this.inputType === 'MULTI_SELECT'}
            {...this.controlProps?.selectProps(this.name, this.inputType)}
          ></fw-select>
        );
        break;
      case 'time':
        cmp = (
          <fw-timepicker
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, this.inputType)}
          ></fw-timepicker>
        );
        break;

      default:
        cmp = <div>Not found</div>;
        break;
    }
    return cmp;
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  private handleSlotChange() {
    this.hasSlot = hasSlot(this.el);
  }

  render() {
    return (
      <div>
        <div class='container'>
          <label
            htmlFor={this.name}
            class={{
              label: true,
              required: this.required,
            }}
          >
            {this.label}
          </label>
        </div>
        {this.renderControl()}
        <slot></slot>
        {this.touched && this.error && <div class='error'> {this.error}</div>}
      </div>
    );
  }
}