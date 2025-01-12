<script setup>


const props = defineProps({
    messages: Object
});

</script>

<template>
    <div class="my-message rounded text-white w-100 p-3 me-auto">
        <div class="d-flex justify-content-start align-items-center">
            <div id="profileImage" class="align-items-end m-0 p-0">
                <img class="img-fluid me-3" :src="props.messages?.creator.picture" alt="Your Profile Picture" />
            </div>
            <div id="messageContent">
                <div class="mt-2 my-message-body bg-primary text-white p-3">
                    <p class="p-0 m-0 ">{{ props.messages?.body }}</p>
                </div>
                <div class="mt-1 text-start justify-content-start align-items-center d-flex">
                    <p class="timeStamp m-0 p-0">
                        {{ props.messages ? props.messages.formatTimeStamp : 'Loading...' }}
                    </p>
                    <div class="d-flex align-items-center">
                        <p class="fw-bold accountName m-0 p-0 ms-2">
                            {{ props.messages?.creator.name }}
                        </p>
                        <div class="ms-2 m-0 p-0" v-if="props.messages?.creator.isBusiness == true">
                            <i class="p-0 m-0 mdi mdi-card-account-details"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#profileImage {
    width: 10%;
}

#messageContent {
    max-width: 90%
}

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
