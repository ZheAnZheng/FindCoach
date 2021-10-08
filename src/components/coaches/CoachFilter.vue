<template>
    <base-card>
    <h2>Filter</h2>
    <span>
        <input type="checkbox" id='frontend' checked @change="setFilter"/>
        <label for="frontend">Frontend</label>
    </span>
    <span>
        <input type="checkbox" id='backend' checked  @change="setFilter"/>
        <label for="backend">Backend</label>
    </span>
    <span>
        <input type="checkbox" id='career' checked  @change="setFilter"/>
        <label for="career">career</label>
    </span>
    </base-card>
</template>

<script>
export default {
    emits:['update-filters'],
    data(){
        return{
            filters:{
                frontend:true,
                backend:true,
                career:true
            }
        }
    },
    methods:{
        setFilter(event){
            
            const inputId=event.target.id;
            const isActive=event.target.checked;
            
            const updateFilters={
                //copy this.filter到updateFilters
                ...this.filters,
                [inputId]:isActive
            }
            this.filters=updateFilters;
            this.$emit('update-filters',updateFilters);
        }
    }
}
</script>