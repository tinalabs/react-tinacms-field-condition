import { useMemo } from 'react'
import { Field, FieldPlugin, FieldsBuilder } from 'tinacms'
import { getParentField } from '../getParentField'

export const ConditionalField = ({ form, tinaForm, input, field }: any) => {
  const parentField = getParentField(input.name, form)
  const conditionalField: Field<any> = useMemo(() => {
    let fieldName = field.name

    if (field.name && field.field?.name) {
      fieldName = [field.name, field.field.name].join('.')
    } else if (field.name.length <= 0 && field.field?.name) {
      return field.field.name
    }

    return {
      ...field.field,
      name: fieldName,
    }
  }, [JSON.stringify(field)])
  const shouldShowFields = field.condition(
    input.value,
    parentField?.value,
    input,
    tinaForm
  )

  if (shouldShowFields) {
    return (
      <div style={{ margin: '-20px -20px 0 -20px' }}>
        {/* TODO: fix loose typing */}
        <FieldsBuilder form={tinaForm} fields={[conditionalField]} />
      </div>
    )
  }

  return null
}

export const ConditionalFieldPlugin: FieldPlugin = {
  __type: 'field',
  name: 'conditional',
  Component: ConditionalField,
}

export default ConditionalFieldPlugin
