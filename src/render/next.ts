import { store, Mutations } from '@/store'
import { findNode, on } from '@/libs/utils'
export default function () {
  const next = findNode('.next')
  next.style.display = store.len > 1 ? 'block' : 'none'
  on(next, 'click', Mutations.handleNext)
}