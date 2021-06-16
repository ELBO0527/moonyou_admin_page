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
        const show_info = doc.data();

        const li= `
            <li>
                <div class="collapsible-header grey lighten-4">${show_info.title}
                    <div class="adminControls right">
                        <div id="${doc.id}" title="${show_info.title}" notice="${show_info.notice}" startday="${show_info.startday}" 
                        finishday="${show_info.finishday}" state="${show_info.state}" startday="${show_info.startday}" runtime="${show_info.runtime}" style="display:block">
                            <i class="edit material-icons modal-trigger" href="#modal-update">edit</i>    
                            <i class="delete material-icons red-text">delete</i>
                        </div>
                    </div>
                </div>    
                <div class="collapsible-body white"><span>줄거리 : ${show_info.notice}</span></div>
                <div class="collapsible-body white"><span>상영 기간 : ${show_info.startday}~${show_info.finishday}</span></div>
                <div class="collapsible-body white"><span>상영 길이 : ${show_info.runtime}</span></div>
                <div class="collapsible-body white"><span>상태 : ${show_info.state}</span></div>
                <li>    
        `;
        
        html += li;
    });
    postList.innerHTML = html;

    const editIcons = document.querySelectorAll('.edit');
    editIcons.forEach(editIcons=>{
        editIcons.addEventListener('click', (e)=>{
          
            let id = e.target.parentElement.getAttribute('id');
            let postTitle = e.target.parentElement.getAttribute('title');
            let postNotice = e.target.parentElement.getAttribute('notice');
            let postState = e.target.parentElement.getAttribute('state');
            let postStartday = e.target.parentElement.getAttribute('startday');
            let postFinishday = e.target.parentElement.getAttribute('finishday');
            let postRuntime = e.target.parentElement.getAttribute('runtime');
            
            const updatePost = document.querySelector('#update-form');
            
            for(var i=0; i<updatePost.length; i++){
                console.log(updatePost[i].id)
            }
            
            console.log(postState);

            updatePost.title.value = postTitle;
            updatePost.notice.value = postNotice;
            updatePost.state.value = postState;
            updatePost.startday.value = postStartday;
            updatePost.finishday.value = postFinishday;
            updatePost.runtime.value = postRuntime;
           
            updatePost.addEventListener('submit', (e)=>{
                e.preventDefault();
        
                db.collection("show_info").doc(id).update({
                  title : updatePost.title.value,
                  notice : updatePost.notice.value,
                  runtime : Number(updatePost.runtime.value),
                  startday : updatePost.startday.value,
                  finishday : updatePost.finishday.value,
                  state : updatePost.state.value,
              }).then(()=>{
                const modal = document.querySelector('#modal-update');
                M.Modal.getInstance(modal).close();
                updatePost.reset();
                alert('수정이 완료되었습니다.');
              }).catch(function(error){
                  alert.error("수정 오류")
              })
              
              
            })

        })
    })

    const deleteIcons = document.querySelectorAll('.delete');
    deleteIcons.forEach(deleteIcon =>{
         deleteIcon.addEventListener('click', (e)=>{
           e.stopPropagation();
           let id = e.target.parentElement.getAttribute('id');
           db.collection("show_info").doc(id).delete();
       })
    })
        }else{
             if(auth.currentUser != null){
             postList.innerHTML = '<h4 class="center-align">공연을 등록하세요.</h4>';
        }else{
            postList.innerHTML = '<h4 class="center-align">관리자 계정으로 로그인하십시오.</h4>';
            }
        }
    
 
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, options);
      });
    
      // Or with jQuery
    
      $(document).ready(function(){
        $('select').formSelect();
      });
  /*  시간피커
  $(function() {
      $("#time1,#time2").timepicker({
          timeFormat: 'h:mm p',
          interval: 60,
          minTime: '10',
          maxTime: '23:00pm',
          defaultTime: '11',
          startTime: '10:00',
          dynamic: false,
          dropdown: true,
          scrollbar: true        
      });
  });
 
 /날짜피커
    $(document).ready(function(){
      $.datepicker.setDefaults($.datepicker.regional["ko"]);
      $("#datepicker").datepicker();
    });*/
    

}