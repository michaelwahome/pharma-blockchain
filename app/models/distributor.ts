import mongoose, {Schema} from "mongoose";

const distributorSchema = new Schema(
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

const Distributor = mongoose.models.Distributor || mongoose.model("Distributor", distributorSchema);

export default Distributor;