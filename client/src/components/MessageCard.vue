<script setup>
import { ref } from 'vue';

const user = ref({
    name: 'Dino Man',
    content: 'Hi! I hope you are doing good today. Are you still in need of my services? Also, if yes, I would like to agree on a price today!',
    img: 'https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000',
    isBusiness: true
});




const props = defineProps({
    messages: Object
});

</script>

<template>
    <div class="my-message rounded text-white p-3 w-50 me-auto">
        <div class="d-flex justify-content-start align-items-center">
            <div class="align-items-end m-0 p-0">
                <img class="img-fluid me-3" :src="user?.img" alt="Your Profile Picture" />
            </div>
            <div>
                <div class="mt-2 my-message-body bg-primary text-white p-3">
                    <p class="p-0 m-0 ">{{ props.messages?.body }}</p>
                </div>
                <div class="mt-1 text-start justify-content-start align-items-center d-flex">
                    <p class="timeStamp m-0 p-0">
                        {{ props.messages ? props.messages.formatTimeStamp : 'Loading...' }}
                    </p>
                    <div class="d-flex align-items-center">
                        <p class="fw-bold accountName m-0 p-0 ms-2">
                            {{ user?.name }}
                        </p>
                        <div class="ms-2 m-0 p-0" v-if="user?.isBusiness == true">
                            <i class="p-0 m-0 mdi mdi-card-account-details"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.accountName {
    font-size: 12px;
    margin: 0;
    padding: 0;
}

.timeStamp {
    font-size: 12px;
    margin: 0;
    padding: 0;
}

.my-message-body {
    border-radius: 12px 12px 12px 0;
}

.img-fluid {
    height: 45px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
}

.my-message {
    text-align: center;

    .bg-primary {
        background-color: #555c64 !important;
        color: white;
    }
}
</style>
