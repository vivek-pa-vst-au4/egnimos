const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var employeeSchema = new mongoose.Schema({ ///constructer of schema i.e mongoose
    name: {
        type: String
    },

    password:{
        type: String
    },

    userName: {
        type: String,
         unique: true
    },

    dateOfBirth: {
        type: String
    }
});


///register employeeSchema to mongoose
employeeSchema.plugin(uniqueValidator);
mongoose.model('Employee', employeeSchema); ///('name of the schema', schemaObject)