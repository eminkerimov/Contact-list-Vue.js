<template>
  <div id="app">
    <div class="main">
      <h1>Contact List</h1>
      <div class="table-container">
        <div class="table-row header">
          <div class="table-col">Name</div>
          <div class="table-col">Phone</div>
          <div class="table-col">Created</div>
          <div class="table-col">Edited</div>
        </div>
        <div class="table-body" v-for="(contact, i) in contacts" :key="i">
          <div class="table-col">{{ contact.name }}</div>
          <div class="table-col">{{ contact.phone }}</div>
          <div class="table-col">{{ contact.createTime }}</div>
          <div class="table-col">{{ contact.editTime }}</div>
            <div v-if="edit == false">
            <button class="orange" @click="editItem(contact, i)"><i class="fas fa-user-edit"></i></button>
            <button class="red" @click="deleteItem(i)"><i class="fas fa-trash-alt"></i></button>
            <div>
              <div v-if="edit != false">
                <button disabled class="orange">
                  <i class="fas fa-user-edit"></i>
                </button>
                <button disabled class="red">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal">
      <h1>Add Contact</h1>
      <label>Name</label>
      <input :class="{red:nameValidate}" type="text" v-model="name" />
      <label>Phone</label>
      <input :class="{red:phoneValidate}" type="text" v-model="phone" />
      <button v-if="edit != true" class="blue" @click="addItem($event)">
        Submit
      </button>
      <button v-if="edit == true" class="green" @click="updateContact($event)">
        Update
      </button>
      <button v-if="edit == true" class="red" @click="cancelUpdate($event)">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { storage } from "./utils/localstorage";
export default {

  data() {
    return {
      name: "",
      phone: "",
      createTime: "",
      editTime: "",
      edit: false,
      index: 0,
      contacts: [],
      nameValidate: false,
      phoneValidate: false
    };
  },

  methods: {
    addItem: function (e) {
        this.nameValidate=false;
        this.phoneValidate=false;
      if (this.name && this.phone){
        e.preventDefault();
        this.contacts.push({
          name: this.name,
          phone: this.phone,
          createTime: new Date().toLocaleString(),
          editTime: "",
        });
        storage.set("contacts", this.contacts);
        this.clearInput();
      }
      else this.checkValidate()
    },
    editItem: function (contact, i) {
      this.edit = !this.edit;
      this.name = contact.name;
      this.phone = contact.phone;
      this.editTime = new Date();
      this.createTime = contact.createTime;
      this.index = i;
    },
    updateContact: function (e) {
      if (this.name && this.phone){
        e.preventDefault();
        this.edit = !this.edit;
        let contactdb = {
          name: this.name,
          phone: this.phone,
          editTime: new Date().toLocaleString(),
          createTime: this.createTime,
        };
        this.contacts[this.index] = contactdb;
        storage.set("contacts", this.contacts);
        this.contacts = storage.get("contacts");
        this.clearInput();
      }
      else this.checkValidate()
    },
    cancelUpdate: function (e) {
      e.preventDefault();
      this.clearInput();
      this.edit = !this.editItem;
    },    
    deleteItem: function (i) {
      this.contacts.splice(i, 1);
      storage.set("contacts", this.contacts);
    },
    clearInput: function () {
      this.name = "";
      this.phone = "";
    },
    checkValidate: function() {
      if (!this.name) {this.nameValidate=true}
      if (!this.phone) {this.phoneValidate=true}
    },
  },
  created: function () {
    let db = storage.get("contacts");
    if (db) {
      this.contacts = db;
    } else {
      this.contacts = [];
    }
  },
};
</script>

<style>
body {
  background: linear-gradient(
    90deg,
    rgba(9, 121, 74, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  font-family: "Comic Sans MS", cursive, sans-serif;
}

#app {
  display: flex;
}

.main {
  width: 70%;
}

.modal {
  width: 30%;
}

h1 {
  color: #aaf8c9;
  font-family: sans-serif;
  text-align: center;
  margin-top: 20px;
  font-size: 48px;
  letter-spacing: -1px;
  text-transform: uppercase;
  text-shadow: 4px 4px 4px rgb(0, 0, 0);
  line-height: 50px;
}

.table-container {
  font-size: 20px;
  margin-top: 35px;
  width: 95%;
  margin: auto;
}
.table-row {
  display: flex;
}

.header {
  font-weight: bold;
}

.table-col {
  margin: 2px;
  padding: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid black;
  background-color: #74e2e7;
  color: darkblue;
  flex-basis: 17%;
}

.header .table-col {
  background-color: darkblue;
  color: orange;
}

.table-body {
  font-size: 15px;
  display: flex;
}

input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  border: 5px;
  width: 70%;
  border-radius: 10px;
}

label {
  margin-left: 65px;
  font-size: 20px;
  display: block;
}

button {
  background-color: black;
  margin: 10px;
  padding: 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}

button:hover {
  color: #fff;
  transform: translateY(-3px);
  outline: none;
  border: none;
}

button:focus {
  color: #fff;
  transform: translateY(-3px);
  outline: none;
  border: none;
}

input:focus {
  outline: none;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
  margin-left: 60px;
}

.blue {
  background-color: blue;
  margin-left: 60px;
}

.orange {
  background-color: orange;
}
</style>

