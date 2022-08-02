const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    // trim used for removing white space
    trim:true,
    min:3,
    max:20
},
lastName:{
    type:String,
    required:true,
    // trim used for removing white space
    trim:true,
    min:3,
    max:20
},
username:{
    type:String,
    required:true, 
    trim:true, 
    // unique for every user will be unique
    unique:true,
    // index is required query is based on user also
    index:true,
    lowercase:true
},
email:{
    type:String,
    required:true, 
    trim:true, 
    unique:true, 
    lowercase:true
},
hash_password:{
    type:String,
    required:true,   
},
role:{
type:String,
enum:['user','admin'],
default:'user'
},
contactNumber:{
    type:String,
},
profilePicture:{
    type:String, 
}
},{timestamps:true});
// userSchema.virtual('password')
// .set(function(password){
//     // here 10 is salt its give vale  1  to 10
//     this.hash_password=bcrypt.hashSync(password,10)
// });
userSchema.virtual('fullName')
.get(function(){
return `${this.firstName} ${this.lastName}`
});

userSchema.methods={
    // authenticate is a regular function
    authenticate:async function(password){
        // if this match return true otherwise false
      return await bcrypt.compare(password,this.hash_password)
    }
}
module.exports=mongoose.model('User',userSchema);