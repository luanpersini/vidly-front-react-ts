export const MapToMongoIdHelper = {
  map: (data: any): any => {
       const { id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { _id: id })
  },
  mapArray: (array: any[]): any[] => {
    return array.map((c) => MapToMongoIdHelper.map(c))
  }
}
