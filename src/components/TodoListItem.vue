<script setup>
import { defineProps, watch } from "vue";
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close", "complete","get"]);
const deleteItem = () => {
  emit("close", props.todo.id);
};
const completeItem = () => {
  emit("complete", props.todo);
  //console.log(props.todo.completed);
};
const getItem=()=>{
   emit("get",props.todo.id)
}
</script>

<template>
  <article class="container">
  <div id="listItemContainer">
   <span id="listItem" :style="`text-decoration:${todo.completed ? 'line-through red' : 'none'}`">{{ todo.task }}</span> 
    <button class="itemBtn" @click="deleteItem">Close</button>
    <button @click="getItem" :disabled="todo.completed" id="disabledBtn">Update</button>
    <button class="itemBtn" @click="completeItem" >Complete</button>
  </div>
</article>
</template>
<style>
.container{
  width: max-content;
  margin-right: auto;
  margin-left: auto;
  padding-left: 10px;
  background-color: rgb(82, 82, 150);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 margin-bottom: 20px;
}
.container:hover{
  background-color: blue;
}
#listItemContainer{
			height: 5rem;
			margin-top: 8px;
      border-bottom: 1px solid yellowgreen;
      display:flex;
      align-items: center;
}
#listItem{
  font-size: xx-large;
  color : rgb(90, 235, 90);
  margin-right: 20px;
  word-wrap: break-word;
  width:350px;
}
#listItem:hover{
/* overflow:visible;
color:rgb(223, 14, 111) */
}
button{
  margin-right: 10px;
}
.itemBtn,#disabledBtn{
  border: 1px solid white;
}
.itemBtn:disabled :active{
  background-color: grey;
} 
.itemBtn:active{
  color: blue;;
}
button:disabled{
  background-color: grey;
  border: none;
}

.itemBtn,#disabledBtn{
  box-shadow: 0px 0px 1px 1px rgb(207, 140, 14);
}
@media screen and (max-width:450px){
#listItem{
  width:100px;
  font-size: x-large;
}
#listItemContainer{
  height:7rem;
}
}

</style>
