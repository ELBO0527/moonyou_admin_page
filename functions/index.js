const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.makeAdmin = functions.https.onCall((data,context)=>{
    return admin.auth().getUserByEmail(data,email).then(user =>{
        if(data.email === 'apvlfntm@naver.com'){
            message = `${data.email} has admin priviledges`
            return admin.auth().setCustomUserClaims(user.uid, {admin:true});
        }else{
            message = `${data.email} doesnt have admin priviledges`
            return admin.auth().setCustomUserClaims(user.uid, {admin:false});
        }
    }).then(()=>{
        return{ message }
    }).catch(error=>{
        return error;
    })
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
