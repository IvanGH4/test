const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const createDomPurifier = require('dompurify');
const {JSDOM} = require('jsdom');
const dompurify = createDomPurifier(new JSDOM().window);

let articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

articleSchema.pre('validate', function(next) {
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

module.exports = mongoose.model('Article', articleSchema);