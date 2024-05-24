import { useMutation, useQuery } from "@blitzjs/rpc"
import { Button, Text, Table } from "@mantine/core"
import getLemonSqueezyProducts from "src/features/payments/lemon-squeezy-products/queries/getLemonSqueezyProducts"
import getLemonSqueezyVariants from "src/features/payments/lemon-squeezy-variants/queries/getLemonSqueezyVariants"
import populateLemonSqueezyInfo from "src/features/payments/mutations/populateLemonSqueezyInfo"

export const AdminPageBillingTab = () => {
  const [$populate, { isLoading }] = useMutation(populateLemonSqueezyInfo, {})
  const [products] = useQuery(getLemonSqueezyProducts, {})
  const [variants] = useQuery(getLemonSqueezyVariants, {})

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.id}</Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product._count?.subscriptions}</Table.Td>
      <Table.Td>{product.productId}</Table.Td>
      <Table.Td>{product._count?.variants}</Table.Td>
      <Table.Td>{product.attributes ? "Yes" : "No"}</Table.Td>
    </Table.Tr>
  ))

  const variantRows = variants.map((variant) => (
    <Table.Tr key={variant.id}>
      <Table.Td>{variant.id}</Table.Td>
      <Table.Td>{variant.name}</Table.Td>
      <Table.Td>{variant._count?.subscriptions}</Table.Td>
      <Table.Td>{variant.price}</Table.Td>
      <Table.Td>{variant.variantId}</Table.Td>
      <Table.Td>{variant.product?.name}</Table.Td>
      <Table.Td>{variant.attributes ? "Yes" : "No"}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div style={{ width: "100%" }}>
      <Button style={{ marginTop: "20px" }} loading={isLoading} onClick={() => $populate({})}>
        Populate
      </Button>

      <Text style={{ paddingTop: "10px", marginTop: "20px" }} w={500}>
        Products
      </Text>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Subscriptions</Table.Th>
            <Table.Th>Product ID</Table.Th>
            <Table.Th>Variants</Table.Th>
            <Table.Th>Attributes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Text style={{ paddingTop: "10px", marginTop: "20px" }} size="xl" w={500}>
        Variants
      </Text>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Subscriptions</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Variant ID</Table.Th>
            <Table.Th>Product</Table.Th>
            <Table.Th>Attributes</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{variantRows}</Table.Tbody>
      </Table>
    </div>
  )
}
