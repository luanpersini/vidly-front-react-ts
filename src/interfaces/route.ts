export type Route = {
  path: string
  title: string
  exact: boolean
  auth: boolean
  component: any
  props?: any
  location?: any  
}
