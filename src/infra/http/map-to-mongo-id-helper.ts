export const MapToMongoIdHelper = {
  map: (data: any): any => {
    if(data.id){
    const { id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { _id: id })
    }else{
    return data
    }
  },
  mapArray: (array: any[]): any[] => {
    return array.map((c) => MapToMongoIdHelper.map(c))
  }
}
