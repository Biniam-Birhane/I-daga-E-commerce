<template>
  <div class="flex items-center justify-center flex-col space-y-6 relative">
    <button
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
      type="button"
      class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span class="hidden">Previous</span>
      </span>
    </button>
    <!-- <button
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
      class="w-10 h-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded-full transition-transform transform -rotate-45 focus:outline-none"
    ></button> -->
    <div class="flex items-center justify-center overflow-hidden">
      <div
        class="flex transition-transform"
        :style="{ transform: 'translateX(' + currentOffset + 'px)' }"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="index"
          class="cursor: pointer; box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40s, 44, 53, 0.08); background-color: #fff; border-radius: 4px; z-index: 3; margin-bottom: 2px; p-4 mx-2"
        >
          <img
            :src="item.image"
            alt="Card Image"
            class="w-full h-48 object-cover mb-4 rounded"
          />
          <div class="text-center">
            <p class="text-xl font-semibold mb-2">{{ item.name }}</p>
            <div class="flex justify-center">
              <div
                v-for="(tag, tagIndex) in item.tag"
                :key="tagIndex"
                class="tag px-2"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
      type="button"
      class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
    >
      <span
        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
      >
        <svg
          class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <span class="hidden">Next</span>
      </span>
    </button>
    <!-- <button
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
      class="w-10 h-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 border border-gray-400 rounded-full transition-transform transform rotate-45 focus:outline-none"
    ></button> -->
  </div>
</template>




<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const currentOffset = ref(0);
    const windowSize = 6;
    const paginationFactor = 220;
    const atEndOfList = computed(
      () =>
        currentOffset.value <= -paginationFactor * (items.length - windowSize)
    );
    const atHeadOfList = computed(() => currentOffset.value === 0);

    const visibleItems = computed(() => {
      const start = Math.floor(-currentOffset.value / paginationFactor);
      const end = Math.min(start + windowSize, items.length);
      return items.slice(0, end);
      // const start = 0;
      // const end = start + Math.max(windowSize, items.length);
      // return items.slice(start, end);
      // const end =items.length
      // const start = -Math.floor(-currentOffset.value / paginationFactor);
      // const end = start + windowSize;
      // return items.slice(0, end);
      // return items
    });

    const moveCarousel = (direction) => {
      if (direction === 1 && !atEndOfList.value) {
        currentOffset.value -= paginationFactor;
      } else if (direction === -1 && !atHeadOfList.value) {
        currentOffset.value += paginationFactor;
      }
    };

    // Sample values for the items prop
    const items = [
      {
        name: "Item 1",
        image: "https://via.placeholder.com/200",
        tag: ["Tag1", "Tag2"],
      },
      {
        name: "Item 2",
        image: "https://via.placeholder.com/200",
        tag: ["Tag3", "Tag4"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      // Add more items as needed
    ];

    return {
      currentOffset,
      atEndOfList,
      atHeadOfList,
      visibleItems,
      moveCarousel,
      items,
    };
  },
};
</script>

<style scoped>
.left {
  transform: rotate(-135deg);
}

.left:active {
  transform: rotate(-135deg) scale(0.9);
}

.right {
  transform: rotate(45deg);
}

.right:active {
  transform: rotate(45deg) scale(0.9);
}

.card {
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
    0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin-bottom: 2px;
}

.tag {
  font-size: 11px;
  font-weight: 300;
  padding: 4px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}

.tag:before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 8px 12px 12px 0;
}

.tag.secondary {
  margin-left: 0;
  border-left: 1.45px dashed white;
}

.tag.secondary:before {
  display: none !important;
}

.tag:after {
  content: "";
  position: absolute;
  top: 8px;
  left: -3px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: 0px 0px 0px #004977;
}
</style>











<!-- <template>
  <div class="flex items-center justify-center flex-col space-y-6">
    <button
      @click="moveCarousel(-1)"
      :disabled="atHeadOfList"
      class="inline-block; width: 15px; height: 15px; padding: 10px; border-top: 2px solid #42b883; border-right: 2px solid #42b883; cursor: pointer; margin: 0 4px; transition: transform 150ms linear; transform: rotate(-135deg) active:transform: rotate(-135deg) scale(0.9)"
    ></button>
    <div class="flex items-center justify-center overflow-hidden">
      <div
        class="flex transition-transform"
        :style="{ transform: 'translateX(' + currentOffset + 'px)' }"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="index"
          class="cursor: pointer; box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08); background-color: #fff; border-radius: 4px; z-index: 3; margin-bottom: 2px; p-4 mx-2"
        >
          <img
            :src="item.image"
            alt="Card Image"
            class="w-full h-48 object-cover mb-4 rounded"
          />
          <div class="text-center">
            <p class="text-xl font-semibold mb-2">{{ item.name }}</p>
            <div class="flex justify-center">
              <div
                v-for="(tag, tagIndex) in item.tag"
                :key="tagIndex"
                class="font-size: 11px; font-weight: 300; padding: 4px; background: rgba(40, 44, 53, 0.06); display: inline-block; position: relative; margin-left: 4px; color: #666a73;px-2"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="moveCarousel(1)" type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="hidden">Next</span>
          </span>
        </button>
    <button
      @click="moveCarousel(1)"
      :disabled="atEndOfList"
      class="inline-block; width: 15px; height: 15px; padding: 10px; border-top: 2px solid #42b883; border-right: 2px solid #42b883; cursor: pointer; margin: 0 4px; transition: transform 150ms linear; transform: rotate(45deg);"
    ></button>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const currentOffset = ref(0);
    const paginationFactor = 220;
    const windowSize = 5;
    const atEndOfList = computed(
      () =>
        currentOffset.value <= -paginationFactor * (items.length - windowSize)
    );
    const atHeadOfList = computed(() => currentOffset.value === 0);

    const visibleItems = computed(() => {
      const start = -Math.floor(currentOffset.value / paginationFactor);
      const end = start + windowSize;
      return items.slice(start, end);
    });

    const moveCarousel = (direction) => {
      if (direction === 1 && !atEndOfList.value) {
        currentOffset.value -= paginationFactor;
      } else if (direction === -1 && !atHeadOfList.value) {
        currentOffset.value += paginationFactor;
      }
    };

    // Sample values for the items prop
    const items = [
      {
        name: "Item 1",
        image: "https://via.placeholder.com/200",
        tag: ["Tag1", "Tag2"],
      },
      {
        name: "Item 2",
        image: "https://via.placeholder.com/200",
        tag: ["Tag3", "Tag4"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      {
        name: "Item 2",
        image: "https://via.placeholder.com/200",
        tag: ["Tag3", "Tag4"],
      },
      {
        name: "Item 3",
        image: "https://via.placeholder.com/200",
        tag: ["Tag5", "Tag6"],
      },
      {
        name: "Item 4",
        image: "https://via.placeholder.com/200",
        tag: ["Tag7", "Tag8"],
      },
      // Add more items as needed
    ];

    return {
      currentOffset,
      atEndOfList,
      atHeadOfList,
      visibleItems,
      moveCarousel,
      items,
    };
  },
};
</script>










 -->
