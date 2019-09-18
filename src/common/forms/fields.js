import BaseFieldHOC from './BaseFieldHOC'

import CheckboxInput from './inputs/CheckboxInput'
import SelectInput from './inputs/SelectInput'
import TextInput from './inputs/TextInput'
import PhoneInput from './inputs/PhoneInput'
import TextareaInput from './inputs/TextareaInput'
import XlsParserInput from './inputs/XlsParserInput'
import DateTimeInput from './inputs/DateTimeInput'
import Captcha from './inputs/Captcha'
import AceInput from './inputs/AceInput'
import QuillInput from './inputs/QuilInput'

const QuillField = BaseFieldHOC(QuillInput)
const AceField = BaseFieldHOC(AceInput)
const CheckboxField = BaseFieldHOC(CheckboxInput)
const SelectField = BaseFieldHOC(SelectInput)
const TextField = BaseFieldHOC(TextInput)
const PhoneField = BaseFieldHOC(PhoneInput)
const TextareaField = BaseFieldHOC(TextareaInput)
const XlsParserField = BaseFieldHOC(XlsParserInput)
const DateTimeField = BaseFieldHOC(DateTimeInput)
const CaptchaField = BaseFieldHOC(Captcha)

export {
  QuillField,
  CheckboxField,
  SelectField,
  TextField,
  PhoneField,
  TextareaField,
  XlsParserField,
  DateTimeField,
  CaptchaField,
  AceField,
}
