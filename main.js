//탭 관련된 것부터 만든다.
const shadow = document.querySelector('#shadow')
const tabs = document.querySelectorAll('.tab')

tabs.forEach( tab => tab.addEventListener('click', (e)=>indicator(e)))

function indicator(e){
    console.log(e.currentTarget);
    const target = e.currentTarget;
    const px = 'px';

    shadow.style.left =target.offsetLeft + px;
    shadow.style.top = target.offsetTop + 40+px;
    shadow.style.width = target.offsetWidth +px;

    // 표시영역을 세로방향으로 더 넓히기
    shadow.style.height = '40px';
    shadow.style.top = target.offsetTop +10+px;

    //탭을 눌렀을 때, 화면랜더링
    const type = e.currentTarget.id;
    render(type);
}


// 유저 입력 값 받아오기
// 두가지 방법( Enter, +버튼 클릭)
// 입력을 담을 리스트 준비
let todoList=[]
let doneList=[]
let ongoingList=[]

const input = document.querySelector('input')
input.addEventListener('keyup', function(e){
    if(e.key =='Enter'){
        const inputValue = input.value.trim();
        const item ={value:inputValue, class:'normal'}
        //앞서 입력한 값이 다시 들어오면 입력안되고, 새로운 값만 입력 되게
        const i = todoList.findIndex(todo => todo.value == inputValue);  // 존재하지 않으면 -1 반환
        if ( i == -1){ 
            if(inputValue !=''){//빈문자열 아닐경우
                todoList.push({...item}); //겍체 독립
                ongoingList.push({...item})
                input.value =''; //input란 비우기
                renderList()
            }
        }
        //입력하는 순간 indicator가 '모두'를 가리키게 한다.
        // indicator는 해당탭을 클릭할 때 작동하므로
        const allTab = document.querySelector('#all')
        allTab.click();
         
    }
})

const addButton = document.querySelector('#add')
addButton.addEventListener('click', getTodo);

function getTodo(){
    const inputValue = input.value.trim();
    const item ={value:inputValue, class:'normal'}
    //앞서 입력한 값이 다시 들어오면 입력안되고, 새로운 값만 입력 되게
    const i = todoList.findIndex(todo => todo.value == inputValue);  // 존재하지 않으면 -1 반환
    if ( i == -1){ 
        if(inputValue !=''){//빈문자열 아닐경우
            todoList.push({...item}); //겍체 독립
            ongoingList.push({...item})
            input.value =''; //input란 비우기
            renderList()
        }
    } 
    const allTab = document.querySelector('#all')
    allTab.click();
}

// 메인리스트 화면 그리는 함수 만들기
// task class인 div 아래에 ul태그를 포함한 Html요소를 만든다.
const task = document.querySelector('.task') //전역변수화


function renderList(){
    // 기존 ul태그가 있다면 제거
    const oldUlTag = task.querySelector('ul');
    if(oldUlTag){
        oldUlTag.remove();
        //혹은 task.remove(oldUlTag)
    }
    task.innerHTML =''; // 확실하게 아무것도 없게 함.

    //새 ul태그 생성
    const ulTag = document.createElement('ul')
    ulTag.style.paddingLeft ='0px';

    //리스트를 바탕으로 ul태그 밑에 li태그 생성
    todoList.forEach( (todo)=>{
        const liTag = document.createElement('li');
        liTag.classList.add('todos');
        if(todo.class == 'completed'){
            liTag.classList.add('completed');
        }
        liTag.setAttribute('data-key', todo.value);
        liTag.innerHTML =`
            <div class="item ${todo.class}">${todo.value}</div>
            <div>
                <button class="check">완료</button>
                <button class="delete">삭제</button>
            </div>
        `;
        ulTag.appendChild(liTag);  //만들어지는 liTag마다 ulTag에 추가      
    });
    task.appendChild(ulTag);

    //버튼들이 정식으로 html 요소로서 추가된 이후(진짜 형성후)에, 이벤트 리스너 달음
    const checkButtons = document.querySelectorAll('.check')
    const deleteButtons = document.querySelectorAll('.delete')

    checkButtons.forEach( cb => cb.addEventListener('click', onCheckClick))
    deleteButtons.forEach( db => db.addEventListener('click', onDeleteClick))  

    //디버깅용
    console.log('== 새 아이템 추가! ==')
    console.log('todoList: ', todoList);
    console.log('doneList: ', doneList);
    console.log('ongoingList: ', ongoingList);

}

