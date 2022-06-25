export const rules = {
  required: (message: string = 'Обязательное поле') => ({
    required: true,
    message,
  }),
}
