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
    expect(form.field('name').element).toEqual(fieldElement)
  })

  test('prefix should always be a string', () => {
    form.prefix = null
    expect(form.prefix).toEqual('')
  })
})

describe('Field no prefix', () => {
  let form = new Form(formElement, [], null)
  let field = new Field(form, 'name')

  test('selector', () => {
    expect(field.selector).toEqual('[name=name]')
  })

  test('element', () => {
    expect(field.element).toEqual(fieldElement)
  })

  test('labeElement', () => {
    expect(field.labelElement).toEqual(labelElement)
  })

  test('containerElement', () => {
    expect(field.containerElement).toEqual(containerElement)
  })

  test('value', () => {
    expect(field.value).toEqual('')
    field.value = 'test'
    expect(field.value).toEqual('test')
  })
})

describe('Field with prefix', () => {
  let form = new Form(formElement, [], 'test')
  let field = new Field(form, 'name')

  test('selector', () => {
    expect(field.selector).toEqual('[name=test-name]')
  })
})

describe('select Field', () => {
  const dom = new JSDOM(`
  <html><body><form>
    <div id="name-container">
      <select id="id_name" name="name" multiple="multiple">
        <option value="a">A</option>
        <option selected="selected" value="b">B</option>
      </select>
      <label for="id_name">Name</label>
    </div>
  </form></body></html>
  `)

  let formElement = dom.window.document.querySelector('form')
  let form = new Form(formElement)
  let field = form.field('name')

  test('get value', () => {
    expect(field.value).toBe('b')
  })

  test('set value', () => {
    expect(formElement.querySelectorAll('[selected=selected]').length).toBe(1)
    field.value = ['a', 'b']
    expect(formElement.querySelectorAll('[selected=selected]').length).toBe(2)
    expect(field.value).toBe(['a'])
  })
})
