<script setup>
import { ref } from 'vue';



const user = ref({
    name: 'Dino Man',
    content: 'Hi I hope you are doing good today, Are you still in need of my services? Also if yes I would like to agree on a price today!',
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    isBusiness: true
})
</script>


<template>
    <div class="rounded text-white p-3 w-50">
        <div class="d-flex align-items-center">
            <img class="img-fluid" :src="user?.img" alt="Creator's Name" />
            <div class="ms-3 d-flex">
                <h5 class="p-0 m-0">{{ user?.name }}</h5>
                <div class="ms-2" v-if="user?.isBusiness == true">
                    <i class="mdi mdi-card-account-details"></i>
                </div>
            </div>
        </div>
        <div class="mt-2 ms-5 rounded bg-dark text-white p-3">
            <p class="p-0 m-0">{{ user?.content }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.img-fluid {
    height: 40px;
    aspect-ratio: 1/1;
    border-radius: 50%;
}
</style>