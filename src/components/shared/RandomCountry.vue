<template>
  <div class="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
    <h1 class="text-red-400 font-bold text-xl m-2">FINDE(X) RANDOM CAPITAL</h1>

    <div class="flex flex-col justify-center items-center">
      <div class="grid grid-flow-row">
        <div class="flex justify-start items-center hover:cursor-pointer">
          <span class="flex flex-wrap">
            <ion-icon
              name="information-circle-outline"
              size="large"
              @click="showIcon = !showIcon"
            ></ion-icon
          ></span>
          <span v-if="showIcon"
            >Write capitals without spaces. Ex: Washington DC => WashingtonDC.
            And the desired name is the common name. (En)
          </span>
        </div>
        <div class="p-2 flex justify-start">
          <span class="font-semibold text-purple-500">Country: </span
          >{{ randomCountryName }}
        </div>
        <div class="p-2 flex justify-start">
          <span class="font-semibold flex justify-start text-purple-500"
            >Pure Capital:
          </span>
          <div v-if="!showCapital">
            {{ randomCountryCapital }}, Word Length:{{
              randomCountryCapitalLetterArray.length
            }}
          </div>
        </div>
        <div class="p-2 flex justify-start flex-wrap">
          <span class="font-semibold flex justify-start text-purple-500"
            >Capital Array:</span
          >
          {{ randomCountryCapitalLetterArray }}
        </div>
        <div class="p-2 flex justify-start flex-wrap">
          <span class="font-semibold flex justify-start text-purple-500"
            >Changed Capital:</span
          >
          {{ randomCountryCapitalLetterJoin }}
        </div>
        <div class="p-2 flex justify-start flex-wrap">
          <span class="font-semibold flex justify-start text-purple-500"
            >Score:</span
          >
          {{ countTrueAnswer }}
        </div>
      </div>

      <label for="text" class="m-2">
        <input
          name="text"
          type="text"
          class="rounded-lg text-amber-800 outline-none m-2 p-2"
          placeholder="Enter your answer"
          v-model="enteredValue"
          @keyup.enter="checkEnteredValue"
          @keyup="handleInputOnKeyup"
        />
        <div>{{ enteredValue.toLocaleUpperCase() }}</div>
      </label>
      <div class="flex flex-row">
        <div
          class="box flex flex-wrap justify-center items-center text-black font-bold m-0.5"
          v-for="(capital, idx) in randomCountryCapitalLetterJoin"
          :key="idx"
        >
          {{ capital.toUpperCase() }}
        </div>
      </div>

      <div class="flex flex-row">
        <div
          class="box flex flex-wrap justify-center items-center text-black font-bold m-0.5"
          v-for="(capital, idx) in randomCountryCapitalLetterArray"
          :key="idx"
          @click="showWord(idx)"
        >
          {{}}
        </div>
      </div>

      <!-- <div class="flex flex-row">
        <div
          class="box flex flex-wrap justify-center items-center text-black font-bold m-0.5"
          v-for="(capital, idx) in randomCountryCapitalLetterArray"
          :key="idx"
          @click="showWord(idx)"
        >
          {{}}
        </div>
      </div> -->

      <div class="flex flex-row">
        <div
          class="box flex justify-center items-center text-black font-bold m-0.5"
          v-for="(capital, idx) in deneme4"
          :key="idx"
        >
          {{ capital }}
        </div>
      </div>

      <div class="flex">
        <button
          @click="showCapital = !showCapital"
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
        >
          Show Capital
        </button>
        <button
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
          @click="showWord(Math.floor(Math.random() * randomCountryCapitalLetterArray.length+1))"
        >
          Show one Word
        </button>
        <button
          class="flex justify-center items-center m-2 p-2 bg-slate-500 rounded-lg hover:cursor-pointer hover:bg-slate-100"
          @click="refreshPage"
        >
          Refresh
        </button>
      </div>
      <div>{{ randomCountryCapitalLetterArray }}</div>
      <div>{{ randomCountryCapitalLetterJoin }}</div>
      <div>{{ countWrongAnswer }}</div>
    </div>
    <hr />
    <div>{{dede}}</div>
  </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, computed, watchEffect } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useStore } from "vuex";

const store = useStore();

const countriesService = new CountriesService();
const countries = ref<ICountry[]>([]);
const randomCountries = ref<ICountry>();

const showCapital = ref<boolean>(false);
const showIcon = ref<boolean>(false);
const countWrongAnswer = ref<number>(0);
const countTrueAnswer = store.state.score;
localStorage.setItem("score", countTrueAnswer);



const randomCountry = ref<ICountry | undefined>();
const randomCountryName = ref<string>();
const randomCountryCapital = ref<object | string>();
const randomCountryCapitalWord = ref<number>();

const enteredValue = ref<string>("");
const handleInputOnKeyup = () => {
  enteredValue.value = enteredValue.value.toLocaleUpperCase();
};

const randomCountryCapitalLetter = ref<string[]>();
const randomCountryCapitalLetterArray = ref<string[]>([]);
const randomCountryCapitalLetterJoin = ref<string>();

