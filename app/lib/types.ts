export type CompanyType = {
    _id : string,
    companyName: string,
    email: string,
    phone: string,
    address: string,
    role: string,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    __v: string,
}

export type UserType = {
    _id : string,
    firstName: string,
    lastName: string,
    dob: Date,
    email: string,
    phone: string,
    address: string,
    role: string,
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    __v: string,
}