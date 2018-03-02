import { JSDOM } from 'jsdom'
import { Field, Form } from './form'

let dom = new JSDOM(`
  <html><body><form>
    <div id="name-container">
      <input id="id_name" name="name" />
      <label for="id_name">Name</label>
    </div>
  </form></body></html>
`)
let formElement = dom.window.document.querySelector('form')
let fieldElement = formElement.querySelector('#id_name')
let labelElement = formElement.querySelector('label[for=id_name]')
let containerElement = formElement.querySelector('#name-container')

describe('Form', () => {
  let form = new Form(formElement)

  test('field()', () => {
    let result = form.field('name')

    expect(form.field('name')).toBeInstanceOf(Field)
    expect(form.field('name').form).toEqual(form)
    expect(form.field('name').element()).toEqual(fieldElement)
  })

  test('bind()', () => {

  })
})

describe('Field', () => {
  let form = new Form(formElement)
  let field = new Field(form, 'name')

  test('element()', () => {
    expect(field.element()).toEqual(fieldElement)
  })

  test('labeElement()', () => {
    expect(field.labelElement()).toEqual(labelElement)
  })

  test('containerElement()', () => {
    expect(field.containerElement()).toEqual(containerElement)
  })

  test('value() -> empty', () => {
    expect(field.value()).toEqual('')
  })

  test('value() -> changed', () => {
    field.element().value = 'test'
    expect(field.value()).toEqual('test')
  })
})
