interface Image {
    url : string,
    alt : string,
}

export interface ProductsTypes {
    _id:string,
    name : string,
    price : number,
    category : string,
    description : string,
    images : Image[],
}