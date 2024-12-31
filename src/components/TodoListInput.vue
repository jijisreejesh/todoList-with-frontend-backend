<script setup>
import { ref, defineProps, watch } from "vue";
const item = ref("");
const props = defineProps({
  updateTodo: {
    type: Object,
    required: true,
  },
});
const id=ref(props.updateTodo.id)
watch(
  () => props.updateTodo.item,
  (newValue, OldValue) => {
    //console.log(newValue, OldValue);
    item.value = newValue;
    id.value=props.updateTodo.id;
  }
);

const emit = defineEmits(["save", "update"]);

const add = () => {
  if (props.updateTodo.item === ""){
    emit("save", item.value);
    item.value = "";
  }
   else{
    emit("update", item.value,id.value);
    //console.log(item.value);
    props.updateTodo.item = "";
    item.value = "";
  }

};


// onUpdated(()=>{
//   console.log("The component is updated");
  
// })
// onMounted(()=>{
//   console.log("The component is mounted");
  
// })
// onBeforeUnmount(()=>{
//   alert("The component is going to be unmounted");
  
// })
// onBeforeUpdate(()=>{
//  console.log("The component is going to be updated");
  
// })
</script>

<template>
   <h1>Todo List</h1>
  <form @submit.prevent="add">
   
    <input type="text" required v-model="item" placeholder="What do you need to do?"/>
    <button id="inputBtn" type="submit">
      <span v-if="updateTodo.item">Update</span>
      <span v-else>Add Item</span>
    </button>
    <!-- <p> {{   updateTodo}}</p> -->
  </form>
 
</template>

<style>

form{
  margin-top: 50px;
 width: 600px;
 margin-right: auto;
 margin-left: auto;
 border-radius: 50px;
 /* padding: 10px 40px 10px 40px; */
 background-color: aliceblue;
 display: flex;
height: 60px;
border: none;
justify-content: space-between;
}

h1 {
  width: 400px;
  border-radius: 25px;
  margin-top: 30px;
 margin-right: auto;
 margin-left: auto;
  text-align: center;
  padding-top: 20px;
  color:aliceblue;
  font-family: 'Courier New', Courier, monospace;
  background-color: blueviolet;
  padding-bottom: 20px;
  font-size: 50px;
}
form input {
 background-color: transparent;
  font-size: larger;
  border: none;
  width: 75%;
  padding-left: 10px;
}
form input:focus{
 outline: none;
}
  button {
    background: transparent;
  font-size: large;
  border-radius: 10px;
  height: 40px;
  margin-top: 10px;
  margin-right: 10px;
   padding: 5px;
  color: white; 
  border: none;
  box-shadow: 0px 0px 1px 1px inset ;
}
  #inputBtn{
    color: rgb(228, 228, 240) ;
    background-color: blue;
    box-shadow: 0px 0px 1px 1px rgb(66, 3, 184);
  }
 #inputBtn:hover{
  background-color: rgb(136, 136, 161);
  color: blue;
}
#inputBtn:active{
  background-color: white;
  color: rgb(12, 12, 236);
}
@media screen and (max-width:450px){
  form{
    width:100%;
  }
  h1{
    width:100%;
  }
}

</style>
