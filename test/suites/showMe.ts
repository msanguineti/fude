export const showMe = (text: string): void => {
  if (process.env.FUDE_CHECK_VISUALLY) return console.log(text)
}
