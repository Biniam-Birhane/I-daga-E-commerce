import { ref, computed, reactive, toRefs } from "vue";
import { defineStore } from "pinia";
import { Axios } from "axios";
import apiService from "../services/apiService";
export const useProductStore = defineStore("product", () => {
  const AllProducts = ref([]);
  const successMessage = ref(false);
  const Cart = ref([]);
  const ProductDetail = ref({});
  const numberItem =ref(1)
  const GetAllProducts = computed(() => AllProducts.value);
  const GetBasedCategory = (category) => {
    return AllProducts.value.filter((obj) => obj.categoryId.name === category);
  };
  const Getfeatured =(yes)=>{
    console.log(AllProducts.value.filter((obj)=>obj.isFeatured ===yes))
    return AllProducts.value.filter((obj)=>obj.isFeatured ===yes)
  }
  const GetSuccessMessage = computed(() => {
    console.log(successMessage.value);
    successMessage.value;
  });
  

  const GetShoes = computed(() => Shoes.value);
  const GetClothes = computed(() => Clothes.value);
  const GetCart = computed(() => Cart.value);
  const GetProductDetail = computed(() => ProductDetail.value);
  // const DeleteCartItem =computed(()=>Cart.value.splice(0,Cart.value.length))
  const GetTotalCartPrice = computed(() => {
    return Cart.value.reduce((acc, obj) => acc + obj.price, 0);
  });

  const SetAllProducts = async (allProduct) => {
    try {
      const response = await apiService.all(allProduct);
      AllProducts.value = response.data.data;
      console.log(AllProducts.value);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteCartItem = (item) => {
    const ItemToDelete = Cart.value.findIndex((obj) => obj._id === item);
    if (ItemToDelete !== -1) {
      Cart.value.splice(ItemToDelete, 1);
      console.log("successful");
    }
  };

  const DeleteAllCartItem = ()=>{
    Cart.value =''
  }

  const SetSuccessMessage = () => {
    successMessage.value = true;
  };

  const AddToCart = async (cart) => {
    Cart.value.push(cart);
  };

  const SetProductDetail = async (productDetails) => {
    ProductDetail.value = reactive(productDetails);
    console.log(ProductDetail.value);
  };
  const SetIncNumberItem =()=>{
    numberItem.value+= numberItem.value
  }
  const SetDecNumberItem =()=>{
    numberItem.value+=numberItem.value
  }

  return {
    GetAllProducts,
    GetBasedCategory,
    GetSuccessMessage,
    Getfeatured,
    DeleteCartItem,
    numberItem,
    DeleteAllCartItem,
    AddToCart,
    GetCart,
    GetTotalCartPrice,
    GetProductDetail,
    SetProductDetail,
    SetAllProducts,
    SetSuccessMessage,
    SetIncNumberItem,
    SetDecNumberItem,
  };
});

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })
