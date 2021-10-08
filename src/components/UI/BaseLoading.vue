<template>
  <div class="container">
    <div class="loading">
      <div>L</div>
      <div>O</div>
      <div>A</div>
      <div>D</div>
      <div>I</div>
      <div>N</div>
      <div>G</div>
      <div>.</div>
      <div>.</div>
      <div>.</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: xx-large;
  height:200px;
  color: #3d008d;
}
.loading{
  display: flex;
  
    
}

.loading div{
    margin: 0 1rem;
    animation: loading 1s ease-in infinite;
}
.loading div:nth-child(1){
    animation-delay: 0.1s;
}
.loading div:nth-child(2){
    animation-delay: 0.2s;
}
.loading div:nth-child(3){
    animation-delay: 0.3s;
}
.loading div:nth-child(4){
    animation-delay: 0.4s;
}.loading div:nth-child(5){
    animation-delay: 0.5s;
}
.loading div:nth-child(6){
    animation-delay: 0.6s;
}
.loading div:nth-child(7){
    animation-delay: 0.7s;
}
.loading div:nth-child(8){
    animation-delay: 0.8s;
}

.loading div:nth-child(9){
    animation-delay: 0.9s;
}
.loading div:nth-child(10){
    animation-delay: 1s;
}


@keyframes loading{
    0%{
        transform: translateY(0);
    }
    30%{
        transform: translateY(-50px);
    }
    50%{
        transform: translateY(0);
    }
    100%{transform: translateY(0);}
}
</style>
