import { retrieveCart } from "@lib/data/cart"
import CartDrawer from "../CartDrawer/CartDrawer"

const CartButton = async () => {
  const cart = await retrieveCart().catch(() => null)
  return <CartDrawer cart={cart} />
}
export default CartButton
