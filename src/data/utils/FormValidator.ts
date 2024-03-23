import * as yup from 'yup'
export type FormDataProps = {
  name: string
  cpf: string
  password: string
  passwordConfirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  cpf: yup
    .string()
    .required('Informe o CPF.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .test('cpf', 'CPF inválido', (value) => {
      if (!value) return false

      const cleanedCPF = value.replace(/\D/g, '')

      if (/^(\d)\1+$/.test(cleanedCPF)) {
        return false
      }

      let sum = 0
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (10 - i)
      }
      let remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      if (remainder !== parseInt(cleanedCPF.charAt(9))) {
        return false
      }

      sum = 0
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (11 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      if (remainder !== parseInt(cleanedCPF.charAt(10))) {
        return false
      }

      return true
    }),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
  passwordConfirm: yup
    .string()
    .required('Informe a confirmação da senha.')
    .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais.'),
})

export type LoginFormDataProps = {
  cpf: string
  password: string
}

const signInSchema = yup.object({
  cpf: yup
    .string()
    .required('Informe o CPF.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .test('cpf', 'CPF inválido', (value) => {
      if (!value) return false

      const cleanedCPF = value.replace(/\D/g, '')

      if (/^(\d)\1+$/.test(cleanedCPF)) {
        return false
      }

      let sum = 0
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (10 - i)
      }
      let remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      if (remainder !== parseInt(cleanedCPF.charAt(9))) {
        return false
      }

      sum = 0
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (11 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) {
        remainder = 0
      }
      if (remainder !== parseInt(cleanedCPF.charAt(10))) {
        return false
      }

      return true
    }),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
})

export { signUpSchema, signInSchema }
