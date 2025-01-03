export const domains = storage.defineItem<string[]>('sync:domains', {
  fallback: [],
})

export const safeURL = storage.defineItem<string>('sync:safeURL', {
  fallback: 'about:newtab',
})
