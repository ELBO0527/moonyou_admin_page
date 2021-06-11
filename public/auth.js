
$(document).ready(function(){
    $('.modal').modal();
  });


  auth.onAuthStateChanged(user =>{
    if(user){
      console.log('로그인 성공')
      db.collection('show_info').onSnapshot(snapshot=>{
        setupPosts(snapshot.docs);
        loginCheck(user);
    }),error => {
        console.log(error.message)
    }
    
      }else{
      console.log('로그아웃')
      setupPosts([])
      loginCheck();
      }
});    

    const signUpForm = document.querySelector('#signup-form');

    signUpForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const email = signUpForm['signup-email'].value;
        const password = signUpForm['signup-password'].value;

        auth.createUserWithEmailAndPassword(email,password).then(userCredential =>{

            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
        })
    })

    const logout = document.querySelector('#logout');

    logout.addEventListener('click',(e)=>{
        e.preventDefault();
        auth.signOut().then(()=>{
            alert("로그아웃 되었습니다.")
        });
    });


    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        auth.signInWithEmailAndPassword(email,password).then(userCredential =>{

            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();

        }).catch((err)=>{
            alert('정보가 맞지 않습니다.');
        });
    }); 






    