function onCheckClick(e){
    const currentButton = e.currentTarget;
    const currentLiTag = currentButton.closest('li');
    const key = currentLiTag.dataset.key;
    const currentItem = todoList.find(todo => todo.value == key)
    console.log('== 완료등록! ==')
    console.log('key: ', key)
    console.log('item: ', currentItem)
    console.log("class를 'completed'로 바꿈")

    currentItem.class = 'completed'
    currentLiTag.classList.add('completed')
    console.log(currentItem)

    // doneList에 체크한 아이템을 넣어주는데, 잘못해서 버튼 누를 때마다
    // 중복되어서 들어가면 안된다. 그러므로 먼저 리스트에 해당 아이템이 있는지 확인
    // const i = doneList.findIndex(todo => todo.value == key);
    // if( i == -1) {
    if ( ! doneList.some(todo => todo.value == key) ){
        console.log('doneList에 추가.')
        doneList.push({...currentItem}) // 복제본을 넣어서 독립
        console.log('todoList: ', todoList);
        console.log('doneList: ', doneList);
    }

    // ongoingList에서 해당 항목은 뺀다.
    // filter메소드는 해당 리스트를 삭제하는 것이 아니다.
    console.log('ongoingList에서 삭제.')
    ongoingList = ongoingList.filter(todo => todo.value != key)
    console.log('ongoingList: ', ongoingList);
}

function onDeleteClick(e){
    const button = e.currentTarget;
    const currentLiTag = button.closest('li')
    const key = currentLiTag.dataset.key;

    todoList = todoList.filter(todo => todo.value != key)
    doneList = doneList.filter(todo => todo.value !=key)
    ongoingList = ongoingList.filter(todo =>todo.value !=key)

    console.log('== 삭제 완료! ==')
    console.log('key: ', key)
    console.log('todoList: ', todoList)
    console.log('doneList: ', doneList)
    console.log('ongoingList: ', ongoingList)

    //! check에서는 화면을 갱신할 필요가 없었다.
    //! 하지만 삭제에서는 삭제된 모습을 보여주기 위해, 화면갱신
    renderList();
}


// '탭을 눌렀을 때' 화면을 랜더링하는 로직
// 코드의 상부의 indicator()에 추가로 린더링로직을 작성하고, 
//여기서는 거기서 필요한 새로운 함수를 작성한다.

function render(type){
    if (type == 'all'){
        renderList();
    } else if(type =='done'){
        renderSpecificList('done');
    } else if (type == 'ongoing'){
        renderSpecificList('ongoing');
    }
}

function renderSpecificList(type){
    let list;
    if (type =='done') list = doneList;
    if (type =='ongoing') list = ongoingList;

    // 기존 ul태그가 있다면 제거
    const oldUlTag = task.querySelector('ul');
    if(oldUlTag){
        oldUlTag.remove();
        //혹은 task.remove(oldUlTag)
    }
    
    task.innerHTML=''; // 초기화. task는 이미 전역변수
    const ulTag = document.createElement('ul');
    ulTag.style.paddingLeft ='0px';
    
    list.forEach( todo =>{
        const liTag = document.createElement('li');
        liTag.innerHTML = `
            <div class="item ${todo.class}">${todo.value}</div>
        `;

        ulTag.appendChild(liTag);
    });
    task.appendChild(ulTag);
}