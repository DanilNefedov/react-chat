const state = {
    friend : [
        {id:'friend1', name:'Raghav', lastMessage:'Dinner?'},
        {id:'friend2', name:'Swathi', lastMessage:'Sure!'},
        {id:'friend3', name:'Kiran', lastMessage:'Hi.....'},
        {id:'friend4', name:'Tejeshwini C', lastMessage:'I will call him today.'},
        {id:'friend5', name:'Marvin McKinney', lastMessage:'legal-tenure.pdf'},
        {id:'friend6', name:'Kristin Watson', lastMessage:'floor/reading lamp'},
        {id:'friend7', name:'Ralph Edwards', lastMessage:'99%'},
        {id:'friend8', name:'Savannah Nguyen', lastMessage:'He’s down on his luck.'},
        {id:'friend9', name:'Ralph Edwards', lastMessage:'What a big truck!'},
        {id:'friend10', name:'Eleanor Pena', lastMessage:'Tom is in a big hurry.'},
        {id:'friend11', name:'Robert Fox', lastMessage:'What a big boy he is!'}
    ],

    messages : [
        {
            id:'friend1',
            messages:[
                {me:'Blalal1'},
                {friend:'ulul1'}
            ]
        },
        {
            id:'friend2',
            messages:[
                {me:'Blalal2'},
                {friend:'ulul2'}
            ]
        },
        {
            id:'friend3',
            messages:[
                {me:'Blalal3'},
                {friend:'ulul3'}
            ]
        },
        {
           id:'friend4',
            messages:[
                {me:'Blalal4'},
                {friend:'ulul4'}
            ] 
        },
        {
           id:'friend5',
            messages:[
                {me:'Blalal5'},
                {friend:'ulul5'}
            ] 
        },
        {
            id:'friend6',
            messages:[
                {me:'Blalal6'},
                {friend:'ulul6'}
            ] 
        },
        {
            id:'friend7',
            messages:[
                {me:'Blalal7'},
                {friend:'ulul7'}
            ]
        },
        {
            id:'friend8',
            messages:[
                {me:'Blalal8'},
                {friend:'ulul8'}
            ]
        },
        {
            id:'friend9',
            messages:[
                {me:'Blalal9'},
                {friend:'ulul9'}
            ]   
        },
        {
            id:'friend10',
            messages:[
                {me:'Blalal10'},
                {friend:'ulul10'}
            ]
        },
        {
            id:'friend11',
            messages:[
                {me:'Blalal11'},
                {friend:'ulul11'}
            ]
        }      
    ]
}





console.log(state.messages)
const messList = state.messages;

export function newMessage(resFind, lastMess){
    let userPage;
    messList.forEach(el =>{
        if(el.id === resFind){
            userPage = el
        }
    });
    userPage.messages.push({me:lastMess})
    console.log(userPage)
}



export default state;




