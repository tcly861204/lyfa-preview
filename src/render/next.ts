/*
  @Author: tcly861204
  @Email:  356671808@qq.com
  @Date:   2022/1/23 下午3:22:49
  @Last Modified by:   tcly861204
  @Last Modified time: 2022/1/23 上午9:50:34
  @Github: https://tcly861204.github.io
*/
import { store, Mutations } from '@/store'
import { findNode, on } from '@/libs/utils'
export default function () {
  const next = findNode('.next')
  next.style.display = store.len > 1 ? 'block' : 'none'
  on(next, 'click', Mutations.handleNext)
}