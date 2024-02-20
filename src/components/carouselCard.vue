<template>
  <div>
    <h1 class="text-xl uppercase font-semibold md:ml-4">shoes</h1>
    <div class="rounded-3xl m-3 mt-0 shadow-3xl border-gray-300">
      <div class="relative overflow-hidden">
        <div class="flex transition-transform rounded-3xl ease-in-out duration-300 transform" :style="'translateX(-' + currentIndex * 100 + '%)'">
          <div v-for="(card, index) in visibleCards" :key="index" class="w-full p-4 ">
            <Card />
          </div>
        </div>
        <button @click="prevCard" type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span class="hidden">Previous</span>
          </span>
        </button>
        <button @click="nextCard" type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="hidden">Next</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Card from '../components/cards.vue';

export default {
  components: {
    Card,
  },
  setup() {
    const currentIndex = ref(0);
    const cardsPerPage = 5; // Adjust this number based on how many cards you want to display at once
    const cards = ref([
      {
        title: 'Card 1 Title',
        description: 'Card 1 description goes here.',
        image: 'image1.jpg',
      },
      // ... (add more cards)
    ]);

    const visibleCards = computed(() => {
      const start = currentIndex.value * cardsPerPage;
      const end = start + cardsPerPage;
      return cards.value.slice(start, end);
    });

    const nextCard = () => {
      currentIndex.value = (currentIndex.value + 1) % Math.ceil(cards.value.length / cardsPerPage);
    };

    const prevCard = () => {
      currentIndex.value = (currentIndex.value - 1 + Math.ceil(cards.value.length / cardsPerPage)) % Math.ceil(cards.value.length / cardsPerPage);
    };

    return {
      currentIndex,
      cardsPerPage,
      cards,
      visibleCards,
      nextCard,
      prevCard,
    };
  },
};
</script>

<style scoped>
/* Your global styles here */

/* You can customize Tailwind styles further if needed */
</style>
