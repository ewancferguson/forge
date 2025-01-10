<script setup>
import { AppState } from '@/AppState';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const props = defineProps({
    messages: Object
});

</script>

<template>
    <div class="my-message rounded text-white p-3 w-50 ms-auto">
        <div class="d-flex justify-content-end align-items-center">
            <div>
                <div class="mt-2 my-message-body bg-primary text-white p-3">
                    <p class="p-0 m-0 ">{{ props.messages?.body }}</p>
                </div>
                <div class="mt-1 text-end justify-content-end align-items-center d-flex">
                    <div class="d-flex align-items-center">
                        <div class="me-2 m-0 p-0" v-if="account?.isBusiness == true">
                            <i class="p-0 m-0 mdi mdi-card-account-details"></i>
                        </div>
                        <p class="fw-bold accountName m-0 p-0 me-2">
                            {{ account?.name }}
                        </p>
                    </div>
                    <p class="timeStamp m-0 p-0">
                        {{ props.messages ? props.messages.formatTimeStamp : 'Loading...' }}
                    </p>
                </div>
            </div>
            <div v-if="account?.picture" class="align-items-end m-0 p-0">
                <img class="img-fluid ms-3" :src="account?.picture" alt="Your Profile Picture" />
            </div>
            <div v-else class="align-items-end m-0 p-0">
                <i class="ms-3 mdi mdi-loading mdi-spin"></i>
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
    border-radius: 12px 12px 0 12px;
}

.img-fluid {
    height: 45px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
}

.my-message {
    text-align: center;

    .bg-primary {
        background-color: #007aff !important;
        color: white;
    }
}
</style>
