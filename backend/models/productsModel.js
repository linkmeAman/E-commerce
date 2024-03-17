const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product stock cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add promises to Mongoose operations
// productSchema.pre('save', async function (next) {
//     try {
//         await this.execPopulate(); // If you want to populate fields before saving
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// productSchema.post('save', function (error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next(new Error('Duplicate key error'));
//     } else {
//         next(error);
//     }
// });

module.exports = mongoose.model('Product', productSchema);
