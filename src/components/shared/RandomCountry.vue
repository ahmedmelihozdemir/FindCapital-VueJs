<template>
    <div class="flex flex-col justify-center">
        <h1 class="text-red-400 font-bold text-xl">Random Country</h1>
        <div class="flex flex-col justify-center items-center">
            <div class="p-2">
                <span class="font-semibold">Country: </span
                >{{ randomCountryName}}
            </div>
            <div class="p-2">
                <span class="font-semibold">Capital: </span
                ><div v-if="showCapital">{{randomCountryCapital[0]}}, Word:{{randomCountryCapital[0].length}}</div>
            </div>
            <div class="flex flex-row">
                <div
                    class="box flex justify-center items-center text-black font-bold m-0.5"
                    v-for="countryWord in randomCountryCapital"
                    :key="countryWord"
                >
                    {{ countryWord.toUpperCase() }}
                </div>
            </div>

            <button
                @click="showCapital = !showCapital"
                class="flex justify-center items-center m-2 p-2 bg-red-300 rounded-lg hover:cursor-pointer hover:bg-red-400"
            >
                Show Capital
            </button>
        </div>
    </div>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CountriesService } from "@/services/Countries.service";
import { ICountry } from "@/models/Country.interface";

const countriesService = new CountriesService();
const countries = ref<ICountry[]>([]);
const randomCountries = ref<ICountry>();
const randomCountry = ref();
const randomCountryName = ref<string>();
const randomCountryCapital = ref<[] | string | undefined>();
const showCapital = ref<boolean>(false);

const getRandomCountry = ref<string[]>([]);

const getCountriesInfo = () => {
    countriesService.getCountry().then((response) => {
        countries.value = response;
        randomCountries.value =
            response[Math.floor(Math.random() * response.length)];
        console.log(randomCountries.value);
        randomCountry.value = randomCountries.value.name.common;
        randomCountryName.value = randomCountries.value.name.common;
        randomCountryCapital.value = randomCountries.value.capital;
    });
};

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
