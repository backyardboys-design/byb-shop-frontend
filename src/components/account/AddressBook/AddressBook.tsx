import { HttpTypes } from "@medusajs/types"
import AddAddress from "./AddAddress"
import EditAddress from "./EditAddress"

type AddressBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  const { addresses } = customer
  return (
    <>
      {addresses.map((address) => {
        return (
          <EditAddress region={region} address={address} key={address.id} />
        )
      })}
      <AddAddress region={region} addresses={addresses} />
    </>
  )
}
export default AddressBook
