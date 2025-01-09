<script setup>
import { AppState } from '@/AppState';
import { ref } from 'vue';

const account = ref(AppState.account)

const messages = [
    {
        id: 1, body: 'Hey, how are you doing today?',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 2, body: 'I’ll meet you at the coffee shop around 3 PM.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 3, body: 'Don’t forget to send me the report by tomorrow.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 4, body: 'Are you free for dinner this weekend?',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 5, body: 'Can you please call me when you get a chance?',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 6, body: 'I loved the photos you shared earlier!',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 7, body: 'Let’s plan the trip for next month.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 8, body: 'Thanks for helping me with that project.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 9, body: 'The meeting has been rescheduled to 2 PM.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 10, body: 'Are we still on for the movie night?',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 11, body: 'I just sent you an email with the details.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 12, body: 'Let me know if you have any questions about it.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 13, body: 'Great job on the presentation today!',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 14, body: 'I’ll check on that and get back to you soon.',
        timeStamp: formatTimeStamp(new Date())
    },
    {
        id: 15, body: 'Can we move our call to a later time?',
        timeStamp: formatTimeStamp(new Date())
    }
];

function formatTimeStamp(date) {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${month} ${day}, ${time}`;
}


</script>

<template>
    <div class="my-message rounded text-white p-3 w-50 ms-auto">
        <div v-for="message in messages" v-bind:key="message.id" class="d-flex justify-content-end align-items-center">
            <div>
                <div class="mt-2 my-message-body bg-primary text-white p-3">
                    <p class="p-0 m-0 ">{{ message?.body }}</p>
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
                        {{ message?.timeStamp }}
                    </p>
                </div>
            </div>
            <div class="align-items-end m-0 p-0">
                <img class="img-fluid ms-3"
                    src="https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000"
                    alt="Your Profile Picture" />
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
