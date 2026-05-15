import bcrypt from "bcrypt";

const senha = "49932867000174";

bcrypt.hash(senha,5).then(hash=>{

console.log(hash);

});