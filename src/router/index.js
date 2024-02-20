import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../views/protected/AdminLayout.vue";
import UserLayout from "../views/protected/UserLayout.vue";
import HomeView from "../views/free/HomeView.vue";
import WebsiteLayout from "../views/free/WebsiteLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If there is a saved position, restore it
      return savedPosition;
    } else if (to.hash) {
      // If the route has a hash (anchor) value, scroll to it
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else {
      // Scroll to the top of the page
      return { top: 0, left: 0 };
    }
  },
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/free/Login.vue"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/",
      redirect: "/home",
      component: WebsiteLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("../components/contactUs.vue"),
        },
        {
          path: "/user/register",
          name: "Register",
          component: () => import("../views/free/RegisterView.vue"),
        },
        {
          path: "/product",
          name: "productDetail",
          component: () => import("../components/productDetail.vue"),
        },
        {
          path: "/shop",
          children: [
            {
              path: "/",
              name: "shop",
              component: () => import("@/components/Shop.vue"),
            },
            {
              path: "/shop/:name",
              name: "shopDetail",
              component: () => import("../components/productDetail.vue"),
            },
          ],
        },
        {
          path: "/checkout",
          name: "checkout",
          component: () => import("../components/checkout.vue"),
        },
        {
          path: "/cart",
          name: "cart",
          component: () => import("../components/cart.vue"),
        },
        {
          path: "/product_category",
          children: [
            {
              path: "/:name",
              name: "productCatagory",
              component: () => import("../components/ProductList.vue"),
            },
            {
              path: "/:name/:target",
              name: "productTarget",
              component: () => import("../components/productTargetedList.vue"),
            },
          ],
        },

        {
          path: "/footer",
          name: "footer",
          component: () => import("../components/footer.vue"),
        },
      ],
    },

    // Admin routes
    {
      path: "/admin",
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        isAdmin: true,
        // name: "protected-index",
      },
      children: [
        {
          path: "dashboard", // will make this default entry using the name
          name: "AdminDashboard",
          component: () => import("../views/protected/AdminDashboard.vue"),
        },
        {
          path: "users",
          name: "Users",
          component: () => import("../views/protected/Users.vue"),
        },
        {
          path: "user/:id",
          name: "UserDetail",
          component: () => import("../views/protected/UserDetail.vue"),
        },
        {
          path: "products",
          name: "Products",
          component: () => import("../views/protected/Products.vue"),
        },
        {
          path: "product/:id",
          name: "ProductDetail",
          component: () => import("../views/protected/ProductDetail.vue"),
        },
        {
          path: "myproducts/:id",
          name: "MyProducts",
          component: () => import("../views/protected/MyProducts.vue"),
        },
        {
          path: "product/:id/:productId",
          name: "MyProductDetail",
          component: () => import("../views/protected/MyProductDetail.vue"),
        },
        {
          path: "categories",
          name: "Categories",
          component: () => import("../views/protected/Category.vue"),
        },
        {
          path: "orders",
          name: "Orders",
          component: () => import("../views/protected/Orders.vue"),
        },
        {
          path: "order/:id",
          name: "OrderDetail",
          component: () => import("../views/protected/OrderDetail.vue"),
        },
        {
          path: "contacts",
          name: "Contacts",
          component: () => import("../views/protected/Contacts.vue"),
        },
        {
          path: "contact/:id",
          name: "ContactDetail",
          component: () => import("../views/protected/ContactDetail.vue"),
        },
        {
          path: "payment-options",
          name: "PaymentOptions",
          component: () => import("../views/protected/PaymentOptions.vue"),
        },
        {
          path: "payment-options/:id",
          name: "PaymentDetail",
          component: () => import("../views/protected/PaymentDetail.vue"),
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("../views/protected/Profile.vue"),
        },
      ],
    },
    // User routes
    {
      path: "/user",
      component: UserLayout,
      meta: {
        requiresAuth: true,
        isUser: true,
        // name: "protected-index",
      },
      children: [
        {
          path: "dashboard",
          name: "UserDashboard",
          component: () => import("../views/protected/UserDashboard.vue"),
        },
        {
          path: "products",
          name: "UserProducts",
          component: () => import("../views/protected/MyProducts.vue"),
        },
        {
          path: "product/:id/:productId",
          name: "UserProductDetail",
          component: () => import("../views/protected/UserProductDetail.vue"),
        },
        {
          path: "profile",
          name: "UserProfile",
          component: () => import("../views/protected/Profile.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/free/AboutView.vue"),
      meta: {
        guest: true,
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("../views/free/404.vue"),
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({ name: "Login" });
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user.role == "Admin") {
          next();
        }
        /*else {
                    next({ name: 'userboard' })
                }*/
      } else if (to.matched.some((record) => record.meta.isUser)) {
        if (user.role == "User") {
          next();
        }
        /*else {
                    next({ name: 'userboard' })
                }*/
      } else if (to.matched.some((record) => record.meta.isStaff)) {
        if (user.role == "staff") {
          next();
        }
        /*else {
                    next({ name: 'userboard' })
                }*/
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    }
    /*else {
            next({ name: 'userboard' })
        }*/
  } else {
    next();
  }
});
/**
 * We check a few things:
    • if route requiresAuth, check for a jwt token showing the user is logged in.
    • if route requiresAuth and is only for admin users, check for auth and check if the user is an admin
    • if route requires guest, check if the user is logged in
 * We redirect the user based on what we are checking for. We use the name of the route to redirect
 */

export default router;
