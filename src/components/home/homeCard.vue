<template>
    <div class=" flex max-md:flex-wrap container md:space-x-4 ">
        <div class="max-md:w-1/2 md:w-1/4 md:p-6 bordor border-2 bg-white space-y-3 ">
            <h1 class=" text-2xl text-center font-bold  ">Cosmetics</h1>
            <img src="../../assets/img/cosmetics.jpg" alt="" class="w-full h-52 md:h-60 cursor-pointer hover:scale-105 duration-200">
            <router-link  :to="{name:'productCatagory',params: { name: 'Cosmetics' }} " class=" cursor-pointer hover:text-red-600"><p>Shop now</p></router-link> 
        </div>
        <div class="w-1/2 md:w-1/4 md:p-6 bordor border-2 bg-white space-y-3 ">
            <h1 class=" text-2xl text-center font-bold  ">Sports</h1>
            <div class="flex flex-wrap  ">
                <div class="w-1/2"><img src="../../assets/img/images.jpg" alt="" class="w-full h-36  cursor-pointer hover:scale-105 duration-200"></div>
                <div class=" w-1/2"><img src="../../assets/img/sportTshirt.jpg" alt="" class="w-full h-32 cursor-pointer hover:scale-105 duration-200 "></div>
                <div class=" w-1/2"><img src="../../assets/img/gym.jpg" alt="" class="w-full h-36 cursor-pointer hover:scale-105 duration-200 "></div>
                <div class=" w-1/2"><img src="../../assets/img/racketball.jpg" alt="" class="w-full h-36 cursor-pointer hover:scale-105 duration-200"></div>
            </div>
            <router-link  :to="{name:'productCatagory',params: { name: 'Sports' }} " class=" cursor-pointer hover:text-red-600"><p>Shop now</p></router-link> 
        </div>
        <div class="w-1/2 md:w-1/4 md:p-6 bordor border-2 bg-white space-y-3">
            <h1 class=" text-2xl text-center font-bold  ">Books</h1>
            <img src="../../assets/img/books.jpg" alt="" class="w-full max-sm:h-48 h-52 cursor-pointer hover:scale-105 duration-200 ">
            <router-link  :to="{name:'productCatagory',params: { name: 'Books' }} " class=" cursor-pointer hover:text-red-600"><p>Shop now</p></router-link> 
        </div>
        <div class=" w-1/2 md:w-1/4 md:p-6 bordor border-2 bg-white space-y-3">
            <h1 class=" text-2xl text-center font-bold  ">Games</h1>
            <img src="../../assets/img/game.jpg " alt="" class="w-full h-48 cursor-pointer hover:scale-105 duration-200">
            <router-link  :to="{name:'productCatagory',params: { name: 'Games' }} " class=" cursor-pointer hover:text-red-600"><p>Shop now</p></router-link>
        </div>
    </div>
</template>