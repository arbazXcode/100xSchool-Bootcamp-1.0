let subs: number | string = "1M";

let apiRequestStatus: "pending" | "success" | "error" = "pending";
// apiRequestStatus = "done"
apiRequestStatus = "success";

const orders = ["12", "20", "42", "18"];

let currentOrder: string | undefined;

for (let order of orders) {
  if (order === "18") {
    currentOrder = order;
    break;
  }
}
console.log(currentOrder);
