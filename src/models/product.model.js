import mongoose, {Schema} from 'mongoose';

const productSchema = new Schema(
    {
        title: {
            type: String,
            require: true
        },
        desc: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        category: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

export const Product = mongoose.model("Product", productSchema)