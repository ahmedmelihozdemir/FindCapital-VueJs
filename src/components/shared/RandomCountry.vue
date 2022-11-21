<template>
  <div
    class="grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1"
  >
    <HeaderComponent></HeaderComponent>
    <div
      class="flex flex-col justify-center items-center bg-stone-600 rounded-lg"
    >
      <div class="m-4">
        <div
          v-if="isAnswerTrue"
          class="animate-bounce p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span class="font-medium">Success! </span>Congratulation, you knew the
          capital.
        </div>
        <div
          v-if="isAnswerWarn"
          class="animate-bounce p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <span class="font-medium">Wrong answer! </span> Try again.
          {{ randomCountryCapitalLetterArray.length - countWrongAnswer }} left.
        </div>
        <div
          v-if="isAnswerWrong || showCapital === true"
          class="p-4 mb-4 text-xl text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span class="font-medium"
            >You lose!
            <span class="text-purple-800 bg-pink-400 rounded-md p-1"
              >{{ randomCountryCapital }}
            </span></span
          >
          is the capital. It will be start again.
        </div>
      </div>

      <div class="grid grid-flow-row grid-cols-1 bg-orange-500 rounded-lg">
        <div class="p-2 flex justify-start text-red-300">
          <span class="font-semibold text-sky-400">Country: </span
          >{{ randomCountryName }}
        </div>
        <div class="p-2 flex justify-start text-red-300">
          <span class="font-semibold flex justify-start text-sky-400"
            >Pure Capital:
          </span>
          <div v-if="showCapital">
            {{ randomCountryCapital }}, Word Length:{{
              randomCountryCapitalLetterArray.length
            }}
          </div>
        </div>
        <div class="p-2 flex justify-start flex-wrap text-red-300">
          <span class="font-semibold flex justify-start text-sky-400"
            >Changed Capital:</span
          >
          <div v-if="showCapital">
            {{ randomCountryCapitalLetterJoin }}
          </div>
        </div>
        <div class="p-2 flex justify-start flex-wrap text-red-300">
          <span class="font-semibold flex justify-start text-sky-400"
            >Capital Array:</span
          >
          <div v-if="showCapital">
            {{ randomCountryCapitalLetterArray }}
          </div>
        </div>

        <div class="p-2 flex justify-start flex-wrap text-red-300">
          <span class="font-semibold flex justify-start text-sky-400"
            >Score:</span
          >
          {{ countTrueAnswer === 0 ? localTrueAnswer : countTrueAnswer }}
        </div>
        <div class="p-2 flex justify-start flex-wrap text-red-300">
          <span class="font-semibold flex justify-start text-sky-400"
            >Oops:</span
          >
          {{ countWrongAnswer }}
        </div>
      </div>

      <label for="text" class="flex justify-center items-center m-2">
        <input
          name="text"
          type="text"
          class="rounded-lg text-amber-800 outline-none m-2 p-2"
          placeholder="Enter your answer"
          v-model="enteredValue"
          @keyup.enter="checkEnteredValue"
          @keyup="handleInputOnKeyup"
        />
      </label>

      <div class="flex justify-center items-center mb-4">
        <button
          class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          @click="checkEnteredValue"
        >
          Check
        </button>
      </div>

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
          class="box flex justify-center items-center text-black font-bold m-0.5"
          v-for="(capital, idx) in letterArray"
          :key="idx"
        >
          {{ capital }}
        </div>
      </div>

      <div class="flex justify-center bg-slate-400 m-2">
        <button
          @click="(showCapital = !showCapital), showCapitalFunc()"
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
        >
          Show Capital
        </button>
        <!-- <button
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
          @click="
            showWord(
              Math.floor(Math.random() * randomCountryCapitalLetterArray.length)
            )
          "
        >
          Show one Word
        </button> -->
        <button
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
          @click="showWorde(randomCountryCapitalLetterArray.length)"
        >
          Show one Word
        </button>
        <button
          class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
          @click="changeCapital"
        >
          Change capital!
        </button>
        <button
          class="flex justify-center items-center m-2 p-2 bg-slate-500 rounded-lg hover:cursor-pointer hover:bg-slate-100"
          @click="refreshPage"
        >
          Refresh
        </button>
      </div>
      <!-- <div>{{ randomCountryCapitalLetterArray }}</div>
      <div>{{ randomCountryCapitalLetterJoin }}</div> -->
      <div>{{ countWrongAnswer }}</div>

      <div class="flex justify-between items-center m-2">
        <div class="bg-indigo-400 mr-3 p-2 rounded-md text-orange-800">
          Score:{{ countTrueAnswer }}
        </div>
        <div class="bg-indigo-400 ml-3 p-2 rounded-md text-orange-800">
          Last Score:{{ localTrueAnswer }}
        </div>
      </div>

      <div
        class="flex justify-center items-center flex-wrap bg-red-600 rounded-xl"
      >
        <div class="">
          <ion-icon
            name="information-circle-outline"
            size="large"
            class="text-white hover:text-zinc-900 cursor-pointer"
            @click="showIcon = !showIcon"
          ></ion-icon>
          <div v-if="showIcon" class="text-white">
            Write capitals without spaces. Ex: Washington DC => WashingtonDC.
            And the desired name is the common name. (En) If refresh the page
            the score will be reset. (En)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from "../layout/HeaderComponent.vue";
