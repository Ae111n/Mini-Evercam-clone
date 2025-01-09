<template>
     <div id="cameraCard">
 <h2>{{ camera.id }}</h2> 

<h1>camera title 
</h1>
     </div>
</template>
<script>
export default {
     name: "cameraCard",
     props: {
          camera: {
               type: Object,
               required: true,
          },
     }
}
</script>

<style>
#cameraCard {

     border: 1px solid black;
}
</style>