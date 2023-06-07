import { forwardRef } from '@chakra-ui/react'
import { createField } from '@saas-ui/forms'
import { createZodForm } from '@saas-ui/forms/zod'
import { DateInput, DateInputProps } from '@saas-ui/date-picker'
import { EditorField } from '../editor'
import { createFormDialog } from '@saas-ui/react'
import { parseDate, DateValue } from '@internationalized/date'

interface DateFieldProps extends Omit<DateInputProps, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
}

const DateField = createField(
  forwardRef<DateFieldProps, 'input'>((props, ref) => {
    const { value: valueProp, onChange: onChangeProp, ...rest } = props

    const value = valueProp !== undefined ? parseDate(valueProp) : valueProp
    const onChange = (value: DateValue | null) => {
      onChangeProp(value?.toString() || '')
    }

    return <DateInput ref={ref} value={value} onChange={onChange} {...rest} />
  }),
  {
    isControlled: true,
  },
)

export const Form = createZodForm({
  fields: {
    date: DateField,
    editor: EditorField,
  },
})

export const FormDialog = createFormDialog(Form)
