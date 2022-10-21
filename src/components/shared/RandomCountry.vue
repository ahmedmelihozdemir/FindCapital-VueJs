<template>
    <div class="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1">
        <h1 class="text-red-400 font-bold text-xl m-2">
            FINDE(X) RANDOM CAPITAL
        </h1>
        <div class="flex flex-col justify-center items-center">
            <div class="p-2">
                <span class="font-semibold text-purple-500">Country: </span
                >{{ randomCountryName }}
            </div>
            <div class="p-2 flex justify-start">
                <span class="font-semibold flex justify-start text-purple-500"
                    >Capital:</span
                >
                <div v-if="!showCapital">
                    {{ randomCountryCapital }}, Word:{{
                        randomCountryCapitalWord
                    }}
                </div>
            </div>
            <label for="" class="m-2">
                <input
                    type="text"
                    class="rounded-lg text-amber-800 outline-none m-2 p-2"
                    placeholder="Enter your answer"
                    :v-model="randomCountryCapital"
                />
            </label>
            <div class="flex flex-row">
                <div
                    class="box flex justify-center items-center text-black font-bold m-0.5"
                    v-for="(capital, idx) in randomCountryCapital"
                    :key="idx"
                >
                    {{ capital.toUpperCase() }}
                </div>
            </div>

            <div class="flex flex-row">
                <div
                    class="box flex justify-center items-center text-black font-bold m-0.5"
                    v-for="(capital, idx) in deneme2"
                    :key="idx"
                    @click="showWord(idx)"
                >
                    {{}}
                </div>
            </div>

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
                    @click="getRandomWord"
                >
                    Show one Word
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";

const countriesService = new CountriesService();
const countries = ref<ICountry[]>([]);
const randomCountries = ref<ICountry>();
const showCapital = ref<boolean>(false);

const randomCountry = ref<ICountry>();
const randomCountryName = ref<string>();
const randomCountryCapital = ref<object | string>();
const randomCountryCapitalWord = ref<number>();

const getRandomCountry = ref<string[]>([]);

const deneme = ref<string>();
const deneme2 = ref<string[]>([]);
const deneme3 = ref();
const deneme4 = ref<string[]>([]);

const showWord = (idx: number) => {
    deneme4.value[idx] = deneme2.value[idx];
    /* console.log(idx);
    console.log(deneme2.value[idx]);
    deneme4.value.push(deneme2.value[idx]); */
    /* console.log(deneme4.value); */
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
            randomCountryCapital.value = randomCountryCapital.value.replace(
                /[-' ,.]/g,
                ""
            );
        }
    });
};

watch(randomCountryCapital, (newValue) => {
    deneme.value = newValue.split("");
    console.log(deneme.value);
    deneme.value.map((item) => {
        deneme2.value.push(item);
    });
    console.log("Deneme2", deneme2.value);
    console.log(deneme2.value.length);
    deneme3.value = deneme2.value.length;

    /* for (let i = 0; i < deneme.value.length; i++) {
        deneme2.value.push(deneme.value[i]);
    }
    if (deneme2.value.includes("-")) {
        console.log("- --- var");
    } */
    /* console.log(deneme2.value); */
});

/* const getRandomWord = () => {
    const random = Math.floor(
        Math.random() * randomCountryCapital.value.length
    );
    getRandomCountry.value.push(randomCountryCapital.value[random]);
    const randomWord = randomCountryCapital.value.split("");
    console.log(randomWord);
}; */

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