import { ref, onMounted, watch } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";
import { useStore } from "vuex";

const store = useStore();

const isAnswerTrue = ref(false);
const isAnswerWrong = ref(false);
const isAnswerWarn = ref(false);

const countriesService = new CountriesService();
const countries = ref<ICountry[]>([]);
const randomCountries = ref<ICountry>();

const showCapital = ref<boolean>(false);
const showIcon = ref<boolean>(false);
const countWrongAnswer = ref<number>(0);
const countTrueAnswer = ref<number>(0);
const localTrueAnswer = localStorage.getItem("score");

const randomCountry = ref<ICountry | undefined>();
const randomCountryName = ref<string>();
const randomCountryCapital = ref<object | string>();
const randomCountryCapitalWord = ref<number>();

const enteredValue = ref<string>("");
const handleInputOnKeyup = () => {
  enteredValue.value = enteredValue.value.toLocaleUpperCase();
};

const randomCountryCapitalLetter = ref<string[]>();
let randomCountryCapitalLetterArray = ref<string[]>([]);
const randomCountryCapitalLetterJoin = ref<string>();

const checkEnteredValue = () => {
  if (enteredValue.value === randomCountryCapitalLetterJoin.value) {
    isAnswerTrue.value = true;
    isAnswerWrong.value = false;
    isAnswerWarn.value = false;
    countWrongAnswer.value = 0;
    enteredValue.value = "";
    countTrueAnswer.value++;
    /* setTimeout(() => {
      refreshPage();
    }, 1500); */
    changeCapital();
    localStorage.setItem("score", countTrueAnswer.value.toString());
  } else {
    isAnswerWarn.value = true;
    isAnswerTrue.value = false;
    countWrongAnswer.value++;
    if (
      countWrongAnswer.value === randomCountryCapitalLetterArray.value.length
    ) {
      isAnswerWrong.value = true;
      isAnswerWarn.value = false;
      setTimeout(() => {
        refreshPage();
      }, 1500);
      countWrongAnswer.value = 0;
      countTrueAnswer.value = 0;
      localStorage.setItem("score", countTrueAnswer.value.toString());
    }
  }
};

const showCapitalFunc = () => {
  if (showCapital.value === true) {
    isAnswerWarn.value = false;
    isAnswerTrue.value = false;
    isAnswerWrong.value = true;
    setTimeout(() => {
      refreshPage();
    }, 1500);
  }
};

/* const showOneWordFunc = () => {
  if(randomCountryCapitalLetterArray.value.length ) {
    isAnswerWarn.value = false;
    isAnswerTrue.value = false;
    isAnswerWrong.value = true;
    setTimeout(() => {
      refreshPage();
    }, 1500);
  }
}; */

const getRandomCountry = ref<string[]>([]);

