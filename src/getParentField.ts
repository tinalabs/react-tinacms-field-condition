import { FormApi } from 'final-form'

export const getParentField = (fieldName: string, form: FormApi) => {
  const fieldNameParts = fieldName.split('.')
  const parentFieldName = fieldNameParts
    .join('.')
    .replace(/\.$|\.undefined$/, '')
  const parentField = form.getFieldState(parentFieldName)

  return parentField
}
