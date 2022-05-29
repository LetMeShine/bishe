<template>
    <div class="timeline">
        <el-timeline :reverse="reverse">
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
            >
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reverse: false,
            activities: [
                {
                    content: "手写vue-4",
                    timestamp: "2022-06-05",
                    // color: "#0bbd87",
                },
                {
                    content: "手写vue-3",
                    timestamp: "2022-06-05",
                    // color: "#0bbd87",
                },
                {
                    content: "手写vue-2",
                    timestamp: "2022-06-05",
                    // color: "#0bbd87",
                },
                {
                    content: "手写vue-1",
                    timestamp: "2022-06-05",
                    // color: "#0bbd87",
                },
                {
                    content: "手写promise",
                    timestamp: "2022-06-04",
                    // color: "#0bbd87",
                },
                {
                    content: "vuex",
                    timestamp: "2022-05-29",
                    type: "success",
                },
                {
                    content: "vue-roter",
                    timestamp: "2022-05-28",
                    type: "success",
                },
                {
                    content: "防抖节流",
                    timestamp: "2022-05-15",
                    type: "success",
                },
                {
                    content: "瀑布流",
                    timestamp: "2018-05-18",
                    type: "success",
                },
            ],
        };
    },
};
</script>

<style scoped>
.timeline {
    width: 200px;
    background-color: #fff;
}
</style>