export default{
    namespaced:true,
    state(){

        return{
            requests:[]
              
        }
    },
    getters:{
        getRequests(state){
            return state.requests;

        },
        requests(state,_,_2,rootGetters){
           
            const coachId=rootGetters.getUserId;
            return state.requests.filter(request=>request.coachId===coachId)
            
        },
        hasRequests(state){
            if(state.requests.length===0){
                return false;
            }else{
                return true;
            }
        }
        
    },
    mutations:{
        addRequest(state,payload){
            state.requests.push(payload);
        },
        setRequests(state,payload){
            state.requests=payload;
        }
    },
    actions:{
        async contactCoach(context,payload){
            const newRequest = {
                
               
                userEmail:payload.email,
                message:payload.message
            }
            const token=context.rootGetters.token;
            const response=await fetch(`https://find-coach-b3109-default-rtdb.firebaseio.com/requests/${payload.coachId}.json?auth=`+token,{
                method:'POST',
                body:JSON.stringify(newRequest)

            })
            const responseData=await response.json();
            if(!response.ok){
                const error=new Error(responseData.message || 'Fail to send request')
                throw error;
            }
            
            newRequest.id=responseData.name;
            newRequest.coachId=payload.coachId;
            
            context.commit('addRequest',newRequest)
        },
        async fetchRequests(context){
           
            const coachId=context.rootGetters.getUserId;
             const token=context.rootGetters.token;
            const response= await fetch(`https://find-coach-b3109-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+token);
            const responseData=await response.json();
          
            if(!response.ok){
                const error = new Error(responseData.message || 'Fail to fetch requests')
                throw error;
            }
            const requests=[];
            for(const key in responseData){
                const request={
                    id:key,
                    coachId:coachId,
                    userEmail:responseData[key].userEmail,
                    message:responseData[key].message
                }
                requests.push(request);
            }

            context.commit('setRequests',requests)
        }
    }
}