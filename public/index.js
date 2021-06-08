const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = (user)=>{
    if(user){
        loggedInLinks.forEach(link => link.style.display='block');
        loggedOutLinks.forEach(link => link.style.display='none');
    }else{
        loggedInLinks.forEach(link => link.style.display='none');
        loggedOutLinks.forEach(link => link.style.display='block');   
    }
}

const postList = document.querySelector('.posts');

const setupPosts = (data)=>{
    if(data.length){
    let html = '';
    data.forEach(doc=>{
        const board = doc.data();

        const li= `
            <li>
                <div class="collapsible-header grey lighten-4">${board.title}
                    <div class="adminControls right">
                        <div id="${doc.id}" title="${board.title}" content="${board.content}" style="display:block">
                            <i class="edit material-icons modal-trigger" href="#modal-update">edit</i>    
                            <i class="delete material-icons red-text">delete</i>
                        </div>
                    </div>
                </div>    
                <div class="collapsible-body white"><span>줄거리 : ${board.content}</span></div>
                <div class="collapsible-body white"><span>상영 기간 : ${board.startday}~${board.finishday}</span></div>
                <div class="collapsible-body white"><span>상영 길이 : ${board.runtime}</span></div>
                <div class="collapsible-body white"><span>상태 : ${board.state}</span></div>
                <li>    
        `;
        
        html += li;
    });
    postList.innerHTML = html;

    $(document).ready(function(){
        $('.collapsible').collapsible();
      });

    const editIcons = document.querySelectorAll('.edit');
    editIcons.forEach(editIcons =>{
        editIcons.addEventListener('click', (e)=>{
            let id = e.target.parentElement.getAttribute('id');
            let postTitle = e.target.parentElement.getAttribute('title');
            let postContent = e.target.parentElement.getAttribute('content');
            console.log(postTitle)
            const updatePost = document.querySelectorAll('#update-form');
            updatePost.title.value = postTitle;
            updatePost.content.value = postContent;

            updatePost.addEventListener('submit', (e)=>{
                e.preventDefault();
        
                db.collection("board").doc(id).set({
                  title : updatePost.title.value,
                  content : updatePost.content.value,
                  runtime : Number(updatePost.runtime.value),
                  startday : updatePost.startday.value,
                  finishday : updatePost.finishday.value,
                  state : updatePost.state.value,
              }).then(()=>{
                const modal = document.querySelector('#modal-update');
                M.Modal.getInstance(modal).close();
                updatePost.reset();
                console.log('update success');
              }).caatch(function(error){
                  console.error("update error")
              })
              
              
            })

            })
        })
    

        const deleteIcons = document.querySelectorAll('.delete');
         deleteIcons.forEach(deleteIcon =>{
              deleteIcon.addEventListener('click', (e)=>{
                e.stopPropagation();
                let id = e.target.parentElement.getAttribute('id');
              
            })
         })
     }else{
        if(auth.currentUser != null){
         postList.innerHTML = '<h4 class="center-align">공연을 등록하세요.</h4>';
     }else{
        postList.innerHTML = '<h4 class="center-align">관리자 계정으로 로그인하십시오.</h4>';
        }
      }    
    }


// document.addEventListener('DOMContentLoaded', function(){

//     var modals = document.querySelectorAll('.modal');
//     MSAssertion.Modal.init(modals)

//     var items = doument.querySelectorAll('.collapsible');
//     MSAssertion.Collapsible.init(items);
// })