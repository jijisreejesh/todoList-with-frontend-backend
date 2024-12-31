<script setup>
import TodoListInput from "./components/TodoListInput.vue";
import TodoListItem from "./components/TodoListItem.vue";
import { onMounted, ref } from "vue";
import axios from "@/services/axios.js";
const todosArray = ref([]);
const getItem = ref({
  id: "",
  item: "",
});
const retrieveAllTodos = () => {
  axios
    .get("/api/Todo/GetData")
    .then((res) => {
      todosArray.value = res.data;
      //subjects.sort((a, b) => b.score - a.score);
      todosArray.value.sort((a, b) => a.id - a.id);
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
};
onMounted(() => {
  retrieveAllTodos();
});
const localStore = () => {
  localStorage.setItem("todosArray", JSON.stringify(todosArray.value));
};
const save = async (i) => {
  try {
    const todos = {
      Task: "",
      Completed: false,
      CreatedAt: new Date(),
      CompletedAt: null,
    };
    todos.Task = i;
    const res = await axios.post("/api/Todo/AddTodo", todos);
  } catch (err) {
    console.log("Error : " + err);
  }
  retrieveAllTodos();
};

const deleteTodoItem = async (i) => {
  try {
    const res = await axios.delete(`/api/Todo/DeleteTask/${i}`);
    console.log(res.data);
  } catch (err) {
    console.log("Error : " + err);
  }
  retrieveAllTodos();
};

const completeTodoItem = async (i) => {
  try {
    i.completed = true;
    var newDate = new Date();
    i.completedAt = newDate;
    const res = await axios.put("/api/Todo/UpdateTodo", i);
  } catch (err) {
    console.log("Error : ", err);
  }
  retrieveAllTodos();
};

const getTodoItem = async (i) => {
  try {
    const res = await axios.get(`/api/Todo/GetById/${i}`);
    getItem.value.id = res.data.id;
    getItem.value.item = res.data.task;
    console.log(getItem.value);
  } catch (err) {
    console.log("Error : ", err);
  }
};

const updateTodoItem = async (j, i) => {
  try {
    const responseData = await axios.get(`/api/Todo/GetById/${i}`);
    responseData.data.task = j;
    const res = await axios.put("/api/Todo/UpdateTodo", responseData.data);
  } catch (err) {
    console.log("Error : ", err);
  }
  retrieveAllTodos();
};
const completedTodoItem = () => {
  axios
    .get("/api/Todo/GetData", { params: { history: true } })
    .then((res) => {
      console.log("Success : " + res.data);
      todosArray.value = res.data;
      console.log(todosArray.value);
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
};

const allTodoItem = () => {
  retrieveAllTodos();
};
const activeTodoItem = () => {
  axios
    .get("/api/Todo/GetData", { params: { history: false } })
    .then((res) => {
      console.log("Success : " + res.data);
      todosArray.value = res.data;
      console.log(todosArray.value);
    })
    .catch((err) => {
      console.log("Error : " + err);
    });
};
</script>

<template>
  <div id="container">
    <TodoListInput
      @save="save"
      @update="updateTodoItem"
      :updateTodo="getItem"
    />
    <!-- <ul v-if="todosArray.length != 0">
    <li v-for="i in todosArray">{{ i.item }}</li>
  </ul> -->
    <section :style="`display:${todosArray.length ? 'block' : 'none'}`">
      <ul v-if="todosArray.length != 0">
        <div id="completedTodos">
          <button @click="completedTodoItem">Completed</button>
          <button @click="allTodoItem" style="width: 60px">All</button>
          <button @click="activeTodoItem" style="width: 60px">Active</button>
        </div>
        <TodoListItem
          v-for="i in todosArray"
          :key="i.id"
          :todo.sync="i"
          @close="deleteTodoItem"
          @complete="completeTodoItem"
          @get="getTodoItem"
        />
      </ul>
    </section>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: rgb(5, 5, 70);
}
#completedTodos {
  display: flex;
  justify-content: center;
}
#completedTodos button:hover {
  background-color: red;
}
ul {
  padding-right: 20px;
  padding-left: 20px;
  max-height: 500px;
  flex: 1;
  overflow-y: auto;
}
section {
  border-radius: 5%;
  margin-top: 40px;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  background-color: rgb(12, 111, 197);
}
@media screen and (max-width: 450px) {
  section {
    width: 100%;
  }
  ul {
    width: 100%;
    padding: 0px;
  }
  #completedTodos {
    justify-items: center;
  }
}
</style>
