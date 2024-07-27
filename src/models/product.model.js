import mongoose, {Schema} from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        image_url: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        strikedoffprice: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true,
            default: "men"
        },
        rating: {
            type: Number,
            require: true
        },
        popular: {
            type: Number,
            require: true
        },
        new: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            require: true
        }
    }
)

export const Product = mongoose.model("Product", productSchema)