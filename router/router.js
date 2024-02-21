/** import public router */
import publicRoutes from "./public.router.js";
/** import products router */
import productRoutes from "./product.router.js";
/** import authentication router */
import authRoutes from "./auth.router.js";
/** import user router */
import userRouters from "./user.router.js";
/** import categories router */
import categoryRouters from "./category.router.js";

export default function routersInitializer(fastify) {
	/** initialize public router */
	fastify.register(publicRoutes);
	/** initialize product router */
	fastify.register(productRoutes, { prefix: "products" });
	/** initialize authentication router */
	fastify.register(authRoutes, { prefix: "auth" });
	/** initialize user router */
	fastify.register(userRouters, { prefix: "panel" });
	/** initialize categories router */
	fastify.register(categoryRouters, { prefix: "categories" });
}
