<template>
  <div>
    <button
      class="create-child-link"
      v-on:click="childForm.showForm = !childForm.showForm"
    >
      New Player
    </button>

    <form
      id="new-child-account-login"
      @submit="addNewChildUser"
      v-if="childForm.showForm"
    >
      <label class="child-username">Username:</label>
      <input
        type="text"
        v-model="childForm.username"
        placeholder="Enter Username"
        required
      />
      <b>Select a user image:</b>
      <ul class="gridicons">
        <li
          v-for="animalType in avatarImages"
          :key="animalType.id"
          class="animal-type"
        >
          <br />
          <img
            :src="animalType.imageUrl"
            :key="animalType.id"
            class="avatar-img"
            @click="childForm.avatarUrl = animalType.imageUrl"
          />
          <br />
          {{ animalType.animal }}
        </li>
      </ul>

      <label class="avatar-title"
        >If you have a custom user image, you can post the url here:</label
      >
      <input
        type="text"
        v-model="childForm.avatarUrl"
        placeholder="Select from above or link your own image"
        required
      />

      <p v-if="childForm.signedUp" class="new-account-msg">
        You have created an account!
      </p>

      <button class="sign-up-btn" type="submit" v-on:click="showForm()">
        Create Profile!
      </button>
    </form>
  </div>
</template>

<script>
import { firestore } from "firebase";

export default {
  name: "CreateChildProfile",
  data() {
    return {
      childForm: {
        username: "",
        avatarUrl: "",
        signedUp: false,
        showForm: false,
      },
      avatarImages: [
        {
          id: 1,
          animal: "Elephant",
          imageUrl: require("../assets/Images/Elephant.png"),
          chosen: false,
        },
        {
          id: 2,
          animal: "Lion",
          imageUrl: require("../assets/Images/Lion.png"),
          chosen: false,
        },
        {
          id: 3,
          animal: "Bunny",
          imageUrl: require("../assets/Images/Bunny.png"),
          chosen: false,
        },
        {
          id: 4,
          animal: "Panda",
          imageUrl: require("../assets/Images/Panda.png"),
          chosen: false,
        },
        {
          id: 5,
          animal: "Penguin",
          imageUrl: require("../assets/Images/Penguin.png"),
          chosen: false,
        },
        {
          id: 6,
          animal: "Koala",
          imageUrl: require("../assets/Images/Koala.png"),
          chosen: false,
        },
      ],
    };
  },
  methods: {
    addNewChildUser(event) {
      event.preventDefault();

      const docRef = firestore().doc(
        `parents/${window.localStorage.uid}/userProfiles/${this.childForm.username}`
      );

      docRef.set({
        username: this.childForm.username,
        avatarUrl: this.childForm.avatarUrl,
      });

      const newChildUser = {
        username: this.childForm.username,
        avatarUrl: this.childForm.avatarUrl,
      };

      this.$emit("add-new-child", newChildUser);
      this.childForm.username = "";
      this.childForm.avatarUrl = "";
    },
  },
  showForm() {
    this.childForm.username.length !== 0 &&
    this.childForm.avatarUrl.length !== 0
      ? (this.childForm.signedUp = !this.childForm.signedUp)
      : (this.childForm.signedUp = false);
  },
  chosenAvatar() {},
};
</script>

<style scoped>
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and(-webkit-min-device-pixel-ratio: 3) {
  #new-child-account-login {
    width: 65%;
    border: 1px solid #cccccc;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
  #new-child-account-login {
    width: 300px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
.back-link {
  text-decoration: none;
  color: white;
}

.child-username {
  color: black;
  font-weight: bold;
}
.avatar-title {
  font-weight: bold;
  color: black;
  display: block;
}

.avatar-img {
  cursor: pointer;
  margin-right: 20px;
  margin-left: 20px;
  height: 6em;
  width: 6em;
  border-radius: 50%;
}

.animal-type {
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.sign-up-btn {
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  background-color: #d95c26;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  width: 50%;
}

.sign-up-btn:hover,
.create-child-link:hover {
  background: linear-gradient(to bottom, #acd998 5%, #e6af2e 100%);
  background-color: #acd998;
}

.new-account-msg {
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  background-color: rgb(16, 71, 173);
  border-radius: 20px;
  padding: 12px 20px;
}

.create-child-link {
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  background-color: #d95c26;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  width: 250px;
  margin-bottom: 20px;
}

.avatar-img:hover {
  background-color: #d95c26;
  border-radius: 50%;
  width: 20vh;
  height: 20vh;
}
@media screen and (min-width: 700px) {
  .gridicons {
    grid-template-columns: 1fr 1fr 1fr;
    list-style: none;
    column-count: 3;
    column-gap: 1em;
    row-gap: 1em;
    padding: 1em;
  }
}
@media screen and (max-width: 699px) {
  .gridicons {
    grid-template-columns: 1fr 1fr;
    list-style: none;
    column-count: 2;
    column-gap: 1em;
    row-gap: 1em;
    padding: 1em;
    margin: -40px;
    margin-top: 1em;
    margin-bottom: 1em;
  }
}

.gridicons {
  margin-left: -40px;
}
</style>
