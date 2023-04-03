import Order, { IOrder } from "../models/Order";

async function generateOrderNumber(): Promise<string> {
  const prefix = "ORD";
  const padding = "0000";
  const result: IOrder = await Order.findOneAndUpdate(
    {},
    { $inc: { orderNumberSequence: 1 } },
    { new: true, upsert: true, select: { orderNumberSequence: 1 } }
  );
  const nextOrderNumber =
    prefix + (padding + result.orderNumberSequence).slice(-padding.length);
  return nextOrderNumber;
}

export default generateOrderNumber;
