<template>
    <div class="timeline">
        <el-timeline :reverse="reverse">
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
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
            reverse: true,
            activities: [
                {
                    content: "防抖节流",
                    timestamp: "2022-05-15",
                    color: "#0bbd87",
                },
                {
                    content: "瀑布流",
                    timestamp: "2018-05-18",
                    color: "#0bbd87",
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