const refreshPage = () => {
  window.location.reload();
};

const letterArray = ref<string[]>([]);

const randomNumber = ref(
  Math.floor(Math.random() * randomCountryCapitalLetterArray.value.length)
);

//Show one word function
let randomArray: string[] = [];
const showWorde = (maxNr: number) => {
  let random = Math.floor(Math.random() * maxNr);
  random = Number(random);
  if (!randomArray.includes(random)) {
    randomArray.push(random);
    letterArray.value[random] = randomCountryCapitalLetterArray.value[random];
    countWrongAnswer.value++;
    return random;
  } else {
    if (randomArray.length < maxNr) {
      return showWorde(maxNr);
    } else {
      console.log("No more numbers available.");
      showCapital.value = true;
      showCapitalFunc();
      return false;
    }
  }
};

//Change capital
const changeCapital = () => {
  randomCountryCapitalLetterArray.value = [];
  randomCountryCapitalLetterJoin.value = "";
  letterArray.value = [];
  randomArray = [];
  countWrongAnswer.value = 0;
  isAnswerWarn.value = false;
  isAnswerTrue.value = false;
  isAnswerWrong.value = false;
  getCountriesInfo();
};

//getCountriesInfo method.
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
  /* console.log(randomCountryCapitalLetter.value); */
  randomCountryCapitalLetter.value.map((item) => {
    randomCountryCapitalLetterArray.value.push(item);
  });
  /* console.log("Word list:", randomCountryCapitalLetterArray.value);
  console.log(
    "Word list length:",
    randomCountryCapitalLetterArray.value.length
  ); */
  for (let i = 0; i < randomCountryCapitalLetterArray.value.length; i++) {
    /* console.log(randomCountryCapitalLetterArray.value[i]); */
    if (
      randomCountryCapitalLetterArray.value[i] === "É" ||
      randomCountryCapitalLetterArray.value[i] === "È" ||
      randomCountryCapitalLetterArray.value[i] === "Ê" ||
      randomCountryCapitalLetterArray.value[i] === "Ë" ||
      randomCountryCapitalLetterArray.value[i] === "Ē"
    ) {
      randomCountryCapitalLetterArray.value[i] = "E";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
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
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ó") {
      randomCountryCapitalLetterArray.value[i] = "O";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ș") {
      randomCountryCapitalLetterArray.value[i] = "S";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ñ") {
      randomCountryCapitalLetterArray.value[i] = "N";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "İ" ||
      randomCountryCapitalLetterArray.value[i] === "Í"
    ) {
      randomCountryCapitalLetterArray.value[i] = "I";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (randomCountryCapitalLetterArray.value[i] === "Ý") {
      randomCountryCapitalLetterArray.value[i] = "Y";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "Û" ||
      randomCountryCapitalLetterArray.value[i] === "Ü" ||
      randomCountryCapitalLetterArray.value[i] === "Ú"
    ) {
      randomCountryCapitalLetterArray.value[i] = "U";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
    }
    if (
      randomCountryCapitalLetterArray.value[i] === "Ć" ||
      randomCountryCapitalLetterArray.value[i] === "Ç" ||
      randomCountryCapitalLetterArray.value[i] === "Č" ||
      randomCountryCapitalLetterArray.value[i] === "Ĉ" ||
      randomCountryCapitalLetterArray.value[i] === "Ċ" ||
      randomCountryCapitalLetterArray.value[i] === "Č"
    ) {
      randomCountryCapitalLetterArray.value[i] = "C";
      /* console.log("Changed: ", randomCountryCapitalLetterArray.value[i]); */
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
  background-color: #b4fee7;
  border-radius: 10px;
  &:hover {
    background-color: #a16ae8;
    cursor: pointer;
  }
}
@media only screen and (max-width: 640px) {
  .box {
    width: 25px;
    height: 25px;
  }
}

@media only screen and (max-width: 768px) {
  .box {
    width: 30px;
    height: 30px;
  }
}
@media only screen and (max-width: 1024px) {
  .box {
    width: 35px;
    height: 35px;
  }
}
</style>
