declare module "lyfa-preview" {
  type Item = {
    ext: string,
    name: string,
    src: string
  }
  type Options = {
    list: Array<Item>
  }
  export default class Preview {
    constructor(options: Options)
    public display(index: number): void
  }
}