const checkEnteredValue = () => {
  if (enteredValue.value === randomCountryCapitalLetterJoin.value) {
    alert("Correct");
    countWrongAnswer.value = 0;
    countTrueAnswer.value++;
  } else {
    alert("Wrong");
    countWrongAnswer.value++;
    if (
      countWrongAnswer.value === randomCountryCapitalLetterArray.value.length
    ) {
      alert("You lost. Try again");
      countWrongAnswer.value = 0;
    }
  }
};


const getRandomCountry = ref<string[]>([]);

const refreshPage = () => {
  window.location.reload();
};

const deneme = ref<string>();
const deneme3 = ref();
const deneme4 = ref<string[]>([]);


const dede = ref<string[]>([]);
const randomNumber = ()=>{
  const ali = Math.floor(Math.random() * randomCountryCapitalLetterArray.value.length);
  dede.value.push(ali);
}
const showWord = (idx: number) => {
  deneme4.value[idx] = randomCountryCapitalLetterArray.value[idx];
  countWrongAnswer.value++;
  /*console.log(idx);
  console.log(randomCountryCapitalLetterArray.value[idx]);
  deneme4.value.push(randomCountryCapitalLetterArray.value[idx]);
  console.log(deneme4.value); */
};




const getCountriesInfo = () => {
  countriesService.getCountry().then((response) => {
    countries.value = response;
    randomCountries.value =
      response[Math.floor(Math.random() * response.length)];
    randomCountryName.value =
      randomCountries.value.name.common.toLocaleUpperCase();
    randomCountryCapital.value =
      randomCountries.value.capital[0].toLocaleUpperCase();
    randomCountryCapitalWord.value = randomCountryCapital.value.length;
    if (
      randomCountryCapital.value.includes("-") ||
      randomCountryCapital.value.includes(" ") ||
      randomCountryCapital.value.includes("'") ||
      randomCountryCapital.value.includes(",") ||
      randomCountryCapital.value.includes(".")
    ) {
      randomCountryCapital.value = randomCountryCapital.value.replaceAll(
        /[-' ,.]/g,
        ""
      );
    }
  });
};

watch(randomCountryCapital, (newValue) => {
  randomCountryCapitalLetter.value = newValue.split("");
  console.log(randomCountryCapitalLetter.value);
  randomCountryCapitalLetter.value.map((item) => {
    randomCountryCapitalLetterArray.value.push(item);
  });
  console.log("Word list:", randomCountryCapitalLetterArray.value);
  console.log(
    "Word list length:",
    randomCountryCapitalLetterArray.value.length
  );

  for (let i = 0; i < randomCountryCapitalLetterArray.value.length; i++) {
    console.log(randomCountryCapitalLetterArray.value[i]);
    if (
      randomCountryCapitalLetterArray.value[i] === "É" ||
      randomCountryCapitalLetterArray.value[i] === "È" ||
      randomCountryCapitalLetterArray.value[i] === "Ê" ||
      randomCountryCapitalLetterArray.value[i] === "Ë" ||
      randomCountryCapitalLetterArray.value[i] === "Ē"
    ) {
      randomCountryCapitalLetterArray.value[i] = "E";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "Å" ||
      randomCountryCapitalLetterArray.value[i] === "Ă" ||
      randomCountryCapitalLetterArray.value[i] === "Â" ||
      randomCountryCapitalLetterArray.value[i] === "Ã" ||
      randomCountryCapitalLetterArray.value[i] === "Ä" ||
      randomCountryCapitalLetterArray.value[i] === "Á" ||
      randomCountryCapitalLetterArray.value[i] === "À" ||
      randomCountryCapitalLetterArray.value[i] === "Ā" ||
      randomCountryCapitalLetterArray.value[i] === "Ą"
    ) {
      randomCountryCapitalLetterArray.value[i] = "A";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ó") {
      randomCountryCapitalLetterArray.value[i] = "O";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ș") {
      randomCountryCapitalLetterArray.value[i] = "S";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ñ") {
      randomCountryCapitalLetterArray.value[i] = "N";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "İ" ||
      randomCountryCapitalLetterArray.value[i] === "Í"
    ) {
      randomCountryCapitalLetterArray.value[i] = "I";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ý") {
      randomCountryCapitalLetterArray.value[i] = "Y";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "Û" ||
      randomCountryCapitalLetterArray.value[i] === "Ü" ||
      randomCountryCapitalLetterArray.value[i] === "Ú"
    ) {
      randomCountryCapitalLetterArray.value[i] = "U";
      console.log("Changed: ", randomCountryCapitalLetterArray.value[i]);
    }
  }
  randomCountryCapitalLetterJoin.value =
    randomCountryCapitalLetterArray.value.join("");
});

onMounted(() => {
  getCountriesInfo();
});
</script>

<style scoped lang="scss">
.box {
  width: 50px;
  height: 50px;
  background-color: #2c7b31;
  border-radius: 10px;
  &:hover {
    background-color: rgba(168, 13, 240, 0.829);
    cursor: pointer;
  }
}
</style>
