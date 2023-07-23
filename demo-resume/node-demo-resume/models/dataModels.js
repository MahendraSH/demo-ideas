const mongoose = require('mongoose');
//  resume data 
const dataSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
        
    },
    discription: {
        type: String,
        required: [true, 'Please add a discription'],
        minlength:[100, 'Discription must be at least 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
    },
    // github: {
    //     type: String,
    //     required: [true, 'Please add a github'],
    //     unique: true,
    //     match: [
    //         /https?:\/\/(www\.)?github\.com\//,
    //         'Please use a valid URL with HTTP or HTTPS'
    //     ]

    // },
    // linkedin: {
    //     type: String,
    //     required: [true, 'Please add a linkedin'],
    //     unique: true,
    //     match: [
    //         /https?:\/\/(www\.)?linkedin\.com\//,
    //         'Please use a valid URL with HTTP or HTTPS'
    //     ]

    // },
    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Data', dataSchema);
