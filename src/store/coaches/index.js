export default{
    namespaced:true,
    state(){
        
        return{
            lastFetch:null,
            coaches:[
                {
                  id: "c1",
                  firstName: "Maximilian",
                  lastName: "Schwarzmüller",
                  areas: ["frontend", "backend", "career"],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30,
                
                },
                {
                  id: "c2",
                  firstName: "Julie",
                  lastName: "Jones",
                  areas: ["frontend", "career"],
                  description:
                    "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
                  hourlyRate: 30
                }
              ]
        }
    },
    getters:{
        coaches(state){
            return state.coaches;
        },
        isCoach(_,getters,_2,rootGetters){
          const coaches=getters.coaches;
          
          const userId = rootGetters.getUserId;
          
          return coaches.some(coach=>coach.id===userId);
        },
        shouldUpdate(state){
          const lastFetch=state.lastFetch;
          if(!lastFetch){
            return true;
          }
          const currentTimestamp=new Date().getTime();
          
          return (currentTimestamp-lastFetch)/1000>60
        }
    },
    mutations:{
      registerCoach(state,payload){
        state.coaches.push(payload);
      },
      setCoaches(state,payload){
        state.coaches=payload;
      },
      setFetchTimestamp(state){
        state.lastFetch=new Date().getTime();
        
      }
    },
    actions:{
      async registerCoach(context,payload){
        const userId=context.rootGetters.getUserId;
        const newCoach={
        
          firstName:payload.firstName,
          lastName:payload.lastName,
          description:payload.description,
          areas:payload.areas,
          hourlyRate:payload.rate
        }
        const token=context.rootGetters.token;
        const response=await fetch(`https://find-coach-b3109-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=`+token,{
          method:'PUT',
          body:JSON.stringify(newCoach)
        })
        // const responseData = await response.json();

        if(!response.ok){
          //errors
        }
        context.commit('registerCoach',{
          ...newCoach,
          id:userId
        })
      },
      async loadCoaches(context,payload){
        if(payload.forceRefresh && !context.getters.shouldUpdate){
          return ;
        }
        
        
        const response=await fetch(`https://find-coach-b3109-default-rtdb.firebaseio.com/coaches.json`)
        const responseData=await response.json();
        if(!response.ok){
         const error=new Error(responseData.message || 'Fail to fetch')
           throw error;
         
        }
        const coaches=[];
        for(const key in responseData){
          const coach={
            id:key,
            firstName:responseData[key].firstName,
          lastName:responseData[key].lastName,
          description:responseData[key].description,
          areas:responseData[key].areas,
          hourlyRate:responseData[key].hourlyRate
          };
          coaches.push(coach);
         
        }
        context.commit('setCoaches',coaches);
        context.commit('setFetchTimestamp')
      }
    }
}