<template>
  <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->
  <!-- Jumbotron -->
  <div
    class="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')]  "
    style="background-image: url(...); height: 400px"
  >
    <div
      class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
      style="background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="flex h-full items-center justify-center">
        <div class="text-white">
          <h2 class="mb-4 text-4xl font-semibold">Heading</h2>
          <h4 class="mb-6 text-xl font-semibold">Subheading</h4>
          <button
            type="button"
            class="rounded border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Call to action
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</template>