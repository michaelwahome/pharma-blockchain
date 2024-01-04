import mongoose, {Schema} from "mongoose";

const companySchema = new Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required."],
            trim: true,
        },
        email:{
            type: String,
            required: [true, "E-mail is required."],
            trim: true,
            match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"]
        },
        phone:{
            type: String,
            required: [true, "Phone number is required."],
            trim: true,
            match: [/^\+\d+$|^\d+$/, "Invalid phone number"]
        },
        address:{
            type: String,
            required: [true, "Address is required."],
            trim: true
        },
        role: {
            type: String,
            required: [true, "Please choose your company type."],
            enum: ["manufacturer", "distributor", "retailer"],
            lowercase: true
        },
        username:{
            type: String,
            required: [true, "Username is required."],
            trim: true,
            unique: true
        },
        password:{
            type: String,
            required: [true, "Password is required."]
        }
    },
    {timestamps: true}
);

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;