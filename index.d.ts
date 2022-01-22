type Item = {
  ext: string,
  name: string,
  src: string
}
type Options = {
  list: Array<Item>
}
declare class Preview {
  constructor(options: Options)
  public display(index: number):void
}
