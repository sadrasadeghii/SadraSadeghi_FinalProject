const currencyFormatter = (amount: number) => {
  return (amount / 1000).toFixed(3)
}
export default currencyFormatter