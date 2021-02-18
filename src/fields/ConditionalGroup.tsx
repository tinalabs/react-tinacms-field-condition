import React, { useMemo } from 'react'
import { FieldPlugin, FieldsBuilder } from 'tinacms'
import { getParentField } from '../getParentField'

export const ConditionalGroupField = ({
  form,
  tinaForm,
  input,
  field,
}: any) => {
  const parentField = getParentField(input.name, form)
  const conditionalFields: any[] = useMemo(
    () =>
      field.fields.map((subField: any) => {
        let fieldName = subField.name;
        
        if (parentField?.name && subField?.name) {
          fieldName = [field.name, subField.name].join('.')
        } else if (parentField?.name && !subField?.Name) {
          fieldName = parentField.name
        }

        return {
          ...subField,
          name: fieldName,
        }
      }),
    [JSON.stringify(field)]
  )
  const shouldShowFields = field.condition(
    input.value,
    parentField?.value || tinaForm?.values,
    input,
    tinaForm
  )

  if (shouldShowFields) {
    return (
      <div style={{ margin: '-20px -20px 0 -20px' }}>
        <FieldsBuilder form={tinaForm} fields={conditionalFields} />
      </div>
    )
  }

  return null
}

export const ConditionalGroupFieldPlugin: FieldPlugin = {
  __type: 'field',
  name: 'condition-group',
  Component: ConditionalGroupField,
}
    
export const ConditionGroupFieldPlugin = ConditionalGroupFieldPlugin;

export default ConditionalGroupFieldPlugin
