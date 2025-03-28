import type { Directive } from "vue"

export const capitalizeDirective: Directive = {
  mounted(el) {
    console.log('el :', el)


    el.target.value = el.target.value.toUpperCase();
    // if (el.tagName !== 'INPUT') return

    // const input = el as HTMLInputElement
    // const capitalize = (value: string) =>
    //   value.replace(/\b\w/g, char => char.toUpperCase())

    // const handler = (e: Event) => {
    //   const target = e.target as HTMLInputElement
    //   const [start, end] = [target.selectionStart, target.selectionEnd]
    //   target.value = capitalize(target.value)
    //   target.setSelectionRange(start, end)
    // }

    // input.value = capitalize(input.value)
    // input.addEventListener('input', handler)
    // input.addEventListener('blur', () => {
    //   input.value = capitalize(input.value.trim())
    // })

    // // Cleanup
    // el._capitalizeHandler = handler
  },
  unmounted(el) {
    if (el._capitalizeHandler) {
      el.removeEventListener('input', el._capitalizeHandler)
    }
  }
}
