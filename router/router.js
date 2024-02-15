/** import public router */
import publicRoutes from "./public.router.js";
/** import products router */
import productRoutes from "./product.router.js";

export default function routersInitializer(fastify) {
	/** Initialize public routers */
	fastify.register(publicRoutes);
	/** Initialize product routers */
	fastify.register(productRoutes, { prefix: "products" });
}
